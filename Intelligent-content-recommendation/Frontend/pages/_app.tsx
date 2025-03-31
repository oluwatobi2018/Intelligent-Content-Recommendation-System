import "@/styles/globals.css"; // Import global styles
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("App Mounted - Global Setup Ready!");
  }, []);

  return (
    <>
      {/* Global Meta Information */}
      <Head>
        <title>Intelligent AI Recommendation System</title>
        <meta name="description" content="A powerful Next.js application with enhanced features." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Wrap App with Providers for State Management */}
      <AuthProvider>
        <ContentProvider>
          {/* Page Component */}
          <Component {...pageProps} />
        </ContentProvider>
      </AuthProvider>
    </>
  );
}
