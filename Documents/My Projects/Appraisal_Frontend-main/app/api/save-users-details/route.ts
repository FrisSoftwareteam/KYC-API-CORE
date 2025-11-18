import { NextRequest, NextResponse } from "next/server";
import {
  // clerkClient as clerkClientInvite,
  // auth as authInvite,
  clerkClient,
} from "@clerk/nextjs/server"; // Aliases

export async function POST(req: NextRequest) {
  // const { userId, has } = authInvite(); // User performing the action
  //  const controlNo = context.params.id;
  const values = await req.json();

  try {
    console.log(values);

    //Call Clerk API

    clerkClient().users.updateUserMetadata(values.clerkUserId as string, {
      publicMetadata: {
        role: values.role,
      },
    });

    // const result = await axios.patch(
    //   `https://fris-hr-backend.azurewebsites.net/api/operations/update-roles/${controlNo}`,
    //   {
    //     values,
    //   }
    // );

    // console.log(result);

    return NextResponse.json({ data: "Done!" });
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
