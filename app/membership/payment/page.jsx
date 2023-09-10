"use client";

import { useFlutterwave } from "flutterwave-react-v3";
import Image from "next/image";
import { usePaystackPayment } from "react-paystack";

const Payment = () => {
  // Pay with flutterwave
  const flutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_API_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "confidence.isaiah@eha.ng",
      phonenumber: "09034107411",
      name: "Confidence Isaiah",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

  const payWithFlutterWave = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  // Pay with paystack
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: "confidence.isaiah@eha.ng",
    amount: 100000, // Amount is in the country's lowest currency i.e Kobo, so 20000 kobo = N200
    publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
  };

  const handlePaystackPayment = usePaystackPayment(paystackConfig);

  const onPaymentSuccess = () => {
    console.log("");
  };

  const onPaystackWindowClose = () => {};

  const payWithPaystack = (data) => {
    handlePaystackPayment(() => onPaymentSuccess(), onPaystackWindowClose);
  };

  return (
    <>
      <section className="relative">
        <div
          className="relative bg-cover h-screen"
          id="login-background-image"
        ></div>

        {/* Overlay */}
        <div className="w-screen h-screen absolute top-0 left-0 z-10 flex flex-col justify-center items-center backdrop-blur-md bg-black/10 px-6">
          <div className="md:p-10 w-6/12 h-fit flex flex-row">
            <div className="w-full bg-white px-20 py-20">
              <p className="text-2xl text-purplestrong font-semibold">
                Make Payment
              </p>
              <p className="text-md text-inactive/80">
                Select payment option to complete your membership registration.
              </p>

              <div className="flex flex-row justify-between mt-16">
                <div className="w-5/12 bg-gray py-10 flex flex-col justify-center items-center rounded-md border-dark-gray-dashed">
                  <div className="w-6/12 bg-white w-full h-28 rounded-md px-2 flex flex-col justify-center items-center overview-card">
                    <Image
                      src="/images/flutterwave.png"
                      alt=""
                      width={200}
                      height={200}
                      className="payment-image"
                    />
                  </div>

                  <p className="text-blue-normal mt-5">Flutterwave</p>
                  <button
                    onClick={payWithFlutterWave}
                    className="payment-button text-sm mt-16"
                  >
                    Proceed
                  </button>
                </div>

                <div className="w-5/12 bg-medium-gray py-10 flex flex-col justify-center items-center rounded-md border-dark-gray-dashed ml-16">
                  <div className="w-6/12 bg-white w-full h-28 rounded-md px-2 flex flex-col justify-center items-center overview-card">
                    <Image
                      src="/images/paystack.png"
                      alt=""
                      width={200}
                      height={200}
                      className="payment-image"
                    />
                  </div>

                  <p className="text-blue-normal mt-5">Paystack</p>
                  <button
                    onClick={payWithPaystack}
                    className="payment-button text-sm mt-16"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
