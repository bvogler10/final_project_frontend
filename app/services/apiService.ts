import { cookies } from "next/headers";
import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url)

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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
    createPost: async function(url: string, data: any): Promise<any> {
        const token = await getAccessToken()
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
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