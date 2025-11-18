import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function POST(req: NextRequest, context: { params: Params }) {
  const controlNo = context.params.id;
  const values = await req.json();

  try {
    console.log(controlNo, values);
    const result = await axios.patch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/update-roles/${controlNo}`,
      {
        values,
      }
    );

    // console.log(result);

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
