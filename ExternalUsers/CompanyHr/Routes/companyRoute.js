import express from 'express';
import { loginCompany } from '../Controllers/loginController.js'; 
import { getCompanyDashboard } from '../Controllers/dashboardController.js'; 
import { authenticateToken } from '../../../Middleware/verifyToken.js';
import { completeCompanyProfile } from '../Controllers/profileController.js';

const router = express.Router();

// Route to login
router.post('/login', loginCompany);
// Route to dashboard
router.get('/dashboard', authenticateToken, getCompanyDashboard);
// Route to complete profile
router.put('/dashboard/:id/complete-profile',authenticateToken, completeCompanyProfile);

export default router;
