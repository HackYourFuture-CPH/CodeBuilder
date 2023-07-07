import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "./components/shared/header/header";
import Providers from "./providers";
import Footer from "./components/shared/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBuilder: Empowering Developers with Code Snippets and Knowledge Sharing",
  description: "A project at the end of the Hack Your Future curriculum",
  icons: "/images/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <Header />
            {children}
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
