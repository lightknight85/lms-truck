import React from 'react';
import { Link } from 'react-router-dom';

// تعریف یک تایپ برای ساختار داده‌های دوره
interface Course {
  id: number;
  title: string;
  image: string;
  progress?: number; // پیشرفت دوره (اختیاری)
}

const CoursesListPage: React.FC = () => {
  // این داده‌ها در آینده از بک‌اند جنگو دریافت خواهند شد
  const courses: Course[] = [
    { id: 1, title: 'آموزش گواهینامه پایه یک - بخش ۱', image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=دوره+پایه+یک', progress: 75 },
    { id: 2, title: 'ایمنی در رانندگی کامیون', image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=ایمنی+کامیون', progress: 20 },
    { id: 3, title: 'مقررات باربری و حمل و نقل', image: 'https://via.placeholder.com/400x250/ef4444/ffffff?text=باربری', progress: 0 },
    { id: 4, title: 'آشنایی با موتورهای دیزلی', image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=موتور+دیزل' },
    { id: 5, title: 'کمک‌های اولیه برای رانندگان', image: 'https://via.placeholder.com/400x250/6366f1/ffffff?text=کمک+اولیه' },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">دوره‌های آموزشی</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link to={`/courses/${course.id}`} key={course.id} className="block">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{course.title}</h3>
                {course.progress !== undefined && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}
                {course.progress !== undefined && (
                  <p className="text-sm text-gray-600 text-left rtl:text-right">{course.progress}% تکمیل شده</p>
                )}
                <p className="mt-4 text-blue-600 hover:underline font-semibold text-left rtl:text-right">مشاهده دوره</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesListPage;