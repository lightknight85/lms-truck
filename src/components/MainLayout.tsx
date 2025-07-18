// src/components/MainLayout.tsx
import React, { type ReactNode } from 'react';
// یا می‌توانید به این شکل هم بنویسید (که برای Typeها بهتر است):
// import React from 'react';
// import type { ReactNode } from 'react';

// تعریف تایپ برای 'children' که نشان می‌دهد این کامپوننت می‌تواند محتوای دیگری را در خود جای دهد
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-right" dir="rtl">
      {/* می‌توانید هدر، نوار ناوبری یا لوگو را اینجا قرار دهید. فعلاً یک هدر ساده می‌گذاریم. */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">آکادمی رانندگان</h1>
          {/* اینجا می‌توانید لینک‌های ناوبری عمومی را قرار دهید، مثلاً به پروفایل یا دوره‌ها */}
          {/* <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:underline">صفحه اصلی</Link></li>
              <li><Link to="/profile" className="hover:underline">پروفایل</Link></li>
            </ul>
          </nav> */}
        </div>
      </header>

      {/* بخش اصلی محتوا که شامل صفحات مختلف خواهد بود */}
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {children} {/* اینجا محتوای هر صفحه (LoginPage, CoursesListPage و غیره) رندر می‌شود */}
      </main>

      {/* می‌توانید فوتر را اینجا قرار دهید */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <div className="container mx-auto">
          © {new Date().getFullYear()} آکادمی رانندگان. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;