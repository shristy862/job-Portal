import User from '../../../userModal/Modal/modal.js';

export const updatePersonalDetails = async (req, res) => {
    const candidateId = req.params.id; 
    console.log(' here is the id from url ', candidateId);
    const { firstName, lastName, phoneNo, photo, cv, links } = req.body;

    try {
        console.log("Received request to update candidate profile with ID:", candidateId);

        // Find user by candidateId and check userType
        const candidateUser = await User.findOne({ _id: candidateId, userType: 'candidate' });

        // If user not found or not a candidate
        if (!candidateUser) {
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        // Update candidate details
        candidateUser.firstName = firstName || candidateUser.firstName;
        candidateUser.lastName = lastName || candidateUser.lastName;
        candidateUser.phoneNo = phoneNo || candidateUser.phoneNo;
        candidateUser.photo = photo || candidateUser.photo;
        candidateUser.cv = cv || candidateUser.cv;
        candidateUser.links = links || candidateUser.links;

        // Save the updated user details
        await candidateUser.save();

        res.status(200).json({
            message: 'Personal details updated successfully!',
            personalDetails: candidateUser
        });
    } catch (error) {
        console.error("Error in updating personal details:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
