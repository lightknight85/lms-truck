// src/components/MainLayout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom'; // Link را وارد کنید

interface MainLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isAuthenticated }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-right" dir="rtl">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">آکادمی رانندگان</h1>
          <nav className="flex items-center space-x-4 space-x-reverse"> {/* space-x-reverse برای RTL */}
            {isAuthenticated ? (
              // اگر کاربر احراز هویت شده باشد، آیکون داشبورد نمایش داده شود
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 space-x-reverse text-white hover:text-blue-200 transition-colors text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0A8.966 8.966 0 0 1 12 20.25a8.966 8.966 0 0 1-5.982-2.975M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>داشبورد من</span>
              </Link>
            ) : (
              // اگر کاربر احراز هویت نشده باشد، دکمه ورود/ثبت نام نمایش داده شود
              <Link
                to="/login"
                className="bg-white text-blue-700 py-2 px-4 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-lg"
              >
                ورود / ثبت نام
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <div className="container mx-auto">
          © {new Date().getFullYear()} آکادمی رانندگان. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
