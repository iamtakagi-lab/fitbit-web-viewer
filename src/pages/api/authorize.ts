import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../libs/auth";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import useCredential from "../../libs/useCredential";
import useFitbit from "../../libs/useFitbit";

export default () => auth(async (req: NextApiRequest, res: NextApiResponse) => {
        const credential = useCredential()
        await basicAuthMiddleware(req, res, {})
        if(credential.accessToken != null && credential.accessToken.length > 0 && credential.refreshToken != null && credential.refreshToken.length > 0) {
            return res.send("認証済みです")
        }
        const fitbit = useFitbit()
        res.redirect(fitbit.getAuthorizeUrl());
    }
)