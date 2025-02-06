import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { version as pdfjsVersion } from "pdfjs-dist";

export default function BookReader() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookUrl = params.get("bookUrl");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full h-full bg-white">
        {bookUrl ? (
          <Worker
            workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}
          >
            <Viewer fileUrl={bookUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No book selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
