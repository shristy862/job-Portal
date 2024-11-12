import User from '../../../userModal/Modal/modal.js';

export const updateCandidateProfile = async (req, res) => {
    const {
        careerObject,
        education,
        workExperience,
        trainingCourses,
        projects,
        cv,
        skills
    } = req.body;

    try {
        // Find the candidate 
        const user = await User.findById(req.user.id);

        if (!user || user.userType !== 'candidate') {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update fields
        user.careerObject = careerObject || user.careerObject;
        user.education = education || user.education;
        user.workExperience = workExperience || user.workExperience;
        user.trainingCourses = trainingCourses || user.trainingCourses;
        user.projects = projects || user.projects;
        user.cv = cv || user.cv;
        user.skills = skills || user.skills;

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully!',
            profile: {
                careerObject: user.careerObject,
                education: user.education,
                workExperience: user.workExperience,
                trainingCourses: user.trainingCourses,
                projects: user.projects,
                cv: user.cv,
                skills: user.skills
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};