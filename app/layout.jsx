import "./globals.css";
import { Zain } from "next/font/google"

const zain = Zain({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({ children }) {
    return (
      <html lang="ar" dir="rtl" className={zain.className}>
        <body>{children}</body>
      </html>
    )
}