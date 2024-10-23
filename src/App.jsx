import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/utils/Navbar';
import Footer from './components/utils/Footer';
import Home from './components/Screens/Home';
import Careers from './components/Screens/Careers';
import Contacts from './components/HomeComponents/Contacts';
import CourseDetails from './components/CourseComponents/CourseDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
      <Contacts />
      <Footer />
    </Router>
  );
};

export default App;
