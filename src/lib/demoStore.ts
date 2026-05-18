import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), ".demo-users.json");

interface DemoUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export function getDemoUsers(): DemoUser[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    }
  } catch {}
  return [];
}

export function saveDemoUser(user: DemoUser): void {
  try {
    const users = getDemoUsers();
    const exists = users.find((u) => u.email === user.email);
    if (!exists) {
      users.push(user);
      fs.writeFileSync(STORE_PATH, JSON.stringify(users, null, 2));
    }
  } catch {}
}

export function findDemoUser(email: string): DemoUser | null {
  const users = getDemoUsers();
  return users.find((u) => u.email === email.toLowerCase()) || null;
}
