package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Education struct {
	ID             uuid.UUID `gorm:"type:uuid;primaryKey" json:"edu_id"`
	Degree         string    `json:"edu_degree"`
	Major          string    `json:"edu_major"`
	Institution    string    `json:"edu_institution"`
	GraduationYear string    `json:"edu_graduation_year"`

	PsychologID uuid.UUID `gorm:"type:uuid" json:"psy_id"`
	Psycholog   Psycholog `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

	TimeStamp
}

func (e *Education) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	e.ID = uuid.New()

	return nil
}
