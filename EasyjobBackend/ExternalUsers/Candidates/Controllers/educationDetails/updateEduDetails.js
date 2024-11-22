import User from '../../../../userModal/Modal/modal.js';

export const updateEducationalDetails = async (req, res) => {
    const candidateId = req.params.id; // Candidate ID from params
    const { type, ...updatedFields } = req.body; // Education type and fields to update

    try {
        // Find the candidate
        const candidateUser = await User.findOne({ _id: candidateId, userType: 'candidate' });

        if (!candidateUser) {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        // Ensure educationalDetails array exists
        if (!candidateUser.educationalDetails || candidateUser.educationalDetails.length === 0) {
            return res.status(404).json({ message: 'No educational details found for the candidate.' });
        }

        // Find the education detail by type
        const educationDetail = candidateUser.educationalDetails.find((edu) => edu.type === type);

        if (!educationDetail) {
            return res.status(404).json({ message: `No educational details found for type: ${type}` });
        }

        // Update only the provided fields
        Object.keys(updatedFields).forEach((field) => {
            if (updatedFields[field] !== undefined) {
                educationDetail[field] = updatedFields[field];
            }
        });

        await candidateUser.save();

        res.status(200).json({
            message: 'Educational detail updated successfully!',
            updatedEducationDetail: educationDetail,
        });
    } catch (error) {
        console.error('Error updating educational details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
