import bcrypt from 'bcrypt'

const saltRounds = 10
/**
 * This method generate a hash for a password.
 * 
 * @param {string} password : password to be hashed
 * @returns {[string,string]} : salt for hashing and hash of password
 */
export function generateHash(password: string): [salt: string, hash: string] {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    return [salt, hash]
}