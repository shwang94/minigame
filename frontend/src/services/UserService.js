import httpClient from "./http-client";

const GetUsers = async () => {
    try {
        const response = await httpClient.get('/users');
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

const GetUserById = async (id) => {
    try {
        const response = await httpClient.get('/users/${id}');
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export {
    GetUsers,
    GetUserById
};