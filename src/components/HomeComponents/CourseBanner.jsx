import { useState, useEffect,useMemo } from 'react';
import axios from 'axios';
import Modal from '../utils/Modal';
import CalendarComponent from '../utils/Calendar';
import RazorpayPayment from '../utils/RazorpayPayment';
import PaymentSuccessModal from '../utils/PaymentSuccessModal';

const CourseBanner = () => {
  // States to handle form data and OTP management
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    organization_name: '',
    resume: null,
  });
  const [otpMobile, setOtpMobile] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);  // Track the selected course for the modal
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [showSuccessmodal, setShowSuccessmodal] = useState(false);


  const [courses, setCourses] = useState([]); // State to store courses data
  const [filteredSlots, setFilteredSlots] = useState([]); // State to store courses data
  const [orderData,setOrderData]=useState([])
  // Fetch course data from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/course/');
        setCourses(response.data);  // Set the fetched courses in state
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

console.log(allDatesData);
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
                            if (type === 'mobile') {
                        console.log(type)
                            } else if (type === 'email') {
                              console.log(type)
                            }
                          };

                          
 

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
  console.log(formData);

  // Close the first modal
  setIsFirstModalOpen(false);
  
  // Open the second modal with available dates
  handleOpenSecondModal(); 
};

const handleSelectEvent = async (event) => {
  console.log('Event selected:', event);
  
  // Assuming the event contains course and slot information
  const data = {
    customerId: 5, // Replace with dynamic customer ID if needed
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
        <div key={item.id} className="relative banner-text-container">
          <div className="h-[400px] md:h-[80vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 px-4 md:px-[5rem] py-2 md:py-8">
            <div className="flex flex-col gap-3 md:gap-12 w-full md:w-[80%] text-primaryColor">
              <div>
                <div className="text-[1.6rem] md:text-[2.2rem] mb-3 font-semibold">{item.course_name}</div>
                <div className="text-justify text-[1rem] md:text-[1.4rem] font-medium course_description" >{item.description}</div>
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
                <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3'>Learn More</button>
                <button className='border border-primaryColor text-primaryColor bg-transparent hover:bg-primaryColor hover:text-secondaryColor transition-all rounded-full py-0 px-3' onClick={() => handleOpenModal(item)}>Book a Slot</button>
              </div>
            </div>
          </div>

          {/* First Modal */}
          <Modal isOpen={isFirstModalOpen && selectedCourse?.id === item.id} onClose={handleCloseModal}>
            <h2 className="text-2xl font-bold ">Book a Slot</h2>
              {/* Form fields... */}
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
