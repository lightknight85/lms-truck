// src/pages/DashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl w-full text-center" dir="rtl">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">داشبورد کاربر</h1>
      <p className="text-gray-700 mb-6">اینجا می‌توانید اطلاعات شخصی، پیشرفت دوره‌ها و ... را مشاهده کنید.</p>
      
      <div className="space-y-4">
        <Link 
          to="/courses" 
          className="block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors"
        >
          مشاهده دوره‌ها
        </Link>
        <button 
          className="block w-full bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition-colors"
          onClick={() => alert('خروج از حساب کاربری (بعداً پیاده‌سازی می‌شود)')}
        >
          خروج از حساب
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;