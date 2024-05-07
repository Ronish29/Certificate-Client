import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import PdfCard from './components/PdfCard';
import InformationCard from './components/InformationCard';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [certificateId, setcertificateId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [certificateData, setCertificateData] = useState([]);
  const API_URL = process.env.REACT_APP_BASE_URL;

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const generateCertificateId = (name, course) => {
    const certificateType = 'TD';
    const certificateName = name.substring(0, 4).toUpperCase();
    const certificateCourseType = course.substring(0, 2).toUpperCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const certificateId = `${certificateType}-${certificateName}-${certificateCourseType}-${randomNumber}`;
    setcertificateId(certificateId)
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVisible(true);
    generateCertificateId(name, course);

  }



  const handleUploadPDF = async (pdfBlob) => {
    const formData = new FormData();
    const newDate = formatDate(date);
    formData.append('name', name);
    formData.append('course', course);
    formData.append('email', email);
    formData.append('date', newDate)
    formData.append('certificateId', certificateId)
    formData.append('file', pdfBlob, `${name}_${course}_certificate.pdf`);
    console.log(formData);
    try {
      setUploadStatus('Uploading...');
      const response = await fetch(`${API_URL}/createCertificate`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('PDF uploaded successfully');
        setUploadStatus('Uploaded');
      } else {
        console.error('Failed to upload PDF');
        setUploadStatus('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setUploadStatus('Error uploading PDF');
    }
  };

  useEffect(() => {
    if (uploadStatus === "Uploaded") {
      setIsVisible(false)
      setUploadStatus('')
      setName('');
      setCourse('');
      setEmail('');
    }
    const getDetails = async () => {
      const response = await axios.get(`${API_URL}/getAllCertificate`);
      const certificateData = response.data.certificates;
      console.log(certificateData);
      setCertificateData(certificateData);

    }
    getDetails();
  }, [uploadStatus, API_URL]);


  return (
    <div >
      <h1 className='text-center text-3xl mt-10 font-bold'>Certificate Generator</h1>
      <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <div className="md:flex md:justify-around md:items-center md:flex-wrap">
          <div className="w-full md:w-1/2 md:px-4">
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-2xl font-bold font-sans">
                  Enter Your Name :
                </label>
                <input
                  value={name}
                  type="text"
                  className="border px-4 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-200"
                  placeholder="Enter Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="course" className="text-2xl font-bold font-sans">
                  Enter Course :
                </label>
                <input
                  value={course}
                  type="text"
                  className="border px-4 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-200"
                  placeholder="Enter Course"
                  required
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-2xl font-bold font-sans">
                  Enter Student's Email
                </label>
                <input
                  value={email}
                  type="email"
                  className="border px-4 py-3 rounded-md focus:outline-none focus:ring focus:border-blue-200"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:px-4 md:mt-0 mt-8">
            <div className="flex flex-col">
              <label htmlFor="date" className="text-2xl font-bold font-sans">
                Select Data of approval :
              </label>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="border mt-4"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button className="px-6 py-3 bg-blue-600 w-fit rounded-lg text-white">
            Submit
          </button>
        </div>
        <div className="flex justify-center items-center mt-10">
          <p>{uploadStatus}</p>
        </div>
      </form>

      <h1 className='text-3xl ml-12 font-bold'>Recent Certificates</h1>


      {isVisible && (
        <PdfCard
          name={name}
          course={course}
          date={formatDate(date)}
          certificateId={certificateId}
          onUploadPDF={handleUploadPDF}
        />
      )}

      <div className='grid gap-x-5 gap-y-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 '>
        {
          certificateData.map((item) => (
            <div key={item.certificateId} className='w-full h-fit px-10 py-6 gap-x-5'>
              <InformationCard
                name={item.name}
                course={item.course}
                dateOfApproval={item.dateOfApproval}
                certificateId={item.certificateId}
                certificateLink={item.certificateLink}
              />
            </div>

          ))
        }

      </div>
    </div>
  );
}

export default App;
