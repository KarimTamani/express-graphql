import fs from "fs";
import path from "path";





const saveFile = async ({ file }, uploadDir = "uploads", maxSizeMB = 2) => {
    try {
        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Get file details
        const { createReadStream, filename } = await file;
        var newFilename = `${new Date().getTime().toString()}${path.parse(filename).ext}`

        const stream = createReadStream();
        // Define the file path
        const filePath = path.join(uploadDir, newFilename);

        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        // Save the file
        await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);
            let uploadedSize = 0;

            stream.pipe(writeStream);
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);

            stream.on("data", (chunk) => {
                uploadedSize += chunk.length;

                if (uploadedSize > maxSizeBytes) {
                    stream.destroy(); // Stop reading
                    fs.unlinkSync(filePath); // Delete partial file
                    reject(new Error(`File size exceeds ${maxSizeMB}MB limit.`));
                }

            });
        });


        return newFilename; // Return the saved file path
    } catch (error) {

        throw new Error("File upload error:", error);
    }
};



export default saveFile; 