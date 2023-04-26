import { makeAutoObservable, reaction } from "mobx";


export default class CommonStore{
    token : string | null = window.localStorage.getItem('jwt');
    verificationToken : string | null = window.localStorage.getItem('vft');
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
        )
    }

    setToken = (token: string | null) =>{
        this.token = token;
    }
    setVerificationToken=(verificationToken:string | null)=>{
        this.verificationToken = verificationToken
    }
    setAppLoaded =() =>{
        this.appLoaded=true;
    }
}