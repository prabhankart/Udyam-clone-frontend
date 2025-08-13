import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-[#eef2f9] flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-4 shadow-sm mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
            </h1>
        </div>
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
