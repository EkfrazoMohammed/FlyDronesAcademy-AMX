import React from 'react'
import img1 from "../../assets/1 (28).png";  
import img2 from "../../assets/1 (28).png"; 
import img3 from "../../assets/1 (28).png"; 
import img4 from "../../assets/1 (28).png"; 
const Partners = () => {
  
    
        const data=[
            {
              image:img1,
              text:"Aerial Survey & Mapping"
            },
            {
              image:img2,
              text:"Lorem ipsum dolor sit"
            },
            {
              image:img3,
              text:"Lorem ipsum dolor sit"
            },
            {
              image:img4,
              text:"Lorem ipsum dolor sit"
            },
    
        ]
      return (
        <div className='p-4 text-primaryColor'>
               <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
            <div className="heading p-2 text-[1.3rem] md:text-[2.2rem] flex justify-center items-center text-center m-0 bg-white w-full">Companies we have Partnered for Placement</div>
    
              <div className="paragraphs max-w-[1280px] w-full md:w-full flex justify-between px-6 items-center gap-4 flex-wrap ">
              {data.map((item, index)=>{
                return (
                    <>
               <div key ={index} className="py-3 px-3 md:py-6 md:px-6 text-[1.2rem]">
              <div className="imageContainer w-full transition-transform duration-200 transform ">
                <img className="w-[140px] h-[140px] filter grayscale transition-all duration-200 hover:grayscale-0" loading="lazy" src={item.image} alt="" />
              </div>
            </div>
                    </>
                )
              })}
           
            </div>
            </div>
        </div>
      
  )
}

export default Partners