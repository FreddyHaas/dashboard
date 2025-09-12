import type { AppRouter } from '@server/routes/router';
import { createTRPCReact } from '@trpc/react-query';
 
export const trpc = createTRPCReact<AppRouter>();