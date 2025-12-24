import { Router } from "express";
import { RegisterRequest, LoginRequest, userInfo } from "../controller/auth";
import { authMiddleware } from "../middleware/authMiddleware";
import { 
    ContentCreationRequest,
    GetContentRequest, 
    DeleteContentRequestbyAll,
    DeleteContentRequestbyId,
    UpdateContentRequestbyId
} from "../controller/content";

import { shareRequest, receiverLinkRequest } from "../controller/link";
const router = Router() 

/* 
    Authentication Route
*/
router.post('/register', RegisterRequest)
router.post('/login', LoginRequest)
router.get('/info', authMiddleware, userInfo)


/*
    Content Route
*/
router.post('/content', authMiddleware, ContentCreationRequest)
router.get('/content', authMiddleware, GetContentRequest)
router.delete('/content/:contentId', authMiddleware, DeleteContentRequestbyId)
router.delete('/content', authMiddleware, DeleteContentRequestbyAll)
router.patch('/content/:contentId', authMiddleware, UpdateContentRequestbyId)

/* 
    Link Route
*/
router.get('/share', authMiddleware, shareRequest)
router.get('/share/:hash', receiverLinkRequest)

export default router

