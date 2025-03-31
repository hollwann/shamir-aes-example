#!/usr/bin/env -S npx tsx
import { ISecretSharing } from './interfaces/ISecretSharing';
import { IShareStorage } from './interfaces/IShareStorage';
import { ShamirSharing } from './secret/ShamirSharing';
import { FileShareStorage } from './storage/FileShareStorage';

export class ShamirSecretService {
    private readonly secretSharing: ISecretSharing;
    private readonly shareStorage: IShareStorage;
    
    constructor(
        secretSharing: ISecretSharing = new ShamirSharing(),
        shareStorage: IShareStorage = new FileShareStorage()
    ) {
        this.secretSharing = secretSharing;
        this.shareStorage = shareStorage;
    }

    get sharesDir(): string {
        if (this.shareStorage instanceof FileShareStorage) {
            return (this.shareStorage as any).sharesDir;
        }
        return '';
    }

    async init(): Promise<void> {
        return this.shareStorage.init();
    }

    async saveShares(shares: Uint8Array[]): Promise<void> {
        return this.shareStorage.saveShares(shares);
    }

    async readShares(): Promise<Uint8Array[]> {
        return this.shareStorage.readShares();
    }

    async splitSecret(input: string, totalShares = 5, threshold = 3): Promise<Uint8Array[]> {
        return this.secretSharing.splitSecret(input, totalShares, threshold);
    }

    async combineShares(threshold = 3): Promise<Uint8Array> {
        const shares = await this.shareStorage.readShares();
        return this.secretSharing.combineShares(shares, threshold);
    }
}
