import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";

import axios from "axios";

// export async function GET() {
//   console.log(process.env.CLERK_WEBHOOK_SECRET);
//   return new Response("Hello", { status: 200 });
// }

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url } = evt.data;

    console.log(email_addresses);

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      //firstName: first_name,
      //lastName: last_name,
      imageUrl: image_url,
    };

    await axios
      .post(
        "https://fris-hr-backend.azurewebsites.net/api/operations/update-user",
        {
          user,
        }
      )
      .then(function () {
        // console.log("Response---->", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    await clerkClient.users.updateUser(id, {
      publicMetadata: {
        role: "user",
      },
    });
  }

  return new Response("Done !", { status: 200 });
}
