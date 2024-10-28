import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(true)
  }

  const handleNavigation = (path, id) => {
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        setOpen(false)
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Delay to allow the page to render before scrolling
  };

  return (

    <div className="bg-green max-h-[10vh] h-[10vh] text-black flex md:flex-row md:px-32 md:py-3 gap-3 md:gap-8">
      <div className="flex justify-between w-full sm:w-auto sm:justify-start px-3">
        <div className="image-container w-[60px] h-[60px]">
          <Link to="/">
            <img
              className="h-auto w-auto object-cover"
                src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/flydro_logo_png_1.png"
              alt=""
            />
          </Link>
        </div>
        {
          !open && (
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {/* Hamburger Icon */}
                <svg
                  className="h-10 w-10 text-[#fff] bg-[#1c32b2e3]  rounded-full p-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          )
        }
      </div>
      <div className=" text-container  justify-center items-center gap-2 md:gap-8 text-[1.1rem] font-medium hidden sm:flex sm:space-x-4 sm:items-center">
        <button onClick={() => handleNavigation('/', 'course-banner')}>Course</button>
        <button onClick={() => handleNavigation('/', 'descriptions')}>About Us</button>
        <button onClick={() => handleNavigation('/', 'faq')}>FAQ</button>
        <button onClick={() => handleNavigation('/', 'industry-applications')}>Benefits</button>
        <Link to="/careers">Careers</Link>
      </div>

      <div
        className={`sm:hidden flex flex-col h-screen w-1/2 bg-white z-50 gap-5 items-center fixed right-0 p-3 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        {/* Close button */}
        <div className="w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#fff] bg-[#1c32b2e3] rounded-full p-1"
            fill="#fff"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setOpen(false)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Menu Items */}
        <button onClick={() => handleNavigation('/', 'course-banner')}>Course</button>
        <button onClick={() => handleNavigation('/', 'descriptions')}>About Us</button>
        <button onClick={() => handleNavigation('/', 'faq')}>FAQ</button>
        <button onClick={() => handleNavigation('/', 'industry-applications')}>Benefits</button>
        <Link to="/careers">Careers</Link>
      </div>
    </div>
  );
};

export default Navbar;