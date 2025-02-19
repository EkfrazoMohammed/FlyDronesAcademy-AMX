import { useState, useEffect } from 'react';
import { API } from '../../api/apirequest';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';
import CalendarComponent from '../utils/Calendar';
import RazorpayPayment from '../utils/RazorpayPayment';
import PaymentSuccessModal from '../utils/PaymentSuccessModal';

const CourseBanner = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    organization_name: '',
    gst_number: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    gst_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'mobile') {
      setIsMobileOtpSent(false); // Reset OTP sent flag when mobile changes
      setHasMobileChanged(true); // Mark email as changed
      setErrorMessages((prev) => ({ ...prev, mobile: '' }));
    }
    if (name === 'email') {
      setIsEmailOtpSent(false); // Reset OTP sent flag when email changes
      setHasEmailChanged(true); // Mark email as changed
      setErrorMessages((prev) => ({ ...prev, email: '' }));
    }
    // Clear the error message for the current field on change
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  };
  const customer_id = localStorage.getItem('newUserId');
  const isValidGstin = (gst_number) => {
    const gst_numberRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gst_numberRegex.test(gst_number);
  };

  const [otpMobile, setOtpMobile] = useState('');
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [otpTimerMobile, setOtpTimerMobile] = useState(120);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [hasMobileChanged, setHasMobileChanged] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [otpTimerEmail, setOtpTimerEmail] = useState(120);
  const [emailVerified, setEmailVerified] = useState(false);
  const [hasEmailChanged, setHasEmailChanged] = useState(false);

  const handleSendMobileOtp = async () => {
    if (!formData.mobile) {
      setErrorMessages((prev) => ({
        ...prev,
        mobile: 'Mobile number is required.',
      }));
      return;
    }

    try {
      setHasMobileChanged(false);
      setIsMobileOtpSent(true);
      setOtpTimerMobile(120); // Reset the timer to 60 seconds
      await API.post('send_otp/', { mobile: formData.mobile });
      console.log('OTP sent to mobile successfully');
    } catch (error) {
      setIsMobileOtpSent(false);
      setErrorMessages((prev) => ({
        ...prev,
        mobile: error.response.data.error,
      }));
      console.error('Error sending OTP to mobile:', error);
    }
  };

  // Timer effect for mobile OTP
  useEffect(() => {
    let timer;
    if (isMobileOtpSent && otpTimerMobile > 0) {
      timer = setInterval(() => {
        setOtpTimerMobile((prev) => prev - 1);
      }, 1000);
    } else if (otpTimerMobile === 0) {
      setOtpMobile('');
      setIsMobileOtpSent(false); // Allow resend OTP
      setErrorMessages((prev) => ({ ...prev, mobile: '' }));
    }
    return () => clearInterval(timer);
  }, [isMobileOtpSent, otpTimerMobile]);

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      setErrorMessages((prev) => ({ ...prev, email: 'Email is required.' }));
      return;
    }

    try {
      setHasEmailChanged(false); // Reset change flag to prevent repeated clicks
      setIsEmailOtpSent(true);
      setOtpTimerEmail(120); // Reset the timer to 60 seconds
      await API.post('send_otp/', { email: formData.email });
      console.log('OTP sent to email successfully');
    } catch (error) {
      setIsEmailOtpSent(false); // Allow resend if request fails
      setErrorMessages((prev) => ({
        ...prev,
        email: error.response.data.error,
      }));
      console.error('Error sending OTP to email:', error);
    }
  };
  useEffect(() => {
    let timer;
    if (isEmailOtpSent && otpTimerEmail > 0) {
      timer = setInterval(() => {
        setOtpTimerEmail((prev) => prev - 1);
      }, 1000);
    } else if (otpTimerEmail === 0) {
      setOtpEmail('');
      setErrorMessages((prev) => ({ ...prev, email: '' })); // Reset error messages
      setIsEmailOtpSent(false); // Allow resend OTP
    }
    return () => clearInterval(timer);
  }, [isEmailOtpSent, otpTimerEmail]);

  const verifyOtp = async (type) => {
    try {
      const otp = type === 'email' ? otpEmail : otpMobile;
      const response = await API.post('verify_otp/', {
        [type]: type === 'email' ? formData.email : formData.mobile,
        otp,
      });

      if (response.data.message === 'OTP verified successfully') {
        type === 'email' ? setEmailVerified(true) : setMobileVerified(true);
        setErrorMessages((prev) => ({ ...prev, [type]: '' }));
        console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} verified`);
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          [type]: 'Please enter a valid OTP.',
        }));
      }
    } catch (error) {
      // setErrorMessages((prev) => ({ ...prev, [type]: error.response.data.error }));
      setErrorMessages((prev) => ({
        ...prev,
        [type]: 'Please enter a valid OTP.',
      }));
      console.error('OTP verification error:', error);
    }
  };

  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course for the modal
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [showSuccessmodal, setShowSuccessmodal] = useState(false);

  const [courses, setCourses] = useState([]); // State to store courses data
  const [filteredSlots, setFilteredSlots] = useState([]); // State to store courses data
  const [orderData, setOrderData] = useState([]);

  // Fetch course data from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('course/?course_status=true');
        setCourses(response?.data?.data); // Set the fetched courses in state
        // setCourses(myGetData)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run once on mount

  // Function to format the slots into datesData
  const createDatesData = (course) => {
    return course.slots.map((slot) => ({
      id: slot.id,
      name: slot.slot_name,
      startDate: new Date(slot.start_date).toLocaleDateString(), // Format as needed
      endDate: new Date(slot.end_date).toLocaleDateString(), // Format as needed
      maxSeats: slot.max_candidate,
      availableSeats: slot.seat_available,
      bookedSeats: slot.booked_seats,
      is_active: slot.is_active,
    }));
  };

  // Use the function to generate datesData for each course
  const allDatesData = courses.map((course) => ({
    courseId: course.id,
    courseName: course.course_name,
    slots: createDatesData(course),
  }));

  // Modal handlers
  const handleOpenModal = (course) => {
    console.log('SelectedCourse', course);
    if (
      course?.slots?.length === 0 ||
      course.slots.every((slot) => !slot.is_active)
    ) {
      alert('No available slots for the selected course.');
      return;
    }
    setSelectedCourse(course); // Set the selected course for modal data
    setIsFirstModalOpen(true);
    setIsMobileOtpSent(false);
    setIsEmailOtpSent(false);
    setMobileVerified(false);
    setEmailVerified(false);
  };

  const handleCloseModal = (modelNumber) => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(false);
    setShowSuccessmodal(false);

    // Reset all state variables
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      organization_name: '',
      gst_number: '',
    });
    // Reset error messages
    setErrorMessages({
      name: '',
      mobile: '',
      email: '',
      address: '',
      organization_name: '',
      gst_number: '',
    });
    setOtpMobile('');
    setOtpEmail('');
    setIsMobileOtpSent(false);
    setIsEmailOtpSent(false);
    setOtpTimerMobile(120);
    setOtpTimerEmail(120);
    setMobileVerified(false);
    setEmailVerified(false);
    if (modelNumber == 'second') {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleOpenSecondModal = () => {
    if (selectedCourse) {
      const courseData = allDatesData.find(
        (course) => course.courseId === selectedCourse.id,
      );
      if (courseData && courseData.slots.length > 0) {
        console.log(courseData.slots);
        setFilteredSlots(courseData?.slots); // Prepare filtered slots for the calendar
      } else {
        // Handle case where no slots are available
        alert('No available slots for the selected course.');
        return;
      }
    }
    setIsSecondModalOpen(true); // Open the second modal
  };
  const [isGstVerified, setIsGstVerified] = useState(false);

  const isValidGST = (gstNumber) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };
  const handleVerifyGST = async () => {
    if (!formData.gst_number) return;
    console.log(formData.gst_number);
    try {
      const response = await fetch(
        `https://amx-crm-dev.thestorywallcafe.com/api/company_details/${formData.gst_number}/`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsGstVerified(true);
        alert(`GST Verified: ${data.company_name}`);
      } else {
        throw new Error('Invalid GSTIN');
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        gst_number: 'Failed to verify GSTIN. Please check the number.',
      }));
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessages({
      name: '',
      mobile: '',
      email: '',
      address: '',
      gst_number: '',
    });

    let hasError = false;

    // Helper function to set error messages
    const setError = (field, message) => {
      setErrorMessages((prev) => ({ ...prev, [field]: message }));
      hasError = true;
    };

    // Validate Name (Must not be empty & must not start or end with spaces)
    if (!formData.name || /^\s|\s$/.test(formData.name)) {
      setError('name', 'Name is required and cannot start or end with spaces.');
    }

    // Validate Mobile
    if (!formData.mobile) {
      setError('mobile', 'Mobile number is required.');
    }

    // Validate Email
    if (!formData.email) {
      setError('email', 'Email is required.');
    }

    // Validate Address (Must not be empty & must not start or end with spaces)
    if (!formData.address || /^\s|\s$/.test(formData.address)) {
      setError(
        'address',
        'Address is required and cannot start or end with spaces.',
      );
    }

    // Validate GSTIN (if provided)
    if (formData.gst_number) {
      if (!isValidGstin(formData.gst_number)) {
        setError('gst_number', '*Invalid GSTIN number');
        localStorage.removeItem('GSTIN');
      } else {
        localStorage.setItem('GSTIN', formData.gst_number);
      }
    }

    // Stop form submission if there are validation errors
    if (hasError) return;

    // Verify Mobile & Email before proceeding
    if (!mobileVerified) {
      alert('Please verify your mobile number before proceeding!');
      return;
    }
    if (!emailVerified) {
      alert('Please verify your email address before proceeding!');
      return;
    }

    // Prepare API payload
    const apiData = {
      name: formData.name.trim(),
      address: formData.address.trim(),
      phone_number: formData.mobile,
      email: formData.email,
      organization: formData.organization_name?.trim() || '',
      gst_number: formData.gst_number || '',
    };

    try {
      const response = await API.post('course_register/', apiData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);

      if (response.status === 201 && response.data) {
        const newUserId = response.data?.result?.id;
        console.log('New User ID:', newUserId);
        localStorage.setItem('newUserId', newUserId);
        setIsFirstModalOpen(false);
        handleOpenSecondModal();
      }
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error);
      alert(
        'An error occurred. Please verify your mobile number and email address before proceeding!',
      );
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Reset error messages
  //   setErrorMessages({
  //     name: '',
  //     mobile: '',
  //     email: '',
  //     address: '',
  //     gst_number: '',
  //   });

  //   let hasError = false;
  //     // Validate Name (Must not be empty & must not start or end with spaces)
  //     if (!formData.name?.trim()) {
  //       setErrorMessages((prev) => ({
  //         ...prev,
  //         name: 'Name is required and cannot start or end with spaces.',
  //       }));
  //       hasError = true;
  //     }

  //   if (!formData.mobile) {
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       mobile: 'Mobile number is required.',
  //     }));
  //     hasError = true;
  //   }

  //   if (!formData.email) {
  //     setErrorMessages((prev) => ({ ...prev, email: 'Email is required.' }));
  //     hasError = true;
  //   }

  //   if (!formData.address?.trim()) {
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       address: 'Address is required and cannot start or end with spaces.',
  //     }));
  //     hasError = true;
  //   }

  //   // Validate GSTIN if provided
  //   if (formData.gst_number && !isValidGstin(formData.gst_number)) {
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       gst_number: '*Invalid GSTIN number',
  //     }));
  //     hasError = true;
  //     localStorage.removeItem('GSTIN');
  //     return;
  //   }

  //   // Store GSTIN in localStorage if provided
  //   if (formData.gst_number && isValidGstin(formData.gst_number)) {
  //     localStorage.setItem('GSTIN', formData.gst_number);
  //   }

  //   if (hasError) return; // Stop submission if there are validation errors

  //   // Verify mobile and email before proceeding
  //   if (!mobileVerified) {
  //     alert('Please verify your mobile number before proceeding!');
  //     return;
  //   }
  //   // Verify mobile and email before proceeding
  //   if (!emailVerified) {
  //     alert('Please verify your email address before proceeding!');
  //     return;
  //   }
  //   // setIsFirstModalOpen(false);
  //   // handleOpenSecondModal();

  //   // Prepare API payload
  //   const apiData = {
  //     name: formData.name,
  //     address: formData.address, // Assuming organization name is used as address
  //     phone_number: formData.mobile,
  //     email: formData.email,
  //     organization: formData.organization_name || '',
  //     gst_number: formData.gst_number || '',
  //     // If optional, make it an empty string if not provided
  //   };
  //   try {
  //     const response = await API.post('course_register/', apiData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('API Response:', response.data);

  //     if (response.status == 201 && response.data) {
  //       let newUserId = response.data?.result?.id;
  //       console.log(newUserId);
  //       localStorage.setItem('newUserId', newUserId);
  //       setIsFirstModalOpen(false);
  //       handleOpenSecondModal();
  //     }
  //   } catch (error) {
  //     alert(
  //       'Please verify your mobile number and email address before proceeding !',
  //     );
  //     console.error('API Error:', error.response ? error.response.data : error);
  //   }
  // };

  const handleSelectEvent = async (event) => {
    // Assuming the event contains course and slot information
    const data = {
      customerId: customer_id || localStorage.getItem('newUserId'), // Replace with dynamic customer ID if needed
      courseId: selectedCourse.id, // Assuming selectedCourse.id corresponds to the course ID
      slotId: event.slotId, // You might need to get the slot ID from the event or context
      amount: selectedCourse.amount,
    };
    setOrderData(data);
  };

  return (
    <div className="relative min-h-[710px] md:min-h-[80vh] color-primaryColor">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: 'contain',
          backgroundImage:
            "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_01.JPG')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-yellow-500 opacity-15"></div>
      {/* Text Content */}
      {courses.map((item) => (
        <div
          key={item.id}
          className="relative banner-text-container max-w-[1280px] m-auto"
        >
          <div className="h-[auto] md:h-[80vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 px-4 md:px-12 py-2 md:py-8">
            <div className="flex flex-col gap-3 md:gap-12 w-full md:w-[80%] text-primaryColor">
              <div>
                <div className="flex gap-2">
                  <div className="text-[1.6rem] md:text-[2.2rem] mb-3 font-semibold">
                    {item.course_name}
                  </div>
                  <div className=" h-8 w-8 flex justify-center items-center text-[.4rem] md:text-[1rem] ring-primaryColor border-primaryColor border rounded-full mb-3 font-semibold">
                    {' '}
                    {item.id}
                  </div>
                </div>
                <div
                  className="text-justify text-[1rem] md:text-[1.4rem] font-medium course_description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
                {/* <div className="text-[1rem] md:text-[1.4rem] font-medium course_description" dangerouslySetInnerHTML={{ __html: item.description }} ></div> */}
              </div>
              <div className="text-[1.2rem] md:text-[2rem] font-bold">
                Course Duration : {item.course_duration} Days
              </div>
            </div>

            <div className="text-black text-2xl font-bold flex flex-col gap-6 justify-center items-center w-full md:w-[50%] m-auto">
              <div className="relative">
                {/* Background layer */}
                <div
                  className="absolute inset-0  opacity-[.95] pointer-events-none image-container p-4 flex flex-col gap-2 items-center justify-center w-[190px] h-[190px] md:w-[210px] md:h-[210px] rounded-full mb-2 md:mb-6 text-white  object-contain bg-contain bg-[#0A57FF]"
                  style={{
                    backgroundSize: 'cover',
                    //   backgroundImage:
                    //     "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')",
                  }}
                ></div>

                {/* Content layer */}
                <div className="relative z-10 image-container p-4 flex flex-col gap-2 items-center justify-center w-[190px] h-[190px] md:w-[210px] md:h-[210px] rounded-full mb-2 md:mb-6 text-white bg-fill object-cover">
                  <div className="flex text-[1.6rem] md:text-[1.8rem] opacity-90">
                    Course Fees
                  </div>
                  <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">
                    ₹ {item.amount} /-
                  </div>
                  <div className="flex text-[1.3rem] md:text-[1.6rem] opacity-90">
                    {item?.is_tax_included
                      ? 'inc. of all taxes'
                      : 'exc. of all taxes'}
                  </div>
                </div>
              </div>

              <div className="text-[1rem] font-medium flex gap-2 md:gap-4">
                <button className="border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3">
                  <Link to={`/course/${item.id}`}>Learn More</Link>
                </button>
                <button
                  className="border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3"
                  onClick={() => handleOpenModal(item)}
                >
                  Book a Slot
                </button>
              </div>
            </div>
          </div>

          {/* First Modal */}
          <Modal
            isOpen={isFirstModalOpen && selectedCourse?.id === item.id}
            onClose={handleCloseModal}
          >
            <h2 className="text-2xl font-bold ">Book a Slot</h2>
            {/* Form fields... */}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 my-2">
                  Name{' '}
                  <span className="required-asterisk text-red-600 font-medium">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded py-1 px-2 w-full"
                  required
                />
                {errorMessages.name && (
                  <div className="text-red-600 text-sm">
                    {errorMessages.name}
                  </div>
                )}
              </div>

              <div>
                {/* Mobile OTP Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    Mobile Number{' '}
                    <span className="required-asterisk text-red-600 font-medium">
                      *
                    </span>
                  </label>
                  <div className="mt-2 flex items-center justify-between">
                    <input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="border rounded py-1 px-2 w-[75%]"
                      required
                      disabled={mobileVerified} // Disable input if verified
                    />

                    {!mobileVerified && (
                      <button
                        onClick={handleSendMobileOtp}
                        type="button"
                        disabled={
                          isMobileOtpSent ||
                          !formData.mobile ||
                          mobileVerified ||
                          (!hasMobileChanged && otpTimerMobile > 0) // Disable if the timer hasn't expired or input hasn't changed
                        }
                        className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                      >
                        {isMobileOtpSent
                          ? 'SMS OTP sent'
                          : otpTimerMobile > 0
                            ? 'Send SMS OTP'
                            : `Resend SMS OTP`}
                      </button>
                    )}
                  </div>

                  {isMobileOtpSent && !mobileVerified && (
                    <div className="mt-2 flex items-center justify-between">
                      <input
                        type="number"
                        value={otpMobile}
                        onChange={(e) => setOtpMobile(e.target.value)}
                        placeholder="Enter SMS OTP"
                        className="mt-1 py-1 px-2 w-[75%] border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={mobileVerified} // Disable input if verified
                      />
                      <button
                        onClick={() => verifyOtp('mobile')}
                        className={`mt-2 ml-2 px-4 py-2 rounded text-green-500`}
                        disabled={mobileVerified}
                      >
                        {mobileVerified ? 'Verified' : 'Verify'}
                      </button>
                    </div>
                  )}
                  {isMobileOtpSent && !mobileVerified && otpTimerMobile > 0 && (
                    <div className="text-sm text-gray-500">
                      OTP valid for: {otpTimerMobile} seconds
                    </div>
                  )}
                  {mobileVerified && (
                    <div className="text-sm mt-2 text-green-600">
                      Mobile number successfully verified!
                    </div>
                  )}
                  {errorMessages.mobile && (
                    <div className="text-red-600 text-sm">
                      {errorMessages.mobile}
                    </div>
                  )}
                </div>

                {/* Email OTP Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    Email{' '}
                    <span className="required-asterisk text-red-600 font-medium">
                      *
                    </span>
                  </label>
                  <div className="mt-2 flex items-center justify-between">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded py-1 px-2 w-[75%]"
                      required
                      disabled={emailVerified}
                      // disabled={emailVerified} // Disable input if verified
                    />
                    {!emailVerified && (
                      <button
                        onClick={handleSendEmailOtp}
                        type="button"
                        disabled={
                          isEmailOtpSent || // Disable while OTP is being sent
                          !formData.email || // Disable if email is not entered
                          (!hasEmailChanged && otpTimerEmail > 0) // Disable if the timer hasn't expired or input hasn't changed
                        }
                        className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                      >
                        {isEmailOtpSent
                          ? 'Email OTP sent'
                          : otpTimerEmail > 0
                            ? 'Send Email OTP'
                            : `Resend Email OTP`}
                      </button>
                    )}

                    {/* <button
                      onClick={handleSendEmailOtp}
                      type="button"
                      disabled={
                        isEmailOtpSent || // Disable while OTP is being sent
                        !formData.email || // Disable if email is not entered
                        emailVerified || // Disable if email is already verified
                        (!hasEmailChanged && otpTimerEmail > 0) // Disable if the timer hasn't expired or input hasn't changed
                      }
                      className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                    >
                      {isEmailOtpSent
                        ? 'Email OTP sent'
                        : otpTimerEmail > 0
                          ? 'Send Email OTP'
                          : `Resend Email OTP`}
                    </button> */}
                  </div>
                  {isEmailOtpSent &&
                    !emailVerified && ( // Show only if email is not verified
                      <div className="mt-2 flex items-center justify-between">
                        <input
                          type="number"
                          value={otpEmail}
                          onChange={(e) => setOtpEmail(e.target.value)}
                          placeholder="Enter Email OTP"
                          className="mt-1 py-1 px-2 w-[75%] border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => verifyOtp('email')}
                          className={`mt-2 ml-2 px-4 py-2 rounded text-green-500`}
                          disabled={emailVerified}
                        >
                          {emailVerified ? 'Verified' : 'Verify'}
                        </button>
                      </div>
                    )}
                  {isEmailOtpSent && !emailVerified && otpTimerEmail > 0 && (
                    <div className="text-sm text-gray-500">
                      OTP valid for: {otpTimerEmail} seconds
                    </div>
                  )}
                  {emailVerified && (
                    <div className="text-sm mt-2 text-green-600">
                      Email successfully verified!
                    </div>
                  )}
                  {errorMessages.email && (
                    <div className="text-red-600 text-sm">
                      {errorMessages.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    Address{' '}
                    <span className="required-asterisk text-red-600 font-medium">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded py-1 px-2 w-full"
                    required
                  />
                  {errorMessages.address && (
                    <div className="text-red-600 text-sm">
                      {errorMessages.address}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    Organization Name (optional)
                  </label>
                  <input
                    type="text"
                    name="organization_name"
                    value={formData.organization_name}
                    onChange={handleChange}
                    className="border rounded py-1 px-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    GSTIN number (optional)
                  </label>
                  <div className="mt-2 flex items-center justify-between mb-4">
                    <input
                      type="text"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleChange}
                      className="border rounded py-1 px-2 w-[75%]"
                      // className="border rounded py-1 px-2 w-full mb-3"
                    />
                    {isValidGST(formData.gst_number) && (
                      <button
                        onClick={handleVerifyGST}
                        type="button"
                        className="mt-1 ml-2 p-1 text-primaryColor rounded text-sm"
                      >
                        Verify GST
                      </button>
                    )}
                  </div>
                  {isGstVerified && (
                    <div className="text-green-600 text-sm mt-1">
                      GSTIN successfully verified!
                    </div>
                  )}
                  {errorMessages.gst_number && (
                    <div className="text-red-600 text-sm">
                      {errorMessages.gst_number}
                    </div>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 my-2">
                    GSTIN number (optional)
                  </label>
                  <input
                    type="text"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    className="border rounded py-1 px-2 w-full mb-3"
                  />
                  {errorMessages.gst_number && (
                    <div className="text-red-600 text-sm">
                      {errorMessages.gst_number}
                    </div>
                  )}
                </div> */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 border rounded-full bg-white text-primaryColor font-bold hover:bg-primaryColor hover:text-white cursor-pointer transition"
                  // disabled={!mobileVerified || !emailVerified}
                  onClick={handleSubmit}
                >
                  Next
                </button>
              </div>
            </div>
          </Modal>

          {/* Second Modal with Calendar */}

          <Modal
            isOpen={isSecondModalOpen && selectedCourse?.id === item.id}
            onClose={() => {
              handleCloseModal('second');
            }}
          >
            <h2 className="text-2xl font-bold ">
              Select the slot for the course
              {/* Select a Slot for {item.course_name} */}
            </h2>
            <CalendarComponent
              datesData={filteredSlots}
              onSelectEvent={handleSelectEvent}
            />
            <RazorpayPayment
              setShowSuccessmodal={setShowSuccessmodal}
              orderData={orderData}
            />
          </Modal>

          {/* Payment Success Modal */}

          <Modal
            isOpen={showSuccessmodal && selectedCourse?.id === item.id}
            onClose={handleCloseModal}
          >
            <PaymentSuccessModal />
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default CourseBanner;
