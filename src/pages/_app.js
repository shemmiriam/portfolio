import Theme from '../styles/theme';
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure</title>
        <meta name="description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa. BITZ IT Consulting Ltd." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Miriam Shem" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure" />
        <meta property="og:description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa." />
        <meta property="og:image" content="https://portfolio-shemmmiriam.vercel.app/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://portfolio-shemmmiriam.vercel.app/" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Miriam Shem — Software Engineer | AI Solutions | Digital Public Infrastructure" />
        <meta property="twitter:description" content="Software Engineer with 3+ years of experience in AI solutions, systems integration, and Digital Public Infrastructure across East Africa." />
        <meta property="twitter:image" content="https://portfolio-shemmmiriam.vercel.app/images/banner.png" />
        <link key="canonical" rel="canonical" href="https://portfolio-shemmmiriam.vercel.app/" />
      </Head>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}
