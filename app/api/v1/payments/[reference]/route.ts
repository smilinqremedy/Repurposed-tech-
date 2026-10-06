import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (paystackSecretKey) {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: data.message || "Verification failed" }, { status: 400 });
      }

      return NextResponse.json({
        status: data.data.status,
        reference: data.data.reference,
        amount: data.data.amount / 100, // convert kobo to Naira
        customer: data.data.customer,
      });
    } else {
      // Mock verification for development
      return NextResponse.json({
        status: "success",
        reference,
        mock: true,
        amount: 185000,
        paidAt: new Date().toISOString(),
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Payment verification failed", details: error.message },
      { status: 500 }
    );
  }
}
