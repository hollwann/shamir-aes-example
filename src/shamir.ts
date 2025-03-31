#!/usr/bin/env -S npx tsx
import { split, combine } from 'shamir-secret-sharing';
import { promises as fs } from 'fs';
import * as path from 'path';

const toUint8Array = (data: string) => new TextEncoder().encode(data);

export class ShamirSecretService {
    sharesDir: string;

    constructor() {
        this.sharesDir = path.join(__dirname, 'shares');
    }

    async init() {
        await fs.mkdir(this.sharesDir, { recursive: true });
    }

    async saveShares(shares: Uint8Array[]): Promise<void> {
        await Promise.all(
            shares.map((share, index) =>
                fs.writeFile(path.join(this.sharesDir, `share${index + 1}.txt`), btoa(String.fromCharCode(...share)))
            )
        );
    }

    async readShares(): Promise<Uint8Array[]> {
        const shareFiles = await fs.readdir(this.sharesDir);
        return Promise.all(
            shareFiles.map(async (file) => {
                const data = await fs.readFile(path.join(this.sharesDir, file), 'utf-8');
                return new Uint8Array(atob(data).split('').map((char) => char.charCodeAt(0)));
            })
        );
    }

    async splitSecret(input: string, totalShares = 5, threshold = 3): Promise<Uint8Array[]> {
        const secret = toUint8Array(input);
        return split(secret, totalShares, threshold);
    }

    async combineShares(threshold = 3): Promise<Uint8Array> {
        const shares = await this.readShares();
        return combine(shares.slice(0, threshold));
    }
}
