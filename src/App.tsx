import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import CoursesListPage from './pages/CoursesListPage';
import CourseDetailPage from './pages/CourseDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans antialiased text-right"> {/* فونت پیش‌فرض و راست‌چین کلی */}
        <Routes>
          {/* صفحه ورود/ثبت نام با شماره تلفن */}
          <Route path="/login" element={<LoginPage />} />
          {/* صفحه تأیید کد یکبار مصرف (OTP) */}
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          {/* صفحه اصلی: لیست دوره‌ها */}
          <Route path="/" element={<CoursesListPage />} />
          {/* صفحه جزئیات یک دوره خاص (با ID داینامیک) */}
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          {/* در آینده می‌توانید مسیرهای دیگری مثل پروفایل کاربر یا صفحه 404 اضافه کنید */}
          {/* <Route path="*" element={<div>صفحه یافت نشد!</div>} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
