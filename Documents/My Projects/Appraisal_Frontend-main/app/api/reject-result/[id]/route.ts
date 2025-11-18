import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function POST(req: NextRequest, context: { params: Params }) {
  const controlNo = context.params.id;
  const values = await req.json();
  console.log(controlNo, "Data ==>", values);

  try {
    // console.log(controlNo, value);
    await axios.patch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/reject/${controlNo}`,
      {
        values,
      }
    );

    // console.log(result);

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
