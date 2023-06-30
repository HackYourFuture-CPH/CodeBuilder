import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "./components/shared/header/header";
import Providers from "./providers";
import Tags from "./components/shared/tags/tags";
import TagsPage from "./tags/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Class 24 Project (Hack Your Future Aarhus)",
  description: "A project at the end of the Hack Your Future curriculum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Tags />
        <TagsPage />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
