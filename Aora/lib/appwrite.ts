
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { User } from '../context/GlobalProvider';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kb.aora',
    projectId: '6680cff0003cb623a99d',
    databaseId: '6680d21f0017fd8082ec',
    userCollectionId: '6680dfaf000fe3bf743b',
    videoCollectionId: '6680dfef001db31f81a3',
    storageId: '6680e16000149f4ea373'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({email, password, username}: {email:any, password:any, username:any}) => {
    // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn({email: email, password: password});

        // create new instance of the user in the DB
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);

        let errorMessage = 'An unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        throw new Error(errorMessage);
    }
}

export const signIn = async ({ email, password }: { email: any; password: any }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        console.log(error);

        let errorMessage = 'An unknown error occurred';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        throw new Error(errorMessage);
    }
}

export const getCurrentUser = async (): Promise<User | undefined> => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return {
            id: currentUser.documents[0].$id,
            email: currentUser.documents[0].email,
            password: currentUser.documents[0].password,
            username: currentUser.documents[0].username,
            avatar: currentUser.documents[0].avatar
        };
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error;
    }
}

export const getLatestPosts = async () => {

    const queries = [
        Query.orderDesc('$createdAt'),
        Query.limit(7)
    ];

    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            queries
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error;
    }
}

export const searchPosts = async (query: any) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error;
    }
}

export const getUserPosts = async (userId: any) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error;
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')

        return session;
    } catch (error) {
        throw new Error
    }
}