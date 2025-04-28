package dto

import (
	"errors"
)

const (
	// failed
	MESSAGE_FAILED_GET_DATA_FROM_BODY          = "failed get data from body"
	MESSAGE_FAILED_REGISTER_USER               = "failed register user"
	MESSAGE_FAILED_LOGIN_USER                  = "failed login user"
	MESSAGE_FAILED_PROSES_REQUEST              = "failed proses request"
	MESSAGE_FAILED_ACCESS_DENIED               = "failed access denied"
	MESSAGE_FAILED_TOKEN_NOT_FOUND             = "failed token not found"
	MESSAGE_FAILED_TOKEN_NOT_VALID             = "failed token not valid"
	MESSAGE_FAILED_TOKEN_DENIED_ACCESS         = "failed token denied access"
	MESSAGE_FAILED_SEND_VERIFICATION_EMAIL     = "failed to send verification email"
	MESSAGE_FAILED_VERIFY_EMAIL                = "failed to verify email"
	MESSAGE_FAILED_SEND_FORGOT_PASSWORD_EMAIL  = "failed to send forgot password email"
	MESSAGE_FAILED_UPDATE_PASSWORD             = "failed to update password"
	MESSAGE_FAILED_CHECK_FORGOT_PASSWORD_TOKEN = "failed to check forgot password token"
	MESSAGE_FAILED_GET_DETAIL_USER             = "failed get detail user"
	MESSAGE_FAILED_GET_LIST_USER               = "failed get list user"
	MESSAGE_FAILED_REFRESH_TOKEN               = "failed refresh token"
	MESSAGE_FAILED_INAVLID_ENPOINTS_TOKEN      = "failed invalid endpoints in token"
	MESSAGE_FAILED_INAVLID_ROUTE_FORMAT_TOKEN  = "failed invalid route format in token"

	// success
	MESSAGE_SUCCESS_REGISTER_USER               = "success register user"
	MESSAGE_SUCCESS_LOGIN_USER                  = "success login user"
	MESSAGE_SUCCESS_SEND_VERIFICATION_EMAIL     = "success to send verification email"
	MESSAGE_SUCCESS_VERIFY_EMAIL                = "success to verify email"
	MESSAGE_SUCCESS_SEND_FORGOT_PASSWORD_EMAIL  = "success to send forgot password email"
	MESSAGE_SUCCESS_UPDATE_PASSWORD             = "success to update password"
	MESSAGE_SUCCESS_CHECK_FORGOT_PASSWORD_TOKEN = "success to check forgot password token"
	MESSAGE_SUCCESS_GET_DETAIL_USER             = "success get detail user"
	MESSAGE_SUCCESS_GET_LIST_USER               = "success get list user"
	MESSAGE_SUCCESS_REFRESH_TOKEN               = "success refresh token"
)

var (
	ErrEmailAlreadyExists      = errors.New("email already exists")
	ErrInvalidName             = errors.New("failed invalid name")
	ErrInvalidEmail            = errors.New("failed invalid email")
	ErrInvalidPassword         = errors.New("failed invalid password")
	ErrRegisterUser            = errors.New("failed to register user")
	ErrEmailNotFound           = errors.New("email not found")
	ErrUserNotFound            = errors.New("user not found")
	ErrPasswordNotMatch        = errors.New("password not match")
	ErrMakeVerificationEmail   = errors.New("failed to make verification email")
	ErrMakeForgotPasswordEmail = errors.New("failed to make forgot password email")
	ErrSendEmail               = errors.New("failed to send email")
	ErrGenerateToken           = errors.New("failed to generate token")
	ErrGenerateAccessToken     = errors.New("failed to generate access token")
	ErrGenerateRefreshToken    = errors.New("failed to generate refresh token")
	ErrUnexpectedSigningMethod = errors.New("unexpected signing method")
	ErrDecryptToken            = errors.New("failed to decrypt token")
	ErrTokenInvalid            = errors.New("token invalid")
	ErrValidateToken           = errors.New("failed to validate token")
	ErrParsingExpiredTime      = errors.New("failed to parsing expired time")
	ErrTokenExpired            = errors.New("token expired")
	ErrEmailALreadyVerified    = errors.New("email is already verfied")
	ErrUpdateUser              = errors.New("failed to update user")
	ErrGetUserByPassword       = errors.New("failed to get user by password")
	ErrHashPassword            = errors.New("failed to hash password")
	ErrGetUserIDFromToken      = errors.New("failed get user id from token")
	ErrGetRoleFromToken        = errors.New("failed get role from token")
	ErrDeniedAccess            = errors.New("denied access")
	ErrGetRoleIDFromName       = errors.New("failed get role id by role name")
	ErrGetRoleFromID           = errors.New("failed get role by role id")
)

type (
	UserRegisterRequest struct {
		Name     string `json:"name" form:"name"`
		Email    string `json:"email" form:"email"`
		Password string `json:"password" form:"password"`
	}

	UserLoginRequest struct {
		Email    string `json:"email" form:"email"`
		Password string `json:"password" form:"password"`
	}

	UserLoginResponse struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
	}

	SendVerificationEmailRequest struct {
		Email string `json:"email" form:"email" binding:"required"`
	}

	VerifyEmailRequest struct {
		Token string `json:"token" form:"token" binding:"required"`
	}

	VerifyEmailResponse struct {
		Email      string `json:"email"`
		IsVerified bool   `json:"is_verified"`
	}

	SendForgotPasswordEmailRequest struct {
		Email string `json:"email" form:"email" binding:"required"`
	}

	ForgotPasswordRequest struct {
		Token string `json:"token" form:"token" binding:"required"`
	}

	ForgotPasswordResponse struct {
		Email string `json:"email" form:"email" binding:"required"`
	}

	UpdatePasswordRequest struct {
		Email       string `json:"email" form:"email" binding:"required"`
		NewPassword string `json:"new_password" form:"new_password" binding:"required"`
	}

	UpdatePasswordResponse struct {
		OldPassword string `json:"old_password" form:"old_password" binding:"required"`
		NewPassword string `json:"new_password" form:"new_password" binding:"required"`
	}

	RefreshTokenRequest struct {
		RefreshToken string `json:"refresh_token"`
	}

	RefreshTokenResponse struct {
		AccessToken string `json:"access_token"`
	}
)
