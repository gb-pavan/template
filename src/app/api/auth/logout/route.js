// import { authOptions } from "../[...nextauth]/route";
// import { getServerSession } from "next-auth"
// import { getIdToken } from "@/utils/sessionTokenAccessor";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (session) {

//     const idToken = await getIdToken();
//     console.log("correcttttt");

//     // this will log out the user on Keycloak side
//     var url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

//     // try {
//     //   const resp = await fetch(url, { method: "GET" });
//     // } catch (err) {
//     //   console.error(err);
//     //   return new Response({ status: 500 });
//     // }
//     return Response.redirect(url, 302);

//   }
//   // return new Response({ status: 200 });
//   return Response.redirect(process.env.NEXTAUTH_URL + "/login", 302);
// }

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const idToken = await getIdToken();
    console.log("Logging out...");

    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

    // Redirect user to Keycloak logout URL
    return Response.redirect(url, 302);
  }

  return Response.redirect(`${process.env.NEXTAUTH_URL}/login`, 302);
}
