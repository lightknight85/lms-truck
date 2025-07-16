import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState<number>(60); // 60 ثانیه
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || ''; // شماره تلفن را از صفحه قبلی می‌گیریم

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || !/^\d{4,6}$/.test(otp)) { // فرض کنید OTP 4 تا 6 رقم است
      setError('کد تأیید نامعتبر است.');
      return;
    }

    try {
      // این بخش بعداً برای ارسال OTP و شماره به بک‌اند جنگو استفاده می‌شود
      // const response = await axios.post('/api/verify-otp/', { phone_number: phoneNumber, otp: otp });
      // console.log('OTP verified successfully:', response.data);
      // // اگر تأیید موفق بود، کاربر را به صفحه اصلی دوره‌ها هدایت کنید
      // navigate('/');
      // // اینجا می‌توانید توکن احراز هویت را در localStorage ذخیره کنید

      // در حال حاضر فقط برای تست ناوبری:
      console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
      alert('کد تأیید شد! (این فقط یک شبیه‌سازی است)');
      navigate('/'); // به صفحه اصلی دوره‌ها هدایت کنید

    } catch (err) {
      // setError('کد تأیید اشتباه است یا منقضی شده.');
      console.error('Error verifying OTP:', err);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setTimer(60); // ریست کردن تایمر
    setError('');
    try {
      // این بخش برای ارسال مجدد OTP به بک‌اند جنگو استفاده می‌شود
      // const response = await axios.post('/api/resend-otp/', { phone_number: phoneNumber });
      // console.log('OTP resent successfully:', response.data);
      alert('کد تأیید مجدداً ارسال شد!');
    } catch (err) {
      setError('خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.');
      console.error('Error resending OTP:', err);
    }
  };

  if (!phoneNumber) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" dir="rtl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600 mb-4">شماره تلفنی وارد نشده است. لطفا به صفحه ورود بازگردید.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            بازگشت به صفحه ورود
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">تأیید شماره تلفن</h2>
        <p className="text-gray-600 mb-6">
          کد تأیید به شماره **{phoneNumber}** ارسال شد.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="tel"
            placeholder="کد تأیید را وارد کنید"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-200 text-center ltr:text-left rtl:text-right"
            dir="ltr"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg text-xl hover:bg-blue-800 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            تأیید کد
          </button>
        </form>

        <div className="mt-6 text-gray-600">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline font-semibold"
            >
              ارسال مجدد کد
            </button>
          ) : (
            <p>ارسال مجدد کد تا {timer} ثانیه دیگر</p>
          )}
        </div>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          ویرایش شماره تلفن
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;