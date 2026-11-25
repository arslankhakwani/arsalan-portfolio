import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arsalan-khakwani-portfolio.vercel.app"),
  title: {
    default: `${profile.name} — Laravel Developer & .NET Freelancer`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Personal portfolio of Muhammad Arsalan, a backend developer at Netrix Cloud building reliable PHP, Laravel, and MySQL systems, with freelance experience in ASP.NET Core & MVC.",
  keywords: [
    "Muhammad Arsalan",
    "Laravel Developer",
    "PHP Backend Developer",
    "MySQL",
    "ASP.NET Core",
    "ASP.NET MVC",
    "Islamabad",
    "Pakistan",
    "Netrix Cloud",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${profile.name} — Laravel Developer | Also experienced in .NET`,
    description:
      "Backend developer building reliable web applications with Laravel, MySQL, REST APIs, multi-tenancy, and ASP.NET Core / MVC.",
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Backend Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Laravel Developer | Also experienced in .NET`,
    description:
      "Backend developer building reliable PHP, Laravel, MySQL, and ASP.NET applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
