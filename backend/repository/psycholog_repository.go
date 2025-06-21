package repository

import (
	"context"
	"math"

	"github.com/Reyysusanto/warasin-web/backend/dto"
	"github.com/Reyysusanto/warasin-web/backend/entity"
	"gorm.io/gorm"
)

type (
	IPsychologRepository interface {
		// GET / Read
		GetPermissionsByRoleID(ctx context.Context, tx *gorm.DB, roleID string) ([]string, bool, error)
		GetRoleByID(ctx context.Context, tx *gorm.DB, roleID string) (entity.Role, bool, error)
		GetAllPractice(ctx context.Context, tx *gorm.DB, psyID string) (dto.AllPracticeRepositoryResponse, error)
		GetAllAvailableSlot(ctx context.Context, tx *gorm.DB, psyID string) (dto.AllAvailableSlotRepositoryResponse, error)
		GetAllConsultationWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest, psychologID string) (dto.AllConsultationRepositoryResponse, error)
		GetPracticeByID(ctx context.Context, tx *gorm.DB, practiceID string) (entity.Practice, bool, error)
		GetConsultationByID(ctx context.Context, tx *gorm.DB, consulID string) (entity.Consultation, bool, error)
		GetPsychologByID(ctx context.Context, tx *gorm.DB, psyID string) (entity.Psycholog, bool, error)

		// POST / Create
		CreatePractice(ctx context.Context, tx *gorm.DB, practice entity.Practice) error
		CreatePracticeSchedule(ctx context.Context, tx *gorm.DB, schedules []entity.PracticeSchedule) error
		CreateAvailableSlots(ctx context.Context, tx *gorm.DB, slots []entity.AvailableSlot) error

		// PATCH / Update
		UpdatePractice(ctx context.Context, tx *gorm.DB, practice entity.Practice) error
		UpdateConsultation(ctx context.Context, tx *gorm.DB, consultation entity.Consultation) error

		// DELETE / Delete
		DeletePracticeSchedule(ctx context.Context, tx *gorm.DB, practiceID string) error
		DeletePracticeByID(ctx context.Context, tx *gorm.DB, practiceID string) error
	}

	PsychologRepository struct {
		db *gorm.DB
	}
)

func NewPsychologRepository(db *gorm.DB) *PsychologRepository {
	return &PsychologRepository{
		db: db,
	}
}

