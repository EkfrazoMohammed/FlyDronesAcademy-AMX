import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DayStepper = ({ dayData }) => {
  return (
    <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-2 md:p-8">
      <ol className="flex flex-col justify-center items-center md:flex-row gap-3 md:gap-0 w-full text-gray-500 border-gray-200">
        {dayData.topics.map((step, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <>
                <li className="relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]">
                  <div className="font-medium text-[10px] md:text-[12px] leading-tight">
                    {step}
                  </div>
                  <span className="my-2 flex items-center justify-center w-5 h-5 md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor"></span>
                  <div className="font-medium text-[10px] md:text-[12px] leading-tight text-white">
                    a
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]">
                  <div className="font-medium text-[10px] md:text-[12px] leading-tight text-white">
                    a
                  </div>
                  <span className="my-2 flex items-center justify-center w-5 h-5 md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor"></span>
                  <div className="font-medium text-[10px] md:text-[12px] leading-tight">
                    {step}
                  </div>
                </li>
              </>
            )}
            {index < dayData.topics.length - 1 && (
              <div className="relative flex md:items-center md:justify-center w-auto md:flex-1 h-4">
                <div className="border-l-4 md:border-l-0 md:border-t-4 border-dotted border-primaryColor h-full md:h-auto w-0 md:w-full"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

const DayStepperParent = ({ dayData }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileView ? (
    <DayStepperMobile dayData={dayData} />
  ) : (
    <DayStepper dayData={dayData} />
  );
};

const DayStepperMobile = ({ dayData }) => {
  return (
    <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-2">
      <ol className="flex flex-col justify-center items-center md:flex-row gap-3 md:gap-0 w-full text-gray-500 border-gray-200">
        {dayData.topics.map((step, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <>
                <li className="flex w-full">
                  <li className="relative flex justify-end items-center md:justify-center md:items-center text-center flex-row md:flex-col min-w-[54%] max-w-[280px]">
                    <div className="font-medium text-[10px] md:text-[12px] w-[90%] m-auto leading-tight">
                      {step}
                    </div>
                    <span className="my-2 flex items-center justify-center w-5 h-5 md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor"></span>
                    <div className="font-medium text-[10px] md:text-[12px] leading-tight text-white">
                      a
                    </div>
                  </li>
                  <li className="relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col min-w-[46%] max-w-[280px]"></li>
                </li>
              </>
            ) : (
              <>
                <li className="flex w-full">
                  <li className="relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col min-w-[46%] max-w-[280px]"></li>
                  <li className="relative flex justify-start items-center md:justify-center md:items-center text-center flex-row md:flex-col min-w-[54%] max-w-[280px]">
                    <div className="font-medium text-[10px] md:text-[12px] leading-tight text-white">
                      a
                    </div>
                    <span className="my-2 flex items-center justify-center w-5 h-5 md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor"></span>
                    <div className="font-medium text-[10px] md:text-[12px] w-[90%] m-auto leading-tight">
                      {step}
                    </div>
                  </li>
                </li>
              </>
            )}
            {index < dayData.topics.length - 1 && (
              <div className="relative flex md:items-center md:justify-center w-auto md:flex-1 h-4">
                <div className="border-l-4 md:border-l-0 md:border-t-4 border-dotted border-primaryColor h-full md:h-auto w-0 md:w-full"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

const Stepper = ({ courseData }) => {
  return (
    <>
      {courseData?.curriculum?.map((dayData, dayIndex) => (
        <div key={dayIndex} className="mb-4 md:mb-10cmd:mt-0">
          <div
            className="text-primaryColor h-[40px] md:h-[10vh] w-full bg-white p-2 md:p-4 md:m-auto"
            style={{
              background:
                'linear-gradient(to right,transparent, rgb(248, 218, 90) 50%,transparent)',
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
            }}
          >
            <div className="text-[1.1rem] md:text-[2rem] text-primaryColor text-center font-medium max-w-[1280px] px-4 md:px-12 uppercase m-auto">
              Day {dayData.day}
            </div>
          </div>
          <div style={{ width: `${100 - dayIndex * 16}%`, margin: 'auto' }}>
            <DayStepperParent dayData={dayData} />
          </div>
        </div>
      ))}
    </>
  );
};

Stepper.propTypes = {
  courseData: PropTypes.shape({
    curriculum: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number.isRequired,
        topics: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

DayStepperParent.propTypes = {
  dayData: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

DayStepper.propTypes = {
  dayData: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

DayStepperMobile.propTypes = {
  dayData: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Stepper;
