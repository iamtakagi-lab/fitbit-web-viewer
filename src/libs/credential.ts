import fs from 'fs'
import path from 'path'
import env from './env'
import db from './db'

export default class Credential {

    accessToken: string = ""
    refreshToken: string = ""

    constructor() {

        let ref

        async() => {
            ref = await db.collection(env.FIREBASE_COLLECTION).get()
        }
        
        const data = ref.docs.find(doc => doc.id === env.FIREBASE_DOCUMENT_ID).data()

        const accessToken = data.accessToken
        const refreshToken= data.refreshToken

        if (
            accessToken == null ||
            refreshToken == null ||
            accessToken.length <= 0 ||
            refreshToken.length <= 0
        )
            return

        if (accessToken != null && refreshToken != null) {
            this.setAccessToken(accessToken)
            this.setRefreshToken(refreshToken)
        }
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }

    resetCredential() {
        this.accessToken = ""
        this.refreshToken = ""
    }

    async save() {
        const ref = await db.collection(env.FIREBASE_COLLECTION).get()
        const doc = ref.docs.find(doc => doc.id === env.FIREBASE_DOCUMENT_ID)
        doc.ref.set({
            "accessToken": this.accessToken,
            "refreshToken": this.refreshToken
        })
    }
}