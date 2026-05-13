import { NextRequest, NextResponse } from "next/server";

// WhatsApp click-to-chat redirect
// The phone number is never exposed to the client
const WHATSAPP_NUMBER = "212608437671";
const WHATSAPP_MESSAGE = "Hello Palma d'Or! I'm interested in your luxury date collection.";

export async function GET(request: NextRequest) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return NextResponse.redirect(url);
}
