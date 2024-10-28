const IndustryApplications = () => {

    const data=[
        {
          image:"https://fibregridstorage.blr1.cdn.digitaloceanspaces.com/Flydro_web_images/applications (1).png",
          text:"Aerial Survey & Mapping"
        },
        {
          image:"https://fibregridstorage.blr1.cdn.digitaloceanspaces.com/Flydro_web_images/applications (2).png",
          text:"Photography & Videography"
          },
          {
            image:"https://fibregridstorage.blr1.cdn.digitaloceanspaces.com/Flydro_web_images/applications (3).png",
            text:"Agriculture"
          },
          {
            image:"https://fibregridstorage.blr1.cdn.digitaloceanspaces.com/Flydro_web_images/applications (4).png",
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
      className="py-4 px-2 md:py-4 md:px-4 text-[1.2rem]  w-[calc(50%)] md:w-auto"
    >
      <div className="imageContainer md:w-full flex justify-center items-center">
        {/* <img
          className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
            src={item.image}
            srcSet={`${item.image} 160w`}
            sizes="(max-width: 600px) 120px, 160px"
          alt=""
        /> */}
        <img
  loading="lazy" // Enables lazy loading
  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
  src={item.image}
  srcSet={`${item.image} 160w`}
  sizes="(max-width: 600px) 120px, 160px"
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