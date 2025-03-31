import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <Head>
        <title>AI Content Recommendation Platform</title>
        <meta name="description" content="An AI-powered platform delivering personalized content recommendations." />
        <meta name="keywords" content="AI, content recommendation, machine learning, personalization" />
        <meta name="author" content="Oluwatobi Adeogun" />
        <meta property="og:title" content="AI Content Recommendation Platform" />
        <meta property="og:description" content="Discover AI-powered personalized content just for you!" />
      </Head>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to AI Content Recommendation</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">Personalized content tailored just for you!</p>

      <div className="mt-6 flex space-x-4">
        <Link
          href="/content"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg transition duration-300"
          aria-label="Go to Content Page"
        >
          View Content
        </Link>
        <Link
          href="/dashboard"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-3 rounded-lg transition duration-300"
          aria-label="Go to Dashboard"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
