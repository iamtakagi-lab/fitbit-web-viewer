import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../libs/auth";
import useCredential from "../../libs/useCredential";
import useFitbit from "../../libs/useFitbit";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import env from "../../env";

export default auth(async (req: NextApiRequest, res: NextApiResponse) => {
    await basicAuthMiddleware(req, res);

    const { code } = req.query

    if (!code || typeof code !== 'string') return

    const credential = await useCredential()
    const fitbit = useFitbit()

    fitbit.getAccessToken(code).then((result: { access_token: string, refresh_token: string }) => {
        Promise.all([
            credential.setAccessToken(result.access_token),
            credential.setRefreshToken(result.refresh_token),
            credential.save(),
        ]).then(() => {
            res.status(301)
            res.redirect(`${env.BASE_URL}/authorize`)
        })
    }).catch((err: any) => {
        res.send("error")
    });
})
