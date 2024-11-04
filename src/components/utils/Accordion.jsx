import React, { useState } from 'react';

const Accordion = ({faqs}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  return (

<>
          {/* Accordion component */}
          <div className="divide-y divide-slate-200">
            {faqs?.map((faq, index) => (
              <div key={index} className="py-2">
                <div>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full text-left py-2"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faqs-text-0${index + 1}`}
                  >
                    <span className='text-[1.5rem]'>{faq.question}</span>
                    <svg
                      className="fill-primaryColor shrink-0 ml-8"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${expandedIndex === index ? '!rotate-180' : ''}`}
                      />
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${expandedIndex === index ? '!rotate-180' : ''}`}
                      />
                    </svg>
                  </button>
                </div>
                <div
                  id={`faqs-text-0${index + 1}`}
                  role="region"
                  aria-labelledby={`faqs-title-0${index + 1}`}
                  className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="p-2 text-[1.2rem] leading-6 text-primaryColor">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* End: Accordion component */}
          </>

         
  );
};

export default Accordion;
