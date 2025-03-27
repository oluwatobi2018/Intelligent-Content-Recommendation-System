import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-red-600"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mt-2 text-gray-600 dark:text-gray-400 text-center"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Go Home
      </button>
    </div>
  );
}
