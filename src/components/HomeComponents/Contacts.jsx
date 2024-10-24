const Contacts = () => {
  return (
    <div className='text-primaryColor'>
      <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="paragraphs py-3 px-4 md:py-6 md:px-12 text-[1.5rem] text-left w-full flex items-center justify-center"
        style={{
          background: "linear-gradient(to right, rgb(24, 95, 171) 35%, rgba(24, 95, 171,0.75)), url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_02.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}>
          <div className='max-w-[1280px] w-full'>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 w-[100%] text-secondaryColor">
                  <div className="text-[1.6rem] md:text-[2rem] md:text-leftfont-medium">Contact Us</div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img className="w-[30px] h-[30px]" src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_01.jpg" alt="" />
                  </div>
                <div className="text-[1.2rem] font-medium max-w-full md:max-w-[50%]]"><a href="mailto:example@mail.com" className="hover:text-yellow-100">example@mail.com</a></div>
                </div>
                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img className="w-[30px] h-[30px]" src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_02.png" alt="" />
                  </div>
                <div className="text-[1.2rem] font-medium max-w-full md:max-w-[50%]"><a href="tel:+911233456789" className="hover:text-yellow-100">+91 1233456789</a> | <a href="tel:+911233456789" className="hover:text-yellow-100">+91 1233456789</a></div>
                </div>

                <div className='flex gap-4'>
                <div className="text-[1.8rem] font-medium">
                  <img className="w-[30px] h-[30px]" src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_03.png" alt="" />
                  </div>
                <div className="text-[1.2rem] flex flex-col gap-1 text-justifyfont-medium max-w-full md:max-w-[50%]">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
