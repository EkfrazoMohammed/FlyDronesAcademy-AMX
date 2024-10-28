const Locations = () => {
  return (
    <div className='text-primaryColor min-h-[300px] md:min-h-[35vh] bg-[#f8da5a]'>
      <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="paragraphs py-3 px-4 md:py-8 md:px-12 text-[1.5rem] text-left w-full  flex flex-col md:flex-row items-center justify-center">
          <div className='max-w-[1280px] w-full'>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="flex flex-col gap-2 w-[100%] text-primaryColor">
                  <div className="text[1.6rem] md:text-[3rem] font-medium">FlyDro Academy RPTO Location</div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium"> 
                  <img className="w-[80px] h-[80px]" src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_04.png" alt="" />
                  </div>
                <div className="text-[1.1rem] md:text-[1.2rem] font-medium max-w-full md:max-w-[50%] flex flex-col gap-1">
                <span>
                  Corporate Office:
                  </span>
                  <span>
                  #132, 4th floor, Chitrapur bhavan, 15th Cross,
                  </span>
                  <span>
                  8th Main, Malleshwaram, Bangalore- 560055
                  </span>  
                </div>
                </div>
              </div>
              <div className="text-black text-2xl font-bold flex justify-center items-center w-full md:w-[50%] m-auto">
                <div className="map-container w-[360px] h-[260px]">
                  <iframe   src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d239.85980792759707!2d74.6046129!3d15.8693678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf5d004088e361%3A0x69cbca93db4c4177!2sFlydro%20Academy%2C%20Remote%20Pilot%20Training%20Organisation!5e0!3m2!1sen!2sin!4v1728995432380!5m2!1sen!2sin" 
                  className='h-full w-full'
                  allowFullScreen
                   
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FlyDro Academy Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
