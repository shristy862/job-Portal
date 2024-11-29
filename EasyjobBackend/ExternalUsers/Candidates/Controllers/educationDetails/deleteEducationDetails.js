import User from '../../../../userModal/Modal/modal.js';

export const deleteEducationalDetail = async (req, res) => {
    console.log('API hit')
    const candidateId = req.params.id; 
    const { type } = req.body; 
    try {
        // Find the candidate 
        const candidateUser = await User.findOne({ _id: candidateId, userType: 'candidate' });

        if (!candidateUser) {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        // Ensure the educationalDetails array exists and is not empty
        if (!candidateUser.educationalDetails || candidateUser.educationalDetails.length === 0) {
            return res.status(404).json({ message: 'No educational details found for the candidate.' });
        }

        // Find the index of the educational detail to delete
        const educationIndex = candidateUser.educationalDetails.findIndex(
            (edu) => edu.type === type
        );

        if (educationIndex === -1) {
            return res.status(404).json({ message: `No educational detail found for type: ${type}` });
        }

        // Remove the educational detail
        candidateUser.educationalDetails.splice(educationIndex, 1);

        // Save the updated user document
        await candidateUser.save();

        // Return a success response
        res.status(200).json({
            message: `Educational detail for type "${type}" removed successfully!`,
        });
    } catch (error) {
        console.error('Error deleting educational detail:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
