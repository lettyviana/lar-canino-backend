import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/ui/styles/global.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lar Canino - Administração",
  description: "Painel de administração do Lar Canino",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
