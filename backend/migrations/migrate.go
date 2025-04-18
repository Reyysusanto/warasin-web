package migrations

import (
	"github.com/Reyysusanto/warasin-web/backend/entity"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&entity.City{},
		&entity.User{},
		&entity.Psycholog{},
		&entity.Consulation{},
		&entity.Education{},

		&entity.MotivationCategory{},
		&entity.Motivation{},
		&entity.UserMotivation{},

		&entity.News{},
		&entity.NewsDetail{},

		&entity.LanguageMaster{},
		&entity.PsychologLanguage{},

		&entity.Specialization{},
		&entity.SpecializationDetail{},
		&entity.PsychologSpecialization{},

		&entity.Practice{},
		&entity.PracticeSchedule{},
		&entity.AvailableSlot{},
	); err != nil {
		return err
	}

	return nil
}
