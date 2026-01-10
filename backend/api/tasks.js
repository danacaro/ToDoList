const BASE_URL = "http://192.168.100.28:3000";

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
