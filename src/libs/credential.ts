import { TOKEN_EXPIRE_TIME } from '../constants'
import env from '../env'
import db from './db'
import doRefreshToken from './refreshToken'
import useFitbit from './useFitbit'

export default class Credential {

    accessToken: string = ""
    refreshToken: string = ""
    lastRefreshedAt: number = 0

    async load() {
        const ref = await db.collection(env.FIREBASE_COLLECTION_NAME).get()
        const data = ref.docs.find(doc => doc.id === env.FIREBASE_DOCUMENT_ID).data()
        const accessToken = data.accessToken
        const refreshToken = data.refreshToken
        const lastRefreshedAt = data.lastRefreshedAt

        if (accessToken != null && refreshToken != null) {
            this.setAccessToken(accessToken)
            this.setRefreshToken(refreshToken)
            this.setLastRefreshedAt(lastRefreshedAt)
        }

        //最後のトークンリフレッシュから1時間以上経過していたら更新する
        const expiry = Date.now() + TOKEN_EXPIRE_TIME * 1000
        if(expiry >= Date.now()) {
            doRefreshToken(useFitbit(), this)
        }
 
        return this
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }

    setLastRefreshedAt(lastRefreshedAt: number) {
        this.lastRefreshedAt = lastRefreshedAt
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
            "lastRefreshedAt": Date.now()
        })
    }
}