const IndustryApplications = () => {
    const data=[
      {
        image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/applications_3_1.png",
        text:"Aerial Survey & Mapping"
      },
      {
        image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/applications_2_1.png",
        text:"Photography & Videography"
      },
      {
        image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/applications_4_1.png",
        text:"Agriculture"
      },
      {
          image:"https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/applications_1_3.png",
          text:"Hobby & Recreation"
    },
  ]
  return (
    <div className='p-4 text-primaryColor'>
           <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="heading p-2 text-[2rem] flex justify-center items-center text-center m-0 bg-white w-full">Industry Applications</div>

        <div className="paragraphs w-full md:w-full max-w-[340px] md:max-w-[1200px] flex flex-wrap md:justify-between md:items-center gap-4 md:gap-8">
  {data.map((item, index) => (
    <div
      key={index}
      className="py-4 px-2 md:py-4 md:px-4 text-[1.2rem]  w-[calc(45%)] md:w-auto m-auto"
    >
      <div className="imageContainer md:w-full flex justify-center items-center">

      <img
        loading="lazy" // Enables lazy loading
        className="w-[100px] h-[100px] md:w-[180px] md:h-[140px]"
        src={item.image}
        srcSet={`${item.image} 160w`}
        sizes="(max-width: 600px) 100px, 140px"
        alt={item.text}
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