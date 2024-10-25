import React from 'react';

const Stepper = () => {
   // Days and topics array
   const days1={   
    "curriculum": [
      {
          "id": 1,
          "day": 1,
          "topics": [
              "Introduction",
              "Basic Concepts",
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
              "Practical Examples",
               "Introduction",
          ],
          "description": "<p>Day 2 description</p>"
      },
      {
        "id": 3,
        "day": 3,
        "topics": [
            "Introduction",
            "Basic Concepts",
             "Introduction",
            "Basic Concepts"
        ],
        "description": "<p>Day 3 description</p>"
    },
    {
        "id": 4,
        "day": 4,
        "topics": [
            "Intermediate Concepts",
            "Practical Examples",
             "Introduction",
        ],
        "description": "<p>Day 4 description</p>"
    },
    {
      "id": 5,
      "day": 5,
      "topics": [
          "Introduction",
      ],
      "description": "<p>Day 5 description</p>"
  },
  
  ]
    }
  const DayStepper = ({ dayData }) => {
    console.log(dayData)
    return (
      <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-8">
        <ol className="flex items-center justify-center w-full text-gray-500 border-gray-200">
          {dayData.topics.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Item */}
              <li className={`relative flex justify-center items-center text-center flex-col`}>
                {index % 2 === 0 ? (
                  <>
                    <div className="font-medium leading-tight">{step}</div> {/* Use 'step' directly */}
                    <span className={`my-2 flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium leading-tight text-white">a</div>
                  </>
                ) : (
                  <>
                    <div className="font-medium leading-tight text-white">a</div>
                    <span className={`my-2 flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                    <div className="font-medium leading-tight">{step}</div> {/* Use 'step' directly */}
                  </>
                )}
              </li>
  
              {/* Horizontal dotted line between steps */}
              {index < dayData.topics.length - 1 && (
                <div className="flex-1 relative flex items-center justify-center">
                  <div className="w-full border-t-4 border-dotted border-primaryColor"></div>
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
        <div key={dayIndex} className='mb-10'>
          <div className='text-primaryColor h-[10vh] md:h-[10vh] w-full bg-white p-2 md:p-4 md:m-auto'
          
          style={{
                    background: "linear-gradient(to right,transparent, rgb(248, 218, 90) 50%,transparent)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                  }}
            >
            <div className="text-[1.1rem] md:text-[2rem] text-primaryColor text-center font-medium max-w-[1280px] px-4 md:px-12 uppercase m-auto">
              {dayData.day}
            </div>
          </div>

          <DayStepper dayData={dayData} />
          {/* <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-8">
            <ol className="flex items-center justify-center w-full text-gray-500 border-gray-200">
              {dayData.topics.map((step, index) => (
                <React.Fragment key={index}>
                  <li className={`relative flex justify-center items-center text-center flex-col`}>
                    {index % 2 === 0 ? (
                      <>
                        <div className="font-medium leading-tight">{step.title}</div>
                        <span className={`my-2 flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                        <div className="font-medium leading-tight text-white">a</div>
                      </>
                    ) : (
                      <>
                        <div className="font-medium leading-tight text-white">a</div>
                        <span className={`my-2 flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full ring-2 ring-primaryColor`}></span>
                        <div className="font-medium leading-tight">{step.title}</div>
                      </>
                    )}
                  </li>
                  {index < dayData.topics.length - 1 && (
                    <div className="flex-1 relative flex items-center justify-center">
                      <div className="w-full border-t-4 border-dotted border-primaryColor"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default Stepper;
