import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
