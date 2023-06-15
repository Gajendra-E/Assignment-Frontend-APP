import { BACK_END_POINT } from "../helpers/Constants";

function parseResponse(response) {
    return response.json().then((json) => {
        // console.log(JSON.stringify(json))
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    });
}

const api = {
    //get url access
    async get(url) {
        return fetch(`${BACK_END_POINT}${url}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then(parseResponse);


    },

    //post url access
    async post(url, data) {
        const body = JSON.stringify(data);
        return fetch(`${BACK_END_POINT}${url}`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body,
        })
            .then(parseResponse)
    },

   
}
export default api;