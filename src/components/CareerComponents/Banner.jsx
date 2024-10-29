const Banner = () => {
  return (
    <div className="relative h-[400px] md:h-[90vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center  background-moving"
        style={{ backgroundImage: "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-violet-950 opacity-50"></div>
      {/* Text Content */}
      <div className="relative banner-text-container">
    <div className="h-[380px] md:h-[90vh] flex justify-center items-center gap-2 sm:gap-4 md:gap-16 px-2 py-2 md:px-32 md:py-8 text-center">

      <div className="flex flex-col  gap-2 sm:gap-4 md:gap-16 w-full md:w-[100%] text-white">
      <div >

      <div className="text-[2rem] md:text-[4.2rem] font-medium">
   JOIN OUR TEAM
      </div>
      <div className="text-[1.4rem] md:text-[1.8rem] font-medium">
        Be A Part Of Our Team
      </div>
      </div>
    </div>
      </div>
      </ div>
    </div>
  );
};

export default Banner;
