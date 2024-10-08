import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
const handler = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Missing credentials");
                }

                const user = { id: '1', name: "J Smith", email: "4wL0H@example.com" };

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
})

export { handler as GET, handler as POST }