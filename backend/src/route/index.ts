import { Router } from 'express';
import {
  RegisterRequest,
  LoginRequest,
  userInfo,
  logout,
} from '../controller/auth';
import { authMiddleware } from '../middleware/authMiddleware';
import { GetSettingRequest, UpdateSettingRequest } from '../controller/setting';
import {
  ContentCreationRequest,
  GetContentRequest,
  DeleteContentRequestbyAll,
  DeleteContentRequestbyId,
  UpdateContentRequestbyId,
  GetContentType,
} from '../controller/content';

import { shareRequest, receiverLinkRequest } from '../controller/link';
const router = Router();

/* 
    Authentication Route
*/
router.post('/register', RegisterRequest);
router.post('/login', LoginRequest);
router.get('/info', authMiddleware, userInfo);
router.get('/logout', authMiddleware, logout);

/*
    Content Route
*/
router.post('/content', authMiddleware, ContentCreationRequest);
router.get('/content', authMiddleware, GetContentRequest);
router.delete('/content/:contentId', authMiddleware, DeleteContentRequestbyId);
router.delete('/content', authMiddleware, DeleteContentRequestbyAll);
router.patch('/content/:contentId', authMiddleware, UpdateContentRequestbyId);
router.get('/content-type', authMiddleware, GetContentType);
/* 
    Link Route
*/
router.get('/share', authMiddleware, shareRequest);
router.get('/share/:hash', receiverLinkRequest);

/* 
    Setting Route
*/
router.get('/setting', authMiddleware, GetSettingRequest);
router.put('/setting', authMiddleware, UpdateSettingRequest);
export default router;
