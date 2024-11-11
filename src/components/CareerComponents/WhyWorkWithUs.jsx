const WhyWorkWithUs = () => {
  const data = [
    {
      image:
        'https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_05.png',
      text: 'Aerial Survey & Mapping',
    },
    {
      image:
        'https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_06.png',
      text: 'Lorem ipsum dolor sit',
    },
    {
      image:
        'https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/icon_07.png',
      text: 'Lorem ipsum dolor sit',
    },
  ];
  return (
    <>
      <div className=" text-primaryColor">
        <div className="heading p-4 text-[2rem] flex justify-center items-center text-center m-0 w-full">
          Why Work With Us ?
        </div>

        <div className="relative h-[400px] md:h-[60vh] color-primaryColor">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-contain bg-center"
            style={{
              backgroundImage:
                "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/gray_bg.jpg')",
            }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-5"></div>
          {/* Text Content */}
          <div className="relative banner-text-container">
            <div className="h-[400px] md:h-[60vh] flex flex-col md:flex-row justify-center items-center flex-wrap gap-6 md:gap-16  md:px-32 py-2 md:py-8">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      src={item.image}
                      alt={item.image}
                      className="w-[160px] h-[160px] md:w-[260px] md:h-[260px] object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyWorkWithUs;
