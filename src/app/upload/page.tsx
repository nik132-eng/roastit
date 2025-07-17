"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import InteractiveDots from "@/components/InteractiveDots"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const router = useRouter()

  const handleImageChange = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleImageChange(files[0])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title || !image) {
      setError("Please provide a title and an image.")
      return
    }
    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", image)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      const data = await res.json()
      router.push(`/post/${data.id}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Interactive Dots Background */}
      <div className="absolute inset-0 opacity-30">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#d1d5db"
          gridSpacing={35}
          animationSpeed={0.002}
        />
      </div>
      
      <div className="relative z-10 container mx-auto p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Upload & Get Roasted! 🔥
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Share your content and let the community work their magic ✨
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            {/* Title Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                What should we roast? 🎯
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a catchy title..."
                className="w-full px-6 py-4 text-lg rounded-2xl bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 backdrop-blur-sm"
                required
              />
            </motion.div>

            {/* Image Upload */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8"
            >
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Upload your masterpiece 📸
              </label>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                className={`relative border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                } ${preview ? "bg-gray-50 dark:bg-gray-800" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageChange(file)
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {preview ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative max-w-md mx-auto">
                      <Image
                        src={preview}
                        alt="Preview"
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => {
                          setImage(null)
                          setPreview(null)
                        }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </motion.button>
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      Perfect! Ready to get roasted 🎉
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      y: dragActive ? -5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl mb-4"
                    >
                      📤
                    </motion.div>
                    <div>
                      <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Drag & drop your image here
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        or click to browse your files
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-2xl"
              >
                <p className="text-red-600 dark:text-red-400 font-medium">⚠️ {error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isUploading || !title || !image}
              className={`w-full py-4 px-8 text-xl font-bold rounded-2xl transition-all duration-300 ${
                isUploading || !title || !image
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:shadow-2xl motion-preset-glow"
              }`}
            >
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  ⏳
                </motion.div>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  Let&apos;s Get This Roasted!
                  <span className="ml-2">🔥</span>
                </span>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
