import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OIML R-76 Digital Testing & Model Approval System | National Legal Metrology Portal",
  description: "Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution, Government of India - Official NAWI Metrological Evaluation Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
