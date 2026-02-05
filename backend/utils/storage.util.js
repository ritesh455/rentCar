
const fs = require('fs');
const path = require('path');
const os = require('os');
const S_S_D = process.env.S_S_D;



// Base directory in your OS home folder (e.g., C:/Users/Name/rental-storage)
const BASE_DIR = path.join(__dirname, '../local_Storage');
const TEMP_DIR = path.join(BASE_DIR, 'temp');


if (!envPath) {
    console.error(">>> [CRITICAL ERROR] SECURE_STORAGE_PATH is not defined in .env!");
    // You can set a default here just to prevent the crash
    // const S_S_D = path.join(__dirname, '../../SecureStorage'); 
}

// Initialization: Create folders if missing
[BASE_DIR, TEMP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`>>> [INIT] Created folder: ${dir}`);
    }
});

exports.saveDirectly = async (filename, buffer, targetSubfolder) => {
    try {
        const targetDir = path.join(S_S_D, targetSubfolder);
        const fullPath = path.join(targetDir, filename);

        // Ensure the subfolder (e.g., vehicles/rc) exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.writeFileSync(fullPath, buffer);
        console.log(`>>> [DISK] Direct Save Success: ${targetSubfolder}/${filename}`);
        
        // Return the relative path for Firestore storage
        return path.join(targetSubfolder, filename);
    } catch (error) {
        console.error(">>> [DISK ERROR] Direct save failed:", error.message);
        throw error;
    }
};

exports.saveToGlobalTemp = async (filename, buffer) => {
    const fullPath = path.join(TEMP_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    console.log(`>>> [DISK] Temp file saved: local_Storage/temp/${filename}`);
    return filename; // Store only the filename in tempUserData
};
exports.promoteFile = async (filename, targetSubfolder) => {
    try {
        // Use TEMP_DIR because that's where saveToGlobalTemp puts them
        const sourcePath = path.join(TEMP_DIR, filename); 
        
        // Final destination: E:/Donwload/SecureStorage/owner/aadhaar
        const targetDir = path.join(S_S_D, targetSubfolder);
        
        // Final file path: E:/Donwload/SecureStorage/owner/aadhaar/filename.enc
        const targetPath = path.join(targetDir, filename);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        if (fs.existsSync(sourcePath)) {
            fs.renameSync(sourcePath, targetPath);
            console.log(`>>> [DISK] Moved from local_Storage/temp to ${targetPath}`);
            return path.join(targetSubfolder, filename); 
        } else {
            console.error(">>> [DISK ERROR] Looked for file at:", sourcePath);
            throw new Error("Source file not found in temp");
        }
    } catch (error) {
        console.error(">>> [DISK ERROR] Promotion failed:", error.message);
        throw error;
    }
};