package handler

import (
	"net/http"

	"github.com/Reyysusanto/warasin-web/backend/dto"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/Reyysusanto/warasin-web/backend/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type (
	IUserHandler interface {
		// Authentication
		Register(ctx *gin.Context)
		Login(ctx *gin.Context)
		RefreshToken(ctx *gin.Context)

		// Forgot Password
		SendForgotPasswordEmail(ctx *gin.Context)
		ForgotPassword(ctx *gin.Context)
		UpdatePassword(ctx *gin.Context)

		// Verification Email
		SendVerificationEmail(ctx *gin.Context)
		VerifyEmail(ctx *gin.Context)

		// User
		GetDetailUser(ctx *gin.Context)
		UpdateUser(ctx *gin.Context)

		// News
		GetAllNews(ctx *gin.Context)
		GetDetailNews(ctx *gin.Context)

		// Motivation
		GetAllMotivation(ctx *gin.Context)
		GetDetailMotivation(ctx *gin.Context)

		// Consultation
		CreateConsultation(ctx *gin.Context)
		GetAllConsultation(ctx *gin.Context)
		GetDetailConsultation(ctx *gin.Context)
		UpdateConsultation(ctx *gin.Context)
		DeleteConsultation(ctx *gin.Context)

		// Psycholog
		GetAllPsycholog(ctx *gin.Context)
		GetDetailPsycholog(ctx *gin.Context)

		// Practice
		GetAllPractice(ctx *gin.Context)

		// Available Slot
		GetAllAvailableSlot(ctx *gin.Context)

		// News Detail
		CreateNewsDetail(ctx *gin.Context)
		GetAllNewsDetail(ctx *gin.Context)

		// User Motivation
		CreateUserMotivation(ctx *gin.Context)
		GetAllUserMotivation(ctx *gin.Context)

		// Chat
		Chat(ctx *gin.Context)
	}

	UserHandler struct {
		userService   service.IUserService
		masterService service.IMasterService
	}
)

func NewUserHandler(userService service.IUserService, masterService service.IMasterService) *UserHandler {
	return &UserHandler{
		userService:   userService,
		masterService: masterService,
	}
}

// Authentication
func (uh *UserHandler) Register(ctx *gin.Context) {
	var payload dto.UserRegisterRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.Register(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_REGISTER_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_REGISTER_USER, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) Login(ctx *gin.Context) {
	var payload dto.UserLoginRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.Login(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LOGIN_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LOGIN_USER, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) RefreshToken(ctx *gin.Context) {
	var payload dto.RefreshTokenRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.RefreshToken(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_REFRESH_TOKEN, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_REFRESH_TOKEN, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}

// Forgot Password
func (uh *UserHandler) SendForgotPasswordEmail(ctx *gin.Context) {
	var payload dto.SendForgotPasswordEmailRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	err := uh.userService.SendForgotPasswordEmail(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_SEND_FORGOT_PASSWORD_EMAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_SEND_FORGOT_PASSWORD_EMAIL, nil)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) ForgotPassword(ctx *gin.Context) {
	var payload dto.ForgotPasswordRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.ForgotPassword(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CHECK_FORGOT_PASSWORD_TOKEN, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CHECK_FORGOT_PASSWORD_TOKEN, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) UpdatePassword(ctx *gin.Context) {
	var payload dto.UpdatePasswordRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.UpdatePassword(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_PASSWORD, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_PASSWORD, result)
	ctx.JSON(http.StatusOK, res)
}

// Verification Email
func (uh *UserHandler) SendVerificationEmail(ctx *gin.Context) {
	var payload dto.SendVerificationEmailRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	err := uh.userService.SendVerificationEmail(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_SEND_VERIFICATION_EMAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_SEND_VERIFICATION_EMAIL, nil)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) VerifyEmail(ctx *gin.Context) {
	var payload dto.VerifyEmailRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.VerifyEmail(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_VERIFY_EMAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_VERIFY_EMAIL, result)
	ctx.JSON(http.StatusOK, res)
}

// User
func (uh *UserHandler) GetDetailUser(ctx *gin.Context) {
	result, err := uh.userService.GetDetailUser(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_USER, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) UpdateUser(ctx *gin.Context) {
	payload := dto.UpdateUserRequest{}
	payload.Name = ctx.PostForm("name")
	payload.Email = ctx.PostForm("email")
	fileHeader, err := ctx.FormFile("image")
	if err == nil {
		file, err := fileHeader.Open()
		if err != nil {
			res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_OPEN_PHOTO, err.Error(), nil)
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
			return
		}
		defer file.Close()

		payload.FileHeader = fileHeader
		payload.FileReader = file
	}
	genderStr := ctx.PostForm("gender")
	if genderStr != "" {
		g := genderStr == "true"
		payload.Gender = &g
	}
	payload.Birthdate = ctx.PostForm("birth_date")
	payload.PhoneNumber = ctx.PostForm("phone_number")
	cityIDStr := ctx.PostForm("city_id")
	if cityIDStr != "" {
		if cityUUID, err := uuid.Parse(cityIDStr); err == nil {
			payload.CityID = &cityUUID
		}
	}
	roleIDStr := ctx.PostForm("role_id")
	if roleIDStr != "" {
		if roleUUID, err := uuid.Parse(roleIDStr); err == nil {
			payload.RoleID = &roleUUID
		}
	}
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.UpdateUser(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_USER, result)
	ctx.JSON(http.StatusOK, res)
}

// News
func (uh *UserHandler) GetAllNews(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.GetAllNewsWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_NEWS,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetDetailNews(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := uh.userService.GetDetailNews(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_NEWS, result)
	ctx.JSON(http.StatusOK, res)
}

// Motivation
func (uh *UserHandler) GetAllMotivation(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.GetAllMotivationWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_MOTIVATION,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetDetailMotivation(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := uh.userService.GetDetailMotivation(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}

// Consultation
func (uh *UserHandler) CreateConsultation(ctx *gin.Context) {
	var payload dto.CreateConsultationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.CreateConsultation(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_CONSULTATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_CONSULTATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetAllConsultation(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.GetAllConsultationWithPagination(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_CONSULTATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_CONSULTATION,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetDetailConsultation(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := uh.userService.GetDetailConsultation(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_CONSULTATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_CONSULTATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) UpdateConsultation(ctx *gin.Context) {
	var payload dto.UpdateConsultationRequestForUser
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	idStr := ctx.Param("id")
	result, err := uh.userService.UpdateConsultation(ctx, payload, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CONSULTATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_CONSULTATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) DeleteConsultation(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := uh.userService.DeleteConsultation(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_CONSULTATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_CONSULTATION, result)
	ctx.JSON(http.StatusOK, res)
}

// Psycholog
func (uh *UserHandler) GetAllPsycholog(ctx *gin.Context) {
	filter := dto.PsychologFilter{
		Name:           ctx.Query("name"),
		City:           ctx.Query("city"),
		Province:       ctx.Query("province"),
		Specialization: ctx.Query("specialization"),
	}

	result, err := uh.userService.GetAllPsycholog(ctx, filter)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_LIST_PSYCHOLOG, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetDetailPsycholog(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := uh.userService.GetDetailPsycholog(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_PSYCHOLOG, result)
	ctx.JSON(http.StatusOK, res)
}

// Practice
func (uh *UserHandler) GetAllPractice(ctx *gin.Context) {
	idStr := ctx.Param("psyID")
	result, err := uh.userService.GetAllPractice(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_PRACTICE, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_LIST_PRACTICE, result)
	ctx.JSON(http.StatusOK, res)
}

// Available Slot
func (uh *UserHandler) GetAllAvailableSlot(ctx *gin.Context) {
	idStr := ctx.Param("psyID")
	result, err := uh.userService.GetAllAvailableSlot(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_AVAILABLE_SLOT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_LIST_AVAILABLE_SLOT, result)
	ctx.JSON(http.StatusOK, res)
}

// News Detail
func (uh *UserHandler) CreateNewsDetail(ctx *gin.Context) {
	var payload dto.CreateNewsDetailRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.CreateNewsDetail(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_NEWS_DETAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_NEWS_DETAIL, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetAllNewsDetail(ctx *gin.Context) {
	result, err := uh.userService.GetAllNewsDetail(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_NEWS_DETAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_LIST_NEWS_DETAIL, result)
	ctx.JSON(http.StatusOK, res)
}

// User Motivation
func (uh *UserHandler) CreateUserMotivation(ctx *gin.Context) {
	var payload dto.CreateUserMotivationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := uh.userService.CreateUserMotivation(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_USER_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_USER_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (uh *UserHandler) GetAllUserMotivation(ctx *gin.Context) {
	result, err := uh.userService.GetAllUserMotivation(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_USER_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_LIST_USER_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}

// Chat
func (uh *UserHandler) Chat(ctx *gin.Context) {
	var req dto.ChatRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil))
		return
	}

	result, err := uh.userService.HandleChat(ctx, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.BuildResponseFailed(dto.MESSAGE_FAILED_HANDLE_CHAT, err.Error(), nil))
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_HANDLE_CHAT, result)
	ctx.JSON(http.StatusOK, res)
}
