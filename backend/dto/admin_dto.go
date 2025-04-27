package dto

import (
	"errors"

	"github.com/Reyysusanto/warasin-web/backend/entity"
	"github.com/google/uuid"
)

const (
	// failed
	MESSAGE_FAILED_DELETE_USER = "failed delete user"

	// success
	MESSAGE_SUCCESS_DELETE_USER = "success delete user"
)

var (
	ErrGetPermissionsByRoleID = errors.New("failed get all permission by role id")
	ErrGetDataUserFromID      = errors.New("failed get data user by id")
	ErrDeleteUserByID         = errors.New("failed delete user by id")
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
		Data []AllUserResponse `json:"data"`
		PaginationResponse
	}

	AllUserRepositoryResponse struct {
		Users []entity.User
		PaginationResponse
	}

	DeleteUserRequest struct {
		UserID uuid.UUID `json:"user_id"`
	}

	DeleteUserResponse struct {
		User entity.User `json:"user"`
	}
)
