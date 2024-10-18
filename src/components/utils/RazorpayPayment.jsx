
const RazorpayPayment = ({ setShowSuccessmodal }) => {

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      // key: "rzp_test_0tpemkHKm5K1Bc",
      key: "secret_key",
      // key_secret: "19CfJH7LD7vL3iWolG1EUZzw",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "RAZORPAY",
      description: "Thank you for Enrolling",
      image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

        // alert("Transaction successful");
        setShowSuccessmodal(true); // Update the state to show success modal
      },
      prefill: {
        name: "tayib",
        email: "tayib@gmail.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
const show=()=>{
  setShowSuccessmodal(true);
}
  return (
    <div>
      <button
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer">
      Pay now
      </button>
       {/* <button
          onClick={show}
          target="_blank"
          rel="noopener noreferrer">
      Pay now
      </button> */}
    </div>
  )
}

export default RazorpayPayment