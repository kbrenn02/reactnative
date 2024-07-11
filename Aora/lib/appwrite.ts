
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
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
const storage = new Storage(client);

export const createUser = async ({ email, password, username }: { email: any, password: any, username: any }) => {
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
    
    const queries = [
        Query.orderDesc('$createdAt'),
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
            [Query.equal('creator', userId),
            Query.orderDesc('$createdAt')]
        )
        
        return posts.documents;
    } catch (error) {
        throw new Error;
    }
}

export const getFilePreview = async ( fileId: any, type: any ) => {
    let fileUrl;

    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                storageId, 
                fileId,
                // @ts-ignore: Ignore the type error for now
                2000, 2000, 'top', 100
            )
        } else {
            throw new Error('Invalid file type')
        }

        if(!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error
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

export const uploadFile = async (file: any, type: any) => {
    if(!file) return;

    const asset = { 
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl
    } catch (error) {
        throw new Error
    }
}

export const createVideo = async (form: any) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId, videoCollectionId, ID.unique(), {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error
    }
}