import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class StorageService{

    client = new Client();
    storage;
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectID)
        this.storage = new Storage(this.client)
        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
    conf.databaseID,
    conf.collectionID,
    slug, //assuming that slud is our ID (in place of ID.unique())
    { title, content, featuredImage, status, userId }
);
        } catch (error) {
            console.log("error :: create post");
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){ 
        // why slug created like this? : to extract documentID from it(needed in updateDocument)
        // not take userId because we want this to not update
        try {
           return await this.databases.updateDocument(
    conf.databaseID,
    conf.collectionID,
    slug, // documentID here
      { title, content, featuredImage, status}
);
        } catch (error) {
            console.log("error :: update post");
        }
    }

    async deletePost(slug){ 
        // why slug created like this? : to extract documentID from it(needed in updateDocument)
    
        try {
            await this.databases.deleteDocument(
    conf.databaseID,
    conf.collectionID,
    slug, // documentID here
    )
    return true; // returns true if doc is deleted
        } catch (error) {
            console.log("error :: delete post");
            
        }
    }

    async getPost(slug){ 
        // why slug created like this? : to extract documentID from it(needed in updateDocument)
        try {
            return await this.databases.getDocument(
    conf.databaseID,
    conf.collectionID,
    slug, // documentID here
    )
        } catch (error) {
            console.log("error :: get post");
            return false;
        }
    }

    async listPosts(){ //getting only those posts whose status is active
        try {
            return await this.databases.listDocuments(
    conf.databaseID,
    conf.collectionID,
    [ Query.equal("status", "active") ] // name of index created in our database of appwr. is status and its value is active
    )
        } catch (error) {
            console.log("error :: list posts");
            return false;
        }
    }

    // upload file services :-

    async uploadFile(file){ 
        try {
            return await this.storage.createFile(
    conf.bucketID,
    ID.unique(),
    file
    )
        } catch (error) {
            console.log("error :: upload file");
            return false;
        }
    }

    async deleteFile(fileId){ 
        try {
            return await this.storage.deleteFile(
    conf.bucketID,
    fileId
    )
    return true;
        } catch (error) {
            console.log("error :: delete file");
            return false;
        }
    }

    getFileView(fileId){ // not async bcz its response is fast
        return  this.storage.getFilePreview(
    conf.bucketID,
    fileId
    )
    }

}

const service = new StorageService()

export default service