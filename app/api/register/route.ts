import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  university: z.string().min(2),
  yearOfStudy: z.string().min(1),
  track: z.string().min(1),
  mode: z.string().min(1),
  bio: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, university, yearOfStudy, track, mode, bio } = parsed.data;

    const registration = await prisma.registration.create({
      data: { name, email, university, yearOfStudy, track, mode, bio },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registered!",
        id: registration.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered for NexusHack 2025.",
        },
        { status: 409 }
      );
    }

    console.error("[/api/register] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
