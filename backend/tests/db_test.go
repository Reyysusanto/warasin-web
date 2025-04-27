package tests

import (
	"errors"
	"testing"

	"github.com/Reyysusanto/warasin-web/backend/config/database"
	"github.com/Reyysusanto/warasin-web/backend/tests/mocks"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestSetUpPostgreSQLConnection_Success(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockDB := mocks.NewMockDBConnector(ctrl)

	mockDB.EXPECT().Connect(gomock.Any()).Return(&gorm.DB{}, nil).Times(1)

	dbManager := database.NewDatabaseConnectionManager(mockDB)

	db := dbManager.SetUpPostgreSQLConnection()

	assert.NotNil(t, db)
}

func TestSetUpPostgreSQLConnection_Fail(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockDB := mocks.NewMockDBConnector(ctrl)

	mockDB.EXPECT().Connect(gomock.Any()).Return(nil, errors.New("connection failed")).Times(1)

	dbManager := database.NewDatabaseConnectionManager(mockDB)

	defer func() {
		if r := recover(); r == nil {
			t.Errorf("Expected panic but got nothing")
		}
	}()

	_ = dbManager.SetUpPostgreSQLConnection()
}
