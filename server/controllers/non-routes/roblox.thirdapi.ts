import fetch from 'node-fetch';
import { RobloxResponseGetUserByUsername } from '../../types';

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

    if (!resp.ok) return null

    const json = await resp.json() as RobloxResponseGetUserByUsername

    console.log(json)
    return json.data[0].id

}