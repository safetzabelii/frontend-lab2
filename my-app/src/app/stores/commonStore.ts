import { makeAutoObservable, reaction } from "mobx";
import * as forge from 'node-forge';
import { uuid } from 'uuidv4';
import Cookies from "js-cookie";

export default class CommonStore{
    token : string | null = window.localStorage.getItem('jwt');
    verificationToken : string | null = window.localStorage.getItem('vft');
    changePasswordToken: string | null = null;
    userId: string | null = null;
    appLoaded = false;

    constructor(){
        makeAutoObservable(this);

        reaction(
        ()=>this.token,
        token=>{
            if(token) window.localStorage.setItem('jwt',token);
            else window.localStorage.removeItem('jwt');
        },
        );
        reaction(
            ()=>this.verificationToken,
            verificationToken=>{
                if(verificationToken) window.localStorage.setItem('vft',verificationToken);
                else window.localStorage.removeItem('vft');
            }
        );
        reaction(
            () => this.userId,
            (userId) => {
              console.log(`userId changed: ${userId}`);
            }
          );
          reaction(
            () => this.changePasswordToken,
            (changePasswordToken) => {
              console.log(`changePasswordToken changed: ${changePasswordToken}`);
            }
          );
    }

    setToken = (token: string | null) =>{
        this.token = token;
    }
    setVerificationToken=(verificationToken:string | null)=>{
        this.verificationToken = verificationToken
    }
    setUserId = (userId: string|null)=>{
        this.userId = userId;
    }
    setChangePasswordToken = (changePasswordToken : string | null) =>{
        this.changePasswordToken= changePasswordToken;
    }
    setAppLoaded =() =>{
        this.appLoaded=true;
    }
    getUserId() {
        return this.userId;
      }
      encryptCookieToken = (plaintext: string, key: string, iv: string): string => {
        const cipher = forge.cipher.createCipher('AES-CBC', forge.util.hexToBytes(key));
        cipher.start({ iv: forge.util.hexToBytes(iv) });
        cipher.update(forge.util.createBuffer(plaintext));
        cipher.finish();
        return cipher.output.toHex();
      };
      
      decryptCookieToken = (ciphertext: string, key: string, iv: string): string => {
        const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.hexToBytes(key));
        decipher.start({ iv: forge.util.hexToBytes(iv) });
        decipher.update(forge.util.createBuffer(forge.util.hexToBytes(ciphertext)));
        decipher.finish();
        return decipher.output.toString();
      };

      decryptEndpontToken = (encryptedToken:string, key:string, iv:string) => {
        const keyBytes = forge.util.decode64(key);
        const ivBytes = forge.util.decode64(iv);
        const cipherTextBytes = forge.util.decode64(encryptedToken);
      
        const decipher = forge.cipher.createDecipher('AES-CBC', keyBytes);
        decipher.start({ iv: ivBytes });
        decipher.update(forge.util.createBuffer(cipherTextBytes));
        decipher.finish();
      
        return decipher.output.toString();
      };
      setCookies=(userId:string,token:string,key:string,iv:string)=>{
                const encryptionKey =  forge.random.getBytesSync(32);
                const encryptionIv = forge.random.getBytesSync(32);
                const encryptedUserId = this.encryptCookieToken(userId, encryptionKey, encryptionIv);
                const encryptedKey = this.encryptCookieToken(key, encryptionKey, encryptionIv);
                const encryptedIv = this.encryptCookieToken(iv, encryptionKey, encryptionIv);
                const thirtyMinutes = 30 * 60 * 1000; 
                Cookies.set('userId', encryptedUserId, { expires: new Date(Date.now() + thirtyMinutes) });
                Cookies.set('token', token, { expires: new Date(Date.now() + thirtyMinutes) });
                Cookies.set('key', encryptedKey, { expires: new Date(Date.now() + thirtyMinutes) });
                Cookies.set('iv', encryptedIv, { expires: new Date(Date.now() + thirtyMinutes) });
                Cookies.set('encryptionKey', encryptionKey, { expires: new Date(Date.now() + thirtyMinutes) });
                Cookies.set('encryptionIv', encryptionIv, { expires: new Date(Date.now() + thirtyMinutes) });
      }
      getCookies = () => {
        const encryptedUserId = Cookies.get("userId");
        const encryptedToken = Cookies.get("token");
        const encryptedKey = Cookies.get("key");
        const encryptedIv = Cookies.get("iv");
        const encryptionKey = Cookies.get("encryptionKey");
        const encryptionIv = Cookies.get("encryptionIv");
      if(encryptedKey !=null && encryptionKey !=null && encryptionIv !=null && encryptedIv !=null &&encryptedUserId !=null && encryptedToken !=null){
        const decryptedKey = this.decryptCookieToken(encryptedKey, encryptionKey, encryptionIv);
        const decryptedIv = this.decryptCookieToken(encryptedIv, encryptionKey, encryptionIv);
        const decryptedUserId = this.decryptCookieToken(encryptedUserId, encryptionKey, encryptionIv);
        const decryptedToken = this.decryptEndpontToken(encryptedToken,decryptedKey,decryptedIv);
        return { userId: decryptedUserId, token: decryptedToken };
    }
    else{
        return null;
    }
      
      };

}