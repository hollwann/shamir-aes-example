export interface ICipherService {
    encrypt(data: Buffer): string;
    decrypt(data: string): Buffer;
}
