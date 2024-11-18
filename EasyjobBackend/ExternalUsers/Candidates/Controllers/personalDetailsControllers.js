import User from '../../../userModal/Modal/modal.js';

export const updatePersonalDetails = async (req, res) => {
    const candidateId = req.params.id; 

    console.log('Received ID from URL:', candidateId);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file); // To verify file upload

    const { firstName, lastName, phoneNo, photo, cv, links } = req.body;

    try {
        console.log("Finding user with ID:", candidateId);

        // Find user by candidateId and check userType
        const candidateUser = await User.findOne({ _id: candidateId, userType: 'candidate' });

        // If user not found or not a candidate
        if (!candidateUser) {
            console.error('Candidate user not found');
            return res.status(404).json({ message: 'Candidate user not found' });
        }

        console.log('User found:', candidateUser);

       candidateUser.personalDetails = {
            ...candidateUser.personalDetails, // Retain existing data
            firstName: firstName || candidateUser.personalDetails?.firstName,
            lastName: lastName || candidateUser.personalDetails?.lastName,
            phoneNo: phoneNo || candidateUser.personalDetails?.phoneNo,
            photo: photo || candidateUser.personalDetails?.photo,
            links: links || candidateUser.personalDetails?.links,
        };

        if (req.file) {
            console.log('File uploaded to S3, location:', req.file.location);
            candidateUser.cv = req.file.location;  
        }
        console.log('Uploaded file info:', req.file);
        console.log('Updated personalDetails:', candidateUser.personalDetails);

        // Save the updated user details
        await candidateUser.save();

        console.log('User details updated successfully:', candidateUser);

        res.status(200).json({
            message: 'Personal details updated successfully!',
            personalDetails: candidateUser,
        });
    } catch (error) {
        console.error('Error in updating personal details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
