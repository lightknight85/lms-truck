import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // بعداً برای ارتباط با بک‌اند استفاده می‌شود

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // اعتبارسنجی اولیه شماره تلفن
    if (!phoneNumber || !/^\d{10,11}$/.test(phoneNumber)) { // مثال: 10 یا 11 رقم عددی
      setError('شماره تلفن نامعتبر است.');
      return;
    }

    try {
      // این بخش بعداً برای ارسال شماره به بک‌اند جنگو استفاده می‌شود
      // const response = await axios.post('/api/send-otp/', { phone_number: phoneNumber });
      // console.log('OTP sent successfully:', response.data);

      // در حال حاضر فقط برای تست ناوبری:
      navigate('/verify-otp', { state: { phoneNumber } });

    } catch (err) {
      // setError('خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.');
      console.error('Error sending OTP:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
        <img src="/logo192.png" alt="لوگو" className="mx-auto mb-6 w-24 h-24" />
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">ورود به آکادمی کامیون‌داران</h2>
        <p className="text-gray-600 mb-6">شماره تلفن همراه خود را وارد کنید تا کد تأیید برایتان ارسال شود.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="مثال: 09121234567"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-200 text-center ltr:text-left rtl:text-right"
            dir="ltr" // شماره تلفن بهتر است چپ به راست نوشته شود
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg text-xl hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            دریافت کد تأیید
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          با ادامه دادن، <a href="#" className="text-blue-600 hover:underline">قوانین و مقررات</a> را می‌پذیرم.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;