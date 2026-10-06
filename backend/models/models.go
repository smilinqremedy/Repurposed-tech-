package models

import "time"

type ProductSpecification struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type RestorationStage struct {
	Stage       string `json:"stage"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type Product struct {
	ID                  string                 `json:"id"`
	Name                string                 `json:"name"`
	Slug                string                 `json:"slug"`
	Category            string                 `json:"category"`
	ShortDescription    string                 `json:"shortDescription"`
	Description         string                 `json:"description"`
	Price               int64                  `json:"price"`
	OriginalReleaseYear int                    `json:"originalReleaseYear,omitempty"`
	Images              []string               `json:"images"`
	Status              string                 `json:"status"` // available, limited, low-stock, sold-out, coming-soon
	Stock               int                    `json:"stock"`
	Edition             string                 `json:"edition"`
	Era                 string                 `json:"era"`
	Condition           string                 `json:"condition"`
	Featured            bool                   `json:"featured"`
	DropID              string                 `json:"dropId,omitempty"`
	DropName            string                 `json:"dropName,omitempty"`
	HighlightTag        string                 `json:"highlightTag,omitempty"`
	BeforeImage         string                 `json:"beforeImage,omitempty"`
	AfterImage          string                 `json:"afterImage,omitempty"`
	StoryQuote          string                 `json:"storyQuote,omitempty"`
	Specifications      []ProductSpecification `json:"specifications"`
	RestorationStages   []RestorationStage     `json:"restorationStages"`
	CreatedAt           time.Time              `json:"createdAt"`
	UpdatedAt           time.Time              `json:"updatedAt"`
}

type Drop struct {
	ID            string   `json:"id"`
	Slug          string   `json:"slug"`
	Number        string   `json:"number"`
	Name          string   `json:"name"`
	Tagline       string   `json:"tagline"`
	Status        string   `json:"status"` // RELEASED, COMING SOON, ARCHIVED
	ReleaseDate   string   `json:"releaseDate"`
	PieceCount    int      `json:"pieceCount"`
	Description   string   `json:"description"`
	CuratorNote   string   `json:"curatorNote"`
	ProductIDs    []string `json:"productIds"`
	BannerImage   string   `json:"bannerImage"`
	CountdownDate string   `json:"countdownDate,omitempty"`
}

type CustomerInfo struct {
	FullName   string `json:"fullName"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Address    string `json:"address"`
	City       string `json:"city"`
	State      string `json:"state"`
	Country    string `json:"country"`
	PostalCode string `json:"postalCode,omitempty"`
	Notes      string `json:"notes,omitempty"`
}

type OrderItem struct {
	ID                   string `json:"id"`
	ProductID            string `json:"productId"`
	Name                 string `json:"name"`
	Slug                 string `json:"slug"`
	Price                int64  `json:"price"`
	Image                string `json:"image"`
	Edition              string `json:"edition"`
	Quantity             int    `json:"quantity"`
	ConfigurationSummary string `json:"configurationSummary,omitempty"`
	IsCustomBuild        bool   `json:"isCustomBuild,omitempty"`
}

type Order struct {
	ID                string       `json:"id"`
	OrderNumber       string       `json:"orderNumber"`
	CreatedAt         time.Time    `json:"createdAt"`
	Customer          CustomerInfo `json:"customer"`
	Items             []OrderItem  `json:"items"`
	Subtotal          int64        `json:"subtotal"`
	ShippingMethod    string       `json:"shippingMethod"`
	ShippingCost      int64        `json:"shippingCost"`
	Total             int64        `json:"total"`
	Status            string       `json:"status"` // pending, confirmed, preparing, shipped, delivered, cancelled
	PaymentMethod     string       `json:"paymentMethod"`
	PaymentStatus     string       `json:"paymentStatus"` // pending, paid, failed, refunded
	TrackingNumber    string       `json:"trackingNumber,omitempty"`
	EstimatedDelivery string       `json:"estimatedDelivery,omitempty"`
}

type BuildConfig struct {
	DeviceID         string   `json:"deviceId"`
	ShellID          string   `json:"shellId"`
	DisplayID        string   `json:"displayId"`
	PowerID          string   `json:"powerId"`
	ButtonID         string   `json:"buttonId,omitempty"`
	AudioID          string   `json:"audioId,omitempty"`
	SelectedExtraIDs []string `json:"selectedExtraIds"`
}

type PaymentInitRequest struct {
	Email       string `json:"email"`
	Amount      int64  `json:"amount"` // In Naira
	OrderID     string `json:"orderId"`
	CallbackURL string `json:"callbackUrl,omitempty"`
}

type PaymentInitResponse struct {
	AuthorizationURL string `json:"authorizationUrl"`
	AccessCode       string `json:"accessCode"`
	Reference        string `json:"reference"`
	Mock             bool   `json:"mock,omitempty"`
}
