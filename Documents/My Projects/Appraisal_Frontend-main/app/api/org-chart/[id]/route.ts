import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(_req: NextRequest, context: { params: Params }) {
  const email = context.params.id;

  console.log(email);

  try {
    const profile = await fetch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/chart/${email}`,
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
