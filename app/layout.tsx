import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "./components/shared/header/header";
import Providers from "./providers";
import Footer from "./components/shared/footer/footer";
import TagsPage from "./components/shared/tags/Tag";

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
        <Providers>
          <Header />
          {children}
        </Providers>
        <TagsPage />
        <Footer />
      </body>
    </html>
  );
}
