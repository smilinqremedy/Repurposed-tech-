package db

import (
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/smilinqremedy/repurposed-tech/backend/models"
)

type Store struct {
	mu       sync.RWMutex
	products map[string]models.Product
	drops    map[string]models.Drop
	orders   map[string]models.Order
}

var GlobalStore *Store

func init() {
	GlobalStore = NewStore()
	GlobalStore.seed()
}

func NewStore() *Store {
	return &Store{
		products: make(map[string]models.Product),
		drops:    make(map[string]models.Drop),
		orders:   make(map[string]models.Order),
	}
}

func (s *Store) seed() {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Seed Drops
	drops := []models.Drop{
		{
			ID:          "drop-001",
			Slug:        "drop-001",
			Number:      "DROP 001",
			Name:        "THE REBIRTH COLLECTION",
			Tagline:     "Five forgotten machines. Five second lives.",
			Status:      "RELEASED",
			ReleaseDate: "OCTOBER 2026",
			PieceCount:  7,
			Description: "Our inaugural release. We retrieved obsolete electronic instruments across industrial salvage yards and dusty attics, stripped them down to atomic components, and rebuilt them with aerospace materials, laminated IPS screens, modern LiPo power, and audiophile-grade circuitry.",
			CuratorNote: "Each piece in Drop 001 represents a milestone of consumer industrial engineering between 1974 and 2006. Once these individual editions are claimed, they will never be reproduced in this identical configuration.",
			ProductIDs:  []string{"rt-001", "rt-001b", "rt-001c", "rt-002", "rt-003", "rt-004", "rt-005"},
			BannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
		},
		{
			ID:            "drop-002",
			Slug:          "drop-002",
			Number:        "DROP 002",
			Name:          "SIGNAL LOST",
			Tagline:       "Analog radio telecommunications & cathode ray monuments.",
			Status:        "COMING SOON",
			ReleaseDate:   "NOVEMBER 2026",
			PieceCount:    4,
			Description:   "Cold-war era shortwave radio receivers, Sony Watchman mini-CRTs converted to wireless composite monitors, and tactical avionics displays resurrected into ambient home telemetry sculptures.",
			CuratorNote:   "Subscribers receive 1-hour early access window with encrypted checkout passcodes.",
			ProductIDs:    []string{},
			BannerImage:   "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
			CountdownDate: "2026-11-15T18:00:00Z",
		},
		{
			ID:            "drop-003",
			Slug:          "drop-003",
			Number:        "DROP 003",
			Name:          "POCKET MACHINES",
			Tagline:       "Ultra-compact personal electronics from the golden decade.",
			Status:        "COMING SOON",
			ReleaseDate:   "DECEMBER 2026",
			PieceCount:    6,
			Description:   "Palm Pilot titanium editions with e-ink retrofit, Sony Walkman DD series with laser-machined brass flywheels, and Game Boy Pocket units with custom machined magnesium shells.",
			CuratorNote:   "Strict limit of one piece per collector address.",
			ProductIDs:    []string{},
			BannerImage:   "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85",
			CountdownDate: "2026-12-05T18:00:00Z",
		},
	}

	for _, d := range drops {
		s.drops[d.Slug] = d
		s.drops[d.ID] = d
	}

	// Seed Products
	products := []models.Product{
		{
			ID:                  "rt-001",
			Name:                "Game Boy Color — Atomic Purple",
			Slug:                "game-boy-color-atomic-purple",
			Category:            "Retro Gaming",
			ShortDescription:    "A forgotten 1998 classic rebuilt with an ultra-bright laminated IPS display, custom audio amplifier, and USB-C fast charging.",
			Description:         "The Atomic Purple Game Boy Color was the defining icon of late-90s portable engineering. Ultrasonically descaled PCB, upgraded tantalum capacitors, laminated FunnyPlaying 2.6\" IPS backlight display, and integrated 1800mAh LiPo cell with discreet USB-C charging.",
			Price:               185000,
			OriginalReleaseYear: 1998,
			Images: []string{
				"https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=85",
				"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
			},
			Status:       "available",
			Stock:        2,
			Edition:      "01 / 03",
			Era:          "90s",
			Condition:    "Pristine Upgraded",
			Featured:     true,
			DropID:       "drop-001",
			DropName:     "DROP 001 — THE REBIRTH COLLECTION",
			HighlightTag: "1 OF 3 RELEASE",
			BeforeImage:  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
			AfterImage:   "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1000&q=80",
			StoryQuote:   "This machine spent 22 years forgotten in a humid drawer. Today, its phosphor purple heart beats faster and clearer than the day it left Kyoto.",
			Specifications: []models.ProductSpecification{
				{Label: "Base Hardware", Value: "Nintendo Game Boy Color (CGB-001, 1998)"},
				{Label: "Display Architecture", Value: "Laminated 2.6\" IPS Panel with OSD menu & 5 retro scanline modes"},
				{Label: "Audio Overhaul", Value: "CleanAmp Pro v1.2 with ceramic transducer speaker & zero-hum filtering"},
				{Label: "Power System", Value: "1,800 mAh LiPo with USB-C fast charge port"},
			},
		},
		{
			ID:                  "rt-001b",
			Name:                "Game Boy Color — Crystal Clear Edition",
			Slug:                "game-boy-color-crystal-clear-edition",
			Category:            "Retro Gaming",
			ShortDescription:    "A fully transparent optical chassis showcasing bare recapped circuitry, laminated IPS backlit display, and USB-C power.",
			Description:         "Optical clear UV-stabilized polycarbonate chassis celebrating pure electronic transparency. Laminated IPS panel, tantalum capacitors, tactile silicone pads, and rechargeable USB-C power.",
			Price:               175000,
			OriginalReleaseYear: 1998,
			Images: []string{
				"https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=85",
				"https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=85",
			},
			Status:       "limited",
			Stock:        1,
			Edition:      "01 / 02",
			Era:          "90s",
			Condition:    "Pristine Upgraded",
			Featured:     true,
			DropID:       "drop-001",
			DropName:     "DROP 001 — THE REBIRTH COLLECTION",
			HighlightTag: "LIMITED DROP",
			BeforeImage:  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
			AfterImage:   "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1000&q=80",
			StoryQuote:   "Complete optical transparency. Nothing hidden, every trace and solder joint celebrated as mechanical architecture.",
			Specifications: []models.ProductSpecification{
				{Label: "Base Hardware", Value: "Nintendo Game Boy Color (CGB-001, 1998)"},
				{Label: "Display Architecture", Value: "Laminated 2.6\" IPS Panel with OSD menu & 5 retro scanline modes"},
				{Label: "Power System", Value: "1,800 mAh LiPo rechargeable battery with USB-C port"},
			},
		},
		{
			ID:                  "rt-001c",
			Name:                "Game Boy Advance — Midnight Edition",
			Slug:                "game-boy-advance-midnight-edition",
			Category:            "Retro Gaming",
			ShortDescription:    "Obsidian matte black GBA with laminated 3.0\" IPS display, tactile microswitches, CleanJuice USB-C, and stealth amber accents.",
			Description:         "Finished in matte obsidian black with tactile microswitched D-pad and shoulder triggers, edge-to-edge laminated 3.0\" IPS display, CleanAmp audio boost, and USB-C fast charging.",
			Price:               210000,
			OriginalReleaseYear: 2001,
			Images: []string{
				"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
				"https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
			},
			Status:       "coming-soon",
			Stock:        1,
			Edition:      "01 / 02",
			Era:          "00s",
			Condition:    "Pristine Upgraded",
			Featured:     true,
			DropID:       "drop-001",
			DropName:     "DROP 001 — THE REBIRTH COLLECTION",
			HighlightTag: "COMING SOON",
			BeforeImage:  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=80",
			AfterImage:   "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
			StoryQuote:   "Midnight black ergonomics. 720x480 pixel perfection. Built for deep night gaming sessions.",
			Specifications: []models.ProductSpecification{
				{Label: "Base Hardware", Value: "Nintendo Game Boy Advance (AGB-001, 2001)"},
				{Label: "Display Architecture", Value: "3.0\" Laminated IPS (720x480, 4x integer scaling)"},
				{Label: "Power System", Value: "1,700 mAh CleanJuice USB-C rechargeable battery pack"},
			},
		},
		{
			ID:                  "rt-002",
			Name:                "iPod Classic — Midnight Edition",
			Slug:                "ipod-classic-midnight-edition",
			Category:            "Music",
			ShortDescription:    "Original 5.5th Gen 'Wolfson DAC' architecture rebuilt with 512GB silent solid-state storage, 3000mAh battery, and obsidian anodized chassis.",
			Description:         "Legendary Wolfson Microelectronics WM8758 DAC platform refitted with quad-microSD solid-state converter, 512GB silent flash storage, and 3000mAh battery capable of 90 hours continuous playback.",
			Price:               220000,
			OriginalReleaseYear: 2006,
			Images: []string{
				"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
			},
			Status:       "low-stock",
			Stock:        1,
			Edition:      "01 / 02",
			Era:          "00s",
			Condition:    "Masterpiece 1-of-1",
			Featured:     true,
			DropID:       "drop-001",
			DropName:     "DROP 001 — THE REBIRTH COLLECTION",
			HighlightTag: "ONLY 1 REMAINING",
			Specifications: []models.ProductSpecification{
				{Label: "Hardware Model", Value: "Apple iPod Video 5.5th Gen"},
				{Label: "Digital-to-Analog Converter", Value: "Wolfson Microelectronics WM8758"},
				{Label: "Storage Architecture", Value: "512GB iFlash Quad Solid-State Storage"},
				{Label: "Battery Performance", Value: "3,000 mAh High-Density Cell"},
			},
		},
	}

	for _, p := range products {
		s.products[p.Slug] = p
		s.products[p.ID] = p
	}

	// Seed Sample Order
	sampleOrder := models.Order{
		ID:          "ord-001",
		OrderNumber: "RT-001",
		CreatedAt:   time.Now().Add(-48 * time.Hour),
		Customer: models.CustomerInfo{
			FullName: "Adeyemi Adeleke",
			Email:    "adeyemi@studio-arch.ng",
			Phone:    "+234 803 555 0192",
			Address:  "14 Victoria Arobieke Street, Lekki Phase 1",
			City:     "Lagos",
			State:    "Lagos",
			Country:  "Nigeria",
		},
		Items: []models.OrderItem{
			{
				ID:        "item-1",
				ProductID: "rt-001",
				Name:      "Game Boy Color — Atomic Purple",
				Slug:      "game-boy-color-atomic-purple",
				Price:     185000,
				Image:     "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80",
				Edition:   "01 / 03",
				Quantity:  1,
			},
		},
		Subtotal:          185000,
		ShippingMethod:    "White Glove Delivery (Lagos / Abuja)",
		ShippingCost:      10000,
		Total:             195000,
		Status:            "confirmed",
		PaymentMethod:     "paystack",
		PaymentStatus:     "paid",
		TrackingNumber:    "RT-LG-9821034",
		EstimatedDelivery: "2-3 business days",
	}

	s.orders[sampleOrder.ID] = sampleOrder
	s.orders[sampleOrder.OrderNumber] = sampleOrder
}

