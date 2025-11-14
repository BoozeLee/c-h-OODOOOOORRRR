import { type User, type InsertUser, type Template, type InsertTemplate, type Purchase, type InsertPurchase } from "@shared/schema";
import { db } from "./db";
import { templates, purchases } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createTemplate(template: InsertTemplate): Promise<Template>;
  getTemplate(id: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  updateTemplate(id: string, updates: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: string): Promise<boolean>;
  
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchaseBySessionId(sessionId: string): Promise<Purchase | undefined>;
  getPurchaseByDownloadToken(token: string): Promise<Purchase | undefined>;
  updatePurchaseStatus(id: string, status: string, templateIds?: string[]): Promise<Purchase | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const [template] = await db.insert(templates).values(insertTemplate).returning();
    return template;
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template;
  }

  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates).orderBy(desc(templates.updatedAt));
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.category, category)).orderBy(desc(templates.updatedAt));
  }

  async updateTemplate(id: string, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const [template] = await db.update(templates)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(templates.id, id))
      .returning();
    return template;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    const result = await db.delete(templates).where(eq(templates.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const [purchase] = await db.insert(purchases).values(insertPurchase).returning();
    return purchase;
  }

  async getPurchaseBySessionId(sessionId: string): Promise<Purchase | undefined> {
    const [purchase] = await db.select().from(purchases).where(eq(purchases.stripeSessionId, sessionId));
    return purchase;
  }

  async getPurchaseByDownloadToken(token: string): Promise<Purchase | undefined> {
    const [purchase] = await db.select().from(purchases).where(eq(purchases.downloadToken, token));
    return purchase;
  }

  async updatePurchaseStatus(id: string, status: string, templateIds?: string[]): Promise<Purchase | undefined> {
    const updates: any = { status };
    if (templateIds) {
      updates.templateIds = templateIds;
    }
    const [purchase] = await db.update(purchases)
      .set(updates)
      .where(eq(purchases.id, id))
      .returning();
    return purchase;
  }
}

export const storage = new DbStorage();
