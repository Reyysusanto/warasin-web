package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PracticeSchedule struct {
	ID    uuid.UUID `gorm:"type:uuid;primaryKey" json:"prac_sched_id"`
	Day   string    `json:"prac_sched_day"`
	Open  time.Time `json:"prac_sched_open"`
	Close time.Time `json:"prac_sched_close"`

	PracticeID uuid.UUID `gorm:"type:uuid" json:"prac_id"`
	Practice   Practice  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

	TimeStamp
}

func (ps *PracticeSchedule) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	ps.ID = uuid.New()

	return nil
}
