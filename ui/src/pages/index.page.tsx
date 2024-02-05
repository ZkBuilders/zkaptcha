import Head from 'next/head';
import { useEffect, useState } from 'react';

const captchaImages = {
  1: "https://tomato-capitalist-zebra-872.mypinata.cloud/ipfs/QmfFVUDT8WLED79MyMJuBZAmkzVWqq7zV5yeavkgpdsJbZ",
  // Add more entries as needed
};

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCaptchaId, setCurrentCaptchaId] = useState(1);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCaptchaChange = (id: number) => {
    setCurrentCaptchaId(id);
  };

  useEffect(() => {
    (async () => {
      const { Mina, PublicKey } = await import('o1js');
      const { VerifyHash } = await import('../../../contracts/build/src/');

      const zkAppAddress = '';

      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
        );
      }
      
      const zkApp = new VerifyHash(PublicKey.fromBase58(zkAppAddress));
      

    })();
  }, []);

  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <main className="text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Mina zkApp UI</h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={openPopup}
            >
              Verify Captcha
            </button>
          </div>
        </main>
      </div>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <img
              crossOrigin="anonymous"
              src={captchaImages[currentCaptchaId as keyof typeof captchaImages]}  
              alt="Captcha Image"
              className="mb-4"
            />
            <label className="block mb-4">
              Enter Captcha:
              <input className="border rounded py-2 px-3" type="text" />
            </label>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closePopup}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
