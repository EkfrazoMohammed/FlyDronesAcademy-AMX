import React from 'react'
import img1 from "../../assets/applications (1).png";  
import img2 from "../../assets/applications (2).png";  
import img3 from "../../assets/applications (3).png";  
import img4 from "../../assets/applications (4).png";  

const IndustryApplications = () => {

    const data=[
        {
          image:img3,
          text:"Aerial Survey & Mapping"
        },
        {
          image:img2,
            text:"Photography & Videography"
          },
          {
            image:img4,
            text:"Agriculture"
          },
          {
            image:img1,
            text:"Hobby & Recreation"
      },
    ]
  return (
    <div className='p-4 text-primaryColor'>
           <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="heading p-2 text-[2rem] flex justify-center items-center text-center m-0 bg-white w-full">Industry Applications</div>

        <div className="paragraphs w-full md:w-full max-w-[340px] md:max-w-[1200px] flex flex-wrap md:justify-between md:items-center gap-4 md:gap-8">
  {data.map((item, index) => (
    <div
      key={index}
      className="py-4 px-2 md:py-4 md:px-4 text-[1.2rem]  w-[calc(50%)] md:w-auto"
    >
      <div className="imageContainer md:w-full flex justify-center items-center">
        <img
          className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
          loading="lazy" src={item.image}
          alt=""
        />
      </div>
      <div className="textContent text-[1rem] md:text-[1.4rem]">{item.text}</div>
    </div>
  ))}
</div>

        </div>
    </div>
  )
}

export default IndustryApplications