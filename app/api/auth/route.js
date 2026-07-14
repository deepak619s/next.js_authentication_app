import { login, register } from "@/app/controllers/authController";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// Register & Login Route
export async function POST(req) {
  await connectDB();

  try {
    // const { searchParams } = req.nextUrl();  // Method 1 -> Getting the url
    const { searchParams } = new URL(req.url); // Method 2 -> Getting the url

    // http://localhost:3000/api/auth?signup=true
    if (searchParams.get("signup")) {
      return register(req);
    }

    // http://localhost:3000/api/auth?login=true
    if (searchParams.get("login")) {
      return login(req);
    }

    return NextResponse.json({
      message: "Invalid API Endpoint",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Server Error",
      success: error.message,
    });
  }
}
