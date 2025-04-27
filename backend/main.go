package main

import (
	"log"
	"os"

	"github.com/Reyysusanto/warasin-web/backend/cmd"
	"github.com/Reyysusanto/warasin-web/backend/config/database"
	"github.com/Reyysusanto/warasin-web/backend/handler"
	"github.com/Reyysusanto/warasin-web/backend/middleware"
	"github.com/Reyysusanto/warasin-web/backend/repository"
	"github.com/Reyysusanto/warasin-web/backend/routes"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/gin-gonic/gin"
)

func main() {
	realDB := &database.RealDB{}
	dbManager := database.NewDatabaseConnectionManager(realDB)
	db := dbManager.SetUpPostgreSQLConnection()
	defer database.ClosePostgreSQLConnection(db)

	if len(os.Args) > 1 {
		cmd.Command(db)
		return
	}

	var (
		jwtService = service.NewJWTService()

		userRepo    = repository.NewUserRepository(db)
		userService = service.NewUserService(userRepo, jwtService)
		userHandler = handler.NewUserHandler(userService)

		adminRepo    = repository.NewAdminRepository(db)
		adminService = service.NewAdminService(adminRepo, jwtService)
		adminHandler = handler.NewAdminHandler(adminService)
	)

	server := gin.Default()
	server.Use(middleware.CORSMiddleware())

	routes.User(server, userHandler, jwtService)
	routes.Admin(server, adminHandler, jwtService)

	server.Static("/assets", "./assets")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	var serve string
	if os.Getenv("APP_ENV") == "localhost" {
		serve = "127.0.0.1:" + port
	} else {
		serve = ":" + port
	}

	if err := server.Run(serve); err != nil {
		log.Fatalf("error running server: %v", err)
	}
}
