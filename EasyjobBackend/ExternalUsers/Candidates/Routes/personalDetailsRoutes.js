import { Router } from 'express';
import { updatePersonalDetails } from '../Controllers/personalDetailsControllers.js';
import { authenticateToken } from '../../../Middleware/verifyToken.js';
import { upload } from '../../../Services/uploadConfig.js';
const router = Router();

// Route for updating personal details
router.put('/:id/personalDetails', upload.single('cv'),authenticateToken, updatePersonalDetails);

export default router;
