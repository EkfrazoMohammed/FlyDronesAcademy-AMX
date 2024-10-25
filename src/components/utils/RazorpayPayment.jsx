// import React from "react";
// import axios from "axios";

// const RazorpayPayment = ({ setShowSuccessmodal, orderData }) => {
  
//   // Load Razorpay script dynamically
//   function loadScript(src) {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   }

//   // Show Razorpay payment modal
//   async function showRazorpay(orderId) {
//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     try {
//       const payload = {
//         order_id: orderId, // Pass actual order_id
//         amount: Number(orderData?.amount),
//       };
//       console.log(payload);

//       const paymentData = await axios.post("http://localhost:8000/api/razorpay_payment/", payload);
//       const { order_id, currency, amount: finalAmount } = paymentData.data;

//       const options = {
//         key: "rzp_test_Z6PoT6HRL71TiC",
//         amount: finalAmount.toString(),
//         currency: currency,
//         order_id: order_id,
//         name: "RAZORPAY",
//         description: "Thank you for Enrolling",
//         image: "http://localhost:1337/logo.svg",
//         handler: async function (response) {
//           const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
//           console.table(response);
//           console.log('Verifying payment...');

//           try {
//             const verificationResponse = await axios.post("http://localhost:8000/api/verify_payment/", {
//               payment_id: razorpay_payment_id,
//               razorpay_order_id: razorpay_order_id,
//               signature: razorpay_signature,
//               order_id: orderId,
//             });

//             console.log('Payment verified successfully:', verificationResponse.data);
//             setShowSuccessmodal(true);
//           } catch (error) {
//             console.error("Payment verification failed:", error.response ? error.response.data : error);
//             alert("Payment verification failed. Please try again.");
//           }
//         },
//         prefill: {
//           name: "tayib",
//           email: "tayib@gmail.com",
//           phone_number: "9899999999",
//         },
//         theme: {
//           color: "#185fab", // Customize your theme color
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error("Payment initiation failed:", error.response ? error.response.data : error);
//       alert("Failed to initiate payment.");
//     }
//   }

//   // Handle payment process
//   const handlePayment = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/order/", {
//         customer: orderData?.customerId, // Replace with actual customer ID
//         course: orderData?.courseId, // Replace with actual course ID
//         slot: orderData?.slotId, // Replace with actual slot ID
//       });

//       if (response && response.status === 201) {
//         const orderId = response.data.id;
//         console.log(orderId);
//         // Proceed to show Razorpay if payment is false
//         await showRazorpay(orderId);
//       } else {
//         alert("Order creation failed.");
//       }
//     } catch (error) {
//       console.error("Failed to create order:", error.response ? error.response.data : error);
//       alert("Failed to create order. Please try again.");
//       return null; // Return null in case of error
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment} target="_blank" rel="noopener noreferrer">
//         Pay now
//       </button>
//     </div>
//   );
// };

// export default RazorpayPayment;


import React, { useState } from "react";
import axios from "axios";
import { API } from "../../api/apirequest";

const RazorpayPayment = ({ setShowSuccessmodal, orderData }) => {
  const [gstin, setGstin] = useState(""); // State to store GSTIN number
  const [gstinError, setGstinError] = useState(""); // State for validation error

  // Load Razorpay script dynamically
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Validate GSTIN (Optional, based on your requirement)
  const isValidGstin = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  // Show Razorpay payment modal
  async function showRazorpay(orderId) {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const payload = {
        order_id: orderId,
        amount: Number(orderData?.amount),
      };
      console.log(payload);

      const paymentData = await API.post("razorpay_payment/", payload);
      const { order_id, currency, amount: finalAmount } = paymentData.data;

      const options = {
        key: "rzp_test_Z6PoT6HRL71TiC",
        amount: finalAmount.toString(),
        currency: currency,
        order_id: order_id,
        name: "RAZORPAY",
        description: "Thank you for Enrolling",
        image: "https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/flydro_logo_png_1.png",
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          console.table(response);
          console.log('Verifying payment...');

          try {
            const verificationResponse = await API.post("verify_payment/", {
              payment_id: razorpay_payment_id,
              razorpay_order_id: razorpay_order_id,
              signature: razorpay_signature,
              order_id: orderId,
            });

            console.log('Payment verified successfully:', verificationResponse.data);
            setShowSuccessmodal(true);
          } catch (error) {
            console.error("Payment verification failed:", error.response ? error.response.data : error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "tayib",
          email: "tayib@gmail.com",
          phone_number: "9899999999",
        },
        theme: {
          color: "#185fab", // Customize your theme color
        },
        // Pass GSTIN as a hidden note if available
        notes: {
          gstin: gstin || "Not provided", // Optional GSTIN
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error.response ? error.response.data : error);
      alert("Failed to initiate payment.");
    }
  }

  // Handle payment process
  const handlePayment = async () => {
    // Validate GSTIN if provided
    if (gstin && !isValidGstin(gstin)) {
      setGstinError("Invalid GSTIN number.");
      return;
    }

    setGstinError(""); // Clear previous error

    // Store GSTIN in localStorage if provided
    if (gstin) {
      localStorage.setItem("GSTIN", gstin);
    }

    try {
      const response = await API.post("order/", {
        customer: orderData?.customerId, // Replace with actual customer ID
        course: orderData?.courseId, // Replace with actual course ID
        slot: orderData?.slotId, // Replace with actual slot ID
      });

      if (response && response.status === 201) {
        const orderId = response.data.id;
        console.log(orderId);
        // Proceed to show Razorpay if payment is false
        await showRazorpay(orderId);
      } else {
        alert("Order creation failed.");
      }
    } catch (error) {
      console.error("Failed to create order:", error.response ? error.response.data : error);
      alert("Failed to create order. Please try again.");
      return null; // Return null in case of error
    }
  };

  return (
    <div>
      {/* Optional GSTIN Input */}
      <label>
        GSTIN (Optional):
        <input
          type="text"
          value={gstin}
          onChange={(e) => setGstin(e.target.value)}
          placeholder="Enter GSTIN"
        />
      </label>
      {gstinError && <p style={{ color: "red" }}>{gstinError}</p>}
      
      {/* Button to trigger Razorpay */}
      <button onClick={handlePayment} target="_blank" rel="noopener noreferrer">
        Pay now
      </button>
    </div>
  );
};

export default RazorpayPayment;
