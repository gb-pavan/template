"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { Session } from "next-auth";

// Function to handle Keycloak logout
async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error("Logout Error:", err);
  }
}

function AuthStatus() {
  // Typed session and status from useSession
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status !== "loading" &&
      session &&
      (session as Session & { error?: string }).error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (status === "loading") {
    return <div className="my-3">Loading...</div>;
  } else if (session) {
    return (
      <div className="my-3">
        Logged in as{" "}
        <span className="text-yellow-100">
          {(session.user?.email as string) ?? "No Email"}
        </span>{" "}
        {/* <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/login" }));
          }}
        >
          Log out
        </button> */}
      </div>
    );
  }

  return (
    <div className="my-3">
      Not logged in.{" "}
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        onClick={() => signIn("keycloak")}
      >
        Log in
      </button>
    </div>
  );
}

export default AuthStatus;
