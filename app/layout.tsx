import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TriviaQuest",
  description: "Site com diversos quizes sobre entretenimento em geral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR} appearance={{baseTheme: dark}}>
      <html lang="pt-BR">
        <body className={font.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
