// import NextAuth from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";
// import { encrypt } from "@/utils/encryption";
// import {jwtDecode} from "jwt-decode";
// import { JWT } from "next-auth/jwt"; // Import JWT type from next-auth
// import { Account } from "next-auth"; // Import Account type from next-auth


// interface CustomToken extends JWT {
//   decoded?: any; // Adjust the type of decoded according to your JWT structure
//   access_token?: string;
//   id_token?: string;
//   expires_at?: number;
//   refresh_token?: string;
//   error?: string;
// }


// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     KeycloakProvider({
//       clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
//       clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
//       issuer: `${process.env.AUTH_ISSUER}`,
//     }),
    
    
//     // ...add more providers here
//   ],
//   callbacks: {
//     async jwt({ token, account }: { token: CustomToken; account?: Account }) {
//       const nowTimeStamp = Math.floor(Date.now() / 1000);

//       if (account) {
//         // account is only available the first time this callback is called on a new session (after the user signs in)
//         token.decoded = account.access_token && jwtDecode(account.access_token);
//         token.access_token = account.access_token;
//         token.id_token = account.id_token;
//         token.expires_at = account.expires_at;
//         token.refresh_token = account.refresh_token;
//         return token;
//       } else if (nowTimeStamp < token.expires_at) {
//         // token has not expired yet, return it
//         return token;
//       } 
//     },
//     async session({ session, token }) {
//       // Send properties to the client
//       session.access_token = encrypt(token.access_token); // see utils/sessionTokenAccessor.js
//       session.id_token = encrypt(token.id_token);  // see utils/sessionTokenAccessor.js
//       session.roles = token.decoded.realm_access.roles;
//       session.error = token.error;      
//       return session;
//     },
//   },
// }

// const handler =  NextAuth(authOptions)

// export { handler as GET, handler as POST };

import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { encrypt } from "@/utils/encryption";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { Account, Profile, User } from "next-auth";

interface CustomToken extends JWT {
  decoded?: any;
  access_token?: string;
  id_token?: string;
  expires_at?: number;
  refresh_token?: string;
  error?: string;
}

// Define auth options with correct types
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.DEMO_FRONTEND_CLIENT_ID ?? "",
      clientSecret: process.env.DEMO_FRONTEND_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH_ISSUER ?? "",
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: CustomToken;
      user?: User | null;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }): Promise<CustomToken> {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.decoded = account.access_token ? jwtDecode(account.access_token) : null;
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (token.expires_at && nowTimeStamp < token.expires_at) {
        // Token has not expired
        return token;
      } else {
        // Token expired - Handle refresh logic if implemented
        return { ...token, error: "TokenExpiredError" };
      }
    },

    async session({
      session,
      token,
    }: {
      session: any;
      token: CustomToken;
    }) {
      session.access_token = encrypt(token.access_token ?? "");
      session.id_token = encrypt(token.id_token ?? "");
      session.roles = token.decoded?.realm_access?.roles ?? [];
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

