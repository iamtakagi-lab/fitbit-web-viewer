import { TOKEN_EXPIRE_TIME } from "../constants"
import Credential from "./credential"
import Fitbit from "./fitbit"

const doRefreshToken = (fitbit: Fitbit, credential: Credential) => {

    if (
        credential.accessToken == null ||
        credential.refreshToken == null ||
        credential.accessToken.length <= 0 ||
        credential.refreshToken.length <= 0
    ) return

    fitbit.refreshAccessToken(credential.accessToken, credential.refreshToken, TOKEN_EXPIRE_TIME)
        .then((token: any) => {
            credential.setAccessToken(token.access_token)
            credential.setRefreshToken(token.refresh_token)
            credential.save()
            console.log("リフレッシュトークン処理が完了しました");
        })
        .catch((err: any) => {
            console.log(err);
        })
}

export default doRefreshToken