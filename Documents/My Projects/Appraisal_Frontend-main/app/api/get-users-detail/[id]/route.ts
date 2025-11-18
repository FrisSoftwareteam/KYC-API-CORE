import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(_req: NextRequest, context: { params: Params }) {
  const id = context.params.id;

  //console.log(id);

  try {
    const getUsers = await fetch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/user-by-email/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await getUsers.json();

    console.log(data);

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
