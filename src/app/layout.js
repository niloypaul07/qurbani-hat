import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${outfit.className} min-h-screen flex flex-col bg-white`}>

       
          {children}
          
      

      </body>
    </html>
  );
}