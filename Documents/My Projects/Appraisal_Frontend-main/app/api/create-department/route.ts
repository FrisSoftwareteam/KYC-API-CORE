import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newFlow } = await req.json();

  try {
    //console.log(values);
    const { data } = await axios.post(
      "https://fris-hr-backend.azurewebsites.net/api/operations/create-department",
      {
        newFlow,
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
