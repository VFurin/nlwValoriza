import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
 const authToken = request.headers.authorization;

 if (!authToken) {
   return response.status(401).end();
 }

 const [, token] = authToken.split(" ");

 try {
   const { sub } = verify(token, "75d07f2b1a60315cbe07829ef7d0fc70") as IPayload;

   request.user_id = sub;

   return next();
 } catch (err) {
   return response.status(401).end();
 }

}