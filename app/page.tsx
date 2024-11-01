"use client";

import { useState, useEffect } from "react";
import { Github, Send, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function PromptEnhancer() {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(false)
    document.documentElement.classList.remove('dark')
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setEnhancedPrompt("");

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance prompt");
      }

      const data = await response.json();
      setEnhancedPrompt(data.enhancedPrompt);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      setError(
        "An error occurred while enhancing the prompt. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(enhancedPrompt)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? "bg-[#1a0f0f] text-rose-100" : "bg-[#e0f5f5] text-emerald-900"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b ${
          isDark ? "border-rose-900/20" : "border-emerald-200"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className={`text-2xl font-bold ${
                isDark ? "text-rose-300" : "text-emerald-700"
              }`}
            >
              Spiritual
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-1 transition-colors rounded-full focus:outline-none ${
                isDark
                  ? "text-rose-300 hover:text-rose-100 hover:bg-rose-800/30"
                  : "text-emerald-700 hover:text-emerald-900 hover:bg-emerald-200/50"
              }`}
            >
              <Image
                src={isDark ? "/reaper2.png" : "/ghost.png"}
                alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            <Link
              href="https://github.com/dancer/spiritual"
              className={`flex items-center space-x-2 transition-colors ${
                isDark
                  ? "text-rose-300 hover:text-rose-200"
                  : "text-emerald-600 hover:text-emerald-800"
              }`}
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h2
              className={`text-4xl font-bold ${
                isDark ? "text-rose-300" : "text-emerald-800"
              }`}
            >
              Prompt Enhancer
            </h2>
            <p className={isDark ? "text-rose-200" : "text-emerald-700"}>
              Transform your prompts into powerful, detailed instructions
            </p>
          </div>

          <Card
            className={`relative ${
              isDark
                ? "bg-rose-950/30 border-rose-900/20"
                : "bg-white/80 border-emerald-100"
            } backdrop-blur shadow-lg`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="absolute -top-[70px] -left-8 z-10">
                <Image
                  src={isDark ? "/gcatdark.gif" : "/gcat.gif"}
                  alt="Cat mascot"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <Textarea
                placeholder="Enter your prompt here..."
                className={`min-h-[120px] transition-colors resize-none focus-visible:ring-offset-0 ${
                  isDark
                    ? "bg-rose-950/50 border-rose-900/30 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-500 focus-visible:ring-rose-500 focus-visible:border-rose-500 focus:ring-2 focus:ring-rose-500"
                    : "bg-white/50 border-emerald-200 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 focus-visible:ring-emerald-500"
                }`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleEnhancePrompt}
                  className={`${
                    isDark
                      ? "bg-rose-800 hover:bg-rose-700 text-rose-50"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Enhance Prompt
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Card
              className={
                isDark
                  ? "bg-red-950/50 border-red-900/20"
                  : "bg-red-50 border-red-200"
              }
            >
              <CardContent className="p-4 text-red-400">{error}</CardContent>
            </Card>
          )}

          {enhancedPrompt && (
            <Card
              className={`${
                isDark
                  ? "bg-rose-950/30 border-rose-900/20"
                  : "bg-white/80 border-emerald-100"
              } backdrop-blur shadow-lg`}
            >
              <CardContent className="p-6 space-y-4">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-rose-300" : "text-emerald-700"
                  }`}
                >
                  Enhanced Prompt
                </h3>
                <pre
                  className={`whitespace-pre-wrap font-mono text-sm p-4 rounded-lg ${
                    isDark
                      ? "bg-rose-950/50 text-rose-100"
                      : "bg-emerald-50/50 text-emerald-800"
                  }`}
                >
                  {enhancedPrompt}
                </pre>
                <div className="flex justify-end">
                  <Button
                    onClick={handleCopyToClipboard}
                    variant="outline"
                    className={`${
                      isDark
                        ? "border-rose-900/30 hover:bg-rose-950/50 text-rose-300"
                        : "border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                    } ${isCopied ? "bg-emerald-100" : ""}`}
                    disabled={isCopied}
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-3 mt-auto text-sm ${
          isDark ? "border-rose-900/20" : "border-emerald-200"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className={`text-xs ${isDark ? "text-rose-300" : "text-emerald-600"}`}>
            © {new Date().getFullYear()} Spiritual. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