func (s *Store) ListProducts(category, era, status, search string) []models.Product {
	s.mu.RLock()
	defer s.mu.RUnlock()

	seen := make(map[string]bool)
	var list []models.Product

	for _, p := range s.products {
		if seen[p.ID] {
			continue
		}
		seen[p.ID] = true

		if category != "" && !strings.EqualFold(p.Category, category) {
			continue
		}
		if era != "" && !strings.EqualFold(p.Era, era) {
			continue
		}
		if status != "" && !strings.EqualFold(p.Status, status) {
			continue
		}
		if search != "" {
			q := strings.ToLower(search)
			if !strings.Contains(strings.ToLower(p.Name), q) &&
				!strings.Contains(strings.ToLower(p.Description), q) &&
				!strings.Contains(strings.ToLower(p.Category), q) {
				continue
			}
		}

		list = append(list, p)
	}

	return list
}

func (s *Store) GetProductBySlugOrID(key string) (*models.Product, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	p, ok := s.products[key]
	if !ok {
		return nil, false
	}
	return &p, true
}

func (s *Store) ListDrops() []models.Drop {
	s.mu.RLock()
	defer s.mu.RUnlock()

	seen := make(map[string]bool)
	var list []models.Drop

	for _, d := range s.drops {
		if seen[d.ID] {
			continue
		}
		seen[d.ID] = true
		list = append(list, d)
	}

	return list
}

func (s *Store) GetDropBySlugOrID(key string) (*models.Drop, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	d, ok := s.drops[key]
	if !ok {
		return nil, false
	}
	return &d, true
}

func (s *Store) CreateOrder(order models.Order) models.Order {
	s.mu.Lock()
	defer s.mu.Unlock()

	count := len(s.orders) + 1
	order.ID = fmt.Sprintf("ord-%d", time.Now().UnixMilli())
	order.OrderNumber = fmt.Sprintf("RT-%03d", count)
	order.CreatedAt = time.Now()

	s.orders[order.ID] = order
	s.orders[order.OrderNumber] = order

	return order
}

func (s *Store) GetOrderByIDOrNumber(key string) (*models.Order, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	o, ok := s.orders[key]
	if !ok {
		return nil, false
	}
	return &o, true
}
