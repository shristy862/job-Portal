import User from '../../../userModal/Modal/modal.js';

export const updatePersonalDetails = async (req, res) => {
    const candidateId = req.params.id;  // Get the candidate ID from URL parameters
    console.log("Received Request to update details for candidate ID:", candidateId);

    const { firstName, lastName, phoneNo, photo, cv, links } = req.body;

    try {
        // Find the user by ID and ensure the userType is 'candidate'
        const candidateUser = await User.findById(candidateId);

        if (!candidateUser || candidateUser.userType !== 'candidate') {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        console.log('Received candidate profile data:', req.body);

        // Update candidate-specific details
        candidateUser.firstName = firstName || candidateUser.firstName;
        candidateUser.lastName = lastName || candidateUser.lastName;
        candidateUser.phoneNo = phoneNo || candidateUser.phoneNo;
        candidateUser.photo = photo || candidateUser.photo;
        candidateUser.cv = cv || candidateUser.cv;
        candidateUser.links = links || candidateUser.links;

        // Save the updated user profile
        await candidateUser.save();

        res.status(200).json({
            message: 'Personal details updated successfully!',
            personalDetails: {
                firstName: candidateUser.firstName,
                lastName: candidateUser.lastName,
                phoneNo: candidateUser.phoneNo,
                photo: candidateUser.photo,
                cv: candidateUser.cv,
                links: candidateUser.links
            }
        });
    } catch (error) {
        console.error("Error in updating personal details:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
