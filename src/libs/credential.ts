import fs from 'fs'
import path from 'path'
import env from '../env'
import db from './db'
import doRefreshToken from '../libs/refreshToken'
import Fitbit from '../components/fitbit'
import useFitbit from './useFitbit'
import { TOKEN_EXPIRE_TIME } from '../constants'

export default class Credential {

    accessToken: string = ""
    refreshToken: string = ""
    lastRefreshAt: number = 0

    async load() {
        const ref = await db.collection(env.FIREBASE_COLLECTION_NAME).get()
        const data = ref.docs.find(doc => doc.id === env.FIREBASE_DOCUMENT_ID).data()
        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
        const lastRefreshAt = data.lastRefreshAt

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
            this.setLastRefreshAt(lastRefreshAt)
        }

        //最後のトークンリフレッシュから1時間以上経過していたら更新する
        /*
        const expiry = Date.now() + TOKEN_EXPIRE_TIME * 3600
        if(expiry >= Date.now()) {
            doRefreshToken(useFitbit(), this)
        }*/
 
        return this
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }

    setLastRefreshAt(lastRefreshAt: number) {
        this.lastRefreshAt = lastRefreshAt
    }

    resetCredential() {
        this.accessToken = ""
        this.refreshToken = ""
    }

    async save() {
        const ref = await db.collection(env.FIREBASE_COLLECTION_NAME).get()
        const doc = ref.docs.find(doc => doc.id === env.FIREBASE_DOCUMENT_ID)
        await doc.ref.set({
            "accessToken": this.accessToken,
            "refreshToken": this.refreshToken,
            "lastRefreshAt": Date.now()
        })
    }
}