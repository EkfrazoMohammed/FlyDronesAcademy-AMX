import Divider from '../utils/Divider';
import PropTypes from 'prop-types';

const Introduction = ({ courseData, courseCriteria, courseDocument }) => {
  return (
    <>
      {/* About us */}
      <div className="w-full flex flex-col m-0 text-center items-center justify-center">
        <div
          className="w-full bg-contain bg-center bg-repeat-y"
          style={{
            backgroundImage:
              "url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/gray_bg.jpg')",
          }}
        >
          {/* intro start*/}
          <Divider text="Introduction" />
          <div className="paragraphs max-w-[1280px] py-2 px-2 md:py-6 md:px-12 text-[1.1rem] md:text-[1.2rem] text-justify m-auto">
            {courseData?.description}
          </div>
          {/* intro end*/}

          {/* Eligibility start*/}
          {courseCriteria?.length > 0 && (
            <>
              <Divider text="Eligibility Criteria" />
            </>
          )}

          <div className="paragraphs max-w-[1280px] py-2 px-2 md:py-6 md:px-12 text-justify m-auto">
            {courseCriteria?.length > 0 && (
              <>
                <div className="text-primaryColor text-[1.4rem] md:text-[2rem] font-semibold text-center">
                  An Individual is eligible to obtain a Remote Pilot Certificate
                </div>
                <div className="text-primaryColor text-[1.4rem] md:text-[2rem] font-semibold text-center">
                  if He/She is
                </div>
              </>
            )}

            {/* dynamic start*/}
            {courseCriteria?.map((value) => {
              return (
                <>
                  <div className="flex gap-4">
                    <div className="text-[1.8rem] font-medium">
                      <img
                        className="w-[180px] h-[120px] md:w-[160px] md:max-w-[160px] md:h-[160px] md:max-h-[160px]"
                        src={value?.criteria_image}
                        alt={value?.criteria_image}
                      />
                    </div>
                    <div className="text-[1.1rem] md:text-[1.6rem] font-medium max-w-full md:max-w-full flex justify-center items-center">
                      {value?.criteria_description}
                    </div>
                  </div>
                </>
              );
            })}
            {/* dynamic end*/}
          </div>
          {/* Eligibility end*/}

          {/* Documents start*/}
          {courseDocument?.length > 0 && (
            <>
              <Divider text="Document Required" />
            </>
          )}

          <div className="paragraphs flex items-center justify-center gap-4 md:gap-16 max-w-[1280px] py-2 px-2 md:py-6 md:px-12 text-justify flex-wrap m-auto">
            {/* dynamic start*/}
            {courseDocument?.map((value) => {
              return (
                <>
                  <div className="flex flex-col gap-2  w-[calc(42%)] md:w-[calc(28%)]">
                    <img
                      className=" w-[120px] h-[120px] md:w-[220px] md:h-[220px] m-auto"
                      src={value?.document_image}
                      alt={value?.document_image}
                    />
                    <div className="text-primaryColor text-[1rem] md:text-[1.2rem] text-center">
                      {value?.document_name}
                    </div>
                  </div>
                </>
              );
            })}
            {/* dynamic end*/}
          </div>
          {/* Eligibility end*/}
        </div>
      </div>
    </>
  );
};

Introduction.propTypes = {
  courseData: PropTypes.array.isRequired,
  courseCriteria: PropTypes.array.isRequired,
  courseDocument: PropTypes.array.isRequired,
};

export default Introduction;
