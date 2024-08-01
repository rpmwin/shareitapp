"use client";
import React, { useState } from "react";
import "./otp.css";

function Page() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [generatedOTP, setGeneratedOTP] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < otp.length - 1 && value !== "") {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const generateOTP = () => {
        const digits = "0123456789";
        let OTP = "";

        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        setGeneratedOTP(OTP.split(""));
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index] !== "") {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }

        if (e.key === "Enter" && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }

        if (e.key === "ArrowRight" && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-8 text-white">
            <div>
                <h1 className="text-4xl font-bold text-center mb-8">
                    Share Connect
                </h1>
            </div>

            {/* OTP BOX */}
            <div className="flex min-w-[900px] min-h-[500px] items-center flex-col border rounded-xl p-6 m-4 bg-slate-950">
                <div className="flex min-w-[400px] min-h-[200px] items-center flex-col border rounded-xl p-6 bg-gray-800">
                    <h1 className="text-2xl pt-4 pb-6 tracking-wide">OTP</h1>
                    <div className="container pb-2">
                        <div id="inputs" className="inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    className="input"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold tracking-wide py-2 px-4 mt-6 rounded"
                            onClick={() => alert("OTP: " + otp.join(""))}
                        >
                            Connect
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl p-6 pt-8 tracking-wide">OR</h1>
                {/* Generate OTP BOX */}

                <div className="flex min-w-[400px] min-h-[200px] items-center flex-col border rounded-xl p-6 bg-gray-800 m-3">
                    <div>
                        <h1 className="text-2xl pt-4 pb-6 tracking-wide">
                            Generate OTP
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {generatedOTP.map((digit, index) => (
                            <input
                                key={index}
                                id={`generated-otp-input-${index}`}
                                className="input"
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                readOnly
                            />
                        ))}
                    </div>

                    <button
                        onClick={generateOTP}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold tracking-wide py-2 px-4 mt-6 rounded"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;
