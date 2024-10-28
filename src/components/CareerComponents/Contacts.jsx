const Contacts = () => {
  return (
    <div className='text-primaryColor'>
      <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="paragraphs py-3 px-4 md:py-6 md:px-12 text-[1.5rem] text-left w-full flex items-center justify-center"
        style={{
          background: "linear-gradient(to right, #185fab 40%, rgba(244, 227, 59, 0)), url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}>
          <div className='max-w-[1280px] w-full'>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 w-[100%] text-secondaryColor">
                  <div className="text-[1.6rem] md:text-[2rem] text-center md:text-leftfont-medium">FlyDro Academy Location</div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img   src="" alt="" />
                  </div>
                <div className="text-[1.1rem] font-medium max-w-full md:max-w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, modi..</div>
                </div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img   src="" alt="" />
                  </div>
                <div className="text-[1.1rem] font-medium max-w-full md:max-w-[50%]]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, modi..</div>
                </div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img   src="" alt="" />
                  </div>
                <div className="text-[1.1rem] font-medium max-w-full md:max-w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, modi..</div>
                </div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img   src="" alt="" />
                  </div>
                <div className="text-[1.1rem] font-medium max-w-full md:max-w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, modi..</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
