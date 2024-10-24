import React from 'react'

const Divider = ({text}) => {
  return (
    <div className='text-primaryColor h-[10vh] md:h-[10vh] bg-white p-2 md:p-4  md:m-auto'
    style={{
        background: "linear-gradient(to right, rgb(24, 95, 171) 48%,transparent, rgb(248, 218, 90))",
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
    <div className="text-[1.1rem] md:text-[2rem] text-[#f8da5a] font-medium max-w-[1280px] px-4 md:px-12 uppercase text-left m-auto">
     {text}
    </div>
    </div>
  )
}

export default Divider