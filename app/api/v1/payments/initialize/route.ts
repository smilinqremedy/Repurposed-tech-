import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, orderId, callbackUrl } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { error: "Email and amount (in kobo/Naira) are required" },
        { status: 400 }
      );
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const reference = `RT-TX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (paystackSecretKey) {
      // Real Paystack API integration (PCI-DSS compliant, secret kept server-side)
      const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100), // convert Naira to Kobo
          reference,
          callback_url: callbackUrl || "https://repurposedtech.studio/checkout/success",
          metadata: { orderId },
        }),
      });

      const data = await paystackRes.json();
      if (!paystackRes.ok) {
        return NextResponse.json({ error: data.message || "Paystack initialization failed" }, { status: 400 });
      }

      return NextResponse.json({
        authorizationUrl: data.data.authorization_url,
        accessCode: data.data.access_code,
        reference: data.data.reference,
      });
    } else {
      // Mock payment initialization for development (Master Prompt Section 19)
      return NextResponse.json({
        mock: true,
        authorizationUrl: `/checkout/success?orderNumber=${orderId}&reference=${reference}`,
        accessCode: `MOCK_ACCESS_${Date.now()}`,
        reference,
        message: "Development Mode: Simulated Paystack Gateway",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Payment initialization failed", details: error.message },
      { status: 500 }
    );
  }
}
