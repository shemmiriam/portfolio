import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang='en-GB'>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <meta name="title" content="Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure" />
          <meta name="description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa. BITZ IT Consulting Ltd." />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure" />
          <meta property="og:description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa." />
          <meta property="og:image" content="/images/banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure" />
          <meta property="twitter:description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa." />
          <meta property="twitter:image" content="/images/banner.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
