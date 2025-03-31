#!/usr/bin/env -S npx tsx
import * as crypto from 'crypto';

export class AESCipherService {
	algorithm: string;
	key: Buffer;

	constructor(passphrase: string) {
		this.algorithm = 'aes-256-cbc';
		this.key = crypto.createHash('sha256').update(passphrase).digest(); // 32-byte key
	}

	encrypt(data: Buffer): string {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
		const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
		// Prepend iv to encrypted data (needed for decryption)
		return Buffer.concat([iv, encrypted]).toString('base64');
	}

	decrypt(data: string): Buffer {
		const bData = Buffer.from(data, 'base64');
		const iv = bData.slice(0, 16);
		const encryptedData = bData.slice(16);
		const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
		return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
	}
}
