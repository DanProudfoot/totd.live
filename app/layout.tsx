import React from 'react';

import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <title>TOTD</title>
        </head>
      </head>
      <body>{children}</body>
    </html>
  );
}
