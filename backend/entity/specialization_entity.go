package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Specialization struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"spe_id"`
	Name        string    `json:"spe_name"`
	Description string    `json:"spe_desc"`

	SpecializationDetails    []SpecializationDetail    `gorm:"foreignKey:SpecializationID"`
	PsychologSpecializations []PsychologSpecialization `gorm:"foreignKey:SpecializationID"`

	TimeStamp
}

func (s *Specialization) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	s.ID = uuid.New()

	return nil
}
