package routes

import (
	"github.com/Reyysusanto/warasin-web/backend/handler"
	"github.com/Reyysusanto/warasin-web/backend/service"
	"github.com/gin-gonic/gin"
)

func Master(route *gin.Engine, masterHandler handler.IMasterHandler, jwtService service.IJWTService) {
	routes := route.Group("/api/v1")
	{
		// Get Province & City
		routes.GET("/get-all-province", masterHandler.GetAllProvince)
		routes.GET("/get-all-city", masterHandler.GetAllCity)
	}
}
