import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from './Banner';
import Divider from '../utils/Divider';
import Introduction from './Introduction';
import CourseOutlines from './CourseOutlines';

const CourseDetails = () => {
  const { id } = useParams();  // Get the id from URL params
  const [courseData, setCourseData] = useState(null); // Default state is null

  const fetchData = async () => {
    try {
      // Use the id in the API request
      const response = await axios.get(`http://localhost:8000/api/course/${id}/`);
      setCourseData(response.data); // Set the response data in state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching the course data", error);
    }
  };

  // useEffect(() => {
  //   fetchData(); // Fetch data when the component mounts
  // }, [id]); // Re-run if id changes

  return (
      <>
    <div>
    <Banner />
    <Introduction />
    <CourseOutlines />


    </div>
      </>
  );
};

export default CourseDetails;
