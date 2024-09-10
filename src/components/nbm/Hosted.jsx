import React, { useEffect } from 'react';

const Hosted = ({sessionID}) => {
  console.log(sessionID)
  useEffect(() => {
    // Load the Checkout script
    const script = document.createElement('script');
    script.src = "https://test-nbm.mtf.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.setAttribute('data-error', 'errorCallback');
    script.setAttribute('data-cancel', 'cancelCallback');
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.Checkout.configure({
        session: {
          id: sessionID
        }
      });

      // Show the embedded page once the script is loaded and configured
      window.Checkout.showEmbeddedPage('#embed-target');
    };

    window.errorCallback = (error) => {
      console.log(JSON.stringify(error));
    };

    window.cancelCallback = () => {
      console.log('Payment cancelled');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="embed-target"></div>
    </div>
  );
};

export default Hosted;
