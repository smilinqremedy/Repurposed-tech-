package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/smilinqremedy/repurposed-tech/backend/db"
)

func HandleListDrops(w http.ResponseWriter, r *http.Request) {
	drops := db.GlobalStore.ListDrops()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"count": len(drops),
		"drops": drops,
	})
}

func HandleGetDrop(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	drop, found := db.GlobalStore.GetDropBySlugOrID(slug)
	if !found {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Drop not found"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"drop": drop,
	})
}
