#!/usr/bin/env -S npx tsx
import { promises as fs } from 'fs';
import * as path from 'path';
import { AESCipherService } from './aes';
import { ShamirSecretService } from './shamir';

async function encryptAndCreateShares() {
    console.log("Starting encryption and sharing workflow...");

    // 1. Read the input file
    const inputPath = path.join(__dirname, 'input.txt');
    const inputData = await fs.readFile(inputPath);
    console.log("Input file read successfully.");

    // 2. Encrypt the content
    const cipherService = new AESCipherService('your-passphrase-here');
    const encryptedData = cipherService.encrypt(inputData);
    console.log("Content encrypted successfully.");

    // Save encrypted data for verification
    const encryptedPath = path.join(__dirname, 'encrypted.txt');
    await fs.writeFile(encryptedPath, encryptedData);
    console.log("Encrypted data saved to encrypted.txt");

    // 3. Create shares from encrypted data
    const secretService = new ShamirSecretService();
    await secretService.init();
    const shares = await secretService.splitSecret(encryptedData);
    
    // 4. Save the shares
    await secretService.saveShares(shares);
    console.log(`Secret split into ${shares.length} shares and saved to disk.`);
}

encryptAndCreateShares().catch(err => {
    console.error("An error occurred during the encrypt and share workflow:", err);
});
