import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(_req: NextRequest, context: { params: Params }) {
  const id = context.params.id;

  console.log(id);

  try {
    const score = await fetch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/answer/${+id}`,
      {
        cache: "no-store",
      }
    );

    const data = await score.json();

    console.log(data);

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
