export type AuthMethod = {
    name: string;
    displayName: string;
    color: string;
    clientID: string;
    clientSecret?: string;
    authorizeURL?: string;
    accessTokenURL?: string;
    redirectURL?: string;
};
