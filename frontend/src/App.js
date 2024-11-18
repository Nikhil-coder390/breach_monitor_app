import React, { useState } from 'react';
import axios from 'axios';
import cyberSecurityVideo from './assets/cyber_security_stock_footage.mp4';

function App() {
  const [selectedType, setSelectedType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const checkBreach = async () => {
    setError('');
    setResults(null);

    if (!inputValue) {
      setError(`Please enter a valid ${selectedType}.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/breaches/check', {
        type: selectedType,
        value: inputValue,
      });

      setResults(response.data);
    } catch (err) {
      setError('Error checking breaches. Try again later.');
    }
  };

  return (
      <div className="relative min-h-screen flex flex-col items-center justify-between">
        {/* Blurred Video Background */}
        <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={cyberSecurityVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          {/* Tagline */}
          <h1 className="text-3xl font-extrabold mb-8 mt-8 sm:mt-20">Monitor. Protect. Stay Secure</h1>

          {/* Input Section */}
          <div className="w-full max-w-lg bg-gray-500 bg-opacity-20 rounded-2xl shadow-lg p-6 backdrop-blur-md">
            {/* Dropdown */}
            <div className="mb-4">
              <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-500 bg-opacity-40 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="email">Email Address</option>
                <option value="number">Phone Number</option>
                <option value="username">Username</option>
              </select>
            </div>

            {/* Input Field */}
            <div className="mb-4">
              <input
                  type="text"
                  placeholder={`Enter your ${selectedType}`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-blue-500 bg-gray-500 bg-opacity-20 shadow-inner transition"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                  onClick={checkBreach}
                  className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 transition"
              >
                Check Breach
              </button>
            </div>

            {/* Error Message */}
            {error && <div className="text-center text-red-500 text-sm mt-4">{error}</div>}

            {results && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800">Results:</h2>
                  {results.breached ? (
                      <div>
                        <p className="text-sm text-red-600 font-bold">Breach Found!</p>
                        <p className="mt-2 text-sm text-gray-600">Details:</p>

                        {/* Fields Affected */}
                        <div className="mt-2">
                          <p className="font-semibold text-black">Fields Affected:</p>
                          <div className="text-sm text-gray-700">
                            {results.details.fields.map((field, index) => (
                                <p key={index}>{field}</p>
                            ))}
                          </div>
                        </div>

                        {/* Sources */}
                        <div className="mt-2">
                          <p className="font-semibold text-black">Sources:</p>
                          {results.details.sources.map((source, index) => (
                              <div key={index} className="text-sm text-gray-700">
                                <p>{source.name} - <span className="text-gray-500">({source.date})</span></p>
                              </div>
                          ))}
                        </div>
                      </div>
                  ) : (
                      <p className="text-sm text-green-600 font-bold">No breach found for this {selectedType}.</p>
                  )}
                </div>
            )}

          </div>

          {/* Awareness Section */}
          <div className="mt-10 bg-gray-100 bg-opacity-20 p-6 rounded-lg shadow-lg text-left text-white max-w-3xl backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4">Stay Safe Online</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use strong, unique passwords for each account.</span>
              </li>
              <li className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m-2 8a6 6 0 100-12 6 6 0 000 12z"
                  />
                </svg>
                <span>Enable two-factor authentication wherever possible.</span>
              </li>
              <li className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 21H5a2 2 0 01-2-2V7a2 2 0 012-2h13.172a2 2 0 011.414.586l3.828 3.828a2 2 0 01.586 1.414V19a2 2 0 01-2 2h-7m-4-4h8"
                  />
                </svg>
                <span>Be cautious of phishing emails and suspicious links.</span>
              </li>
              <li className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h11M9 21V3m-4 4l8 8"
                  />
                </svg>
                <span>Monitor your accounts for unusual activity.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-black bg-opacity-60 text-white w-full py-4 text-center">
          <p className="text-sm">&copy; 2024 Tech Trio. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default App;
