import { getAccessToken } from "../lib/actions";

/* eslint-disable @typescript-eslint/no-explicit-any */
const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url)
        const token = await getAccessToken()
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    },
    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    },
    follow: async function(url: string): Promise<any> {
        const token = await getAccessToken()
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    },
    createPost: async function(url: string, data: any): Promise<any> {
        const token = await getAccessToken()
        console.log(token, data)
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    },
    put: async function(url: string, data: any): Promise<any> {
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    },
    delete: async function(url: string): Promise<any> {
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            }) 
            .catch((error) => {
                reject(error);
            })
        })
    }
}

export default apiService;