import React from 'react';

const ProgressTracker = ({ currentStep }) => {
    const steps = ['Aadhaar Details', 'PAN Verification'];
    return (
        <div className="w-full max-w-md mx-auto mb-12">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center w-32">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                                    currentStep >= index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            >
                                {currentStep > index + 1 ? '✔' : index + 1}
                            </div>
                            <p className={`mt-2 text-sm font-medium ${currentStep >= index + 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                                {step}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-auto border-t-2 transition-all duration-500 ${currentStep > index + 1 ? 'border-blue-600' : 'border-gray-300'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracker;