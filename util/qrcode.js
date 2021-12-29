const QRCode = require('qrcode')

/**
 * Generates a QR code for the given url or text
 * @param url
 * @returns a base64 encoded image
 */
const generateQRCode = (url) => {
    // Returns a promise
    return QRCode.toDataURL(url)
}

module.exports = generateQRCode