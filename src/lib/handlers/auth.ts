// import jwt from 'jsonwebtoken';
// import { Response, Request, NextFunction } from 'express';

// import { promisify } from 'util';


// export default async function auth (req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     const decoded = await promisify(jwt.verify)(token, `secret`);

//     req.userId = decoded.id;

//     return next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Token invalid' });
//   }
// };