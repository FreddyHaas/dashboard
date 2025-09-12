import config from '@/config';
import { appRouter } from '@/routes/router';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const server = createHTTPServer({
  router: appRouter,
  middleware: (req, res, next) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }
    
    next();
  },
});

server.listen(config.port);
