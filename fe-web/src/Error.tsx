import React from "react";

const Error: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-lg animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9V11.25H12.75V9H11.25ZM12 15.75A.75.75 0 1 0 12 14.25A.75.75 0 0 0 12 15.75ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold">Not Supported on Mobile</h1>
        <p className="text-lg text-gray-300">
          Please open this application on a web browser for the best experience.
        </p>

        <button
          onClick={() => window.open("https://yourwebsite.com", "_blank")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md transition"
        >
          Open in Web Browser
        </button>
      </div>
    </div>
  );
};

export default Error;
