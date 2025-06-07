import { Request, Response } from 'express';
import { BotService } from '../services/bot.service';

export async function getBotReply(req: Request, res: Response): Promise<void> {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Missing or invalid question' });
      return;
    }
    const reply = await BotService.generateRickply(question);
    res.json(reply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate bot reply', details: (err as Error).message });
  }
}
