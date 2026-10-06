package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/smilinqremedy/repurposed-tech/backend/models"
)

var deviceBasePrices = map[string]int64{
	"gbc":  85000,
	"gba":  95000,
	"ipod": 120000,
}

var shellModifiers = map[string]int64{
	"atomic-purple": 15000,
	"clear":         12000,
	"black":         10000,
	"white":         10000,
	"custom":        25000,
}

var displayModifiers = map[string]int64{
	"original":    0,
	"ips":         25000,
	"premium-ips": 40000,
}

var powerModifiers = map[string]int64{
	"original":          0,
	"rechargeable":      18000,
	"usbc-rechargeable": 28000,
}

var buttonModifiers = map[string]int64{
	"classic": 0,
	"black":   6000,
	"white":   6000,
	"custom":  15000,
}

var audioModifiers = map[string]int64{
	"original": 0,
	"upgraded": 16000,
}

var extraModifiers = map[string]int64{
	"engraving":      10000,
	"display-case":   14000,
	"gift-packaging": 8000,
}

func HandleCalculateBuild(w http.ResponseWriter, r *http.Request) {
	var cfg models.BuildConfig
	if err := json.NewDecoder(r.Body).Decode(&cfg); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid build payload"})
		return
	}

	basePrice := deviceBasePrices[cfg.DeviceID]
	if basePrice == 0 {
		basePrice = 85000
	}

	shellMod := shellModifiers[cfg.ShellID]
	displayMod := displayModifiers[cfg.DisplayID]
	powerMod := powerModifiers[cfg.PowerID]
	buttonMod := buttonModifiers[cfg.ButtonID]
	audioMod := audioModifiers[cfg.AudioID]

	var extrasTotal int64
	extrasMap := make(map[string]int64)
	for _, ex := range cfg.SelectedExtraIDs {
		if mod, ok := extraModifiers[ex]; ok {
			extrasTotal += mod
			extrasMap[ex] = mod
		}
	}

	total := basePrice + shellMod + displayMod + powerMod + buttonMod + audioMod + extrasTotal

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"totalPrice": total,
		"breakdown": map[string]interface{}{
			"basePrice":  basePrice,
			"shell":      shellMod,
			"display":    displayMod,
			"power":      powerMod,
			"button":     buttonMod,
			"audio":      audioMod,
			"extras":     extrasMap,
			"extraTotal": extrasTotal,
		},
	})
}
