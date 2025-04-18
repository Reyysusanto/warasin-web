package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MotivationCategory struct {
	ID   uuid.UUID `gorm:"type:uuid;primaryKey" json:"mot_cat_id"`
	Name string    `json:"mot_cat_name"`

	Motivations []Motivation `gorm:"foreignKey:MotivationCategoryID"`

	TimeStamp
}

func (mc *MotivationCategory) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	mc.ID = uuid.New()

	return nil
}
