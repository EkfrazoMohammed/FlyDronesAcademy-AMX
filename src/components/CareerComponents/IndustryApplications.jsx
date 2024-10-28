import React from 'react'

const IndustryApplications = () => {

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
        <div className="heading p-2 text-[2rem] flex justify-center items-center text-center m-0 bg-white w-full">Industry Applications</div>

        <div className="paragraphs w-full md:w-full max-w-[340px] md:max-w-[1200px] flex flex-wrap md:justify-center md:items-center gap-4 md:gap-8">
  {data.map((item, index) => (
    <div
      key={index}
      className="py-4 px-4 md:py-6 md:px-12 text-[1.2rem] border rounded-md w-[calc(50%-16px)] md:w-auto"
    >
      <div className="imageContainer md:w-full flex justify-center items-center">
        <img
          className="w-[120px] h-[120px] md:w-[320px] md:h-[260px]"
            src={item.image}
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