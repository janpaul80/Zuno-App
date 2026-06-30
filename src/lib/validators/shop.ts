import { z } from "zod";

// Shop Purchase Request Schema
export const ShopPurchaseRequestSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z.number().int().positive().default(1),
  currency: z.enum(["coins", "gems"]),
});

export type ShopPurchaseRequest = z.infer<typeof ShopPurchaseRequestSchema>;
