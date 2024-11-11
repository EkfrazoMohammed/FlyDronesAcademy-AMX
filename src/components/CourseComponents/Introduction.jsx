import Divider from '../utils/Divider';
import PropTypes from 'prop-types';
import img1 from '../../assets/1 (20).png';
import img2 from '../../assets/1 (19).png';
import img3 from '../../assets/1 (6).png';

import doc1 from '../../assets/1 (1).png';
import doc2 from '../../assets/1 (3).png';
import doc3 from '../../assets/1 (30).png';
import doc4 from '../../assets/1 (31).png';
import doc5 from '../../assets/1 (32).png';

const Introduction = ({ courseData }) => {
  console.log(courseData);
  const data = [
    {
      image: img1,
      text: 'Not less than 18 years of age and not more than 65 years of age.',
    },
    {
      image: img2,
      text: 'Has passed class 10th examination or its equivalent from a recognized board.',
    },
    {
      image: img3,
      text: 'Has successfully completed such training from an Authorised Remote Pilot Training Organization',
    },
  ];

  const documents = [
    {
      image: doc2,
      text: 'Application Form',
    },
    {
      image: doc1,
      text: 'ID Proof (Aadhaar Card)',
    },
    {
      image: doc5,
      text: 'Address Proof (Passport/DL/Voter ID)',
    },
    {
      image: doc4,
      text: 'Medical Fitness Certificate',
    },
    {
      image: doc3,
      text: '10th Standard Marks card',
    },
  ];

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
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus saepe cumque, rerum cupiditate quae vero repellat assumenda laboriosam dolores similique unde nam ipsa cum, sapiente consequatur praesentium et commodi, provident omnis quaerat. Nam, sed labore a quos veritatis asperiores blanditiis at commodi dignissimos eligendi temporibus eum distinctio facilis nostrum enim magni impedit vero praesentium quia pariatur expedita necessitatibus. Porro exercitationem adipisci repellat illum tempora eius reiciendis reprehenderit, officia at sunt est sequi provident cum id recusandae iusto similique error. */}
          </div>
          {/* intro end*/}

          {/* Eligibility start*/}
          <Divider text="Eligibility Criteria" />

          <div className="paragraphs max-w-[1280px] py-2 px-2 md:py-6 md:px-12 text-justify m-auto">
            <div className="text-primaryColor text-[1.4rem] md:text-[2rem] font-semibold text-center">
              An Individual is eligible to obtain a Remote Pilot Certificate
            </div>
            <div className="text-primaryColor text-[1.4rem] md:text-[2rem] font-semibold text-center">
              if He/She is
            </div>

            {/* dynamic start*/}
            {data.map((value) => {
              return (
                <>
                  <div className="flex gap-4">
                    <div className="text-[1.8rem] font-medium">
                      <img
                        className="w-[180px] h-[120px] md:w-[160px] md:h-[160px]"
                        src={value.image}
                        alt={value.image}
                      />
                    </div>
                    <div className="text-[1.1rem] md:text-[1.6rem] font-medium max-w-full md:max-w-full flex justify-center items-center">
                      {value.text}
                    </div>
                  </div>
                </>
              );
            })}
            {/* dynamic end*/}
          </div>
          {/* Eligibility end*/}

          {/* Documents start*/}
          <Divider text="Document Required" />

          <div className="paragraphs flex items-center justify-center gap-4 md:gap-16 max-w-[1280px] py-2 px-2 md:py-6 md:px-12 text-justify flex-wrap m-auto">
            {/* dynamic start*/}
            {documents.map((value) => {
              return (
                <>
                  <div className="flex flex-col gap-2  w-[calc(42%)] md:w-[calc(28%)]">
                    <img
                      className=" w-[120px] h-[120px] md:w-[220px] md:h-[220px] m-auto"
                      src={value.image}
                      alt={value.image}
                    />
                    <div className="text-primaryColor text-[1rem] md:text-[1.2rem] text-center">
                      {value.text}
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
};

export default Introduction;
