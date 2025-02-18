import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-screen min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/pavanagulla19/unsplash_cm0eSVxdLDg.png?updatedAt=1739849155796')",
      }}
    >
      {/* Social Icons */}
      <div className="absolute left-5 top-1/3 flex flex-col space-y-4 text-xl">
        <Facebook className="cursor-pointer hover:opacity-80" />
        <Twitter className="cursor-pointer hover:opacity-80" />
        <Instagram className="cursor-pointer hover:opacity-80" />
        <Youtube className="cursor-pointer hover:opacity-80" />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold leading-tight">
          WELCOME TO<br />PRESENTO-APP
        </h1>
        <p className="mt-4 text-lg">
          Create your own design notes and manage them effectively.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
