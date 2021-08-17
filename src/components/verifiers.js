

export const emailVerifier = (email) => {
    const regex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/
    if(email.match(regex)){
        const [username, domain] = email.split('@')
        if(username.length <= 64 && domain.length <= 255){
            return true
        }
    }
    return false
}

export const passwordVerifier = (password) => {
    return false
}

export const usernameVerifier = (username) => {
    return false
}