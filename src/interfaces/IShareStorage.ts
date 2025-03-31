export interface IShareStorage {
    init(): Promise<void>;
    saveShares(shares: Uint8Array[]): Promise<void>;
    readShares(): Promise<Uint8Array[]>;
}
