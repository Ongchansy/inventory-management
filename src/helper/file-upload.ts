import fs from 'fs';
import path from 'path';
// Utility function to handle file upload
async function uploadImageFile(file: File | null): Promise<string> {
    if (!file) return "";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uint8Array = new Uint8Array(buffer);

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, uint8Array);

    return `/uploads/${file.name}`;
}

export default uploadImageFile