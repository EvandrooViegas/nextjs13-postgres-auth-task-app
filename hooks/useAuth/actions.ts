"use server"

import { cookies } from "next/headers"

export const signOut = async () => {
    return new Promise((resolve, reject) => {
        try {
            const cookiesStore = cookies()
            cookiesStore.delete("profile-token")
            resolve(null)
        } catch (error) {   
            reject(null)
        }
    })
}

