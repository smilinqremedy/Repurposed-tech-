package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/smilinqremedy/repurposed-tech/backend/handlers"
)

// withCORS middleware allows cross-origin requests from the Next.js frontend
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// withLogging logs incoming REST requests
func withLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("[%s] %s %s (%s)", r.Method, r.URL.Path, r.RemoteAddr, time.Since(start))
	})
}

func main() {
	mux := http.NewServeMux()

	// HEALTH CHECK
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"ok","studio":"REPURPOSED TECH","timestamp":"%s"}`, time.Now().UTC().Format(time.RFC3339))
	})

	// SECTION 29: REST API ENDPOINTS
	// Products
	mux.HandleFunc("GET /api/v1/products", handlers.HandleListProducts)
	mux.HandleFunc("GET /api/v1/products/{slug}", handlers.HandleGetProduct)

	// Drops
	mux.HandleFunc("GET /api/v1/drops", handlers.HandleListDrops)
	mux.HandleFunc("GET /api/v1/drops/{slug}", handlers.HandleGetDrop)

	// Orders
	mux.HandleFunc("POST /api/v1/orders", handlers.HandleCreateOrder)
	mux.HandleFunc("GET /api/v1/orders/{id}", handlers.HandleGetOrder)

	// Builds
	mux.HandleFunc("POST /api/v1/builds", handlers.HandleCalculateBuild)

	// Payments
	mux.HandleFunc("POST /api/v1/payments/initialize", handlers.HandleInitializePayment)
	mux.HandleFunc("GET /api/v1/payments/{reference}", handlers.HandleVerifyPayment)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	handler := withCORS(withLogging(mux))

	log.Printf("═══════════════════════════════════════════════════════")
	log.Printf(" REPURPOSED TECH — REST API BACKEND (GO 1.22)")
	log.Printf(" Tagline: OLD TECH. REIMAGINED.")
	log.Printf(" Studio Server active on http://localhost:%s", port)
	log.Printf("═══════════════════════════════════════════════════════")

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
