import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export async function getAllMessages(req: Request, res: Response): Promise<void> {
  try {
    const messages = await messageService.getAll();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', details: (err as Error).message });
  }
}

export async function getMessageById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const message = await messageService.getById(id);
    if (!message) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch message', details: (err as Error).message });
  }
}

export async function createMessage(req: Request, res: Response): Promise<void> {
  try {
    const msg = req.body;
    const created = await messageService.create(msg);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create message', details: (err as Error).message });
  }
}

export async function updateMessage(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await messageService.update(id, data);
    if (!updated) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message', details: (err as Error).message });
  }
}

export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    await messageService.delete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message', details: (err as Error).message });
  }
}
