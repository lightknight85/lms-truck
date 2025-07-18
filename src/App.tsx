// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// وارد کردن کامپوننت‌های صفحات اصلی
import LoginPage from './pages/LoginPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import CoursesListPage from './pages/CoursesListPage';
import CourseDetailPage from './pages/CourseDetailPage';

// وارد کردن کامپوننت Layout
import MainLayout from './components/MainLayout';

// ----------------------------------------------------
// کامپوننت جدید AppContent را اینجا تعریف می‌کنیم
// این کامپوننت تمام منطق مربوط به useLocation و شرطی‌سازی Layout را در خود جای می‌دهد.
const AppContent: React.FC = () => {
  const location = useLocation(); // حالا useLocation در داخل context مربوط به <Router> قرار دارد.

  // مسیرهایی که نمی‌خواهیم MainLayout در آن‌ها نمایش داده شود (مثلاً صفحات ورود/ثبت نام)
  const noLayoutPaths = ['/', '/login', '/verify-otp'];

  // بررسی می‌کنیم که آیا مسیر فعلی در لیست مسیرهای بدون Layout هست یا نه
  const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <> {/* از Fragment <> برای گروه‌بندی عناصر بدون اضافه کردن یک div اضافی استفاده می‌کنیم */}
      {showLayout ? ( // اگر مسیر در لیست بدون Layout نبود، MainLayout را نمایش بده
        <MainLayout>
          <Routes>
            <Route path="/courses" element={<CoursesListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            {/* می‌توانید مسیرهای دیگری را که نیاز به Layout دارند اینجا اضافه کنید */}
          </Routes>
        </MainLayout>
      ) : ( // در غیر این صورت، مسیرهای بدون Layout را مستقیماً نمایش بده
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* صفحه اصلی برنامه */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          {/* در اینجا می‌توانید مسیرهای دیگری را که نباید Layout داشته باشند، اضافه کنید */}
        </Routes>
      )}
    </>
  );
};
// ----------------------------------------------------


// کامپوننت اصلی App فقط Router را رندر می‌کند
const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans antialiased text-right"> {/* فونت پیش‌فرض و راست‌چین کلی */}
        {/* AppContent که شامل منطق مسیریابی و Layout است، اینجا رندر می‌شود */}
        <AppContent />
      </div>
    </Router>
  );
};

export default App;