import { Response, Request, NextFunction } from 'express';

function test( req: Request, res: Response, next: NextFunction ) {
    res.status(200).send("OK")
}


export default {
    test
};

