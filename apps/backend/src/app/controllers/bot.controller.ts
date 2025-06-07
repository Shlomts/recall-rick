import { Request, Response } from 'express';
import BotService from '../services/bot.service';

/**
 * Controller to handle bot reply generation requests.
 *
 * @param req - Express request object, expects a 'question' in the body.
 * @param res - Express response object, returns the generated reply or error.
 * @returns Promise<void>
 *
 * @remarks
 * Expects a POST request with a JSON body containing a 'question' string.
 * Responds with the generated reply or an error message.
 */
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
