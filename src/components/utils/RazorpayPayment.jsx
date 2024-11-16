import PropTypes from 'prop-types';
import { API } from '../../api/apirequest';

const RazorpayPayment = ({ setShowSuccessmodal, orderData }) => {
  // Load Razorpay script dynamically
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Show Razorpay payment modal
  async function showRazorpay(orderId) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const payload = {
        order_id: orderId,
        amount: Number(orderData?.amount),
      };
      console.log(payload);

      const paymentData = await API.post('razorpay_payment/', payload);
      const { order_id, currency, amount: finalAmount } = paymentData.data;

      const options = {
        key: 'rzp_test_Z6PoT6HRL71TiC',
        amount: finalAmount.toString(),
        currency: currency,
        order_id: order_id,
        name: 'RAZORPAY',
        description: 'Thank you for Enrolling',
        image:
          'https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/flydro_logo_png_1.png',
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          console.table(response);
          console.log('Verifying payment...');

          try {
            const verificationResponse = await API.post('verify_payment/', {
              payment_id: razorpay_payment_id,
              razorpay_order_id: razorpay_order_id,
              signature: razorpay_signature,
              order_id: orderId,
            });

            console.log(
              'Payment verified successfully:',
              verificationResponse.data,
            );
            setShowSuccessmodal(true);
          } catch (error) {
            console.error(
              'Payment verification failed:',
              error.response ? error.response.data : error,
            );
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: 'tayib',
          email: 'tayib@gmail.com',
          phone_number: '9899999999',
        },
        theme: {
          color: '#185fab',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(
        'Payment initiation failed:',
        error.response ? error.response.data : error,
      );
      alert('Failed to initiate payment.');
    }
  }

  // Handle payment process
  const handlePayment = async () => {
    try {
      const response = await API.post('order/', {
        customer: Number(orderData?.customerId),
        course: orderData?.courseId,
        slot: orderData?.slotId,
      });

      if (response && response.status === 201) {
        const orderId = response.data.id;
        console.log(orderId);
        await showRazorpay(orderId);
      } else {
        alert('Order creation failed.');
      }
    } catch (error) {
      console.error(
        'Failed to create order:',
        error.response ? error.response.data : error,
      );
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div>
      {/* Button to trigger Razorpay */}
      <button
        onClick={handlePayment}
        className="border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-white transition-all rounded-full py-0 px-3"
      >
        Pay now
      </button>
    </div>
  );
};

RazorpayPayment.propTypes = {
  setShowSuccessmodal: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    customerId: PropTypes.number.isRequired,
    courseId: PropTypes.number.isRequired,
    slotId: PropTypes.number.isRequired,
  }).isRequired,
};

export default RazorpayPayment;
