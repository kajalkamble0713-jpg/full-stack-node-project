const API_URL = "http://localhost:5000/users";

const usersDiv = document.getElementById("users");
const addUserBtn = document.getElementById("addUserBtn");

async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    usersDiv.innerHTML = "";
    users.forEach(user => {
      const div = document.createElement("div");
      div.className = "user";
      div.innerHTML = `
        <span><b>${user.name}</b> (${user.email})</span>
        <div>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </div>
      `;
      usersDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    usersDiv.innerHTML = "<p>Error loading users.</p>";
  }
}

async function addUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) return alert("Please enter both name and email.");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    fetchUsers();
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

async function deleteUser(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

addUserBtn.addEventListener("click", addUser);

// Fetch users on page load
fetchUsers();