import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "日本語動詞活用練習",
  description: "Japanese Verb Conjugation Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className="container mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
