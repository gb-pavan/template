'use client';
import React from "react";
import { signOut } from "next-auth/react";


const SimpleComponent = () => {

    async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error("Logout Error:", err);
  }
}

const clearClientData = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Optional: Clear cookies (if any authentication token is stored in cookies)
    // document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Example cookie
    
    // Optional: Clear any other stored data or application-specific states
    // For example: reset Redux/MobX state, etc.
  }
  return (
    <div className="my-3">
        
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => {
            keycloakSessionLogOut().then(() => {clearClientData();signOut()});
          }}
        >
          Log out
        </button>
      </div>
  );
};

export default SimpleComponent;
