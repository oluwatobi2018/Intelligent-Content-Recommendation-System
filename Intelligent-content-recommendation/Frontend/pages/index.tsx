import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Head>
        <title>Content Recommendation Platform</title>
        <meta name="description" content="An AI-powered content recommendation platform" />
      </Head>

      <h1 className="text-3xl font-bold">Welcome to AI Content Recommendation</h1>
      <p className="text-gray-600 mt-2">Personalized content tailored just for you!</p>

      <div className="mt-6 space-x-4">
        <Link href="/content" className="bg-blue-500 text-white px-4 py-2 rounded">
          View Content
        </Link>
        <Link href="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
