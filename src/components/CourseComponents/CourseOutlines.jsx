import React from 'react'
import Divider from '../utils/Divider'
import Stepper from '../utils/Stepper'

const CourseOutlines = () => {
 
  return (
    <>
      {/* About us */}
      <div className='w-full text-center items-center justify-center'>

       {/* intro start*/}
          <Divider text='Course Outlines' />
          
          <div className="text-[1.1rem] md:text-[2rem] text-primaryColor  font-medium max-w-[1280px] py-4 text-left px-4 md:px-12 uppercase m-auto">
          Course Duration : 5 Days
            </div>
          {/* intro end*/}
          <Stepper />
      </div>
    </>
  )
}

export default CourseOutlines