// Get
func (pr *PsychologRepository) GetPermissionsByRoleID(ctx context.Context, tx *gorm.DB, roleID string) ([]string, bool, error) {
	if tx == nil {
		tx = pr.db
	}

	var endpoints []string
	if err := tx.WithContext(ctx).Table("permissions").Where("role_id = ?", roleID).Pluck("endpoint", &endpoints).Error; err != nil {
		return []string{}, false, err
	}

	return endpoints, true, nil
}
func (pr *PsychologRepository) GetRoleByID(ctx context.Context, tx *gorm.DB, roleID string) (entity.Role, bool, error) {
	if tx == nil {
		tx = pr.db
	}

	var role entity.Role
	if err := tx.WithContext(ctx).Where("id = ?", roleID).Take(&role).Error; err != nil {
		return entity.Role{}, false, err
	}

	return role, true, nil
}
func (pr *PsychologRepository) GetAllPractice(ctx context.Context, tx *gorm.DB, psyID string) (dto.AllPracticeRepositoryResponse, error) {
	if tx == nil {
		tx = pr.db
	}

	var (
		practices []entity.Practice
		err       error
	)

	query := tx.WithContext(ctx).Model(&entity.Practice{}).Where("psycholog_id = ?", psyID).
		Preload("Psycholog.Role").
		Preload("Psycholog.City.Province").
		Preload("PracticeSchedules")

	if err := query.Order("created_at DESC").Find(&practices).Error; err != nil {
		return dto.AllPracticeRepositoryResponse{}, err
	}

	return dto.AllPracticeRepositoryResponse{
		Practices: practices,
	}, err
}
func (pr *PsychologRepository) GetAllAvailableSlot(ctx context.Context, tx *gorm.DB, psyID string) (dto.AllAvailableSlotRepositoryResponse, error) {
	if tx == nil {
		tx = pr.db
	}

	var (
		availableSlots []entity.AvailableSlot
		err            error
	)

	query := tx.WithContext(ctx).Model(&entity.AvailableSlot{}).Where("psycholog_id = ?", psyID).
		Preload("Psycholog.Role").
		Preload("Psycholog.City.Province")

	if err := query.Order("created_at DESC").Find(&availableSlots).Error; err != nil {
		return dto.AllAvailableSlotRepositoryResponse{}, err
	}

	return dto.AllAvailableSlotRepositoryResponse{
		AvailableSlots: availableSlots,
	}, err
}
func (pr *PsychologRepository) GetAllConsultationWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest, psychologID string) (dto.AllConsultationRepositoryResponse, error) {
	if tx == nil {
		tx = pr.db
	}

	var consultations []entity.Consultation
	var err error
	var count int64

	if req.PerPage == 0 {
		req.PerPage = 10
	}

	if req.Page == 0 {
		req.Page = 1
	}

	query := tx.WithContext(ctx).Model(&entity.Consultation{}).Where("available_slots.psycholog_id = ?", &psychologID).
		Joins("JOIN available_slots ON consultations.available_slot_id = available_slots.id").
		Preload("User.Role").
		Preload("User.City.Province").
		Preload("AvailableSlot.Psycholog.Role").
		Preload("AvailableSlot.Psycholog.City.Province").
		Preload("AvailableSlot.Psycholog.PsychologLanguages.LanguageMaster").
		Preload("AvailableSlot.Psycholog.PsychologSpecializations.Specialization").
		Preload("AvailableSlot.Psycholog.Educations").
		Preload("Practice.PracticeSchedules")

	if err := query.Count(&count).Error; err != nil {
		return dto.AllConsultationRepositoryResponse{}, err
	}

	if err := query.Order("created_at DESC").Scopes(Paginate(req.Page, req.PerPage)).Find(&consultations).Error; err != nil {
		return dto.AllConsultationRepositoryResponse{}, err
	}

	totalPage := int64(math.Ceil(float64(count) / float64(req.PerPage)))

	return dto.AllConsultationRepositoryResponse{
		Consultations: consultations,
		PaginationResponse: dto.PaginationResponse{
			Page:    req.Page,
			PerPage: req.PerPage,
			MaxPage: totalPage,
			Count:   count,
		},
	}, err
}
func (pr *PsychologRepository) GetPracticeByID(ctx context.Context, tx *gorm.DB, practiceID string) (entity.Practice, bool, error) {
	if tx == nil {
		tx = pr.db
	}

	query := tx.WithContext(ctx).Model(&entity.Practice{}).Preload("PracticeSchedules")

	var practice entity.Practice
	if err := query.Where("id = ?", practiceID).Take(&practice).Error; err != nil {
		return entity.Practice{}, false, err
	}

	return practice, true, nil
}
func (pr *PsychologRepository) GetConsultationByID(ctx context.Context, tx *gorm.DB, consulID string) (entity.Consultation, bool, error) {
	if tx == nil {
		tx = pr.db
	}

	query := tx.WithContext(ctx).Model(&entity.Consultation{}).
		Preload("User.Role").
		Preload("User.City.Province").
		Preload("AvailableSlot.Psycholog.Role").
		Preload("AvailableSlot.Psycholog.City.Province").
		Preload("AvailableSlot.Psycholog.PsychologLanguages.LanguageMaster").
		Preload("AvailableSlot.Psycholog.PsychologSpecializations.Specialization").
		Preload("AvailableSlot.Psycholog.Educations").
		Preload("Practice.PracticeSchedules")

	var consultation entity.Consultation
	if err := query.Where("id = ?", consulID).Take(&consultation).Error; err != nil {
		return entity.Consultation{}, false, err
	}

	return consultation, true, nil
}
func (pr *PsychologRepository) GetPsychologByID(ctx context.Context, tx *gorm.DB, psyID string) (entity.Psycholog, bool, error) {
	if tx == nil {
		tx = pr.db
	}

	query := tx.WithContext(ctx).Model(&entity.Psycholog{}).
		Preload("Role").
		Preload("City.Province").
		Preload("PsychologLanguages.LanguageMaster").
		Preload("PsychologSpecializations.Specialization").
		Preload("Educations")

	var psy entity.Psycholog
	if err := query.Where("id = ?", psyID).Take(&psy).Error; err != nil {
		return entity.Psycholog{}, false, err
	}

	return psy, true, nil
}

// Post / Create
func (pr *PsychologRepository) CreatePractice(ctx context.Context, tx *gorm.DB, practice entity.Practice) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Create(&practice).Error
}
func (pr *PsychologRepository) CreatePracticeSchedule(ctx context.Context, tx *gorm.DB, schedules []entity.PracticeSchedule) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Create(&schedules).Error
}
func (pr *PsychologRepository) CreateAvailableSlots(ctx context.Context, tx *gorm.DB, slots []entity.AvailableSlot) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Create(&slots).Error
}

// PATCH / Update
func (pr *PsychologRepository) UpdatePractice(ctx context.Context, tx *gorm.DB, practice entity.Practice) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Where("id = ?", practice.ID).Updates(&practice).Error
}
func (pr *PsychologRepository) UpdateConsultation(ctx context.Context, tx *gorm.DB, consultation entity.Consultation) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Where("id = ?", consultation.ID).Updates(&consultation).Error
}

// DELETE / Delete
func (pr *PsychologRepository) DeletePracticeSchedule(ctx context.Context, tx *gorm.DB, practiceID string) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Where("practice_id = ?", practiceID).Delete(&entity.PracticeSchedule{}).Error
}
func (pr *PsychologRepository) DeletePracticeByID(ctx context.Context, tx *gorm.DB, practiceID string) error {
	if tx == nil {
		tx = pr.db
	}

	return tx.WithContext(ctx).Where("id = ?", practiceID).Delete(&entity.Practice{}).Error
}
