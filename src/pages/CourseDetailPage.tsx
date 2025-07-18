import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// تعریف تایپ برای جزئیات دوره
interface CourseDetail {
  id: number;
  title: string;
  description: string;
  videoUrl: string; // URL ویدیو اصلی دوره
  lessons: { id: number; title: string; duration: string }[];
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id از URL می‌آید
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError('');
      try {
        // این داده‌ها در آینده از بک‌اند جنگو دریافت خواهند شد
        // const response = await axios.get(`/api/courses/${id}/`);
        // setCourse(response.data);

        // داده‌های فرضی برای تست
        const dummyCourses: { [key: string]: CourseDetail } = {
          '1': {
            id: 1,
            title: 'آموزش گواهینامه پایه یک - بخش ۱',
            description: 'این دوره شامل مبانی رانندگی، قوانین راهنمایی و رانندگی و نکات عملی برای اخذ گواهینامه پایه یک است. در این بخش با اصول اولیه آشنا می‌شوید و برای آزمون‌های کتبی و عملی آماده خواهید شد.',
            videoUrl: 'https://www.aparat.com/embed/g8f3L?data[rnddiv]=56015560675752399', // مثال آپارات
            lessons: [
              { id: 101, title: 'معرفی دوره و اهداف آن', duration: '5:30' },
              { id: 102, title: 'آشنایی با اجزای اصلی کامیون', duration: '12:15' },
              { id: 103, title: 'قوانین راهنمایی و رانندگی مربوط به کامیون', duration: '20:00' },
              { id: 104, title: 'تکنیک‌های اولیه رانندگی و پارک', duration: '18:45' },
              { id: 105, title: 'ایمنی و نگهداری اولیه کامیون', duration: '10:00' },
            ],
          },
          '2': {
            id: 2,
            title: 'ایمنی در رانندگی کامیون',
            description: 'آموزش جامع نکات ایمنی برای رانندگی با کامیون در شرایط مختلف، شامل بررسی نقاط کور، کنترل بار، رانندگی در شرایط آب و هوایی خاص و واکنش به خطرات جاده‌ای. این دوره به شما کمک می‌کند تا سفرهای ایمن‌تری داشته باشید.',
            videoUrl: 'https://www.aparat.com/embed/n4f2K?data[rnddiv]=56015560675752399',
            lessons: [
              { id: 201, title: 'آسیب‌شناسی تصادفات کامیون', duration: '8:00' },
              { id: 202, title: 'مدیریت خستگی و هوشیاری راننده', duration: '15:20' },
              { id: 203, title: 'رانندگی در برف، باران و مه', duration: '17:00' },
            ],
          },
        };
        
        const selectedCourse = dummyCourses[id || ''];
        if (selectedCourse) {
          setCourse(selectedCourse);
        } else {
          setError('دوره مورد نظر یافت نشد!');
        }

      } catch (err) {
        setError('خطا در بارگذاری جزئیات دوره.');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]); // هر زمان که ID در URL تغییر کرد، دوباره داده‌ها را واکشی کن

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
        <p className="text-xl text-gray-700">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" dir="rtl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/courses" className="text-blue-600 hover:underline font-semibold">بازگشت به لیست دوره‌ها</Link>
        </div>
      </div>
    );
  }

  if (!course) { // این شرط برای اطمینان از وجود course بعد از لودینگ و خطا است
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" dir="rtl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600 mb-4">داده‌ای برای این دوره در دسترس نیست.</p>
          <Link to="/" className="text-blue-600 hover:underline font-semibold">بازگشت به لیست دوره‌ها</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Link to="/courses" className="text-blue-600 hover:underline mb-6 block text-lg font-medium text-left rtl:text-right">
        ← بازگشت به لیست دوره‌ها
      </Link>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 text-center">{course.title}</h1>
        
        {/* بخش نمایش ویدیو */}
        <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden mb-6">
          {/* اینجا می‌توانید یک پخش‌کننده ویدیوی واقعی مانند react-player یا iframe قرار دهید */}
          <iframe
            src={course.videoUrl}
            title={course.title}
            allowFullScreen
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        <p className="text-gray-700 leading-loose mb-8 text-justify">{course.description}</p>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">سرفصل‌های دوره:</h2>
        <ul className="space-y-3">
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200">
              <span className="text-blue-600 text-lg font-bold ml-3 flex-shrink-0">{lesson.id}.</span>
              <div className="flex-grow">
                <span className="text-gray-800 text-lg font-medium">{lesson.title}</span>
              </div>
              <span className="text-gray-500 text-sm flex-shrink-0">{lesson.duration}</span>
            </li>
          ))}
        </ul>

        {/* دکمه‌های ناوبری یا شروع دوره */}
        <div className="mt-8 text-center">
          <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
            شروع دوره / ادامه
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;