import { AESCipherService } from '../aes';
import { AppConfig } from '../config/AppConfig';
import { ICipherService } from '../interfaces/ICipherService';
import { ISecretSharing } from '../interfaces/ISecretSharing';
import { IShareStorage } from '../interfaces/IShareStorage';
import { ShamirSecretService } from '../shamir';
import { ShamirSharing } from '../secret/ShamirSharing';
import { FileShareStorage } from '../storage/FileShareStorage';

export class ServiceFactory {
    static createCipherService(passphrase = AppConfig.PASSPHRASE): ICipherService {
        return new AESCipherService(passphrase);
    }
    
    static createSecretSharing(): ISecretSharing {
        return new ShamirSharing();
    }
    
    static createShareStorage(sharesDir = AppConfig.SHARES_DIR): IShareStorage {
        return new FileShareStorage(sharesDir);
    }
    
    static createShamirSecretService(): ShamirSecretService {
        return new ShamirSecretService(
            this.createSecretSharing(),
            this.createShareStorage()
        );
    }
}
