'use client'

import { signIn } from 'next-auth/react';

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <button
                onClick={() => signIn('keycloak')} // Replace 'keycloak' with the provider you're using
                className="bg-blue-900 text-white py-2 px-4 rounded"
            >
                Log in with Keycloak
            </button>
        </div>
    )
}

export default Login;
