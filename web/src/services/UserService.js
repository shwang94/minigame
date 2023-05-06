import httpClient from "./http-client";

const GetUsers = async () => {
    try {
        const responseData = await httpClient.get('/users');        
        return responseData.data;
    } catch (error) {
        console.log('error', error);
    }
}

const GetUserById = async (id) => {
    try {
        return await httpClient.get('/users/${id}');        
    } catch (error) {
        console.log('error', error);
    }
}

export {
    GetUsers,
    GetUserById
};