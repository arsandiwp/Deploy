package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetPayment(transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	GetTransactionByUser(UserID int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

// CreateTransaction
func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	var data models.Transaction

	err := r.db.Create(&transaction).Where("user_id = ? AND ticket_id = ?", transaction.UserID, transaction.TicketID).Order("id DESC").Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&data).Error

	return data, err
}

// UpdateTransaction
func (r *repository) UpdateTransaction(status string) (models.Transaction, error) {
	var transaction models.Transaction

	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return transaction, err
}

// FindTransaction
func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Find(&transactions).Error

	return transactions, err
}

// GetTransaction
func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) GetPayment(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

// DeleteTransaction
func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction, ID).Error

	return transaction, err
}

// Get Transaction By User
func (r *repository) GetTransactionByUser(UserID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Where("user_id = ?", UserID).Find(&transactions).Error

	return transactions, err
}
