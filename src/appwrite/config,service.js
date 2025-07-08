import conf from '../conf/conf.js'
import {Client, Databases, ID, Storage, Query} from 'appwrite'

export class Services {
    client = new Client()
    database
    bucket

    constructor () {
        this.client
            .setEndpoint(conf.APPWRITE_API_ENDPOINT)
            .setProject(conf.APPWRITE_PROJECT_ID)

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost ({title, content, featuredImage, status, userId}) {
        try {
            return await this.database.createDocument(
                conf.APPWRITE_DATABASE_ID, 
                conf.APPWRITE_COLLECTION_ID, 
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost (docId, {title, content, featuredImage, status}) {
        try {
            return await this.database.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                docId,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost (docId) {
        try {
            await this.database.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                docId
            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getSingletPost (docId) {
        try {
            return await this.database.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                docId
            )
        } catch (error) {
            throw error
        }
    }

    async getMultiplePosts (queries = [Query.equal("status", "active")]) {   // Queries can only be made on Indexes
        try {
            return await this.database.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    // file Services

    async uploadFile (file) {   // Blob format
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile (fileId) {
        try {
            return this.bucket.deleteFile(
                conf.APPWRITE_BUCKET_ID,
                fileId
            )
        } catch (error) {
            throw error
        }
    }

    async getFilePreview (fileId) {
        try {
            await this.bucket.getFilePreview(
                conf.APPWRITE_BUCKET_ID,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
} 

const service = new Services()
export default service