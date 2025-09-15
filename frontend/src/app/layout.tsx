import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import Navbar from '@/components/ui/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Join Us – Heritage Bridge',
  description: 'Join the Heritage Support Network. Your time and expertise will support small businesses operating inside heritage buildings.',
  robots: 'noindex, nofollow',
  authors: [{ name: 'Heritage Bridge' }],
  keywords: 'heritage, support, network, join, professionals',
  viewport: 'width=device-width, initial-scale=1.0',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: 'https://heritagerevival.co.uk/feed/', title: 'Heritage Bridge » Feed' },
        { url: 'https://heritagerevival.co.uk/comments/feed/', title: 'Heritage Bridge » Comments Feed' },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Emoji settings script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window._wpemojiSettings = {"baseUrl":"https://s.w.org/images/core/emoji/16.0.1/72x72/","ext":".png","svgUrl":"https://s.w.org/images/core/emoji/16.0.1/svg/","svgExt":".svg","source":{"concatemoji":"https://heritagerevival.co.uk/wp-includes/js/wp-emoji-release.min.js?ver=6.8.2"}};
            /*! This file is auto-generated */
            !function(s,n){var o,i,e;function c(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function p(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data),a=(e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0),new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data));return t.every(function(e,t){return e===a[t]})}function u(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);for(var n=e.getImageData(16,16,1,1),a=0;a<n.data.length;a++)if(0!==n.data[a])return!1;return!0}function f(e,t,n,a){switch(t){case"flag":return n(e,"\\ud83c\\udff3\\ufe0f\\u200d\\u26a7\\ufe0f","\\ud83c\\udff3\\ufe0f\\u200b\\u26a7\\ufe0f")?!1:!n(e,"\\ud83c\\udde8\\ud83c\\uddf6","\\ud83c\\udde8\\u200b\\ud83c\\uddf6")&&!n(e,"\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc65\\udb40\\udc6e\\udb40\\udc67\\udb40\\udc7f","\\ud83c\\udff4\\u200b\\udb40\\udc67\\u200b\\udb40\\udc62\\u200b\\udb40\\udc65\\u200b\\udb40\\udc6e\\u200b\\udb40\\udc67\\u200b\\udb40\\udc7f");case"emoji":return!a(e,"\\ud83e\\udedf")}return!1}function g(e,t,n,a){var r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):s.createElement("canvas"),o=r.getContext("2d",{willReadFrequently:!0}),i=(o.textBaseline="top",o.font="600 32px Arial",{});return e.forEach(function(e){i[e]=t(o,e,n,a)}),i}function t(e){var t=s.createElement("script");t.src=e,t.defer=!0,s.head.appendChild(t)}"undefined"!=typeof Promise&&(o="wpEmojiSettingsSupports",i=["flag","emoji"],n.supports={everything:!0,everythingExceptFlag:!0},e=new Promise(function(e){s.addEventListener("DOMContentLoaded",e,{once:!0})}),new Promise(function(t){var n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+g.toString()+"("+[JSON.stringify(i),f.toString(),p.toString(),u.toString()].join(",")+"));",a=new Blob([e],{type:"text/javascript"}),r=new Worker(URL.createObjectURL(a),{name:"wpTestEmojiSupports"});return void(r.onmessage=function(e){c(n=e.data),r.terminate(),t(n)})}catch(e){}c(n=g(i,f,p,u))}t(n)}).then(function(e){for(var t in e)n.supports[t]=e[t],n.supports.everything=n.supports.everything&&n.supports[t],"flag"!==t&&(n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&n.supports[t]);n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&!n.supports.flag,n.DOMReady=!1,n.readyCallback=function(){n.DOMReady=!0}}).then(function(){return e}).then(function(){var e;n.supports.everything||(n.readyCallback(),(e=n.source||{}).concatemoji?t(e.concatemoji):e.wpemoji&&e.twemoji&&(t(e.twemoji),t(e.wpemoji)))}))}((window,document),window._wpemojiSettings);
            `,
          }}
        />

        {/* WordPress API links */}
        <link rel="https://api.w.org/" href="https://heritagerevival.co.uk/wp-json/" />
        <link rel="alternate" type="application/json" href="https://heritagerevival.co.uk/wp-json/wp/v2/pages/218" />
        <link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://heritagerevival.co.uk/xmlrpc.php?rsd" />

        {/* Canonical and shortlink */}
        <link rel="canonical" href="https://heritagerevival.co.uk/join-us/" />
        <link rel="shortlink" href="https://heritagerevival.co.uk/?p=218" />

        {/* oEmbed links */}
        <link rel="alternate" type="application/json+oembed" href="https://heritagerevival.co.uk/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fheritagerevival.co.uk%2Fjoin-us%2F" />
        <link rel="alternate" type="text/xml+oembed" href="https://heritagerevival.co.uk/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fheritagerevival.co.uk%2Fjoin-us%2F&amp;format=xml" />

        {/* Generator meta */}
        <meta name="generator" content="WordPress 6.8.2" />
        <meta name="generator" content="Elementor 3.30.0; features: e_font_icon_svg, additional_custom_breakpoints, e_element_cache; settings: css_print_method-external, google_font-enabled, font_display-swap" />

        {/* Breakpoints script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var breakpoints = [{"label":"Desktop","slug":"Desktop","value":"base","direction":"max","isActive":true,"isRequired":true},{"label":"Tablet","slug":"Tablet","value":"1024","direction":"max","isActive":true,"isRequired":true},{"label":"Mobile","slug":"Mobile","value":"767","direction":"max","isActive":true,"isRequired":true}];
            `,
          }}
        />

        {/* Lazy loading styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload),
            .e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
              background-image: none !important;
            }
            @media screen and (max-height: 1024px) {
              .e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload),
              .e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload) * {
                background-image: none !important;
              }
            }
            @media screen and (max-height: 640px) {
              .e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload),
              .e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload) * {
                background-image: none !important;
              }
            }
            `,
          }}
        />

        {/* Scroll-to-top script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Show the scroll-to-top button when the user scrolls down 300px
            window.onscroll = function() {
              let scrollButton = document.querySelector('.scroll-to-top-container');
              if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollButton.classList.add('show');
              } else {
                scrollButton.classList.remove('show');
              }
            };

            // Smooth scroll to the top when the button is clicked
            document.querySelector('#scrollToTopBtn')?.addEventListener('click', function(e) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={{ token: { colorPrimary: '#722ed1' } }}>
            <Navbar />
            <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
              {children}
            </div>
          </ConfigProvider>
        </AntdRegistry>

        {/* Scroll to top button */}
        <div className="scroll-to-top-container show">
          <a href="/join-us/" className="scroll-to-top-link" id="scrollToTopBtn">
            <i className="fa fa-user-plus"></i> Join us as a member
          </a>
        </div>

        {/* Lazy loading script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const lazyloadRunObserver = () => {
              const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
              const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    let lazyloadBackground = entry.target;
                    if (lazyloadBackground) {
                      lazyloadBackground.classList.add('e-lazyloaded');
                    }
                    lazyloadBackgroundObserver.unobserve(entry.target);
                  }
                });
              }, { rootMargin: '200px 0px 200px 0px' });
              lazyloadBackgrounds.forEach((lazyloadBackground) => {
                lazyloadBackgroundObserver.observe(lazyloadBackground);
              });
            };
            const events = [
              'DOMContentLoaded',
              'elementor/lazyload/observe',
            ];
            events.forEach((event) => {
              document.addEventListener(event, lazyloadRunObserver);
            });
            `,
          }}
        />
      </body>
    </html>
  );
}
