import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data);

  try {
    await axios.post(
      "https://fris-hr-backend.azurewebsites.net/api/operations/approval-flow",
      {
        data,
      }
    );

    return NextResponse.json({ data: "Done" });
  } catch (error) {
    // console.error("error -->", error.message);
    return NextResponse.json(
      {
        err: error,
      },
      { status: 400 }
    );
  }
}
