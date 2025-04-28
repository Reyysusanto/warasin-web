package repository

import (
	"context"
	"math"
	"strings"

	"github.com/Reyysusanto/warasin-web/backend/dto"
	"github.com/Reyysusanto/warasin-web/backend/entity"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type (
	IAdminRepository interface {
		CheckEmail(ctx context.Context, tx *gorm.DB, email string) (entity.User, bool, error)
		GetAllUserWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.AllUserRepositoryResponse, error)
		GetUserByID(ctx context.Context, tx *gorm.DB, userID string) (entity.User, error)
		GetRoleByID(ctx context.Context, tx *gorm.DB, roleID string) (entity.Role, error)
		GetPermissionsByRoleID(ctx context.Context, tx *gorm.DB, roleID string) ([]string, error)
		DeleteUserByID(ctx context.Context, tx *gorm.DB, userID string) error
		GetCityByID(ctx context.Context, tx *gorm.DB, cityID string) (entity.City, error)
		UpdateUser(ctx context.Context, tx *gorm.DB, user entity.User) (entity.User, error)
	}

	AdminRepository struct {
		db *gorm.DB
	}
)

func NewAdminRepository(db *gorm.DB) *AdminRepository {
	return &AdminRepository{
		db: db,
	}
}

func (ar *AdminRepository) CheckEmail(ctx context.Context, tx *gorm.DB, email string) (entity.User, bool, error) {
	if tx == nil {
		tx = ar.db
	}

	var user entity.User
	if err := tx.WithContext(ctx).Preload("Role").Preload("City").Where("email = ?", email).Take(&user).Error; err != nil {
		return entity.User{}, false, err
	}

	return user, true, nil
}

func (ar *AdminRepository) GetAllUserWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.AllUserRepositoryResponse, error) {
	if tx == nil {
		tx = ar.db
	}

	var users []entity.User
	var err error
	var count int64

	if req.PerPage == 0 {
		req.PerPage = 10
	}

	if req.Page == 0 {
		req.Page = 1
	}

	var adminIDs []uuid.UUID
	if err := tx.WithContext(ctx).Model(&entity.Role{}).Where("name != ?", "admin").Pluck("id", &adminIDs).Error; err != nil {
		return dto.AllUserRepositoryResponse{}, err
	}

	query := tx.WithContext(ctx).Model(&entity.User{}).Where("role_id IN (?)", adminIDs)

	if req.Search != "" {
		searchValue := "%" + strings.ToLower(req.Search) + "%"
		query = query.Where("LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(phone_number) LIKE ?",
			searchValue, searchValue, searchValue)
	}

	query = query.Preload("City.Province").Preload("Role")

	if err := query.Count(&count).Error; err != nil {
		return dto.AllUserRepositoryResponse{}, err
	}

	if err := query.Order("created_at DESC").Scopes(Paginate(req.Page, req.PerPage)).Find(&users).Error; err != nil {
		return dto.AllUserRepositoryResponse{}, err
	}

	totalPage := int64(math.Ceil(float64(count) / float64(req.PerPage)))

	return dto.AllUserRepositoryResponse{
		Users: users,
		PaginationResponse: dto.PaginationResponse{
			Page:    req.Page,
			PerPage: req.PerPage,
			MaxPage: totalPage,
			Count:   count,
		},
	}, err
}

func (ar *AdminRepository) GetUserByID(ctx context.Context, tx *gorm.DB, userID string) (entity.User, error) {
	if tx == nil {
		tx = ar.db
	}

	var user entity.User
	if err := tx.WithContext(ctx).Preload("City.Province").Preload("Role").Where("id = ?", userID).Take(&user).Error; err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (ar *AdminRepository) GetRoleByID(ctx context.Context, tx *gorm.DB, roleID string) (entity.Role, error) {
	if tx == nil {
		tx = ar.db
	}

	var role entity.Role
	if err := tx.WithContext(ctx).Where("id = ?", roleID).Take(&role).Error; err != nil {
		return entity.Role{}, err
	}

	return role, nil
}

func (ar *AdminRepository) GetPermissionsByRoleID(ctx context.Context, tx *gorm.DB, roleID string) ([]string, error) {
	if tx == nil {
		tx = ar.db
	}

	var endpoints []string
	if err := tx.WithContext(ctx).Table("permissions").Where("role_id = ?", roleID).Pluck("endpoint", &endpoints).Error; err != nil {
		return []string{}, err
	}

	return endpoints, nil
}

func (ar AdminRepository) DeleteUserByID(ctx context.Context, tx *gorm.DB, userID string) error {
	if tx == nil {
		tx = ar.db
	}

	return tx.WithContext(ctx).Where("id = ?", userID).Delete(&entity.User{}).Error
}

func (ar *AdminRepository) GetCityByID(ctx context.Context, tx *gorm.DB, cityID string) (entity.City, error) {
	if tx == nil {
		tx = ar.db
	}

	var city entity.City
	if err := tx.WithContext(ctx).Preload("Province").Where("id = ?", cityID).Take(&city).Error; err != nil {
		return entity.City{}, err
	}

	return city, nil
}

func (ar *AdminRepository) UpdateUser(ctx context.Context, tx *gorm.DB, user entity.User) (entity.User, error) {
	if tx == nil {
		tx = ar.db
	}

	if err := tx.WithContext(ctx).
		Model(&entity.User{}).
		Where("id = ?", user.ID).
		Updates(user).Error; err != nil {
		return entity.User{}, err
	}

	var updatedUser entity.User
	if err := tx.WithContext(ctx).
		Preload("City.Province").
		Preload("Role").
		Where("id = ?", user.ID).
		Take(&updatedUser).Error; err != nil {
		return entity.User{}, err
	}

	return updatedUser, nil
}
