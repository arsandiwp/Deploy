package stationsdto

type CreateStationRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
	Kota string `json:"kota" form:"kota" validate:"required"`
}
