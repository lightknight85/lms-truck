import React, { useState } from "react";

const Auth: React.FC = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendActive, setResendActive] = useState(false);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setResendActive(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const validatePhone = (value: string) => /^09\d{9}$/.test(value);

  const handleSendCode = () => {
    if (!validatePhone(phone)) {
      setError("شماره تلفن معتبر نیست.");
      return;
    }
    setError("");
    setStep("otp");
    setTimer(60);
    setResendActive(false);
    // اینجا درخواست به بک‌اند برای ارسال کد تایید ارسال می‌شود
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("کد تایید باید ۶ رقم باشد.");
      return;
    }
    setError("");
    // اینجا درخواست به بک‌اند برای تایید کد ارسال می‌شود
    // پس از موفقیت: انتقال به صفحه اصلی
  };

  const handleResend = () => {
    setTimer(60);
    setResendActive(false);
    setOtp("");
    // اینجا درخواست مجدد ارسال کد
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50 font-sans px-4 ">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
        <img src="/vite.svg" alt="لوگو" className="w-16 mb-4" />
        <h1 className="text-2xl font-bold mb-6 text-blue-700">ورود / ثبت نام</h1>
        {step === "phone" ? (
          <>
            <input
              type="tel"
              inputMode="numeric"
              pattern="09[0-9]{9}"
              maxLength={11}
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
              placeholder="شماره تلفن همراه"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded mt-2 hover:bg-blue-700 transition"
              onClick={handleSendCode}
            >
              دریافت کد تأیید
            </button>
          </>
        ) : (
          <>
            <div className="w-full mb-4 text-right text-gray-700">کد تأیید به شماره <span className="font-bold">{phone}</span> ارسال شد.</div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right tracking-widest text-lg"
              placeholder="کد تأیید ۶ رقمی"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded mt-2 hover:bg-blue-700 transition"
              onClick={handleVerify}
            >
              تأیید
            </button>
            <div className="w-full flex justify-between items-center mt-4 text-sm">
              <button
                className={`text-blue-600 disabled:text-gray-400 ${!resendActive && "pointer-events-none"}`}
                onClick={handleResend}
                disabled={!resendActive}
              >
                ارسال مجدد کد
              </button>
              <span>{resendActive ? "" : `ارسال مجدد تا ${timer} ثانیه دیگر`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth; 