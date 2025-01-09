import Link from 'next/link';

export default async function HomePage() {

  let data = await fetch('https://apifb.myad-dev.com/cart')
  let products = await data.json()
  
  return (
    <>
    <head>
    
<title>บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai</title>
<meta name="title" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />
<meta name="description" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />


 
<meta property="og:type" content="website" />
<meta property="og:url" content="https://accfb.myads.dev/" />
<meta property="og:title" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />
<meta property="og:description" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />
<meta property="og:image" content="https://accfb.myads.dev/img/logo.png" />

 
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://accfb.myads.dev/" />
<meta property="twitter:title" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />
<meta property="twitter:description" content="บัญชี Facebook เขียวยิงแอด
บัญชี Facebook Thai" />
<meta property="twitter:image" content="https://accfb.myads.dev/img/logo.png" />
 
<meta name="robots" content="index" />
<link rel="canonical" href="https://www.myads.dev" />

    </head>

<div className="container">
  {products.map((product) => (
    <div key={product.id} className="homebox">
      <div className="box">
        <div className="boximg">
          <img 
            src="/img/fblogo.png" 
            width={100} 
            className="img-fluid rounded-start" 
            alt="fblogo"
          />
        </div>
        <div className="boxx text-center">
          <div className="title h2">{product.titel}</div>
          <div className="name h4">{product.name}</div>
        </div>
        <div className="btns">
          <Link className="btn btn-info" href={`/product/${product.id}`}>เพิ่ม</Link>
        </div>
      </div>
    </div>
  ))}
</div>

    </>
  );
}

