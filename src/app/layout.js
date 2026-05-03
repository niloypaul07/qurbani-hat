import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${outfit.className} min-h-full flex flex-col`}>
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}