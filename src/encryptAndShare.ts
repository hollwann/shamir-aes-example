#!/usr/bin/env -S npx tsx
import { promises as fs } from 'fs';
import { AppConfig } from './config/AppConfig';
import { ServiceFactory } from './factory/ServiceFactory';

async function encryptAndCreateShares() {
    console.log("Starting encryption and sharing workflow...");

    // 1. Read the input file
    const inputPath = AppConfig.INPUT_FILE;
    const inputData = await fs.readFile(inputPath);
    console.log("Input file read successfully.");

    // 2. Encrypt the content
    const cipherService = ServiceFactory.createCipherService();
    const encryptedData = cipherService.encrypt(inputData);
    console.log("Content encrypted successfully.");

    // Save encrypted data for verification
    const encryptedPath = AppConfig.ENCRYPTED_FILE;
    await fs.writeFile(encryptedPath, encryptedData);
    console.log(`Encrypted data saved to ${encryptedPath}`);

    // 3. Create shares from encrypted data
    const secretService = ServiceFactory.createShamirSecretService();
    await secretService.init();
    const shares = await secretService.splitSecret(
        encryptedData, 
        AppConfig.TOTAL_SHARES, 
        AppConfig.THRESHOLD
    );
    
    // 4. Save the shares
    await secretService.saveShares(shares);
    console.log(`Secret split into ${shares.length} shares and saved to disk.`);
}

encryptAndCreateShares().catch(err => {
    console.error("An error occurred during the encrypt and share workflow:", err);
});
