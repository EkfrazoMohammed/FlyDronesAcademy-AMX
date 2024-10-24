import Banner from '../HomeComponents/Banner';
import MidSection from '../HomeComponents/MidSection';
import CourseBanner from '../HomeComponents/CourseBanner';
import Descriptions from '../HomeComponents/Descriptions';
import IndustryApplications from '../HomeComponents/IndustryApplications';
import Locations from '../HomeComponents/Locations';
import FAQ from '../HomeComponents/FAQ';
import Partners from '../HomeComponents/Partners';

const Home = () => {
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
        <Descriptions />
      </div>
      <div id="industry-applications">
        <IndustryApplications />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="partners">
        <Partners />
      </div>
      <div id="locations">
        <Locations />
      </div>
    </div>
  );
};

export default Home;
