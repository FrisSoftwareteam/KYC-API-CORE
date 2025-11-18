import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function PATCH(req: NextRequest, context: { params: Params }) {
  const controlNo = context.params.id;
  const { editedValues } = await req.json();

  try {
    console.log(editedValues.role, controlNo);
    await axios
      .patch(
        `https://fris-hr-backend.azurewebsites.net/api/operations/update-workflow/${controlNo}`,
        {
          editedValues,
        }
      )
      .then(async () => {});

    await axios.patch(
      `https://hrms-app-login.azurewebsites.net/v1/loginuser/${editedValues.EmailAddress}`,
      {
        role: editedValues.role,
      }
    );

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
