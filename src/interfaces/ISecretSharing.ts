export interface ISecretSharing {
    splitSecret(input: string, totalShares?: number, threshold?: number): Promise<Uint8Array[]>;
    combineShares(shares: Uint8Array[], threshold?: number): Promise<Uint8Array>;
}
