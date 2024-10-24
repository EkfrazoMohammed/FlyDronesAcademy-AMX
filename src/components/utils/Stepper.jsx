// import React from 'react';

// const Stepper = () => {
//   // Step details array
//   const steps = [
//     { title: 'Personal Info', icon: 'check' },
//     { title: 'Account Info', icon: 'user' },
//     { title: 'Confirmation', icon: 'file' },
//     { title: 'Confirmation', icon: 'check-circle' },
//     { title: 'Personal Info', icon: 'check' },
//     { title: 'Account Info', icon: 'user' },
//     { title: 'Confirmation', icon: 'file' },
//     { title: 'Confirmation', icon: 'check-circle' },
//   ];

//   return (
//     <>
//     <div className='text-primaryColor h-[10vh] md:h-[10vh] w-full bg-white p-2 md:p-4  md:m-auto'
//     style={{
//         background: "linear-gradient(to right,transparent, rgb(248, 218, 90) 50%,transparent)",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center right',
//       }}
//     >
//     <div className="text-[1.1rem] md:text-[2rem] text-primaryColor text-center font-medium max-w-[1280px] px-4 md:px-12 uppercase m-auto">
//     Day - 01
//     </div>
//     </div>
    
//     <div className="max-w-[1280px] w-full  flex flex-col gap-2 justify-center m-auto p-8 "> {/* Flex container to center the stepper */}
    
//       <ol className="flex items-center justify-between w-full text-gray-500  border-gray-200">
//         {steps.map((step, index) => (
//           <React.Fragment key={index}>
//             {/* Step Item */}

//             <li className={`relative flex justify-center items-center text-center flex-col`}>
//             {index % 2 === 0 ? <>
//               <div className="font-medium leading-tight">{step.title}</div>
//                 <span className={`my-2 flex items-center justify-center w-10 h-10 ${index % 2 === 0 ? 'bg-yellow-300' : 'bg-yellow-300'} rounded-full ring-2 ring-primaryColor`}>
//               </span>
//               <div className="font-medium leading-tight text-white">a</div>
          
//             </> :<>
//             <div className="font-medium leading-tight text-white">a</div>
//             <span className={`my-2 flex items-center justify-center w-10 h-10 ${index % 2 === 0 ? 'bg-yellow-300' : 'bg-yellow-300'} rounded-full ring-2 ring-primaryColor`}>
//               </span>
//               <div className="font-medium leading-tight">{step.title}</div>
            
//             </>}
             
//             </li>
//             {index < steps.length - 1 && (
//             <div className="flex-1 relative flex items-center justify-center">
//                 <div className="w-full border-t-4 border-dotted border-primaryColor"></div>
//             </div>
//             )}

//           </React.Fragment>
//         ))}
//       </ol>
//     </div>
//     </>
//   );
// };

// export default Stepper;


import React from 'react';

const Stepper = () => {
  // Days and topics array
  const days = [
    {
      day: 'Day 01',
      topics: [
        { title: 'Personal Info', icon: 'check' },
        { title: 'Account Info', icon: 'user' },
        { title: 'Review', icon: 'file' },
        { title: 'Confirmation', icon: 'check-circle' },
        { title: 'Review', icon: 'file' },
        { title: 'Confirmation', icon: 'check-circle' },
        { title: 'Review', icon: 'file' },
      ],
    },
    {
      day: 'Day 02',
      topics: [
        { title: 'Project Setup', icon: 'check' },
        { title: 'Development', icon: 'user' },
        { title: 'Testing', icon: 'file' },
      ],
    },
    {
        day: 'Day 03',
        topics: [
          { title: 'Personal Info', icon: 'check' },
          { title: 'Review', icon: 'file' },
          { title: 'Confirmation', icon: 'check-circle' },
          { title: 'Review', icon: 'file' },
        ],
      },
      {
        day: 'Day 04',
        topics: [
          { title: 'Personal Info', icon: 'check' },
          { title: 'Account Info', icon: 'user' },
          { title: 'Review', icon: 'file' },
          { title: 'Review', icon: 'file' },
        ],
      },
      {
        day: 'Day 05',
        topics: [
         
          { title: 'Review', icon: 'file' },
        ],
      },
    // Add more days and topics as needed
  ];

  return (
    <>
      {days.map((dayData, dayIndex) => (
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

          <div className="max-w-[1280px] w-full flex flex-col gap-2 justify-center m-auto p-8">
            <ol className="flex items-center justify-center w-full text-gray-500 border-gray-200">
              {dayData.topics.map((step, index) => (
                <React.Fragment key={index}>
                  {/* Step Item */}
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
        </div>
      ))}
    </>
  );
};

export default Stepper;
