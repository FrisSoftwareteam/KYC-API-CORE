import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // const { searchParams } = new URL(req.url);
    // const uuid = searchParams.get("uuid");

    //https://frisopsapi.azurewebsites.net/api/file/upload-pdf

    // console.log(data);
    //https://fris-hr-backend.azurewebsites.net/api/operations/create-employee

    await axios.post(
      `https://fris-hr-backend.azurewebsites.net/api/operations/create-employee`,
      data
    );
    //console.log(response.data.upload);
    return NextResponse.json({
      // response.data.upload
      message: "Message",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate attachment file url" },
      { status: 500 }
    );
  }
}
