import { users, announcements, type User, type InsertUser, type Announcement, type InsertAnnouncement } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getActiveAnnouncement(): Promise<Announcement | undefined>;
  updateAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getActiveAnnouncement(): Promise<Announcement | undefined> {
    // For MemStorage, return undefined as we'll implement database version
    return undefined;
  }

  async updateAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    // For MemStorage, create a mock announcement
    const mockAnnouncement: Announcement = {
      id: 1,
      type: announcement.type || "text",
      title: announcement.title || "",
      content: announcement.content || "",
      linkUrl: announcement.linkUrl || "",
      imageUrl: announcement.imageUrl || "",
      isActive: announcement.isActive || false,
    };
    return mockAnnouncement;
  }
}

// Create DatabaseStorage class
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import("./db");
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getActiveAnnouncement(): Promise<Announcement | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [announcement] = await db
      .select()
      .from(announcements)
      .where(eq(announcements.isActive, true))
      .limit(1);
    return announcement || undefined;
  }

  async updateAnnouncement(announcementData: InsertAnnouncement): Promise<Announcement> {
    const { db } = await import("./db");
    
    // First, deactivate all existing announcements
    await db
      .update(announcements)
      .set({ isActive: false });
    
    // Insert the new announcement
    const [announcement] = await db
      .insert(announcements)
      .values(announcementData)
      .returning();
    
    return announcement;
  }
}

export const storage = new DatabaseStorage();
