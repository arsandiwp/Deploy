package models

type Station struct {
	ID   int    `json:"id" gorm:"primaryKey:autoIncrement"`
	Name string `json:"name" gorm:"type: varchar(255)"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
}
