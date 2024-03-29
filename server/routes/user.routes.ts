import {Router} from 'express';
import { register,
        login, 
        logout, 
        getProfile, 
        deleteProfile, 
        updateProfile, 
        verify,
        getAllUsers,
        deleteUserById } from '../controllers/user.controller';
import { verifyToken } from '../jwt/verifyToken';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.post('/reset-password')
router.get('/profile',verifyToken,  getProfile);
router.delete('/profile', verifyToken, deleteProfile);
router.put('/profile',verifyToken, updateProfile);
router.get('/users', verifyToken, getAllUsers);
router.delete('/user/:id', verifyToken, deleteUserById)
router.get('/verify', verifyToken, getProfile)
export default router
