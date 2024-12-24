import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CALI",
  description: "크리스마스를 기다리며 플레이리스트를 만들어보세요",
  openGraph: {
    title: "CALI",
    description: "크리스마스를 기다리며 플레이리스트를 만들어보세요",
    images: [
      {
        url: "/cali_logo.png",
        width: 1200,
        height: 630,
        alt: "cali logo",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CALI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
