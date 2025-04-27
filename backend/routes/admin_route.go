package routes

import (
	"github.com/Reyysusanto/warasin-web/backend/handler"
	"github.com/Reyysusanto/warasin-web/backend/middleware"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/gin-gonic/gin"
)

func Admin(route *gin.Engine, adminHandler handler.IAdminHandler, jwtService service.IJWTService) {
	routes := route.Group("/api/v1/admin")
	{
		routes.POST("/login", adminHandler.Login)
		routes.POST("/refresh-token", adminHandler.RefreshToken)

		routes.Use(middleware.Authentication(jwtService), middleware.RouteAccessControl(jwtService))
		{
			routes.GET("/get-all-user", adminHandler.GetAllUser)
			routes.DELETE("/delete-user", adminHandler.DeleteUser)
		}
	}
}
