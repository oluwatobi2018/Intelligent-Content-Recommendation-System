import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Font: Inter */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" />

        {/* Meta Tags for SEO & Performance */}
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="A high-performance Next.js application with modern styling and optimization." />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
