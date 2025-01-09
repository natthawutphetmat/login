 
// import { GoogleAnalytics } from '@next/third-parties/google'
// import { GoogleTagManager } from '@next/third-parties/google'



import Header from './components/headers'
import Footer from './components/footer'
import "./setyls/style.css";  
import "./setyls/nav.css";  
import "./setyls/form.css";  
import "./setyls/globals.css";  
import Profile from './profile/page';

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./Providers";

const geistSans = {
  variable: "--font-geist-sans",  
};

const geistMono = {
  variable: "--font-geist-mono",  
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="mFESL3SA5vVBU7zoYemzaPAw5NuqtNcvkAa2aSQ1QEA" />
      <meta name="keywords" content="ยิงads,facebook,สายเทา,โฆษณา,ยิงads facebook สายเทา,รับยิงads,รับยิงแอด สายเทา,facebook ads,google ads,google,
        รับยิงแอด,ads,รับทำโฆษณา,รับโฆษณา,Facebook,การตลาด,โฆษณาออนไลน์,เว็บไซต์,ตลาดเป้าหมาย,โฆษณาบนโซเชียลมีเดีย,Google Ads,การโฆษณาบน Facebook,การโฆษณาออนไลน์บนสื่อต่างๆ,
        การตลาดออนไลน์,การโปรโมท,โฆษณา Facebook,การโฆษณา Google,การโฆษณาสินค้า,การโฆษณาโปรโมชั่น,วิธีการโฆษณา,ความสำเร็จในการตลาด,บริการโฆษณา,การตลาดออนไลน์บน Facebook,
        การโฆษณาบนเว็บ,การวางแผนโฆษณา,รับจ้างโฆษณา ยิงads,facebook,สายเทา,โฆษณา,ยิงads facebook สายเทา,รับยิงads,รับยิงแอด สายเทา,facebook ads,google ads,google,ads,สอนยิงแอด,
        สอนยิงแอด Conversion,สอนยิงแอดสายเทา,ยิงแอดสายเทา,ยิงโฆษณาสายเทา,รับทำ seo สายเทา,รับทำ seo สายดำ,แอดสายเทา,รับยิงแอดสายเทา,กูเกิ้ลแอดสายเทา,รับทํา google ads,สายเทา seo สายเทา,
        ตลาดสีเทา,แอดสีเทา,adsสีเทา,กราฟฟิกสายเทา,ยิงแอดเทา,รับยิงแอดfacebookสายเทา,รูปยิงแอดสายเทา,รับจ้างสายเทา,รับโฆษณาสายเทา" />
      <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16714335017"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
        
              gtag('config', 'AW-16714335017');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
   
    


         <AuthProvider>
          
         <Header/> 
          {children}

          
        </AuthProvider>
 
         


        <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
     
    
{/*     
        <GoogleTagManager gtmId="GTM-MNDXXQCF" />
        <GoogleAnalytics gaId="G-X3BDJ31PJ0" /> */}

        <Footer/>
      </body>
    </html>
  );
}
