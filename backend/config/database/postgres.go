package database

import (
	"fmt"
	"log"
	"os"

	"github.com/Reyysusanto/warasin-web/backend/constants"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBConnector interface {
	Connect(dsn string) (*gorm.DB, error)
}

type RealDB struct{}

func (r *RealDB) Connect(dsn string) (*gorm.DB, error) {
	return gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
}

type DatabaseConnectionManager struct {
	DBConnector DBConnector
}

func NewDatabaseConnectionManager(dbConnector DBConnector) *DatabaseConnectionManager {
	return &DatabaseConnectionManager{DBConnector: dbConnector}
}

func (d *DatabaseConnectionManager) SetUpPostgreSQLConnection() *gorm.DB {
	if os.Getenv("APP_ENV") != constants.ENUM_RUN_PRODUCTION {
		if _, err := os.Stat(".env"); err == nil {
			if err := godotenv.Load(".env"); err != nil {
				log.Fatalf("Failed to load .env file: %v", err)
			}
		}
	}

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v TimeZone=Asia/Jakarta", dbHost, dbUser, dbPass, dbName, dbPort)

	db, err := d.DBConnector.Connect(dsn)
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %v", err))
	}

	return db
}

func ClosePostgreSQLConnection(db *gorm.DB) {
	dbSQL, err := db.DB()
	if err != nil {
		log.Fatalf("Error getting database connection: %v", err)
	}

	if err := dbSQL.Close(); err != nil {
		log.Fatalf("Error closing database connection: %v", err)
	}

	log.Println("Postgres connection closed successfully")
}
