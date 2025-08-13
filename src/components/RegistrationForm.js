import React, { useState } from 'react';
import axios from 'axios';
import { UserIcon, CardIcon, CheckboxIcon } from './Icons';
import ProgressTracker from './ProgressTracker';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        aadhaarNumber: '',
        nameAsPerAadhaar: '',
        panNumber: '',
        consentChecked: false,
    });
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState({ type: '', content: '' });
    const [isLoading, setIsLoading] = useState(false);

    const validateAadhaarStep = () => {
        const newErrors = {};
        if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
            newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits.';
        }
        if (!formData.nameAsPerAadhaar) {
            newErrors.nameAsPerAadhaar = 'Name is required.';
        }
        if (!formData.consentChecked) {
            newErrors.consentChecked = 'You must give your consent to proceed.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePanStep = () => {
        const newErrors = {};
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
            newErrors.panNumber = 'Invalid PAN format. Should be like ABCDE1234F.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateAadhaarStep()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePanStep()) {
            return;
        }
        setIsLoading(true);
        setServerMessage({ type: '', content: '' });
        try {
            // *** UPDATED API URL ***
            const API_URL = 'https://udyam-clone-backend.onrender.com/api/register/submit';
            
            const response = await axios.post(API_URL, {
                aadhaarNumber: formData.aadhaarNumber,
                nameAsPerAadhaar: formData.nameAsPerAadhaar,
                panNumber: formData.panNumber.toUpperCase(),
            });
            
            setServerMessage({ type: 'success', content: response.data.message });
            setTimeout(() => {
                setStep(1);
                setFormData({ aadhaarNumber: '', nameAsPerAadhaar: '', panNumber: '', consentChecked: false });
                setServerMessage({ type: '', content: '' });
            }, 4000);

        } catch (err) {
            const message = err.response?.data?.message || 'An unknown error occurred.';
            setServerMessage({ type: 'error', content: message });
            setErrors(err.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white p-6 md:p-8 border-t-4 border-blue-600 shadow-xl rounded-lg min-h-[550px]">
                
                <ProgressTracker currentStep={step} />

                {/* Step 1: Aadhaar Details */}
                <div className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Aadhaar Verification With OTP</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                        <div>
                            <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">1. Aadhaar Number / आधार संख्या</label>
                            <input type="text" name="aadhaarNumber" id="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.aadhaarNumber ? <p className="text-red-600 text-xs mt-1">{errors.aadhaarNumber}</p> : <p className="text-red-600 text-xs mt-1">Required</p>}
                        </div>
                        <div>
                            <label htmlFor="nameAsPerAadhaar" className="block text-sm font-medium text-gray-700 mb-1">2. Name of Entrepreneur / उद्यमी का नाम</label>
                            <input type="text" name="nameAsPerAadhaar" id="nameAsPerAadhaar" value={formData.nameAsPerAadhaar} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 ${errors.nameAsPerAadhaar ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.nameAsPerAadhaar ? <p className="text-red-600 text-xs mt-1">{errors.nameAsPerAadhaar}</p> : <p className="text-red-600 text-xs mt-1">Required</p>}
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2 my-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <p>• Aadhaar number shall be required for Udyam Registration.</p>
                        <p>• The Aadhaar number shall be of the proprietor in the case of a proprietorship firm.</p>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="relative flex items-center">
                            <input id="consentChecked" name="consentChecked" type="checkbox" checked={formData.consentChecked} onChange={handleChange} className="opacity-0 absolute h-5 w-5" />
                            <div className={`h-5 w-5 border-2 rounded-sm flex-shrink-0 flex items-center justify-center cursor-pointer ${formData.consentChecked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}>
                                {formData.consentChecked && <CheckboxIcon />}
                            </div>
                        </div>
                        <label htmlFor="consentChecked" className="ml-3 block text-sm text-gray-700 cursor-pointer">I, the holder of the above Aadhaar, hereby give my consent...</label>
                    </div>
                    {errors.consentChecked && <p className="text-red-600 text-xs mb-4 -mt-4">{errors.consentChecked}</p>}
                    <button onClick={handleNextStep} className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-transform duration-200">
                        Validate & Generate OTP
                    </button>
                </div>

                {/* Step 2: PAN Details */}
                <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">PAN Verification</h2>
                    {serverMessage.content && <Alert severity={serverMessage.type} className="mb-4">{serverMessage.content}</Alert>}
                    <div>
                        <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">3. PAN Number</label>
                        <input type="text" name="panNumber" id="panNumber" value={formData.panNumber} onChange={handleChange} className={`w-full md:w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.panNumber && <p className="text-red-600 text-xs mt-1">{errors.panNumber}</p>}
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                        <button type="button" onClick={() => setStep(1)} className="inline-flex items-center px-6 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transform hover:scale-105 transition-transform duration-200">
                            Back
                        </button>
                        <button onClick={handleSubmit} disabled={isLoading} className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-200">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Alert = ({ severity, children, className }) => {
    const bgColor = severity === 'success' ? 'bg-green-100' : 'bg-red-100';
    const textColor = severity === 'success' ? 'text-green-800' : 'text-red-800';
    return (
        <div className={`${bgColor} ${textColor} p-4 rounded-md ${className}`}>
            {children}
        </div>
    );
};

export default RegistrationForm;