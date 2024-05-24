import sendEmail from "@/lib/nodemailer";
import crypto from "crypto";
import { signupSchema } from "@/lib/zodSchema/signup";
import { ZodError } from "zod";
import { countUserByEmail, cacheUser } from "@/lib/db/actions";
import { getWebsiteUrl } from "@/lib/secrets";

export async function POST(req: Request) {
  try {
    const baseUrl: string = getWebsiteUrl();

    /* check if request sent is valid */
    const data = signupSchema.parse(
      await req.json()
    );

    /* count users with same email */
    const count: number = await countUserByEmail(data.email);
    
    /* if email already exists */
    if (count > 0) {
      console.log("Duplicate Email!!!");
      return Response.json(
        "Email already exists. Please try with another email.",
        { status: 409 }
      );
    }

    /* generate uuid for new user */
    const uuid = crypto.randomUUID();

    /* generate token */
    const token: string = crypto.randomBytes(32).toString("hex");

    /* insert user in cache for validation */
    await cacheUser({ uuid, email: data.email, password: data.password, name: data.name, dob: data.dob, token });

    const url: string = `${baseUrl}/users/${uuid}/verify/${token}`;
    await sendEmail({ email: data.email, subject: "Verification Mail", link: url });

    return Response.json("User Created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json("Invalid Request", { status: 400 });
    } else {
      console.log(error);
      return Response.json("Internal Server Error", { status: 500 });
    }
  }
}