import { appRouter } from '@/routes/router';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
