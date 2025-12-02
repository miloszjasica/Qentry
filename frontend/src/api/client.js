export const API_URL = "http://backend:8000";

export async function getExampleData() {
  const res = await fetch(`${API_URL}/example`);
  return res.json();
}
