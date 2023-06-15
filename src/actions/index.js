import api from '../api';

export async function fetchAllUsers() {
    let response = await api.get('users')
    if (response.status === "success") {
        return response.payload
    }
}

export async function createUser(item) {
    let response = await api.post('users', item)
    if (response.status === "Success") {
        return response
    }
    else {
        alert(response.status)
    }
}
