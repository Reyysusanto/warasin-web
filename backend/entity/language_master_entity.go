package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LanguageMaster struct {
	ID   uuid.UUID `gorm:"type:uuid;primaryKey" json:"lang_id"`
	Name string    `json:"lang_name"`

	PsychologLanguages []PsychologLanguage `gorm:"foreignKey:LanguageMasterID"`

	TimeStamp
}

func (lm *LanguageMaster) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
		}
	}()

	lm.ID = uuid.New()

	return nil
}
