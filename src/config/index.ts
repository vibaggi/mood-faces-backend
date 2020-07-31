




// NoSQL Credentials

export const NOSQL_URL: string = process.env.NOSQL_URL!;
export const NOSQL_DATABASE: string = process.env.NOSQL_DATABASE!;


// System variables

export const TOKEN_ACCESS_TIME_MINUTES: number = parseInt(process.env.TOKEN_ACCESS_TIME_MINUTES || '60')*1000*60

