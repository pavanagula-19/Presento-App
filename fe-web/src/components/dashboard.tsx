import * as React from "react";
import { Calendar } from "./ui/calendar";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/selectors/user-selector";
import { useTheme } from "./themed-context";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const user = useSelector(selectUserInfo);
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <aside
        className={`w-1/4 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } p-4 shadow-md overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Recent Notes
          </h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`p-4 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              } rounded-lg`}
            >
              <h3 className="font-semibold">ABEC COMPETITION</h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                A competition that we are winning
              </p>
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                20 Feb 2021
              </span>
            </div>
          ))}
        </div>
      </aside>

      <main
        className={`flex-1 p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="relative w-full h-40 bg-black flex items-center justify-center">
          <h2 className="text-white text-2xl font-semibold">
            {user?.first_name || "Guest"} {user?.last_name}
          </h2>
        </div>
        <p
          className={`mt-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <div
          className={`mt-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          } p-4 rounded-lg`}
        >
          <h3 className="font-semibold">Google Drive</h3>
          <p className="text-sm">Introduction to Plasticity</p>
          <a href="#" className="text-blue-500 text-xs">
            drive.google.com
          </a>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className={`flex-1 p-2 border rounded-lg ${
              theme === "dark"
                ? "bg-gray-600 text-white border-gray-500"
                : "bg-white text-black border-gray-300"
            }`}
            placeholder="Type here"
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </main>

      <aside className="p-4">
        <div
          className={`p-4 shadow-md rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={`rounded-md border shadow w-full max-w-full ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300 border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            style={{
              '--calendar-selected-bg': theme === 'dark' ? '#4a5568' : '#e2e8f0',
              '--calendar-selected-text': theme === 'dark' ? '#ffffff' : '#000000',
              '--calendar-hover-bg': theme === 'dark' ? '#2d3748' : '#edf2f7',
            } as React.CSSProperties} 
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="bg-pink-500 text-white p-4 rounded-lg">
            Twilio Integration
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            Markdown Support
          </div>
        </div>
      </aside>
    </div>
  );
}