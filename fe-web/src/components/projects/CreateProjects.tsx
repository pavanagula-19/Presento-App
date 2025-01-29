import { PATH } from "@/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateProject({ onClose }: { onClose: () => void }) {
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState("Planning");

  const navigate = useNavigate();

  const saveClick = () => {
    navigate(PATH.CREATEPLANNING);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option>Planning</option>
              <option>Design</option>
              <option>Development</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-200 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={saveClick}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
