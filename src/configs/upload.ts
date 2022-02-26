import path from 'path';
import multer from 'multer';

const uploadFolder = path.resolve(__dirname, '..', '..', (process.env.IMAGE_URL_PUBLIC as string + process.env.IMAGE_URL_GALLERY as string));
const uploadFolderTemp = path.resolve(__dirname, '..', '..', (process.env.IMAGE_URL_PUBLIC as string + process.env.IMAGE_URL_TMP as string));

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolderTemp,
        filename(request, file, callback) {
            const uniqueSuffix = (Date.now() + path.extname(file.originalname));
            const fileName = file.originalname.replace(path.extname(file.originalname), '');
    
            callback(null, (fileName + '-' + uniqueSuffix));    
        },
    }),
    fileFilter(request: any, file: { mimetype: string; }, callback: (arg0: null, arg1: boolean) => void): void {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        const fileSize = request.headers['content-length'];

        if (fileSize) {
            if (parseInt(fileSize) > 10000000) {
                callback(null, false);
            } else {
                callback(null, allowed.includes(file.mimetype));
            }
        } else {
            callback(null, false);
        }
    }
}
