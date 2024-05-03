
export class StorageAdapter {
    static getItem(key: string) {
        try {
            const token =  localStorage.getItem(key)
            return token
        } catch (error) {
            console.log(error)
            return null
        }

    }
    static setItem(key : string, token: string) {
        try {
         localStorage.setItem(key, token)
        } catch (error) {
            console.log(error)
        }
    }
    static removeItem(key : string) {
        try {
            localStorage.removeItem(key)            
        } catch (error) {
            console.log(error)
        }
    }
}