// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: any;
  }
}

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta property="og:image" content="/images/opengraph.png" />
          <meta name="title" content="Morphix | Parse Unstructured Data" />
          <meta
            name="description"
            content="Describe the data you want and export a .csv in seconds. Parse unstructured data with GPT-4. Try Morphix for free and say goodbye to web scraping. "
          />
          <meta
            name="keywords"
            content="Free web scraper, web scraper io, parse unstructured data"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="author" content="Alexa Kayman" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-FEJ7VYEPN1"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FEJ7VYEPN1');
            `}
          </Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
