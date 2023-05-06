import httpClient from "./http-client";

const GetDiceHistories = async () => {
    try {
        return await httpClient.get('/dice-histories');

    } catch (error) {
        console.log('error', error);
    }
}

export {
    GetDiceHistories
};