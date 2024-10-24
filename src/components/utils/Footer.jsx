const Footer = () => {
    return (
        <div className='text-secondaryColor bg-primaryColor min-h-[10vh]'>
          <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
            <div className="paragraphs py-4 px-4 md:py-6 md:px-12 text-[1.5rem] text-left w-full flex items-center justify-center"
            >
              <div className='max-w-[1280px] w-full'>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 w-[100%] text-secondaryColor">
                      <div className="text-center text-[1.6rem] md:text-[2rem] font-medium">FlyDro Academy</div>
                    <div className="text-center text-[1rem] md:text-[1.1rem] font-medium"> &copy; 2024 El Imperio Automations. All Rights Reserved</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Footer

 

