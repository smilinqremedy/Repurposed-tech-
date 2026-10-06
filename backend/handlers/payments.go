package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/smilinqremedy/repurposed-tech/backend/models"
)

func HandleInitializePayment(w http.ResponseWriter, r *http.Request) {
	var req models.PaymentInitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid payment payload"})
		return
	}

	secretKey := os.Getenv("PAYSTACK_SECRET_KEY")
	reference := fmt.Sprintf("RT-TX-%d-%04d", time.Now().UnixMilli(), rand.Intn(9000)+1000)

	if secretKey != "" {
		// Real Paystack API call
		payload := map[string]interface{}{
			"email":        req.Email,
			"amount":       req.Amount * 100, // convert Naira to Kobo
			"reference":    reference,
			"callback_url": req.CallbackURL,
			"metadata":     map[string]string{"orderId": req.OrderID},
		}
		buf, _ := json.Marshal(payload)

		paystackReq, _ := http.NewRequest("POST", "https://api.paystack.co/transaction/initialize", bytes.NewReader(buf))
		paystackReq.Header.Set("Authorization", "Bearer "+secretKey)
		paystackReq.Header.Set("Content-Type", "application/json")

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(paystackReq)
		if err != nil || resp.StatusCode != http.StatusOK {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			json.NewEncoder(w).Encode(map[string]string{"error": "Paystack gateway connection error"})
			return
		}
		defer resp.Body.Close()

		var paystackResp struct {
			Status  bool   `json:"status"`
			Message string `json:"message"`
			Data    struct {
				AuthorizationURL string `json:"authorization_url"`
				AccessCode       string `json:"access_code"`
				Reference        string `json:"reference"`
			} `json:"data"`
		}
		json.NewDecoder(resp.Body).Decode(&paystackResp)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(models.PaymentInitResponse{
			AuthorizationURL: paystackResp.Data.AuthorizationURL,
			AccessCode:       paystackResp.Data.AccessCode,
			Reference:        paystackResp.Data.Reference,
		})
		return
	}

	// Development Mock Mode (Master Prompt Section 19)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.PaymentInitResponse{
		AuthorizationURL: fmt.Sprintf("/checkout/success?orderNumber=%s&reference=%s", req.OrderID, reference),
		AccessCode:       fmt.Sprintf("MOCK_CODE_%d", time.Now().UnixMilli()),
		Reference:        reference,
		Mock:             true,
	})
}

func HandleVerifyPayment(w http.ResponseWriter, r *http.Request) {
	reference := r.PathValue("reference")

	secretKey := os.Getenv("PAYSTACK_SECRET_KEY")
	if secretKey != "" {
		paystackReq, _ := http.NewRequest("GET", "https://api.paystack.co/transaction/verify/"+reference, nil)
		paystackReq.Header.Set("Authorization", "Bearer "+secretKey)

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(paystackReq)
		if err != nil || resp.StatusCode != http.StatusOK {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			json.NewEncoder(w).Encode(map[string]string{"error": "Verification request failed"})
			return
		}
		defer resp.Body.Close()

		var result map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&result)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
		return
	}

	// Mock verification
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "success",
		"reference": reference,
		"mock":      true,
		"amount":    185000,
	})
}
