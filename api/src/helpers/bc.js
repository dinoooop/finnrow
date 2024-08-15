import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import multer from "multer"
import fs from "fs"

export class bc {

    static convertToISO8601(dateString) {
        const date = new Date(dateString);
        const isoString = date.toISOString();
        return isoString;
    }


    static getYMSE(year, month) {

        let startDate, endDate;

        if (month) {
            startDate = this.toYmd(year, month, 1);
            const lastDate = this.getLastDateMonth(year, month)
            endDate = this.toYmd(year, month, lastDate);
        } else {
            startDate = this.toYmd(year);
            endDate = this.toYmd(year, 12, 31);
        }

        return { start: startDate, end: endDate };
    }

    static humanMonthToSystemMonth(month) {
        return month - 1;
    }

    static convertYmd(theDate) {
        const year = theDate.getFullYear();
        const month = String(theDate.getMonth() + 1).padStart(2, '0');
        const day = String(theDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static toYmd(year, month, date) {
        date = date ? date.toString().padStart(2, '0') : '01'
        month = month ? month.toString().padStart(2, '0') : '01'
        return `${year}-${month}-${date}`
    }


    static getLastDateMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    static getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}