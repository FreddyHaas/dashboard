import { publicProcedure, router } from '@/routes/trpc';
import { z } from 'zod';

export const appRouter = router({
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    // const user = await prisma.post.findUnique(input);

    return input;
  }),
});

export type AppRouter = typeof appRouter;
