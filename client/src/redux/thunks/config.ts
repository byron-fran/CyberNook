const token = localStorage.getItem('token')

export const configHeaders = () => {
    return {
        withCredentials: true,
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
}