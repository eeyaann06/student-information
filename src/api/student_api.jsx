const API_BASE = "../public/data";

export async function fetchStudents() {
  try {
    // Fetch from public/data/students.json
    const res = await fetch(`${API_BASE}/students.json`);
    if (!res.ok) throw new Error("Failed to fetch students");
    return res.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}

export async function fetchStudent(id) {
  try {
    const res = await fetch(`${API_BASE}/students.json`);
    if (!res.ok) throw new Error("Failed to fetch student");
    const all = await res.json();
    const found = all.find((s) => String(s.id) === String(id));
    if (!found) throw new Error("Student not found");
    return found;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
}
