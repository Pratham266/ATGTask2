import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <script src="https://cdn.tailwindcss.com" async></script>
      </Head>
      <div>
      <body className='bg-[#d1fae5]'>
        <Main />
        <NextScript />
      </body>
      </div>
    </Html>
  )
}
