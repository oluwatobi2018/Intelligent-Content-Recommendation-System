import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter&display=swap" />
      </Head>
      <body className="bg-gray-100 text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
