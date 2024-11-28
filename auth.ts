import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models/user.model";
import bcrypt from "bcryptjs";
import { IUser } from "@/models/user.model";
import { retry } from "@reduxjs/toolkit/query";
import { NextResponse } from "next/server";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);

          if (!user) {
            throw new Error("User not found!");
          }
          const match = bcrypt.compare(
            credentials?.password as string,
            user.password
          );
          if (!match) {
            throw new Error("Password doesn't match.");
          }
          return user;
        } catch (error) {
          console.log("credentails error!");
        }
      },
    }),
  ],
});
