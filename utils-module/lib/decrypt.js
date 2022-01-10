const crypto = require('crypto')
exports.decrypt = (token) => {

    const algorithm = "aes-256-cbc"
    const initVector = crypto.randomBytes(16)
    const security_key = crypto.randomBytes(32);

    // the decipher function
    const decipher = crypto.createDecipheriv(algorithm, security_key, initVector)

    let decrypted_data = decipher.update(token, "hex", "utf-8")

    decrypted_data += decipher.final("utf8")

    console.log("Decrypted message: " + decrypted_data)
    return decrypted_data

}
