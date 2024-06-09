import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.yourplatformName.projectName",
    projectId: "YOURID",
    databaseId: "YOURID",
    userCollectionId: "YOURID",
    videoCollectionId: "YOURID",
    storageId: "YOURID"
}

// docs : https://github.com/appwrite/sdk-for-react-native

// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export const createUser = async(email, password, username) => {    
    // Register User
   try {
        const newAcc = await account.create(
            ID.unique(), 
            email, password, username
        )  
        if(!account) throw Error;
        
        const avatarUrl = avatars.getInitials(username);
        
        await sign_In(email, password);
        const newUsr = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAcc.$id,
            email,
            username,
            avatar: avatarUrl
        })

        return newUsr;
        
   } catch (error) {
        console.log(error);
        throw new Error(error)
   }
}   

export const sign_In = async (email, password) => {
      try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
      } catch (error) {
        throw new Error(error)
      }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currUser){
            throw Error
        }
        return currUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}


export const getallPosts = async () => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId)

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPost = async (query) => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.search('title', query)])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserposts = async (userId) => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal('creator', userId)])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const lgout_user = async () => {
    try {
        const session = await account.deleteSession('current');
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileid, type) => {
    let fileUrl;
    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileid) 
        }
        else if(type==='image'){
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileid, 2000, 2000, 'top', 100);
        }
        else{
            throw new Error('Invalid file type')
        }

        if(!fileUrl){
            throw Error(error)
        }

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file, type) => {
    if(!file){
        return;
    }
    
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );
        const fileurl = await getFilePreview(uploadedFile.$id, type);
        return fileurl;

    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(), {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }

        )

        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}