"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })});

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks for subscribing! 🎉");
        setEmail("");


        // Track subscription in analytics (if GA4 is set up)
        if (typeof window !== "undefined" && (window as unknown as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as Window & { gtag: (...args: unknown[]) => void }).gtag("event", "email_signup", {
            method: "homepage_capture"});
        }
      } else {
        const data = await response.json();
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-purple-100 dark:border-gray-700">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mb-3">
          <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Get notified about new tools and features
        </p>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center gap-2 py-4">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <p className="text-green-700 dark:text-green-400 font-medium text-center">
            {message}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              aria-label="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your.email@example.com"
              disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 active:from-purple-700 active:to-blue-700 text-white font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>

          {status === "error" && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{message}</p>
            </div>
          )}
        </form>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        We respect your privacy. Unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-purple-600 dark:hover:text-purple-400">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
