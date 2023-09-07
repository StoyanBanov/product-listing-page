const host = 'https://parseapi.back4app.com/'
const appId = 'YOKOGsGOWDqEmsYrU9nT6jWeNVw0iCe9zaI2mKiu'
const apiKey = 'nlGgmVYoq2JzL5jTznHIdcA7so0EdTgj1mvuENKD'

async function request(method, url = '/', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey
        }
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(host + url, options)

        if (response.status === 204) {
            return response
        }

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message)
        }

        return result.results

    } catch (error) {
        alert(error.message)
        throw error
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')