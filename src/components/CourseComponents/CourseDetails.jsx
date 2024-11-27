import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../api/apirequest';
import Banner from './Banner';
import Introduction from './Introduction';
import CourseOutlines from './CourseOutlines';

const CourseDetails = () => {
  const { id } = useParams(); // Get the id from URL params
  const [courseData, setCourseData] = useState(null); // Default state is null
  const [courseCriteria, setCourseCriteria] = useState(null); //
  const [courseDocument, setCourseDocument] = useState(null); // Default state

  const fetchData = async () => {
    try {
      // Use the id in the API request
      const response = await API.get(`course/${id}/`);
      setCourseData(response?.data); // Set the response data in state
      setCourseCriteria(response?.data?.criteria_details);
      setCourseDocument(response?.data?.document_details);
    } catch (error) {
      console.error('Error fetching the course data', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [id]); // Re-run if id changes

  return (
    <>
      <div>
        <Banner />
        <Introduction
          courseData={courseData}
          courseCriteria={courseCriteria}
          courseDocument={courseDocument}
        />
        <CourseOutlines courseData={courseData} />
      </div>
    </>
  );
};

export default CourseDetails;
