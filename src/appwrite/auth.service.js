import conf from '../conf/conf.js'
import {Client, Account, ID} from 'appwrite'

export class AuthService {
    client = new Client()
    account;

    constructor () {
        this.client
            .setEndpoint(conf.APPWRITE_API_ENDPOINT)
            .setProject(conf.APPWRITE_PROJECT_ID)

        this.account = new Account(this.client)
    }

    async createAccount ({email, password, username}) {
        try {
            const userAccount = await this.account.create(ID.unique() ,username, email, password)
            if (userAccount) {
                // Login the user directly
                return this.login(email, password)
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async logout ({}) {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser ({}) {
        try {
            const currentUser = await this.account.get()
            if (currentUser) {
                return currentUser
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService  // Exported the object