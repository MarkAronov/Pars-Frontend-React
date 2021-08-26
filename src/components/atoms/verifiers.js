import zxcvbn from 'zxcvbn';

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
    let result = {passed: true, errorlist: []}
    /* Will add my leetcode submission later on 
     * ref: https://leetcode.com/problems/strong-password-checker/
    */
    if (password.length < 8){
        result.passed = false 
        result.errorlist.push("Your password is short.")
    }
    if (!password.match(/[A-Z]/)){
        result.passed = false 
        result.errorlist.push("Your password needs at least one uppercase.")
    }
    if (!password.match(/[a-z]/)){
        result.passed = false 
        result.errorlist.push("Your password needs at least one lowercase.")
    }
    if (!password.match(/[0-9]/)){
        result.passed = false 
        result.errorlist.push("Your password needs at least one number.")
    }
    for(let i = 0; i < password.length - 1; i++){
        if(password[i] === password[i+1]){
            result.passed = false 
            result.errorlist.push("Your password has repeating characters.")
            break
        }
    }
    if(zxcvbn(password) >= 4){
        result.passed = false 
        result.errorlist.push("Your password is weak. Try adding unique characters.")
    }
    return result
}

export const usernameVerifier = (username) => {
    const regex = /[^A-Za-z0-9]/
    return (username.match(regex))? true : false
}