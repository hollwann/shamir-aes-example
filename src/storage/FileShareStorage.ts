import { promises as fs } from 'fs';
import * as path from 'path';
import { IShareStorage } from '../interfaces/IShareStorage';

export class FileShareStorage implements IShareStorage {
    private readonly sharesDir: string;

    constructor(sharesDir?: string) {
        this.sharesDir = sharesDir || path.join(__dirname, '..', 'shares');
    }

    async init(): Promise<void> {
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
}
