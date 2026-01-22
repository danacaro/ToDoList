const BASE_URL = "http://192.168.100.11:3000";

export const NEW_STATUS = {
  "To Do": "Done",
  "Not started": "To Do",
  "Blocked": "To Do",
  "Idea": "To Do",
  "Planned": "To Do",
};


export async function fetchTasks({ status, area } = {}) {
  try {
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (area) params.append("area", area);

    const url = `${BASE_URL}/tasks${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("FETCH ERROR:", error);
    throw error;
  }
}

export const updateTaskStatus = async (taskId, status) => {
  console.log("status:", status, "new status: ", NEW_STATUS[status]);
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: NEW_STATUS[status] }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }

  return response.json();
};
