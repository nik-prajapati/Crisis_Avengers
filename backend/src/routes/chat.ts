import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import {
  createChat,
  addToChat,
  sendMessage,
  chatList,
  getMessages,
} from '../controllers/ChatController';

const router = Router();

router.post('/', isAuthenticated, createChat);
router.put('/', isAuthenticated, addToChat);
router.post('/:chatId', isAuthenticated, sendMessage);
router.get('/chats', isAuthenticated, chatList);
router.get('/:chatId', isAuthenticated, getMessages);

// router.post('/', createChat);
// router.put('/', addToChat);
// router.post('/:chatId', sendMessage);
// router.get('/chats', chatList);
// router.get('/:chatId', getMessages);

export default router;
