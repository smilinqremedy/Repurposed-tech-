package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/smilinqremedy/repurposed-tech/backend/db"
)

func HandleListProducts(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	era := r.URL.Query().Get("era")
	status := r.URL.Query().Get("status")
	search := r.URL.Query().Get("search")

	products := db.GlobalStore.ListProducts(category, era, status, search)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"count":    len(products),
		"products": products,
	})
}

func HandleGetProduct(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	product, found := db.GlobalStore.GetProductBySlugOrID(slug)
	if !found {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"product": product,
	})
}
