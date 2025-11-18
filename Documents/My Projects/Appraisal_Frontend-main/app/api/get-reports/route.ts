import { NextResponse } from "next/server";

export async function GET() {
  //console.log(controlNo);

  try {
    const Users = await fetch(
      `https://fris-hr-backend.azurewebsites.net/api/operations/reporting`,
      {
        cache: "no-store",
      }
    );

    const data = await Users.json();

    //console.log(data);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
