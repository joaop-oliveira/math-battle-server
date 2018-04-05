import * as SHA256 from 'crypto-js/sha256';
// get the pwd make the hash put it on the token compare with the database


// export const sessionTokens = {};
export const sessionTokens = {};

export const tokenCache = () => ({
    addToken(email) {
        const hashedEmail = SHA256(email + 'mathsecret');
        const stringHashedEmail = hashedEmail.toString();
        sessionTokens[stringHashedEmail] = email
    },
    removeToken(email, res) {
        console.log(sessionTokens);
        const hashedEmail = SHA256(email + 'mathsecret');
        const stringHashedEmail = hashedEmail.toString();
        delete sessionTokens[stringHashedEmail];
        console.log(sessionTokens);
        res.status(200).json({message: "User Logged Out"});
    },
    authToken(email, res, headerToken) {
        const hashedEmail = SHA256(email + 'mathsecret');
        const stringHashedEmail = hashedEmail.toString();
        if (stringHashedEmail in sessionTokens) {
            res.set('X-Auth', headerToken);
            res.send({authed: true});
        } else {
            res.status(404).json({message: "unsauthorized"});
        }
    }
});

