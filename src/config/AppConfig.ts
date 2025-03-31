import * as path from 'path';

export class AppConfig {
    static readonly PASSPHRASE = 'your-passphrase-here';
    static readonly INPUT_FILE = path.join(__dirname, '..', 'files/input.txt');
    static readonly ENCRYPTED_FILE = path.join(__dirname, '..', 'files/encrypted.txt');
    static readonly OUTPUT_FILE = path.join(__dirname, '..', 'files/final_output.txt');
    static readonly SHARES_DIR = path.join(__dirname, '..', 'files/shares');
    static readonly TOTAL_SHARES = 5;
    static readonly THRESHOLD = 3;
}
