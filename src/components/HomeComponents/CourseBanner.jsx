import { useState, useEffect } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import RazorpayPayment from "../utils/RazorpayPayment";
import PaymentSuccessModal from "../utils/PaymentSuccessModal";
const localizer = momentLocalizer(moment)


const CourseBanner = () => {
 
  const [showSuccessmodal, setShowSuccessmodal] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState([]); // State to store highlighted dates

  // State for managing modal visibility and form data
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  
  const openSecondModal = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsFirstModalOpen(true);
    setIsSecondModalOpen(false);
  };
  const closeThirdModal = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(false);
    setShowSuccessmodal(false)
  };
 
  const datesData = [
    { title: "Batch 1", date: "2024-09-06" },
    { title: "Batch 2", date: "2024-10-21" },
  ];
  const [events, setEvents] = useState([]); // Your existing events array
  // Function to handle slot selection
  const handleSelectSlot = ({ start }) => {
    const selectedDate = moment(start).startOf('day');

    // Generate the next 5 days including the selected date
    const newHighlightedDates = [];
    for (let i = 0; i < 5; i++) {
      newHighlightedDates.push(selectedDate.clone().add(i, 'days').toDate());
    }

    setHighlightedDates(newHighlightedDates);
  };

  // Function to define styles for events
  const eventStyleGetter = (event, start, end, isSelected) => {
    const eventStartDate = moment(start).startOf('day').toDate();

    // Check if the event's start date is in the highlighted dates
    if (highlightedDates.some(date => moment(date).isSame(eventStartDate, 'day'))) {
      return {
        style: {
          backgroundColor: 'green',
          borderRadius: '5px',
          opacity: 0.8,
          color: 'white',
          border: '0px',
        },
      };
    }

    return {};
  };

  const sampleEvents = [];
  const startDate = new Date(2024, 9, 21); // November 21, 2024
  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    sampleEvents.push({
      title: `Event for ${currentDate.toDateString()}`,
      start: currentDate,
      end: new Date(currentDate.getTime() + 1 * 60 * 60 * 1000), // 1-hour event
    });
  }
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    organization_name: '',
    resume: null,
  });
  
  // State for OTP management
  const [otpMobile, setOtpMobile] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const handleOpenModal = () => {
    setIsFirstModalOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsFirstModalOpen(false);
    setFormData({ name: '', mobile_number: '', email: '', organization_name: '', resume: null });
    resetOtp();
  };

  const resetOtp = () => {
    setOtpMobile('');
    setOtpEmail('');
    setOtpTimer(0);
    setIsMobileOtpSent(false);
    setIsEmailOtpSent(false);
    setIsNextButtonDisabled(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendMobileOtp = () => {
    // Simulate sending OTP to mobile and receiving OTP
    // In a real application, you would call your API here
    console.log("Sending OTP to mobile:", formData.mobile_number);
    setOtpTimer(10); // Set timer for 1 minute
    setIsMobileOtpSent(true);
  };

  const handleSendEmailOtp = () => {
    // Simulate sending OTP to email and receiving OTP
    console.log("Sending OTP to email:", formData.email);
    setOtpTimer(60); // Set timer for 1 minute
    setIsEmailOtpSent(true);
  };

  const handleOtpChange = (e, type) => {
    const { value } = e.target;
    if (type === 'mobile') {
      setOtpMobile(value);
    } else {
      setOtpEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openSecondModal()
    console.log(formData);
    // Here, add your logic to handle form submission after OTP verification
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsMobileOtpSent(false);
      setIsEmailOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  // Verify OTP
  const verifyOtp = (type) => {
    // Simulate OTP verification
    // In a real application, you would call your API to verify the OTP
    if (type === 'mobile' && otpMobile === '123456') {
      setIsNextButtonDisabled(false); // Enable next button for mobile
    } else if (type === 'email' && otpEmail === '123456') {
      setIsNextButtonDisabled(false); // Enable next button for email
    }
  };

  return (
    <div className="relative h-[650px] md:h-[72vh] color-primaryColor">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_01.JPG')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-yellow-500 opacity-15"></div>
      {/* Text Content */}
      <div className="relative banner-text-container">
        <div className="h-[400px] md:h-[72vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 px-4 md:px-[5rem] py-2 md:py-8">
          <div className="flex flex-col gap-3 md:gap-12 w-full md:w-[80%] text-primaryColor">
            <div >
              <div className="text-[1.6rem] md:text-[2.2rem] mb-3 font-semibold">
                DGCA Approved Pilot Training Course
              </div>
              <div className="text-[1rem] md:text-[1.4rem] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quaerat aliquid, dolor sit amet consectetur adipisicing elit. Quia quaerat aliquid,  eveniet necessitatibus, deleniti officiis pariatur cumque tenetur veritatis tempore eum mollitia magni voluptates eos minima possimus doloremque officia provident voluptas repellendus qui laborum. Vero cumque ipsam recusandae esse qui.
              </div>
            </div>
            <div className="text-[1.2rem] md:text-[2rem] font-bold">
              Course Duration : 5 Days
            </div>
          </div>

          <div className=" text-black text-2xl font-bold flex flex-col gap-6 justify-center items-center w-full md:w-[50%] m-auto">
            <div className="image-container p-4 flex flex-col gap-2 items-center justify-center w-[190px] h-[190px] md:w-[220px] md:h-[220px] rounded-full mb-2 md:mb-6  text-white  bg-fill object-cover"
              style={{
                backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')",
              }}>
              <div className="flex text-[1.6rem] md:text-[1.8rem] opacity-90">Course Fees</div>
              <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">₹ 50,000 /-</div>
              <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">inc. of all taxes</div>
            </div>

            <div className=" text-[1rem] font-medium flex gap-2 md:gap-4">
              <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all  rounded-full py-0 px-3'>Learn More</button>
              <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all  rounded-full py-0 px-3' onClick={handleOpenModal}>Book a Slot</button>
            </div>
          </div>
        </div>
      </div>

      {/* First Modal */}
      {isFirstModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
          <div className="bg-white rounded-lg p-8 max-w-xl w-full relative">
            {/* Close Icon */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {/* SVG Icon for Close */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold ">Book a Slot</h2>
            <div className='text-md mb-2 '>Please complete the form below to enroll.</div>

            <form  className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded py-1 px-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <div className="mt-2 flex items-center justify-between">
                  
                <input
                  type="number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                   className="border rounded py-1 px-2 w-[75%]"
                  required
                />
              
                <button
                  onClick={handleSendMobileOtp}
                  type="button"
                  disabled={isMobileOtpSent || !formData.mobile_number}
                  className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                >
                  Send SMS OTP
                </button>
                
                </div>
                {isMobileOtpSent && (
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      value={otpMobile}
                      onChange={(e) => handleOtpChange(e, 'mobile')}
                      placeholder="Enter OTP"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => verifyOtp('mobile')}
                      className="mt-2 ml-2 px-4 py-2  text-green-500 rounded"
                    >
                     Verify
                    </button>
                  </div>
                )}
                {isMobileOtpSent && otpTimer > 0 && (
                  <div className="text-sm text-gray-500">OTP valid for: {otpTimer} seconds</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-2 flex items-center justify-between">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  
                   className="border rounded py-1 px-2 w-[75%]"
                  required
                />
                <button
                  onClick={handleSendEmailOtp}
                  type="button"
                  disabled={isEmailOtpSent || !formData.email}
                  className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                >
                  Send Email OTP
                </button>
                </div>
                {isEmailOtpSent && (
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      value={otpEmail}
                      onChange={(e) => handleOtpChange(e, 'email')}
                      placeholder="Enter Email OTP"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => verifyOtp('email')}
                      className="mt-2 ml-2 px-4 py-2  text-green-500 rounded"
                    >
                      Verify
                    </button>
                  </div>
                )}
                {isEmailOtpSent && otpTimer > 0 && (
                  <div className="text-sm text-gray-500">OTP valid for: {otpTimer} seconds</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name (optional</label>
                <input
                  type="text"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleChange}
                  className="border rounded py-1 px-2 w-full"
                />
              </div>
              <button
                type="submit"
                  onClick={handleSubmit}
                className="w-full py-2 px-4 border rounded-full bg-white text-primaryColor font-bold  hover:bg-primaryColor hover:text-white cursor-pointer transition"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      )}

       {/* Second Modal with Calendar */}
       {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
            {/* Close Icon */}
            <button
              onClick={closeSecondModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {/* SVG Icon for Close */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold ">Book a Slot</h2>
           {/* Calendar Component */}
      <div className="mt-8">
      
        <Calendar
        localizer={localizer}
        events={[...sampleEvents, ...events]} // Include sample events for demonstration
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable // Make the calendar selectable
        onSelectEvent={(event) => alert(event.title)} // Display an alert when selecting an event
        onSelectSlot={handleSelectSlot} // Call the function on slot selection
        eventPropGetter={eventStyleGetter} // Use custom style for events
        views={{ month: true }} // Only show month view
        defaultView="month" // Set default view to month
      />

      {/* <RazorpayPayment setShowSuccessmodal={setShowSuccessmodal}/> */}
      <RazorpayPayment setShowSuccessmodal={setShowSuccessmodal} />
      </div>
          </div>
        </div>
      )}


{showSuccessmodal && (
  <>
   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
            {/* Close Icon */}
            <button
              onClick={closeThirdModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {/* SVG Icon for Close */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <PaymentSuccessModal />
            </div>

      </div>
  </>
      )}
    </div>
  );
};

export default CourseBanner;
