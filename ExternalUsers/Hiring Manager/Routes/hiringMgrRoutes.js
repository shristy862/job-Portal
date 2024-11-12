import express from 'express';
import { addHiringManager } from '../Controllers/addHiringManagerController.js';
import { loginHiringManager } from '../Controllers/LoginControllers.js';
import { getDashboard } from '../Controllers/DashboardControllers.js';  
import { authenticateToken } from '../../../Middleware/verifyToken.js';
import { postJob } from '../Controllers/JobController.js';

const router = express.Router();

// Route for adding HM
router.post('/:companyId/add', authenticateToken, addHiringManager);
// Route for HM login
router.post('/login', loginHiringManager);
// Route forDashboard
router.get('/dashboard', authenticateToken, getDashboard); 
// Route for post Jobs
router.post('/:id/jobs', authenticateToken, postJob);
export default router;
