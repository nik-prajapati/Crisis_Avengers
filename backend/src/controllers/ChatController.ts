import { Request, Response } from 'express';
import Message from '../models/message';

const sendMessage = async (req: Request, res: Response) => {
  const { reqId, content } = req.body;

  if (!req.user) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  if (content.trim() === '') {
    return res.status(400).json({ message: 'No message provided' });
  }

  const msg = await Message.create({
    content,
    sender: req.user._id,
    request: reqId,
  });

  const populatedMsg = await msg.populate('sender');
};
