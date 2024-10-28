import React from 'react'

const Partners = () => {
  
    
        const data=[
            {
                image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_01_1_YSu.png",
                text:"Aerial Survey & Mapping"
            },
            {
                image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_01_1_YSu.png",
                text:"Lorem ipsum dolor sit"
            },
            {
                image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_01_1_YSu.png",
                text:"Lorem ipsum dolor sit"
            },
            {
                image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_01_1_YSu.png",
                text:"Lorem ipsum dolor sit"
            },
    
        ]
      return (
        <div className='p-4 text-primaryColor'>
               <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
            <div className="heading p-2 text-[1.3rem] md:text-[2.2rem] flex justify-center items-center text-center m-0 bg-white w-full">Companies we have Partnered for Placement</div>
    
              <div className="paragraphs max-w-[1280px] w-full md:w-full flex justify-center items-center gap-4 flex-wrap ">
              {data.map((item, index)=>{
                return (
                    <>
                         <div className="py-3 px-3 md:py-6 md:px-12 text-[1.2rem]">
              <div className="imageContainer w-full">
                <img className="w-[130px] h-[130px]"   src={item.image} alt="" />
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