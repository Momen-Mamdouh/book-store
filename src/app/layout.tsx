import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, THEME_ID as MATERIAL_THEME_ID, } from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme, joyTheme } from '@/theme';

import type { Metadata } from "next";
import {  Quintessential } from "next/font/google";
import "@/app/globals.css";
import 'leaflet/dist/leaflet.css';

import { ReduxProvider } from '@/app/providers';
import ClientWrapper from '@/app/ClientWrapper';
import UserHydrationProvider  from '@/app/_Providers/UserHydrationProvider ';
import { Toaster } from 'react-hot-toast';



const quintessential = Quintessential({
   variable: "--font-quintessential",
    weight:"400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Book Store",
  description: "NextJs Book Store App",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={` ${quintessential.variable} font-quintessential text-3xl  antialiased main-secondary-color`}>
        <AppRouterCacheProvider>
          <ReduxProvider>
            <ThemeProvider theme={{ [MATERIAL_THEME_ID]: muiTheme }}>
              <JoyCssVarsProvider theme={ joyTheme }>
                <CssBaseline enableColorScheme />
                  <ClientWrapper>
                    <UserHydrationProvider >
                      <Toaster position="bottom-right" reverseOrder={false} />
                      {children}
                    </UserHydrationProvider >
                  </ClientWrapper>
              </JoyCssVarsProvider>
            </ThemeProvider>
                </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}