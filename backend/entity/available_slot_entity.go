package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AvailableSlot struct {
	ID       uuid.UUID `gorm:"type:uuid;primaryKey" json:"slot_id"`
	Date     string    `gorm:"type:date" json:"slot_date"`
	Start    time.Time `json:"slot_start"`
	End      time.Time `json:"slot_end"`
	IsBooked bool      `json:"slot_is_booked"`

	PracticeID uuid.UUID `gorm:"type:uuid" json:"prac_id"`
	Practice   Practice  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

	TimeStamp
}

func (as *AvailableSlot) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	as.ID = uuid.New()

	return nil
}
