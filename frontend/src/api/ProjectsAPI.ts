import { Project } from "../types/Project";

interface FethProjectsResponse {
  projects: Project[];
  totalNumProjects: number;
}

const API_URL = `https://localhost:5000/Water`;

export const fetchProjects = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FethProjectsResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

export const addProject = async (newProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/AddProject`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding project: ", error);
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

export const updateProject = async (
  projectId: number,
  updatedProject: Project
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: "PUT", // Use PUT for updating a resource
      credentials: "include", // Include credentials for session management
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(updatedProject), // Convert the updated project to JSON
    });

    return await response.json(); // Parse the JSON response
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, {
      method: "DELETE", // Use DELETE for removing a resource
      credentials: "include", // Include credentials for session management
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
  } catch (error) {
    // Handle the error appropriately
    console.error("Error deleting project: ", error);

    throw error;
  }
};
