import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  userType: { 
    type: String, 
    enum: ['candidate', 'company','Hiring','administration', 'superadmin','platformSuperHR','platformJrHr', 'other'], 
    required: true 
  },
  addedBy: {
     type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  // Company profile fields
  phoneNo: { 
    type: String, 
    required: false 
  },
  location: {
    streetAddress: { 
      type: String, 
      required: false 
    },
    city: { 
      type: String, 
      required: false 
    },
    state: { 
      type: String, 
      required: false 
    },
    zipCode: { 
      type: String, 
      required: false 
    },
  },
  websiteUrl: { 
    type: String, 
    required: false  
  },
  industryType: { 
    type: String, 
    required: false 
  },
  companySize: { 
    type: String, 
    required: false 
  },
  representative: {
    name: { 
      type: String, 
      required: false 
    },
    position: { 
      type: String, 
      required: false 
    }
  },
  registrationNumber: { 
    type: String, 
    required: false  
  },
  gstNumber: { 
    type: String, 
    required: false  
  },

}, { timestamps: true });

export default mongoose.model('User', userSchema);
