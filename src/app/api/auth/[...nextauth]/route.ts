import NextAuth from "next-auth/next";
import { option } from "@/auth/authOption";

const handlers = NextAuth(option);

export { handlers as GET, handlers as POST };


