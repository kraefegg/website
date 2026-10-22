import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { careersRouter } from './src/server/careersRouter';
import { marketplaceRouter } from './src/server/marketplaceRouter';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mount Careers REST APIs
  app.use('/api/careers', careersRouter);

  // Mount Marketplace REST APIs
  app.use('/api/marketplace', marketplaceRouter);

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KRAEFEGG M.O.] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[KRAEFEGG M.O.] Fatal error starting server:', err);
  process.exit(1);
});
