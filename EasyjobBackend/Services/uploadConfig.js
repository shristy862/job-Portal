import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { s3 } from '../Connections/aws-config.js';  
import dotenv from 'dotenv';

dotenv.config();
// Configure multer to upload files directly to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,  
        acl: 'public-read', 
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `cvs/${Date.now().toString()}-${file.originalname}`);
        }
    }),
    limits: { fileSize: 1024 * 1024 * 5 },  // 5 MB size limit (adjust as needed)
});

export { upload };
