import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error("[/api/registrations] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
