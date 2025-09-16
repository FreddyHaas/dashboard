import { getFilterOrDefault, saveFilter } from '@/services/filterService';
import { EmploymentType, WorkArrangement } from '@prisma/client';
import { z } from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getFilterOrDefault: publicProcedure
    .input(z.object({ scope: z.string() }))
    .query(async ({ input }) => {
      return await getFilterOrDefault(input.scope);
    }),

  saveFilter: publicProcedure
    .input(
      z.object({
        scope: z.string(),
        dateRangeFrom: z.coerce.date().nullable().optional(),
        dateRangeTo: z.coerce.date().nullable().optional(),
        tenure: z.number().optional().nullable(),
        location: z.string().optional().nullable(),
        employmentType: z.enum(EmploymentType).optional().nullable(),
        workArrangement: z.enum(WorkArrangement).optional().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      return await saveFilter(input);
    }),
});

export type AppRouter = typeof appRouter;
