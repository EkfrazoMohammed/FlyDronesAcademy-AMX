import { useState, useEffect,useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../utils/Modal';
import CalendarComponent from '../utils/Calendar';
import RazorpayPayment from '../utils/RazorpayPayment';
import PaymentSuccessModal from '../utils/PaymentSuccessModal';

const CourseBanner = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    address: '',
    organization_name: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    mobile_number: '',
    email: '',
    address: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the error message for the current field on change
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  };
  const customer_id=localStorage.getItem("newUserId")
  
  const [otpMobile, setOtpMobile] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [otpTimerMobile, setOtpTimerMobile] = useState(60);
  const [otpTimerEmail, setOtpTimerEmail] = useState(60);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleSendMobileOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/send_otp/', {
        mobile: formData.mobile_number,
      });
      console.log(response.data.message); // "OTP sent successfully"
      setIsMobileOtpSent(true);
      setOtpTimerMobile(30); // Reset the timer
    } catch (error) {
      console.error('Error sending OTP to mobile:', error);
    }
  };



  const handleOtpChange = (e, type) => {
    const { value } = e.target;
    if (type == 'mobile') {
      setOtpMobile(value);
    } else {
      setOtpEmail(value);
    }
  };

  // Timer effect for mobile OTP
  useEffect(() => {
    let timer;
    if (otpTimerMobile > 0) {
      timer = setInterval(() => {
        setOtpTimerMobile((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimerMobile]);

 // Timer effect for OTP countdown
 useEffect(() => {
  let timer;
  if (isEmailOtpSent && otpTimerEmail > 0) {
    timer = setInterval(() => {
      setOtpTimerEmail((prev) => prev - 1);
    }, 1000); // Decrease timer every second
  } else if (otpTimerEmail === 0) {
    setIsEmailOtpSent(false); // Hide OTP input and reset state
  }
  return () => clearInterval(timer);
}, [isEmailOtpSent, otpTimerEmail]);
// Handle OTP sending
const handleSendEmailOtp = async () => {
  console.log("Sending OTP to email:", formData.email);
  setIsEmailOtpSent(true);
  // Your API call to send OTP here, e.g.:
  try {
    await axios.post('http://localhost:8000/api/send_otp/', {
      email: formData.email,
    });
    console.log("OTP sent successfully");
    setOtpTimerEmail(30); // Reset the timer for 30 seconds
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
const verifyOtp = async (type) => {
  try {
    if (type === 'email') {
      const response = await axios.post('http://localhost:8000/api/verify_otp/', {
        email: formData.email,
        otp: otpEmail,
      });

      // Check if the response indicates success
      if (response.data.message === 'OTP verified successfully') {
        setEmailVerified(true); // Update state to indicate email is verified
        console.log('Email verified');
      } else {
        // Set error message for invalid OTP
        console.error('Invalid email OTP');
      }
    }
    else if (type === "mobile") {
      const response = await axios.post('http://localhost:8000/api/verify_otp/', {
        mobile: formData.mobile_number,
        otp: otpMobile,
      });

      // Check if the response indicates success
      if (response.data.message === 'OTP verified successfully') {
        setMobileVerified(true); // Update state to indicate email is verified
        console.log('Mobile verified');

      } else {
        
        // Set error message for invalid OTP
        console.error('Invalid email OTP');
      }
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('OTP verification error:', error);
  }
};

  const [selectedCourse, setSelectedCourse] = useState(null);  // Track the selected course for the modal
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [showSuccessmodal, setShowSuccessmodal] = useState(false);


  const [courses, setCourses] = useState([]); // State to store courses data
  const [filteredSlots, setFilteredSlots] = useState([]); // State to store courses data
  const [orderData,setOrderData]=useState([])
  const myGetData=[
    {
        "id": 1,
        "course_name": "DGCA Approved Pilot Training Course",
        "description": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>",
        "course_duration": "10",
        "amount": "15000",
        "is_tax_included": true,
        "is_active": true,
        "slots": [
            {
                "id": 1,
                "slot_name": "Morning Slot",
                "start_date": "2024-01-01T14:30:00+05:30",
                "end_date": "2024-01-01T17:30:00+05:30",
                "max_candidate": 30,
                "is_active": true,
                "seat_available": 30,
                "booked_seats": 0
            }
        ],
        "curriculum": [
            {
                "id": 1,
                "day": 1,
                "topics": [
                    "Introduction",
                    "Basic Concepts"
                ],
                "description": "<p>Day 1 description</p>"
            },
            {
                "id": 2,
                "day": 2,
                "topics": [
                    "Intermediate Concepts",
                    "Practical Examples"
                ],
                "description": "<p>Day 2 description</p>"
            }
        ]
    }
]
  // Fetch course data from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const response = await axios.get('http://localhost:8000/api/course/');
        // setCourses(response.data);  // Set the fetched courses in state
        setCourses(myGetData)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);  // Empty dependency array to run once on mount

// Function to format the slots into datesData
const createDatesData = (course) => {
    return course.slots.map(slot => ({
        id: slot.id,
        name: slot.slot_name,
        startDate: new Date(slot.start_date).toLocaleDateString(), // Format as needed
        endDate: new Date(slot.end_date).toLocaleDateString(), // Format as needed
        maxSeats: slot.max_candidate,
        availableSeats: slot.seat_available,
        bookedSeats: slot.booked_seats,
    }));
};

// Use the function to generate datesData for each course
const allDatesData = courses.map(course => ({
    courseId: course.id,
    courseName: course.course_name,
    slots: createDatesData(course),
}));


  // Modal handlers
  const handleOpenModal = (course) => {
    console.log("SelectedCourse",course)
    setSelectedCourse(course);  // Set the selected course for modal data
    setIsFirstModalOpen(true);
  };

 
  const handleCloseModal = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(false);
    setShowSuccessmodal(false);
    
    // Reset all state variables
    setFormData({
        name: '',
        mobile_number: '',
        email: '',
        address: '',
        organization_name: '',
    });
    setOtpMobile('');
    setOtpEmail('');
    setIsMobileOtpSent(false);
    setIsEmailOtpSent(false);
    setOtpTimerMobile(60);
    setOtpTimerEmail(60);
    setMobileVerified(false);
    setEmailVerified(false);
};

 
const handleOpenSecondModal = () => {
  if (selectedCourse) {
    const courseData = allDatesData.find(course => course.courseId === selectedCourse.id);
    if (courseData && courseData.slots.length > 0) {
      console.log(courseData.slots)
      setFilteredSlots(courseData.slots); // Prepare filtered slots for the calendar
    } else {
      // Handle case where no slots are available
      alert('No available slots for the selected course.');
      return;
    }
  }
  setIsSecondModalOpen(true); // Open the second modal
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  e.preventDefault();
    
  // Reset error messages
  setErrorMessages({
    name: '',
    mobile_number: '',
    email: '',
    address: '',
  });

  let hasError = false;
  
  // Validate form fields and set error messages
  if (!formData.name) {
    setErrorMessages((prev) => ({ ...prev, name: 'Name is required.' }));
    hasError = true;
  }

  if (!formData.mobile_number) {
    setErrorMessages((prev) => ({ ...prev, mobile_number: 'Mobile number is required.' }));
    hasError = true;
  }

  if (!formData.email) {
    setErrorMessages((prev) => ({ ...prev, email: 'Email is required.' }));
    hasError = true;
  }

  if (!formData.address) {
    setErrorMessages((prev) => ({ ...prev, address: 'Address is required.' }));
    hasError = true;
  }

  if (hasError) return; // Stop submission if there are validation errors

  // setIsFirstModalOpen(false);
  // handleOpenSecondModal(); 

  // Prepare API payload
  const apiData = {
    name: formData.name,
    address: formData.organization_name, // Assuming organization name is used as address
    phone_number: formData.mobile_number,
    email: formData.email,
    organization: formData.organization_name || '', // If optional, make it an empty string if not provided
  };
  
  
  try {
    const response = await axios.post('http://localhost:8000/api/course_register/', apiData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API Response:', response.data);
    
    if(response.status == 201 && response.data) {
      
      let newUserId=response.data?.result?.id
      console.log(newUserId)
      localStorage.setItem("newUserId", newUserId)
      setIsFirstModalOpen(false);
    handleOpenSecondModal(); 
    } 
  } catch (error) {
    alert('unable to create user')
    console.error('API Error:', error.response ? error.response.data : error);
  }
};

const handleSelectEvent = async (event) => {
  console.log('Event selected:', event);
  
  // Assuming the event contains course and slot information
  const data = {
    customerId: customer_id || localStorage.getItem("newUserId"), // Replace with dynamic customer ID if needed
    courseId: selectedCourse.id, // Assuming selectedCourse.id corresponds to the course ID
    slotId: event.slotId, // You might need to get the slot ID from the event or context
    amount:selectedCourse.amount
  };
  setOrderData(data)
}
 
  return (
    <div className="relative min-h-[650px] md:min-h-[80vh] color-primaryColor">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_01.JPG')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-yellow-500 opacity-15"></div>
      {/* Text Content */}
      {courses.map((item) => (
        <div key={item.id} className="relative banner-text-container max-w-[1280px] m-auto">
          <div className="h-[400px] md:h-[80vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 px-4 md:px-12 py-2 md:py-8">
            <div className="flex flex-col gap-3 md:gap-12 w-full md:w-[80%] text-primaryColor">
              <div>
                <div className='flex gap-2'>
                <div className="text-[1.6rem] md:text-[2.2rem] mb-3 font-semibold">{item.course_name}</div>
                <div className=" h-8 w-8 flex justify-center items-center text-[.4rem] md:text-[1rem] ring-primaryColor border-primaryColor border rounded-full mb-3 font-semibold"> {item.id}</div>
                
                </div>
                <div className="text-justify text-[1rem] md:text-[1.4rem] font-medium course_description"   dangerouslySetInnerHTML={{ __html: item.description }}></div>
                {/* <div className="text-[1rem] md:text-[1.4rem] font-medium course_description" dangerouslySetInnerHTML={{ __html: item.description }} ></div> */}
              </div>
              <div className="text-[1.2rem] md:text-[2rem] font-bold">Course Duration : {item.course_duration}</div>
            </div>

            <div className="text-black text-2xl font-bold flex flex-col gap-6 justify-center items-center w-full md:w-[50%] m-auto">
              <div className="image-container p-4 flex flex-col gap-2 items-center justify-center w-[190px] h-[190px] md:w-[220px] md:h-[220px] rounded-full mb-2 md:mb-6 text-white bg-fill object-cover"
                style={{ backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')" }}>
                <div className="flex text-[1.6rem] md:text-[1.8rem] opacity-90">Course Fees</div>
                <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">₹ {item.amount} /-</div>
                <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">inc. of all taxes</div>
              </div>

              <div className="text-[1rem] font-medium flex gap-2 md:gap-4">
                <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3'><Link to={`/course/${item.id}`}>Learn More</Link></button>
                <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3' onClick={() => handleOpenModal(item)}>Book a Slot</button>
              </div>
            </div>
          </div>

          {/* First Modal */}
          <Modal isOpen={isFirstModalOpen && selectedCourse?.id === item.id} onClose={handleCloseModal}>
            <h2 className="text-2xl font-bold ">Book a Slot</h2>
              {/* Form fields... */}
          
              <div className="space-y-4">
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
      {errorMessages.name && <div className="text-red-600 text-sm">{errorMessages.name}</div>}
      </div>
        
     {/* Mobile OTP Section */}
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
      {isMobileOtpSent ? 'Resend SMS OTP' : 'Send SMS OTP'}
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
        className={`mt-2 ml-2 px-4 py-2 rounded ${
          mobileVerified ? 'bg-green-500 text-white' : 'text-green-500'
        }`}
        disabled={mobileVerified}
      >
        {mobileVerified ? 'Verified' : 'Verify'}
      </button>
    </div>
  )}
  {isMobileOtpSent && otpTimerMobile > 0 && (
    <div className="text-sm text-gray-500">OTP valid for: {otpTimerMobile} seconds</div>
  )}
{errorMessages.mobile_number && <div className="text-red-600 text-sm">{errorMessages.mobile_number}</div>}
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
      disabled={emailVerified} // Disable input if verified
    />
    <button
      onClick={handleSendEmailOtp}
      type="button"
      disabled={isEmailOtpSent || !formData.email || emailVerified}
      className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
    >
      {isEmailOtpSent  ? 'Resend Email OTP' : 'Send Email OTP'}
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
        disabled={emailVerified} // Disable input if verified
      />
      {emailVerified ? <>
        <button
         className={`mt-2 ml-2 px-4 py-2 rounded bg-green-500 text-white`}
        disabled={emailVerified} // Disable if already verified
      >
        {emailVerified ? 'Verified' : 'Verify'}
      </button>
      </>:<>
      <button
        onClick={() => verifyOtp('email')}
        className={`mt-2 ml-2 px-4 py-2 rounded text-green-500`}
      >
        {emailVerified ? 'Verified' : 'Verify'}
      </button>
      </>}
    
    </div>
  )}
  {isEmailOtpSent && !emailVerified && otpTimerEmail > 0 && (
    <div className="text-sm text-gray-500">OTP valid for: {otpTimerEmail} seconds</div>
  )}
  
  {emailVerified && <div className="text-sm mt-2 text-green-600">Email successfully verified!</div>}
  {errorMessages.email && <div className="text-red-600 text-sm">{errorMessages.email}</div>}
    
</div>


      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded py-1 px-2 w-full"
          required
        />
           {errorMessages.address && <div className="text-red-600 text-sm">{errorMessages.address}</div>}
      
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Organization Name (optional)</label>
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
        className="w-full py-2 px-4 border rounded-full bg-white text-primaryColor font-bold hover:bg-primaryColor hover:text-white cursor-pointer transition"
        // disabled={!mobileVerified || !emailVerified}
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
          </Modal>

          {/* Second Modal with Calendar */}
          <Modal isOpen={isSecondModalOpen && selectedCourse?.id === item.id} onClose={handleCloseModal}>
            <h2 className="text-2xl font-bold ">Select a Date for {item.course_name}</h2>
            <CalendarComponent datesData={filteredSlots} onSelectEvent={handleSelectEvent} />
            <RazorpayPayment setShowSuccessmodal={setShowSuccessmodal} orderData={orderData}/>
          </Modal>

          {/* Payment Success Modal */}
          <Modal isOpen={showSuccessmodal && selectedCourse?.id === item.id} onClose={handleCloseModal}>
            <PaymentSuccessModal />
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default CourseBanner;
