import { useState, useEffect } from 'react';
import { API } from '../../api/apirequest';

const JobListings = () => {
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    job_experience: '',
    resume: null,
  });

  const fetchData = async () => {
    try {
      const response = await API.get(`department/`);
      setJobsData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching the course data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (departmentId, roleId) => {
    setSelectedDepartment(departmentId);
    setSelectedRole(roleId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      mobile_number: '',
      email: '',
      job_experience: '',
      resume: null,
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile_number') {
      // Validate mobile number: must not start with 0 and must be up to 10 digits
      if (/^[1-9][0-9]{0,9}$/.test(value) || value === '') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      // For other fields, just update the value
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Logic
    if (!formData.name.trim()) {
      alert('Name is required.');
      return;
    }
    if (!/^[1-9][0-9]{9}$/.test(formData.mobile_number)) {
      alert('Mobile number must be 10 digits and cannot start with 0.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please provide a valid email address.');
      return;
    }
    if (!formData.job_experience.trim()) {
      alert('Job experience is required.');
      return;
    }
    if (!formData.resume) {
      alert('Please upload your resume.');
      return;
    }
    if (!selectedDepartment) {
      alert('Please select a department.');
      return;
    }
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mobile_number', formData.mobile_number);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('job_experience', formData.job_experience);
    formDataToSend.append('resume', formData.resume);
    formDataToSend.append('department', selectedDepartment);
    formDataToSend.append('role', selectedRole);

    try {
      const response = await API.post('/job_enroll/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Job application submitted:', response.data);
      if (response.status === 201) {
        alert(response.data.message || 'Form Subitted succesfully!');
        handleCloseModal();
      } else {
        alert('error occurred');
      }
    } catch (error) {
      alert(error.response.data.error);
      console.error('Error submitting job application', error);
    }
  };

  return (
    <>
      <div className="text-primaryColor">
        <div className="max-w-[1280px] heading px-8 py-2 text-[1.4rem] md:text-[2rem] bg-white w-full m-auto">
          Start doing work that matters.
        </div>
        <div className="max-w-[1280px] heading px-8 py-2 text-[1.2rem] md:text-[1.4rem] bg-white w-full m-auto">
          Our philosophy is simple – Hire passionate people.
        </div>
        <div className="line h-[1.5px] bg-gray-300"></div>

        <div className="relative color-primaryColor">
          <div className="relative banner-text-container">
            <div className="flex flex-col justify-between items-center gap-2 md:gap-4 max-w-[1280px] m-auto">
              {jobsData?.map((department) => (
                <div
                  key={department.id}
                  className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-10 items-start py-2 px-4 md:py-6 md:px-8"
                >
                  <div className="department_name text-[1.1rem] md:text-[1.8rem] px-2">
                    {department.name}
                  </div>

                  <div className="role_cards_container flex flex-col gap-6 md:gap-8">
                    {department.roles.map((role) => (
                      <div
                        key={role.id}
                        className="role_cards text-[1.1rem] flex gap-2 flex-col  border rounded-[20px] w-[330px] md:w-[500px] h-auto p-3 md:p-6"
                      >
                        <div className="para1 text-[1rem] md:text-[1.2rem]">
                          {role.name}
                        </div>
                        <button
                          className="role_cards_button border rounded-[999px] py-2 px-4 w-[140px] hover:text-white hover:bg-primaryColor text-[1rem] md:text-[1.2rem] "
                          onClick={() =>
                            handleOpenModal(department.id, role.id)
                          }
                        >
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-2">Apply for Job</h2>
            <div className="text-md">
              Please fill the form below to apply for the position
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="mobile_number">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="job_experience">
                  Job Experience
                </label>
                <input
                  type="number"
                  id="job_experience"
                  name="job_experience"
                  min="0"
                  value={formData.job_experience}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="resume">
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="text-primaryColor border rounded-full hover:text-white py-2 px-4 hover:bg-primaryColor"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobListings;
