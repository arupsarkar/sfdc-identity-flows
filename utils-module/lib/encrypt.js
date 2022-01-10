const crypto = require('crypto')
exports.encrypt = (token) => {

    const algorithm = "aes-256-cbc"
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16)
    // protected data
    const message = token
    // secret key generate 32 bytes of random data
    const security_key = crypto.randomBytes(32);

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, security_key, initVector);

    let encrypted_data = cipher.update(message, "utf-8", "hex");
    encrypted_data += cipher.final("hex");
    console.log("Encrypted message: " + encrypted_data);

    return encrypted_data
}
