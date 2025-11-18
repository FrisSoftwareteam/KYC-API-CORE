import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

// `https://fris-hr-backend.azurewebsites.net/api/operations/question/${id}`,
export async function GET(_req: NextRequest, context: { params: Params }) {
  const id = context.params.id;

  console.log("Biodun", id);

  try {
    const profile = await fetch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/question/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await profile.json();

    console.log(data);

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
