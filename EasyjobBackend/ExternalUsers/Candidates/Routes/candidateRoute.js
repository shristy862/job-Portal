import { Router } from 'express';
import { loginCandidate } from '../Controllers/loginController.js';
import { getCandidateDashboard } from '../Controllers/dashboardController.js';
import { authenticateToken } from '../../../Middleware/verifyToken.js';
import  personalDetailsRoutes from './personalDetailsRoutes.js'; 

const router = Router();

// Route for login 
router.post('/login' , loginCandidate);

// Route for dashboard
router.get('/dashboard', authenticateToken, getCandidateDashboard);

// Personal details route
router.use('/:id/complete-profile', personalDetailsRoutes);

export default router;
