import { makeAutoObservable, reaction } from "mobx";


export default class CommonStore{
    token : string | null = window.localStorage.getItem('jwt');
    verificationToken : string | null = window.localStorage.getItem('vft');
    userId : string | null = window.localStorage.getItem('userId');
    changePasswordToken : string | null = window.localStorage.getItem('cpt');
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
            ()=>this.userId,
            userId=>{
                if(userId) window.localStorage.setItem('userId',userId);
                else window.localStorage.removeItem('userId');
            }
        );
        reaction(
            ()=>this.changePasswordToken,
            changePasswordToken=>{
                if(changePasswordToken) window.localStorage.setItem('cpt',changePasswordToken);
                else window.localStorage.removeItem('cpt');
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
}