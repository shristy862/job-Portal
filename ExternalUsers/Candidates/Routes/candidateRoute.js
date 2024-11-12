import { Router } from 'express';
import { loginCandidate } from '../Controllers/loginController.js';
import { getCandidateDashboard } from '../Controllers/dashboardController.js';
import { authenticateToken } from '../../../Middleware/verifyToken.js';
import {updateCandidateProfile } from '../Controllers/completeProfile.js'; 

const router = Router();

// Route for login 
router.post('/login' , loginCandidate);

// Route for dashboard
router.get('/dashboard', authenticateToken, getCandidateDashboard);

// Route for completeProfile
router.put('/complete-profile', authenticateToken, updateCandidateProfile);
export default router;
