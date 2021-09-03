import { NextApiRequest, NextApiResponse } from "next";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export default (handler: Handler): Handler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await basicAuthMiddleware(req, res, {});
        if (res.statusCode != 401) {
            await handler(req, res);
        }
    };
}