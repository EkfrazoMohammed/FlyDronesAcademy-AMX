import React, { useState } from 'react';

const JobListings = () => {
  const data = [
    {
      id: 1,
      department: 'Instructor',
      roles: [
        {
          id: 1,
          title: 'DGCA Approved Pilot - Instructor',
          description: '',
        },
      ],
    },
    {
      id: 2,
      department: 'Administrative Staff',
      roles: [
        {
          id: 1,
          title: 'Manufacturing',
          description: 'We are looking for Developer',
        },
      ],
    },
    {
      id: 3,
      department: 'Marketing',
      roles: [
        {
          id: 1,
          title: 'UI / UX Design',
          description: 'We are looking for Designer',
        },
      ],
    },
  ];

  // State for managing modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    email: '',
    job_experience: '',
    resume: null,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', mobile_number: '', email: '', job_experience: '', resume: null }); // Reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
   
  };

  return (
    <>
      <div className="text-primaryColor">
        <div className="max-w-[1280px] heading px-8 py-2 text-[2rem] bg-white w-full m-auto">
          Start doing work that matters.
        </div>
        <div className="max-w-[1280px] heading px-8 py-2 text-[1.4rem] bg-white w-full m-auto">
          Our philosophy is simple – Hire passionate people.
        </div>
        <div className="line h-[1.5px] bg-gray-300"></div>

        <div className="relative color-primaryColor">
          <div className="relative banner-text-container">
            <div className="flex flex-col justify-between items-center gap-2 md:gap-4 max-w-[1280px] m-auto">
              {data.map((item) => {
                return (
                  <div key={item.id} className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10 items-start py-2 px-4 md:py-6 md:px-8">
                    <div className="department_name text-[1.1rem] md:text-[1.8rem]">{item.department}</div>

                    <div className="role_cards_container flex flex-col gap-4 md:gap-8">
                      {item.roles.map((role) => {
                        return (
                          <div key={role.id} className="role_cards text-[1.1rem] flex gap-2 flex-col  border rounded-[20px] w-[350px] md:w-[500px] h-auto p-3 md:p-6">
                            <div className="para1">{role.title}</div>
                            <div className="para1">{role.description}</div>
                            <button
                              className="role_cards_button border rounded-[999px] py-2 px-4 w-[140px] "
                              onClick={handleOpenModal}
                            >
                              Apply Now
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
{/* Modal for applying */}
{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
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

            <h2 className="text-2xl font-bold mb-2">Apply for Job</h2>
            <div className='text-md'>Please complete the form below to apply for the position with us.</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="name">Name</label>
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
                <label className="block mb-2" htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="email">Email</label>
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
                <label className="block mb-2" htmlFor="job_experience">Job Experience</label>
                <input
                  type="text"
                  id="job_experience"
                  name="job_experience"
                  value={formData.job_experience}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2" htmlFor="resume">Upload Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept='application/pdf'
                  onChange={handleFileChange}
                  required
                  className="border rounded w-full py-1 px-2"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="text-primaryColor border rounded-full hover:text-white py-2 px-4 hover:bg-primaryColor">
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