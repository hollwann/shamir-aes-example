#!/usr/bin/env -S npx tsx
import { promises as fs } from 'fs';
import { AppConfig } from './config/AppConfig';
import { ServiceFactory } from './factory/ServiceFactory';

async function combineAndDecrypt() {
    console.log("Starting share combination and decryption workflow...");

    // 1. Combine shares to reconstruct the encrypted data
    const secretService = ServiceFactory.createShamirSecretService();
    await secretService.init();
    const reconstructedBytes = await secretService.combineShares(AppConfig.THRESHOLD);
    const reconstructedEncryptedData = new TextDecoder().decode(reconstructedBytes);
    console.log("Shares combined successfully.");

    // 2. Decrypt the reconstructed data
    const cipherService = ServiceFactory.createCipherService();
    const decryptedData = cipherService.decrypt(reconstructedEncryptedData);
    console.log("Decryption successful.");

    // 3. Write the decrypted result to output file
    const outputPath = AppConfig.OUTPUT_FILE;
    await fs.writeFile(outputPath, decryptedData);
    console.log(`Decrypted content written to ${outputPath}`);
}

combineAndDecrypt().catch(err => {
    console.error("An error occurred during the combine and decrypt workflow:", err);
});
