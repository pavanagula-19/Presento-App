import React from "react";
import { Folder } from "lucide-react";

type Project = {
  name: string;
  category: string;
};

const projects: Project[] = [
  { name: "Project Alpha", category: "Planning" },
  { name: "Project Beta", category: "Design" },
  { name: "Project Gamma", category: "Development" },
];

export function ManageProjects() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Engineering Projects</h1>
      <div className="grid grid-cols-3">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col items-center">
            <Folder className="w-12 h-12 text-yellow-500 mb-1" />
            <span className="text-sm font-medium text-center">
              {project.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
