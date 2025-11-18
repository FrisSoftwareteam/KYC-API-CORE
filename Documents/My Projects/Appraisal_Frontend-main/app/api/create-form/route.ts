import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { values } = await req.json();

  try {
    const { data } = await axios.post(
      "https://fris-hr-backend.azurewebsites.net/api/operations/form",
      {
        values,
      }
    );

    return NextResponse.json({ data: data });
  } catch (error) {
    //console.error("error -->", error.message);
    return NextResponse.json(
      {
        err: error,
      },
      { status: 400 }
    );
  }
}
