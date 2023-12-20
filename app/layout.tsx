"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Providers } from "./Provider";
import React, { FC, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import { SessionProvider } from "next-auth/react";

// import socketIO from "socket.io-client";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, {withCredentials: true, transports: ["websocket"] });
// // const socketId = socketIO('http://localhost:8000/',{  
//   withCredentials: true,
//   transports: ["websocket"]
// })

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { ThemeProvider } from "./utils/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat `}
        >
          <Providers>
            <SessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                
                  <div>{children}</div>
                
                <Toaster position="top-center" reverseOrder={false} />
              </ThemeProvider>
            </SessionProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  // useEffect(() => {
  //   socketId.on("connection", () => {});
  // }, []);

  return <div>{isLoading ? <Loader /> : <div>{children} </div>}</div>;
};
