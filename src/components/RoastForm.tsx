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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="roast" className="block text-sm font-medium text-gray-300">
          Your Roast
        </label>
        <textarea
          id="roast"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Roast"}
      </button>
    </form>
  );
}
