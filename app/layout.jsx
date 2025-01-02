import { ThemeProvider } from "@/components/template/ConfigContext";
import "./globals.css";
import { Zain } from "next/font/google";

const zain = Zain({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({ children }) {
    return (
      <ThemeProvider>
        <html lang="ar" dir="rtl" className={zain.className}>
          <body className="relative">
            {children}
          </body>
        </html>
      </ThemeProvider>
    );
}