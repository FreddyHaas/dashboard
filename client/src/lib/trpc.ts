import type { AppRouter } from '@/../../server/src/routes/router';
import { createTRPCReact } from '@trpc/react-query';
 
export const trpc = createTRPCReact<AppRouter>();