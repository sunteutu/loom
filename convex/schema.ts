import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    userId: v.string(),
  }).index("by_user", ["userId"]),
  userSettings: defineTable({
    userId: v.string(),
    theme: v.string(),
    mode: v.string(),
  }).index("by_user", ["userId"]),
});
