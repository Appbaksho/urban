import type { Metadata } from "next";
import "./globals.css";
import ReduxWrapper from "@/redux/redux-wrapper";
import {Poppins} from 'next/font/google'
import UnderConstructionPage from "@/components/under-construction/under-construction";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets:["latin"],
})

export const metadata: Metadata = {
  title: "Urban",
  description: "Urban is a modern e-commerce website that sells urban clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <ReduxWrapper>
          {/* <UnderConstructionPage/> */}
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
