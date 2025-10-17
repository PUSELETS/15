import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/app/_trpc/Providers";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" >
      <body className={cn("relative h-full font-sans antialiased", inter.className)} >
        <main className="relative flex flex-col min-h-screen">
          <GoogleOAuthProvider clientId="791155761563-2dhur30vqce0hqh7bt87sov41v3l4tv3.apps.googleusercontent.com">
            <Providers>
              <Navbar />
              <div className="flex-grow flex-1">{children}</div>
            </Providers>
          </GoogleOAuthProvider>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
