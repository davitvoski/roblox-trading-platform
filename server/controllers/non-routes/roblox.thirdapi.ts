import fetch from 'node-fetch';
import { RobloxResponseGetUserByUsername, RobloxUser } from '../../types';

/**
 * This function gets the user id from a username using the Roblox API.
 * @param username username to get user id from
 * @returns {Number}
 */
export async function getUserByUsername(username: string) {
    if (!username) throw new Error('No username provided!')
    const resp = await fetch('https://users.roblox.com/v1/usernames/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userNames: [username],
            excludeBannedUsers: true
        })
    })

    const json = await resp.json() as RobloxResponseGetUserByUsername

    if (json.data.length < 1) return null

    return json.data[0].id
}

/**
 * Thsi function gets the user description from a Roblox user ID.
 * @param robloxId Roblox user ID
 * @returns {String} description of the user
 */
export async function getRobloxUserDescription(robloxId: number) {
    const user = await getRobloxUserByID(robloxId)
    return user.description
}

/**
 * This function gets a Roblox user by their ID.
 * @param robloxId Roblox user ID
 * @returns {RobloxUser} roblox user
 */
export async function getRobloxUserByID(robloxId: number) {
    const resp = await fetch(`https://users.roblox.com/v1/users/${robloxId}`)
    if (resp.status === 404) throw new Error("User not found")

    const user = await resp.json() as RobloxUser
    return user
}