import Banner from '../CareerComponents/Banner';
import MidSection from '../CareerComponents/MidSection';
import CourseBanner from '../CareerComponents/CourseBanner';
import WhyWorkWithUs from '../CareerComponents/WhyWorkWithUs';
import JobListings from '../CareerComponents/JobListings';

const Careers = () => {
  return (
    <div>
      <div id="banner">
        <Banner />
      </div>
      <div id="mid-section">
        <MidSection />
      </div>
      <div id="course-banner">
        <CourseBanner />
      </div>
      <div id="descriptions">
        <WhyWorkWithUs />
      </div>
      <div id="jobs">
        <JobListings />
      </div>
    </div>
  );
};

export default Careers;
