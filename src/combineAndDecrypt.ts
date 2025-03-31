#!/usr/bin/env -S npx tsx
import { promises as fs } from 'fs';
import * as path from 'path';
import { AESCipherService } from './aes';
import { ShamirSecretService } from './shamir';

async function combineAndDecrypt() {
    console.log("Starting share combination and decryption workflow...");

    // 1. Combine shares to reconstruct the encrypted data
    const secretService = new ShamirSecretService();
    await secretService.init();
    const reconstructedBytes = await secretService.combineShares();
    const reconstructedEncryptedData = new TextDecoder().decode(reconstructedBytes);
    console.log("Shares combined successfully.");

    // 2. Decrypt the reconstructed data
    const cipherService = new AESCipherService('your-passphrase-here');
    const decryptedData = cipherService.decrypt(reconstructedEncryptedData);
    console.log("Decryption successful.");

    // 3. Write the decrypted result to output file
    const outputPath = path.join(__dirname, 'final_output.txt');
    await fs.writeFile(outputPath, decryptedData);
    console.log("Decrypted content written to final_output.txt");
}

combineAndDecrypt().catch(err => {
    console.error("An error occurred during the combine and decrypt workflow:", err);
});
