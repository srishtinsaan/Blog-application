import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectID)
            
        this.account = new Account(this.client)
    }


    // below thing not need to be change when you switch from appwrite to any other backend
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            console.log("User created:", userAccount);
                
            if(userAccount){
                try { 
                    return this.login({email, password})
                    
                } catch (error) {
                    // if email already exists
                    if (error.code === 409) {
                        throw new Error("User with this email already exists. Please login.");
                    }
                    await this.account.deleteSession('current'); 
                }
            }else{
                return userAccount;
            }


            // logout any active session before login

    } catch (error) {
        throw error;
    }
}


    async login({email, password}){
        try{
            await this.account.deleteSession('current').catch(() => {});
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }

        return null; // agar acc na mile ya koi error aa jae
    }

    async logout(){ 
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}
 
const authService  = new AuthService(); //object created

export default authService // object exported taaki directly obj se kuch bhi features use kar sake.

