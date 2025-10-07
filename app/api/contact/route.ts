import { isEmailEnabled } from "@/utils/emailConfig";
import { sendContactEmail } from "@/utils/sendContactEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    const { name, phone, vehicle, date, additional } = formData;
    if (!name || !phone || !vehicle || !date) {
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    if (isEmailEnabled()) {
      await sendContactEmail("Contact Form Submission", formData);
    }

    return new NextResponse(
      JSON.stringify({
        message: "Thanks, we have got your details, we will get back to you soon",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "An error occurred" }), { status: 500 });
  }
}