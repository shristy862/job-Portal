import User from '../../../../userModal/Modal/modal.js';

export const updatePersonalDetails = async (req, res) => {
    const candidateId = req.params.id;
    const updates = req.body; // Assuming the array of updates is directly sent as the body

    try {
        const candidateUser = await User.findOne({ _id: candidateId, userType: 'candidate' });

        if (!candidateUser) {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        // Extract uploaded file URLs
        const cvUrl = req.files?.cv?.[0]?.location || null; 
        const photoUrl = req.files?.photo?.[0]?.location || null; 

        // Iterate through the updates array and apply changes
        updates.forEach(update => {
            if (update.key === 'firstName') candidateUser.personalDetails.firstName = update.value;
            if (update.key === 'lastName') candidateUser.personalDetails.lastName = update.value;
            if (update.key === 'phoneNo') candidateUser.personalDetails.phoneNo = update.value;
            if (update.key === 'links') candidateUser.personalDetails.links = update.value.split(',').map(link => link.trim()); // Handle comma-separated links
            if (update.key === 'city') candidateUser.personalDetails.city = update.value;
            if (update.key === 'gender') candidateUser.personalDetails.gender = update.value;
            if (update.key === 'languages') candidateUser.personalDetails.languages = update.value;
        });

        // If file URLs are provided, update them
        if (cvUrl) candidateUser.personalDetails.cv = cvUrl;
        if (photoUrl) candidateUser.personalDetails.photo = photoUrl;

        // Save the updated user details
        await candidateUser.save();

        res.status(200).json({
            message: 'Personal details updated successfully!',
            personalDetails: candidateUser.personalDetails,
        });
    } catch (error) {
        console.error('Error updating personal details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
