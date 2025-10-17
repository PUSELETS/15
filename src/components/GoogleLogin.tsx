'use client'
import { trpc } from '@/app/_trpc/client'
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginComponent = () => {

    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log(decoded);
                    } else {
                        console.error('No credential found in response');
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    );
};

export default GoogleLoginComponent;