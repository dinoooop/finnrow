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


    static getYMSE(year, month) {

        if (typeof year !== 'number' || year < 1000 || year > 9999 || !Number.isInteger(year)) {
            // throw new Error('Please provide a valid 4-digit year as input.');
        }

        if (month && (typeof month !== 'number' || month < 1 || month > 12 || !Number.isInteger(month))) {
            // throw new Error('Please provide a valid month (1-12) as the second parameter.');
        }

        let startDate, endDate;

        if (month) {
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month - 1, new Date(year, month, 0).getDate()); // Last day of the specified month
        } else {
            startDate = new Date(year, 0, 1);
            endDate = new Date(year, 11, 31);
        }

        return {
            start: this.toYmd(startDate),
            end: this.toYmd(endDate)
        };
    }

    static toYmd(theDate) {
        const year = theDate.getFullYear();
        const month = String(theDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(theDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }



}