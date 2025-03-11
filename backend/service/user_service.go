package service

import (
	"bytes"
	"context"
	"fmt"
	"html/template"
	"os"
	"strings"
	"time"

	"github.com/Reyysusanto/warasin-web/backend/dto"
	"github.com/Reyysusanto/warasin-web/backend/entity"
	"github.com/Reyysusanto/warasin-web/backend/helpers"
	"github.com/Reyysusanto/warasin-web/backend/repository"
	"github.com/Reyysusanto/warasin-web/backend/utils"
	"github.com/go-playground/validator/v10"
)

type (
	IUserService interface {
		Register(ctx context.Context, req dto.UserRegisterRequest) (dto.UserResponse, error)
		Login(ctx context.Context, req dto.UserLoginRequest) (dto.UserLoginResponse, error)
		SendForgotPasswordEmail(ctx context.Context, req dto.SendForgotPasswordEmailRequest) error
		ForgotPassword(ctx context.Context, req dto.ForgotPasswordRequest) (dto.ForgotPasswordResponse, error)
		UpdatePassword(ctx context.Context, req dto.UpdatePasswordRequest) (dto.UpdatePasswordResponse, error)
	}

	UserService struct {
		userRepo   repository.IUserRepository
		jwtService IJWTService
	}
)

func NewUserService(userRepo repository.IUserRepository, jwtService IJWTService) *UserService {
	return &UserService{
		userRepo:   userRepo,
		jwtService: jwtService,
	}
}

func (us *UserService) Register(ctx context.Context, req dto.UserRegisterRequest) (dto.UserResponse, error) {
	validate := validator.New()
	err := validate.Struct(req)
	if err != nil {
		var errorMessages []string
		for _, err := range err.(validator.ValidationErrors) {
			errorMessages = append(errorMessages, err.Error())
		}

		return dto.UserResponse{}, fmt.Errorf("validation errors: %v", errorMessages)
	}

	_, flag, err := us.userRepo.CheckEmail(ctx, nil, req.Email)
	if flag || err == nil {
		return dto.UserResponse{}, dto.ErrEmailAlreadyExists
	}

	user := entity.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
	}

	userReg, err := us.userRepo.RegisterUser(ctx, nil, user)
	if err != nil {
		return dto.UserResponse{}, dto.ErrRegisterUser
	}

	return dto.UserResponse{
		ID:       userReg.ID,
		Name:     userReg.Name,
		Email:    userReg.Email,
		Password: userReg.Password,
	}, nil
}

func (us *UserService) Login(ctx context.Context, req dto.UserLoginRequest) (dto.UserLoginResponse, error) {
	user, flag, err := us.userRepo.CheckEmail(ctx, nil, req.Email)
	if !flag || err != nil {
		return dto.UserLoginResponse{}, dto.ErrEmailNotFound
	}

	checkPassword, err := helpers.CheckPassword(user.Password, []byte(req.Password))
	if err != nil || !checkPassword {
		return dto.UserLoginResponse{}, dto.ErrPasswordNotMatch
	}

	accessToken, refreshToken, err := us.jwtService.GenerateToken(user.ID.String())
	if err != nil {
		return dto.UserLoginResponse{}, err
	}

	return dto.UserLoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func makeForgotPasswordEmail(receiverEmail string) (map[string]string, error) {
	expired := time.Now().Add(time.Hour * 24).Format("2006-01-02 15:04:05")
	plainText := fmt.Sprintf("%s_%s", receiverEmail, expired)
	token, err := utils.AESEncrypt(plainText)
	if err != nil {
		return nil, err
	}

	baseURL := os.Getenv("BASE_URL")
	forgotPasswordEmailRoute := "forgot-password"
	if baseURL == "" {
		baseURL = "http://127.0.0.1:8000/api/v1/user"
	}

	forgotPasswordLink := baseURL + "/" + forgotPasswordEmailRoute + "?token=" + token

	readHTML, err := os.ReadFile("utils/email_template/forgot_password_mail.html")
	if err != nil {
		return nil, err
	}

	data := struct {
		Email          string
		ForgotPassword string
	}{
		Email:          receiverEmail,
		ForgotPassword: forgotPasswordLink,
	}

	tmpl, err := template.New("custom").Parse(string(readHTML))
	if err != nil {
		return nil, err
	}

	var strMail bytes.Buffer
	if err := tmpl.Execute(&strMail, data); err != nil {
		return nil, err
	}

	draftEmail := map[string]string{
		"subject": "warasin",
		"body":    strMail.String(),
	}

	return draftEmail, nil
}

func (us *UserService) SendForgotPasswordEmail(ctx context.Context, req dto.SendForgotPasswordEmailRequest) error {
	user, flag, err := us.userRepo.CheckEmail(ctx, nil, req.Email)
	if err != nil || !flag {
		return dto.ErrEmailNotFound
	}

	draftEmail, err := makeForgotPasswordEmail(user.Email)
	if err != nil {
		return dto.ErrMakeForgotPasswordEmail
	}

	if err := utils.SendEmail(user.Email, draftEmail["subject"], draftEmail["body"]); err != nil {
		return dto.ErrSendEmail
	}

	return nil
}

func (us *UserService) ForgotPassword(ctx context.Context, req dto.ForgotPasswordRequest) (dto.ForgotPasswordResponse, error) {
	decryptedToken, err := utils.AESDecrypt(req.Token)
	if err != nil {
		return dto.ForgotPasswordResponse{}, dto.ErrDecryptToken
	}

	if !strings.Contains(decryptedToken, "_") {
		return dto.ForgotPasswordResponse{}, dto.ErrTokenInvalid
	}

	decryptedTokenSplit := strings.Split(decryptedToken, "_")
	if len(decryptedTokenSplit) != 2 {
		return dto.ForgotPasswordResponse{}, dto.ErrTokenInvalid
	}

	email := decryptedTokenSplit[0]
	expired := decryptedTokenSplit[1]

	now := time.Now()
	expiredTime, err := time.Parse("2006-01-02 15:04:05", expired)
	if err != nil {
		return dto.ForgotPasswordResponse{}, dto.ErrParsingExpiredTime
	}

	if expiredTime.Sub(now) < 0 {
		return dto.ForgotPasswordResponse{}, dto.ErrTokenExpired
	}

	return dto.ForgotPasswordResponse{
		Email: email,
	}, nil
}

func (us *UserService) UpdatePassword(ctx context.Context, req dto.UpdatePasswordRequest) (dto.UpdatePasswordResponse, error) {
	user, flag, err := us.userRepo.CheckEmail(ctx, nil, req.Email)
	if err != nil || !flag {
		return dto.UpdatePasswordResponse{}, dto.ErrUserNotFound
	}

	oldPassword := user.Password

	newPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		return dto.UpdatePasswordResponse{}, dto.ErrHashPassword
	}

	_, err = us.userRepo.UpdateUser(ctx, nil, user)
	if err != nil {
		return dto.UpdatePasswordResponse{}, dto.ErrUpdateUser
	}

	return dto.UpdatePasswordResponse{
		OldPassword: oldPassword,
		NewPassword: newPassword,
	}, nil
}
