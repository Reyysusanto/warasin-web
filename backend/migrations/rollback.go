package migrations

import (
	"github.com/Reyysusanto/warasin-web/backend/entity"
	"gorm.io/gorm"
)

func Rollback(db *gorm.DB) error {
	tables := []interface{}{
		&entity.AvailableSlot{},
		&entity.PracticeSchedule{},
		&entity.Practice{},

		&entity.PsychologSpecialization{},
		&entity.SpecializationDetail{},
		&entity.Specialization{},

		&entity.PsychologLanguage{},
		&entity.LanguageMaster{},

		&entity.NewsDetail{},
		&entity.News{},

		&entity.UserMotivation{},
		&entity.Motivation{},
		&entity.MotivationCategory{},

		&entity.Education{},
		&entity.Consulation{},
		&entity.Psycholog{},
		&entity.User{},
		&entity.City{},
	}

	for _, table := range tables {
		if err := db.Migrator().DropTable(table); err != nil {
			return err
		}
	}

	return nil
}
