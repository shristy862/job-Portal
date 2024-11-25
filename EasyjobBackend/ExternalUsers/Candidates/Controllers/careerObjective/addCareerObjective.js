import User from '../../../../userModal/Modal/modal.js';

export const addCareerObjective = async (req, res) => {
    console.log('req.params:', req.params); 
    const candidateId = req.params.id;
    console.log('Extracted Candidate ID:', candidateId);
    const { careerObjective } = req.body;

    try {
        // Validate input
        if (!careerObjective || careerObjective.trim() === '') {
            return res.status(400).json({ message: 'Career objective is required' });
        }

        // Find the candidate and update the career objective
        const candidateUser = await User.findOneAndUpdate(
            { _id: candidateId, userType: 'candidate' },
            { careerObjective },
            { new: true } // Return the updated document
        );

        if (!candidateUser) {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        res.status(200).json({
            message: 'Career objective updated successfully!',
            careerObjective: candidateUser.careerObjective,
        });
    } catch (error) {
        console.error('Error updating career objective:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
