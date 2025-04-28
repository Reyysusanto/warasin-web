package dto

import (
	"errors"
	"time"

	"github.com/Reyysusanto/warasin-web/backend/entity"
	"github.com/google/uuid"
)

const (
	// failed
	MESSAGE_FAILED_DELETE_USER = "failed delete user"
	MESSAGE_FAILED_UPDATE_USER = "failed update user"

	// success
	MESSAGE_SUCCESS_DELETE_USER = "success delete user"
	MESSAGE_SUCCESS_UPDATE_USER = "success update user"
)

var (
	ErrGetPermissionsByRoleID = errors.New("failed get all permission by role id")
	ErrGetDataUserFromID      = errors.New("failed get data user by id")
	ErrDeleteUserByID         = errors.New("failed delete user by id")
	ErrGetCityByID            = errors.New("failed get city by id")
	ErrFormatPhoneNumber      = errors.New("failed standarize phone number input")
)

type (
	AdminLoginRequest struct {
		Email    string `json:"email" form:"email"`
		Password string `json:"password" form:"password"`
	}

	AdminLoginResponse struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
	}

	UserPaginationResponse struct {
		PaginationResponse
		Data []AllUserResponse `json:"data"`
	}

	AllUserRepositoryResponse struct {
		PaginationResponse
		Users []entity.User
	}

	DeleteUserRequest struct {
		UserID uuid.UUID `json:"user_id"`
	}

	AllUserResponse struct {
		ID          uuid.UUID    `json:"user_id"`
		Name        string       `json:"user_name"`
		Email       string       `json:"user_email"`
		Password    string       `json:"user_password"`
		Birthdate   *time.Time   `gorm:"type:date" json:"user_birth_date,omitempty"`
		PhoneNumber string       `json:"user_phone_number,omitempty"`
		Data01      int          `json:"user_data01,omitempty"`
		Data02      int          `json:"user_data02,omitempty"`
		Data03      int          `json:"user_data03,omitempty"`
		IsVerified  bool         `json:"is_verified"`
		City        CityResponse `json:"city"`
		Role        RoleResponse `json:"role"`
	}

	UpdateUserRequest struct {
		ID          uuid.UUID  `gorm:"type:uuid" json:"id"`
		Name        string     `json:"name,omitempty"`
		Email       string     `json:"email,omitempty"`
		Birthdate   *time.Time `gorm:"type:date" json:"user_birth_date,omitempty"`
		PhoneNumber string     `json:"phone_number,omitempty"`
		CityID      *uuid.UUID `gorm:"type:uuid" json:"city_id,omitempty"`
		RoleID      *uuid.UUID `gorm:"type:uuid" json:"role_id,omitempty"`
	}

	ProvinceResponse struct {
		ID   *uuid.UUID `json:"province_id"`
		Name string     `json:"province_name"`
	}

	CityResponse struct {
		ID       *uuid.UUID       `json:"city_id"`
		Name     string           `json:"city_name"`
		Type     string           `json:"city_type"`
		Province ProvinceResponse `json:"province"`
	}

	RoleResponse struct {
		ID   *uuid.UUID `json:"role_id"`
		Name string     `json:"role_name"`
	}
)
