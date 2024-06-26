import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import multer from "multer"
import fs from "fs"

export class bc {

    static async uploadToS3(file) {

        const REGION = 'ap-south-1';
        const bucketName = 'spufc-uploads';
        const s3 = new S3Client({ region: REGION });

        const filePath = file.path;
        const keyName = file.originalname;

        try {

            const fileStream = fs.createReadStream(filePath);
            const uploadParams = {
                Bucket: bucketName,
                Key: keyName,
                Body: fileStream
            };

            const upload = new Upload({
                client: s3,
                params: uploadParams,
            });

            const result = await upload.done();
            // fs.unlinkSync(filePath);
            const s3Url = `https://${bucketName}.s3.${REGION}.amazonaws.com/${keyName}`;
            return s3Url;

        } catch (err) {
            // console.error('Error uploading file:', err);
            // res.status(500).send('Error uploading file.');

            return err;
        }
    }

}