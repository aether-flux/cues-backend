import { boolean, integer, pgTable, serial, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  isDone: boolean('is_done').default(false),
  priority: varchar('priority', { length: 10 }),
  projectId: integer('project_id').notNull().references(() => projects.id),
  createdAt: timestamp('created_at').defaultNow(),
});
