import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const marketplaceRouter = Router();

const DB_PATH = path.join(process.cwd(), 'src', 'server', 'data', 'marketplace-requests.json');

function ensureDbFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ requests: [] }, null, 2), 'utf-8');
  }
}

// GET all requests (admin inspection)
marketplaceRouter.get('/requests', (req: Request, res: Response) => {
  try {
    ensureDbFile();
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    res.json({ success: true, count: data.requests.length, requests: data.requests });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit a new marketplace quote request
marketplaceRouter.post('/request', (req: Request, res: Response) => {
  try {
    ensureDbFile();
    const payload = req.body;

    const protocol = payload.protocol || `ORD-KLG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest = {
      ...payload,
      protocol,
      receivedAt: new Date().toISOString(),
      recipientEmail: 'kraefegg.mos3@gmail.com',
      status: 'SUBMITTED'
    };

    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    data.requests = [newRequest, ...(data.requests || [])];

    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`[KRAEFEGG M.O. MARKETPLACE] New Quote Request registered: ${protocol} from ${payload.company || payload.name} (${payload.email})`);

    res.status(201).json({
      success: true,
      protocol,
      recipientEmail: 'kraefegg.mos3@gmail.com',
      message: 'Solicitação de orçamento técnico registrada com sucesso.'
    });
  } catch (err: any) {
    console.error('[KRAEFEGG M.O. MARKETPLACE ERROR]', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
