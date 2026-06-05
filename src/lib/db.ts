import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "punni-leads.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    // Create leads table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_type TEXT NOT NULL,
        budget TEXT NOT NULL,
        timeline TEXT NOT NULL,
        description TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        status TEXT DEFAULT 'new'
      )
    `);
  }
  return db;
}

export interface Lead {
  id?: number;
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
  email: string;
  created_at?: string;
  status?: string;
}

export function insertLead(lead: Omit<Lead, "id" | "created_at" | "status">): Lead {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO leads (project_type, budget, timeline, description, email)
    VALUES (@project_type, @budget, @timeline, @description, @email)
  `);
  const result = stmt.run(lead);
  return {
    id: result.lastInsertRowid as number,
    ...lead,
    status: "new",
  };
}

export function getLeads(): Lead[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM leads ORDER BY created_at DESC");
  return stmt.all() as Lead[];
}

export function getLeadCount(): number {
  const db = getDb();
  const stmt = db.prepare("SELECT COUNT(*) as count FROM leads");
  const result = stmt.get() as { count: number };
  return result.count;
}
