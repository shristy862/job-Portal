import { Router } from 'express';
import { updatePersonalDetails } from '../Controllers/personalDetailsControllers.js';
import { authenticateToken } from '../../../Middleware/verifyToken.js';

const router = Router();

// Route for updating personal details
router.put('/personalDetails', authenticateToken, updatePersonalDetails);

export default router;
