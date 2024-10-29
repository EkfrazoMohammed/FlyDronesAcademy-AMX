const CourseBanner = () => {
  return (
    <div className="relative h-[460px] md:h-[70vh] color-primaryColor">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-center"
        style={{ backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/gray_bg.jpg')", 
        
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-5"></div>
      {/* Text Content */}
      <div className="relative banner-text-container">
    <div className="h-[400px] sm:h-[60vh] md:h-[70vh] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 px-4 md:px-32 py-2 md:py-8">

      <div className="flex flex-col gap-3 md:gap-12 w-full md:w-[80%] text-primaryColor">
      <div >

      <div className="text-[1.6rem] md:text-[2.2rem] mb-3 font-semibold">
        We are Built Differently
      </div>
      <div className="text-[1rem] md:text-[1.4rem] font-medium text-justify">
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro earum ab velit, nemo officia iste quia, aut nulla, iure odio illum explicabo! Minima quas vitae recusandae, vero quod voluptas! Pariatur accusamus.
      </div>
      </div>
    </div>

    <div className="flex gap-2 md:gap-12 w-full md:w-[50%] text-primaryColor justify-center items-center">
    <div className="flex flex-col gap-2" >

    <div className="image-container w-[170px] h-[170px] md:w-[320px] md:h-[320px] object-cover">
        <img className='h-full w-full'   src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/flydro_logo_png_1.png" alt="" />
      </div>

    </div>
      <div className="flex flex-col gap-1" >

      <div className="text-[1.6rem] md:text-[4rem] font-medium text-center uppercase">
        Teams
      </div>
      <div className="text-[1rem] md:text-[1.4rem]  text-center font-medium">
        Lorem ipsum dolor sit amet consectetur 
      </div>
      </div>
    </div>

    </div>
      </div>
      </div>
  );
};

export default CourseBanner;
