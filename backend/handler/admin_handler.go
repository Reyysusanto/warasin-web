package handler

import (
	"fmt"
	"net/http"

	"github.com/Reyysusanto/warasin-web/backend/dto"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/Reyysusanto/warasin-web/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type (
	IAdminHandler interface {
		// Authentication
		Login(ctx *gin.Context)
		RefreshToken(ctx *gin.Context)

		// Role
		GetAllRole(ctx *gin.Context)

		// User
		CreateUser(ctx *gin.Context)
		GetAllUser(ctx *gin.Context)
		GetDetailUser(ctx *gin.Context)
		UpdateUser(ctx *gin.Context)
		DeleteUser(ctx *gin.Context)

		// News
		CreateNews(ctx *gin.Context)
		GetAllNews(ctx *gin.Context)
		GetDetailNews(ctx *gin.Context)
		UpdateNews(ctx *gin.Context)
		DeleteNews(ctx *gin.Context)

		// Motivation Category
		CreateMotivationCategory(ctx *gin.Context)
		GetAllMotivationCategory(ctx *gin.Context)
		GetDetailMotivationCategory(ctx *gin.Context)
		UpdateMotivationCategory(ctx *gin.Context)
		DeleteMotivationCategory(ctx *gin.Context)

		// Motivation
		CreateMotivation(ctx *gin.Context)
		GetAllMotivation(ctx *gin.Context)
		GetDetailMotivation(ctx *gin.Context)
		UpdateMotivation(ctx *gin.Context)
		DeleteMotivation(ctx *gin.Context)

		// Psycholog
		CreatePsycholog(ctx *gin.Context)
		GetAllPsycholog(ctx *gin.Context)
		UpdatePsycholog(ctx *gin.Context)
		DeletePsycholog(ctx *gin.Context)

		// User Motivation
		GetAllUserMotivation(ctx *gin.Context)

		// User News
		GetAllUserNews(ctx *gin.Context)

		// Language Master
		GetAllLanguageMaster(ctx *gin.Context)

		// Specialization
		GetAllSpecialization(ctx *gin.Context)
	}

	AdminHandler struct {
		adminService  service.IAdminService
		masterService service.IMasterService
	}
)

func NewAdminHandler(adminService service.IAdminService, masterService service.IMasterService) *AdminHandler {
	return &AdminHandler{
		adminService:  adminService,
		masterService: masterService,
	}
}

// Authentication
func (ah *AdminHandler) Login(ctx *gin.Context) {
	var payload dto.AdminLoginRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.Login(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_LOGIN_ADMIN, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_LOGIN_ADMIN, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) RefreshToken(ctx *gin.Context) {
	var payload dto.RefreshTokenRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.RefreshToken(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_REFRESH_TOKEN, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_REFRESH_TOKEN, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}

// Role
func (ah *AdminHandler) GetAllRole(ctx *gin.Context) {
	result, err := ah.adminService.GetAllRole(ctx.Request.Context())
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_ROLE, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_ROLE,
		Data:     result.Data,
	}

	ctx.JSON(http.StatusOK, res)
}

// User
func (ah *AdminHandler) CreateUser(ctx *gin.Context) {
	payload := dto.CreateUserRequest{}
	payload.Name = ctx.PostForm("name")
	payload.Email = ctx.PostForm("email")
	payload.Password = ctx.PostForm("password")
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
	if cityUUID, err := uuid.Parse(cityIDStr); err == nil {
		payload.CityID = &cityUUID
	}
	roleIDStr := ctx.PostForm("role_id")
	if roleUUID, err := uuid.Parse(roleIDStr); err == nil {
		payload.RoleID = &roleUUID
	}
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.CreateUser(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_USER, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetAllUser(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllUserWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_USER,
		Meta:     result.PaginationResponse,
		Data:     result.Data,
	}

	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetDetailUser(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := ah.adminService.GetDetailUser(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_USER, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) UpdateUser(ctx *gin.Context) {
	payload := dto.UpdateUserRequest{}
	idStr := ctx.Param("id")
	payload.ID = idStr
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

	result, err := ah.adminService.UpdateUser(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_USER, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) DeleteUser(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.DeleteUserRequest
	payload.UserID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.DeleteUser(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_USER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_USER, result)
	ctx.JSON(http.StatusOK, res)
}

// News
func (ah *AdminHandler) CreateNews(ctx *gin.Context) {
	payload := dto.CreateNewsRequest{}
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
	payload.Title = ctx.PostForm("title")
	payload.Body = ctx.PostForm("body")
	payload.Date = ctx.PostForm("date")
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.CreateNews(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_NEWS, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetAllNews(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllNewsWithPagination(ctx.Request.Context(), payload)
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
func (ah *AdminHandler) GetDetailNews(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := ah.adminService.GetDetailNews(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_NEWS, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) UpdateNews(ctx *gin.Context) {
	payload := dto.UpdateNewsRequest{}
	idStr := ctx.Param("id")
	payload.ID = idStr
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
	payload.Title = ctx.PostForm("title")
	payload.Body = ctx.PostForm("body")
	payload.Date = ctx.PostForm("date")
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.UpdateNews(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_NEWS, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) DeleteNews(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.DeleteNewsRequest
	payload.NewsID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.DeleteNews(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_NEWS, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_NEWS, result)
	ctx.JSON(http.StatusOK, res)
}

// Motivation Category
func (ah *AdminHandler) CreateMotivationCategory(ctx *gin.Context) {
	var payload dto.CreateMotivationCategoryRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.CreateMotivationCategory(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_MOTIVATION_CATEGORY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_MOTIVATION_CATEGORY, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetAllMotivationCategory(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllMotivationCategoryWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_MOTIVATION_CATEGORY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_MOTIVATION_CATEGORY,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetDetailMotivationCategory(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := ah.adminService.GetDetailMotivationCategory(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_MOTIVATION_CATEGORY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_MOTIVATION_CATEGORY, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) UpdateMotivationCategory(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.UpdateMotivationCategoryRequest
	payload.ID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.UpdateMotivationCategory(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_MOTIVATION_CATEGORY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_MOTIVATION_CATEGORY, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) DeleteMotivationCategory(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.DeleteMotivationCategoryRequest
	payload.MotivationCategoryID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.DeleteMotivationCategory(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_MOTIVATION_CATEGORY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_MOTIVATION_CATEGORY, result)
	ctx.JSON(http.StatusOK, res)
}

// Motivation
func (ah *AdminHandler) CreateMotivation(ctx *gin.Context) {
	var payload dto.CreateMotivationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.CreateMotivation(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_MOTIVATION, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetAllMotivation(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllMotivationWithPagination(ctx.Request.Context(), payload)
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
func (ah *AdminHandler) GetDetailMotivation(ctx *gin.Context) {
	idStr := ctx.Param("id")
	result, err := ah.adminService.GetDetailMotivation(ctx, idStr)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) UpdateMotivation(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.UpdateMotivationRequest
	payload.ID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.UpdateMotivation(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) DeleteMotivation(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.DeleteMotivationRequest
	payload.ID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.DeleteMotivation(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_MOTIVATION, result)
	ctx.JSON(http.StatusOK, res)
}

// Psycholog
func (ah *AdminHandler) CreatePsycholog(ctx *gin.Context) {
	payload := dto.CreatePsychologRequest{}
	payload.Name = ctx.PostForm("name")
	payload.STRNumber = ctx.PostForm("str_number")
	payload.Email = ctx.PostForm("email")
	payload.Password = ctx.PostForm("password")
	payload.WorkYear = ctx.PostForm("work_year")
	payload.Description = ctx.PostForm("description")
	payload.PhoneNumber = ctx.PostForm("phone_number")
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
	cityIDStr := ctx.PostForm("city_id")
	if cityUUID, err := uuid.Parse(cityIDStr); err == nil {
		payload.CityID = &cityUUID
	}
	roleIDStr := ctx.PostForm("role_id")
	if roleUUID, err := uuid.Parse(roleIDStr); err == nil {
		payload.RoleID = &roleUUID
	}
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.CreatePsycholog(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_PSYCHOLOG, result)
	ctx.AbortWithStatusJSON(http.StatusOK, res)
}
func (ah *AdminHandler) GetAllPsycholog(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllPsychologWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_PSYCHOLOG,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) UpdatePsycholog(ctx *gin.Context) {
	err := ctx.Request.ParseMultipartForm(10 << 20)
	if err != nil {
		res := utils.BuildResponseFailed("Failed to parse multipart form", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	form := ctx.Request.MultipartForm
	payload := dto.UpdatePsychologRequest{}
	payload.ID = ctx.Param("id")

	payload.Name = ctx.PostForm("name")
	payload.STRNumber = ctx.PostForm("str_number")
	payload.Email = ctx.PostForm("email")
	payload.WorkYear = ctx.PostForm("work_year")
	payload.Description = ctx.PostForm("description")
	payload.PhoneNumber = ctx.PostForm("phone_number")

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

	if cityIDStr := ctx.PostForm("city_id"); cityIDStr != "" {
		if cityUUID, err := uuid.Parse(cityIDStr); err == nil {
			payload.CityID = &cityUUID
		}
	}

	payload.LanguageMasterIDs = ctx.PostFormArray("language_master")

	payload.SpecializationIDs = ctx.PostFormArray("specialization")

	var educations []dto.EducationRequest
	for i := 0; ; i++ {
		prefix := fmt.Sprintf("education[%d].", i)
		degree := form.Value[prefix+"degree"]
		if len(degree) == 0 {
			break
		}
		educations = append(educations, dto.EducationRequest{
			Degree:         degree[0],
			Major:          form.Value[prefix+"major"][0],
			Institution:    form.Value[prefix+"institution"][0],
			GraduationYear: form.Value[prefix+"graduation_year"][0],
		})
	}
	payload.Educations = educations

	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.UpdatePsycholog(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_PSYCHOLOG, result)
	ctx.JSON(http.StatusOK, res)
}
func (ah *AdminHandler) DeletePsycholog(ctx *gin.Context) {
	idStr := ctx.Param("id")

	var payload dto.DeletePsychologRequest
	payload.ID = idStr
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.DeletePsycholog(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_PSYCHOLOG, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_PSYCHOLOG, result)
	ctx.JSON(http.StatusOK, res)
}

// User Motivation
func (ah *AdminHandler) GetAllUserMotivation(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllUserMotivationWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_PSYCHOLOG_LIST_USER_MOTIVATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_PSYCHOLOG_LIST_USER_MOTIVATION,
		Meta:     result.PaginationResponse,
		Data:     result.Data,
	}

	ctx.JSON(http.StatusOK, res)
}

// User News
func (ah *AdminHandler) GetAllUserNews(ctx *gin.Context) {
	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ah.adminService.GetAllUserNewsWithPagination(ctx.Request.Context(), payload)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_LIST_NEWS_DETAIL, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: dto.MESSAGE_SUCCESS_GET_LIST_NEWS_DETAIL,
		Meta:     result.PaginationResponse,
		Data:     result.Data,
	}

	ctx.JSON(http.StatusOK, res)
}

// Language Master
func (ah *AdminHandler) GetAllLanguageMaster(ctx *gin.Context) {
	result, err := ah.adminService.GetAllLanguageMaster(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_ALL_LANGUAGE_MASTER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_ALL_LANGUAGE_MASTER, result)
	ctx.JSON(http.StatusOK, res)
}

// Specialization
func (ah *AdminHandler) GetAllSpecialization(ctx *gin.Context) {
	result, err := ah.adminService.GetAllSpecialization(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_ALL_SPECIALIZATION, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_ALL_SPECIALIZATION, result)
	ctx.JSON(http.StatusOK, res)
}
