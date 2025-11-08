// src/api/railmateAPI.js

// ✅ Use your deployed backend URL
const API_URL = "https://rail-mate-9w4bhq7o2-pinumalla-sai-tejas-projects.vercel.app";

// 🚆 Fetch all trains
export const getTrains = async () => {
  const res = await fetch(`${API_URL}/trains`);
  if (!res.ok) throw new Error("Failed to fetch trains");
  return await res.json();
};

// 🎫 Book a ticket
export const bookTicket = async (data) => {
  const res = await fetch(`${API_URL}/book_ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Booking failed");
  return await res.json();
};

// 🧾 Register a new user
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

// 🔑 Login user
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
}

// 👤 Get user profile (Protected)
export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Proper Bearer format
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch profile");
  }

  return await res.json();
}
