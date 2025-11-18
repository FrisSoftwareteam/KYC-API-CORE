import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function POST(req: NextRequest, context: { params: Params }) {
  const controlNo = context.params.id;
  const data = await req.json();

  //`https://fris-hr-backend.azurewebsites.net/api/operations/anwsers/${controlNo}`,
  try {
    // console.log(data);
    const result = await axios.post(
      `https://fris-hr-backend.azurewebsites.net/api/operations/anwsers-manager4/${controlNo}`,
      {
        data,
      }
    );

    console.log(result.data);

    return NextResponse.json({ data: result.data });
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
