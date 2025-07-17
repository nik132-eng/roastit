"use client"

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RoastForm({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/roasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, postId }),
      });

      if (res.ok) {
        setText("");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to submit roast", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
      <div>
        <label htmlFor="roast" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
          🔥 Your Roast
        </label>
        <textarea
          id="roast"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3 resize-none transition-all duration-200"
          placeholder="Write your witty roast here... 🔥"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <span className="mr-2">🚀</span>
            Submit Roast
          </>
        )}
      </button>
    </form>
  );
}
