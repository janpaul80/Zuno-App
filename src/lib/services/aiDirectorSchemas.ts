import { z } from 'zod'

// AI Director response must be actionable and bounded.
export const AiDirectorCategorySchema = z.enum([
  'help',
  'lore',
  'shop',
  'quest',
  'level',
  'troubleshooting',
])

export type AiDirectorCategory = z.infer<typeof AiDirectorCategorySchema>

export const AiDirectorModelResponseSchema = z
  .object({
    category: AiDirectorCategorySchema,
    // Primary user-facing response text.
    reply: z.string().min(1),
    // Optional structured guidance the UI can present.
    suggestions: z.array(z.string().min(1)).max(10).optional(),
    warnings: z.array(z.string().min(1)).max(10).optional(),
    // Optional narration text (Phase 2: text only; no audio generation).
    narrationText: z.string().min(1).optional(),
  })
  .strict()

export type AiDirectorModelResponse = z.infer<typeof AiDirectorModelResponseSchema>
