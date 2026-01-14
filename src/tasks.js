const BASE_URL = "http://192.168.100.11:3000";

export async function fetchTasks(status) {
  try {
    const url = status
      ? `${BASE_URL}/tasks?status=${encodeURIComponent(status)}`
      : `${BASE_URL}/tasks`;

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
export const updateTaskStatus = async (taskId, newStatus) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }

  return response.json();
};