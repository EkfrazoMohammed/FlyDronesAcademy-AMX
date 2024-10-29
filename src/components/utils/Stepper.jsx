import React, {useState,useEffect} from 'react';

const Stepper = () => {
   // Days and topics array
   const days1={   
    "curriculum": [
      {
          "id": 1,
          "day": 1,
          "topics": [
              "Regulations of DGCA, Civil Aviation Requiremnts",
              "Basic Principles of Flight",
               "ATC Procedures & Radio Telephony",
              "Fixed Wing Operations and Aerodynamics",
              "Introduction to Multirotors",
              "Weather and Meteorology",
              "Drone Equipment Maintanence"
          ],
          "description": "<p>Day 1 description</p>"
      },
      {
          "id": 2,
          "day": 2,
          "topics": [
              "Emergency Identification and Handling",
              "Payload Installation and Utilization",
               "Image and video Interpretation",
          ],
          "description": "<p>Day 2 description</p>"
      },
      {
        "id": 3,
        "day": 3,
        "topics": [
            "Introduction to Flight Simulator",
            "Flight Simulator Training",
             "Practical Lessons in Lab"
        ],
        "description": "<p>Day 3 description</p>"
    },
    {
        "id": 4,
        "day": 4,
        "topics": [
            "Practical Flying Sessions",
        ],
        "description": "<p>Day 4 description</p>"
    },
    {
      "id": 5,
      "day": 5,
      "topics": [
        "Practical Flying Sessions",

      ],
      "description": "<p>Day 5 description</p>"
  },
  
  ]
    }
    const DayStepperParent = ({ dayData }) => {
      const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
    
      useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 767);
        window.addEventListener("resize", handleResize);
    
        // Cleanup on unmount
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      return isMobileView ? <DayStepperMobile dayData={dayData} /> : <DayStepper dayData={dayData} />;
    };

  const DayStepper = ({ dayData }) => {
    return (
      <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-2 md:p-8">
        <ol className="flex flex-col justify-center items-center md:flex-row gap-3 md:gap-0 w-full text-gray-500 border-gray-200">
          {dayData.topics.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Item */}
              {/* <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]`}> */}
                {index % 2 === 0 ? (
                  <>
                   <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]`}>
             
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight">{step}</div> {/* Use 'step' directly */}
                    <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div>
                 </li>
                  </>
                ) : (
                  <>
                   <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]`}>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div>
                    <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight">{step}</div> {/* Use 'step' directly */}
                   </li>
                    
                  </>
                )}
              {/* </li> */}
  
              
  {/* Dotted line between steps */}
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
  const DayStepperMobile = ({ dayData }) => {
    return (
      <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-2">
        <ol className="flex flex-col justify-center items-center md:flex-row gap-3 md:gap-0 w-full text-gray-500 border-gray-200">
          {dayData.topics.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Item */}
              {/* <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col max-w-[200px] md:max-w-[120px]`}> */}
                {index % 2 === 0 ? (
                  <>
                  <li className='flex w-full'>

                  <li className={`relative flex justify-end items-center md:justify-center md:items-center text-center flex-row md:flex-col min-w-[54%] max-w-[280px]`}>
             
             <div className="font-medium text-[10px] md:text-[12px] w-[90%] m-auto leading-tight">{step}</div> {/* Use 'step' directly */}
             <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
             <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div>
          </li>
                   <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col min-w-[46%] max-w-[280px]`}>
                    {/* <div className="font-medium text-[10px] md:text-[12px]  leading-tight">{step}</div>
                       <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div> */}
                   </li>

                
                 </li>
                  </>
                ) : (
                  <>
                    <li className='flex w-full'>

                  
                   <li className={`relative flex justify-start items-start md:justify-center md:items-center text-center flex-row md:flex-col min-w-[46%] max-w-[280px]`}>
                    {/* <div className="font-medium text-[10px] md:text-[12px]  leading-tight">{step}</div>
                       <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div> */}
                   </li>
                   <li className={`relative flex justify-start items-center md:justify-center md:items-center text-center flex-row md:flex-col min-w-[54%] max-w-[280px]`}>
                    <div className="font-medium text-[10px] md:text-[12px]  leading-tight text-white">a</div>
                    <span className={`my-2 flex items-center justify-center w-5 h-5  md:w-10 md:h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium text-[10px] md:text-[12px] w-[90%] m-auto leading-tight">{step}</div> {/* Use 'step' directly */}
                   </li>
                   </li>
                  </>
                )}
              {/* </li> */}
  
              
  {/* Dotted line between steps */}
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
  
  
 
  return (
    <>
      {days1.curriculum.map((dayData, dayIndex) => (
        <div key={dayIndex} className='mb-4  md:mb-10cmd:mt-0'>
          <div className='text-primaryColor h-[40px] md:h-[10vh] w-full bg-white p-2 md:p-4 md:m-auto'
          
          style={{
                    background: "linear-gradient(to right,transparent, rgb(248, 218, 90) 50%,transparent)",
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
 
          {/* <DayStepperParent dayData={dayData} /> */}
         
        </div>
      ))}
    </>
  );
};

export default Stepper;
