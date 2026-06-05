import { NextRequest, NextResponse } from "next/server";
import { insertLead, getLeads } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { project_type, budget, timeline, description, email } = body;

    // Validate required fields
    if (!project_type || !budget || !timeline || !description || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const lead = insertLead({
      project_type,
      budget,
      timeline,
      description,
      email,
    });

    return NextResponse.json(
      { message: "Lead saved successfully", lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ leads, count: leads.length });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
