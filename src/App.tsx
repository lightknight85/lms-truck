// src/App.tsx
import React, { useState, useEffect, type ReactNode } from 'react'; // ReactNode را از 'react' وارد کنید
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// وارد کردن کامپوننت‌های صفحات اصلی
import LoginPage from './pages/LoginPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import CoursesListPage from './pages/CoursesListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import DashboardPage from './pages/DashboardPage'; // کامپوننت داشبورد را وارد کنید

// وارد کردن کامپوننت Layout
import MainLayout from './components/MainLayout';

// ----------------------------------------------------
// کامپوننت AppContent تمام منطق مربوط به useLocation و شرطی‌سازی Layout را در خود جای می‌دهد.
const AppContent: React.FC = () => {
  const location = useLocation(); // هوک useLocation برای دسترسی به مسیر فعلی
  const navigate = useNavigate(); // هوک useNavigate برای هدایت کاربر
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // وضعیت احراز هویت کاربر

  // useEffect برای بررسی وضعیت احراز هویت در هنگام بارگذاری کامپوننت
  useEffect(() => {
    // در واقعیت، این توکن از بک‌اند جنگو پس از ورود موفق دریافت و ذخیره می‌شود.
    // اینجا فقط برای شبیه‌سازی وضعیت لاگین از localStorage استفاده می‌کنیم.
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // اگر کاربر لاگین نیست و در یک مسیر محافظت شده (مثل /dashboard) قرار دارد، به صفحه ورود هدایت شود.
    // این یک منطق ساده برای حفاظت از مسیرها است. در یک پروژه واقعی، از Middleware یا Guard استفاده می‌شود.
    if (!token && (location.pathname === '/dashboard')) {
      navigate('/login');
    }

  }, [location.pathname, navigate]); // هر زمان که مسیر تغییر کرد یا navigate تغییر کرد، اجرا شود

  // مسیرهایی که نمی‌خواهیم MainLayout در آن‌ها نمایش داده شود (مثلاً صفحات ورود/ثبت نام)
  const noLayoutPaths = ['/', '/login', '/verify-otp'];

  // بررسی می‌کنیم که آیا مسیر فعلی در لیست مسیرهای بدون Layout هست یا نه
  const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <> {/* از Fragment <> برای گروه‌بندی عناصر بدون اضافه کردن یک div اضافی استفاده می‌کنیم */}
      {showLayout ? ( // اگر مسیر در لیست بدون Layout نبود، MainLayout را نمایش بده
        <MainLayout isAuthenticated={isAuthenticated}> {/* پروپس isAuthenticated را به MainLayout پاس می‌دهیم */}
          <Routes>
            <Route path="/courses" element={<CoursesListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
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
