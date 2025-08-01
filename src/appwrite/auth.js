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
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password})

            }else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailSession(email, password)
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
            await this.account.deleteSession()
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}
 
const authService  = new AuthService(); //object created

export default authService // object exported taaki directly obj se kuch bhi features use kar sake.
