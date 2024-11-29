import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Kakao SDK loaded");
          window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
          console.log("Kakao initialized:", window.Kakao?.isInitialized());
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
