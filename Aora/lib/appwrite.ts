
import { Account, Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kb.aora',
    projectId: '6680cff0003cb623a99d',
    databaseId: '6680d21f0017fd8082ec',
    userCollectionId: '6680dfaf000fe3bf743b',
    videoCollectionId: '6680dfef001db31f81a3',
    storageId: '6680e16000149f4ea373'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser = () => {
    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response: any) {
        console.log(response);
    }, function (error: any) {
        console.log(error);
    });
}


