import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";

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
                    {children}
                </Providers>
            </body>
        </html>
    );
}