const Partners = () => {
 
        const data=[
          {
            image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/1_14.png",
            text:"Aerial Survey & Mapping"
          },
          {
            image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/1_14.png",
            text:"Lorem ipsum dolor sit"
          },
          {
            image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/1_14.png",
            text:"Lorem ipsum dolor sit"
          },
          {
            image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/1_14.png",
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
                <img className="w-[120px] h-[120px] filter grayscale transition-all duration-200 hover:grayscale-0" 
                  srcSet={`${item.image} 140w`}
            sizes="(max-width: 600px) 100px, 140px"
                  src={item.image} alt="" />
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