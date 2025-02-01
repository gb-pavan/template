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

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.DEMO_FRONTEND_CLIENT_ID ?? "",
      clientSecret: process.env.DEMO_FRONTEND_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH_ISSUER ?? "",
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
  console.log("Redirect URL:", url);
  
  // Check if the URL contains 'localhost:3000'
  // if (/^localhost:3000\/?$/.test(url)) {
  //   return `${url}/check`; // Use template literal for concatenation
  // }
  
  // Check if the URL contains 'check'
  if (url.includes('test')) {
    return url.replace('test','check');
  }
  if (url.includes('check')) {
    // return `${url}/profile`; // Use template literal for concatenation
    return url.replace('check', '/');
  }

  // Default behavior
  return `${baseUrl}/test`; // Fallback to a default page using template literal
},

//     async redirect({ url, baseUrl }) {
//   console.log("Redirect URL:", url);
  
//   // Check if the URL contains 'localhost:3000'
//   if (url.includes('localhost:3000')) {
//     return url + "/check";
//   }
  
//   // Check if the URL contains 'check'
//   if (url.includes('check')) {
//     return url + "/profile";
//   }

//   // Default behavior
//   return baseUrl + "/profile"; // Fallback to a default page
// },
    // async redirect({ url, baseUrl }) {
    //   console.log("Redirect URL:", url);
    //   return url.startsWith(baseUrl)
    //     ? url + "/check"

    //     : baseUrl + "/profile"; // Change this to your desired page
    // },

    // async redirect({ url }) {
    //   return url;
    // },


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

