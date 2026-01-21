const BASE_URL = "http://192.168.100.11:3000";

export const NEW_STATUS = {
  Priority: "Done",
  "Not started": "Priority",
};

export async function fetchTasks({ status, type } = {}) {
  try {
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (type) params.append("type", type);

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
