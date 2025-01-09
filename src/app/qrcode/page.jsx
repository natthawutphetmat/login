"use client";
import React, { useEffect, useState } from 'react';
 
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
 

export default function Page({ params }) {
 
 
  const [totalPrice, setTotalPrice] = useState(100);
  const [qrCode, setQrCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (totalPrice > 0) {
      const qrCodeData = generatePayload("1969800077553", { amount: totalPrice });
      setQrCode(qrCodeData);
    }
  }, [totalPrice]);

  return (
   <>
 
<div className="text-center">
            
            {qrCode && <QRCode value={qrCode} style={{ width: 200, height: 200 }} alt='QR Code' />}
            </div>
 
   </>
  );
}
