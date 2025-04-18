package routes

import (
	"github.com/Reyysusanto/warasin-web/backend/handler"
	"github.com/Reyysusanto/warasin-web/backend/middleware"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/gin-gonic/gin"
)

func User(route *gin.Engine, userHandler handler.IUserHandler, jwtService service.IJWTService) {
	routes := route.Group("/api/v1/user")
	{
		routes.POST("/register", userHandler.Register)
		routes.POST("/login", userHandler.Login)

		routes.POST("/send-verification-email", userHandler.SendVerificationEmail)
		routes.GET("/verify-email", userHandler.VerifyEmail)

		routes.POST("/send-forgot-password-email", userHandler.SendForgotPasswordEmail)
		routes.GET("/forgot-password", userHandler.ForgotPassword)
		routes.POST("/update-password", userHandler.UpdatePassword)

		routes.GET("/get-detail-user", middleware.Authentication(jwtService), userHandler.GetDetailUser)

		routes.GET("/get-all-user", middleware.Authentication(jwtService), middleware.AdminOnly(jwtService), userHandler.GetAllUser)
	}
}
