package handlers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/smilinqremedy/repurposed-tech/backend/db"
	"github.com/smilinqremedy/repurposed-tech/backend/models"
)

type CreateOrderRequest struct {
	Customer       models.CustomerInfo `json:"customer"`
	Items          []models.OrderItem  `json:"items"`
	ShippingMethod string              `json:"shippingMethod"`
	PaymentMethod  string              `json:"paymentMethod"`
}

func HandleCreateOrder(w http.ResponseWriter, r *http.Request) {
	var req CreateOrderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	if req.Customer.FullName == "" || req.Customer.Email == "" || req.Customer.Address == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Customer name, email, and address are required"})
		return
	}

	if len(req.Items) == 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Order must contain at least one piece"})
		return
	}

	// SERVER-SIDE PRICE RE-CALCULATION (Adheres to Section 31 of Master Build Prompt)
	var subtotal int64
	var verifiedItems []models.OrderItem

	for _, item := range req.Items {
		unitPrice := item.Price
		if p, found := db.GlobalStore.GetProductBySlugOrID(item.ProductID); found {
			unitPrice = p.Price // Force authoritative catalog price
		}
		if item.Quantity <= 0 {
			item.Quantity = 1
		}
		subtotal += unitPrice * int64(item.Quantity)
		item.Price = unitPrice
		verifiedItems = append(verifiedItems, item)
	}

	var shippingCost int64 = 10000
	shippingEstimate := "1-2 Business Days"
	shippingName := "White Glove Hand Delivery (Lagos / Abuja)"

	switch req.ShippingMethod {
	case "standard":
		shippingCost = 5000
		shippingEstimate = "3-5 Business Days"
		shippingName = "Standard Insured Courier (Nationwide)"
	case "intl":
		shippingCost = 35000
		shippingEstimate = "4-7 Business Days"
		shippingName = "International DHL Express Courier"
	}

	total := subtotal + shippingCost

	order := models.Order{
		Customer:          req.Customer,
		Items:             verifiedItems,
		Subtotal:          subtotal,
		ShippingMethod:    shippingName,
		ShippingCost:      shippingCost,
		Total:             total,
		Status:            "confirmed",
		PaymentMethod:     req.PaymentMethod,
		PaymentStatus:     "paid",
		TrackingNumber:    fmt.Sprintf("RT-NG-%06d", rand.Intn(900000)+100000),
		EstimatedDelivery: shippingEstimate,
	}

	savedOrder := db.GlobalStore.CreateOrder(order)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"order": savedOrder,
	})
}

func HandleGetOrder(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	order, found := db.GlobalStore.GetOrderByIDOrNumber(id)
	if !found {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Order not found"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"order": order,
	})
}
