import { split, combine } from 'shamir-secret-sharing';
import { ISecretSharing } from '../interfaces/ISecretSharing';

const toUint8Array = (data: string) => new TextEncoder().encode(data);

export class ShamirSharing implements ISecretSharing {
    async splitSecret(input: string, totalShares = 5, threshold = 3): Promise<Uint8Array[]> {
        const secret = toUint8Array(input);
        return split(secret, totalShares, threshold);
    }

    async combineShares(shares: Uint8Array[], threshold = 3): Promise<Uint8Array> {
        return combine(shares.slice(0, threshold));
    }
}
