import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3'; 
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

// Create an S3 client using AWS SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Multer setup with multerS3 for S3 file storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            // Generate a unique filename with the current timestamp
            cb(null, `cvs/${Date.now().toString()}-${file.originalname}`);
        },
        // Remove ACL from the upload (by setting ACL to null or undefined)
        acl: undefined
    }),
    limits: { fileSize: 1024 * 1024 * 5 },  // 5 MB file size limit
});

// Export the upload middleware and s3 client
export { upload, s3 };
