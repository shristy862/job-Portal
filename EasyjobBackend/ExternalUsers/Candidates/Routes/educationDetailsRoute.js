import { Router } from 'express';
import { addEducationalDetails } from '../Controllers/educationDetails/addEduDetails.js';
import { updateEducationalDetails } from '../Controllers/educationDetails/updateEduDetails.js';
import { getEducationalDetails } from '../Controllers/educationDetails/getAllEdu.js';
import { authenticateToken } from '../../../Middleware/verifyToken.js';

const router = Router();

// Route for adding educational details
router.put(
    '/:id/educational-details',
    authenticateToken,
    addEducationalDetails
);
// Route for updating educational details with the desired URL
router.put(
    '/:id/educational-details/update',
    authenticateToken,
    updateEducationalDetails
);
// Route for getting all educational details
router.get(
    '/:id/educational-details',
    authenticateToken,
    getEducationalDetails
);

export default router;
