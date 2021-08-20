var User = require('./models/user');
var { recoverPersonalSignature } = require('eth-sig-util');
var { bufferToHex } = require('ethereumjs-util');
var fs = require('fs');

exports.signatureValid = async (req, res, next) => {
    console.log(req.body);
    const user = await User.findOne({address: req.body.address});
    const msg = `I am signing my one-time nonce: ${user.nonce}`;
    console.log(msg);

    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    try{
        const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: req.body.signature,
        });
        console.log(address);
        if (address === user.address){
            user.nonce = Math.floor(Math.random() * 1000000);
            await user.save();
            return next();
        }
        else{
            console.log("abcdcd")
            if (req.file){
                fs.unlink(req.file.path, (err) => {
                    if (err){
                        console.log("ajsd", err);
                    }
                })
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'Verification Failed!'});    
            }
            else{
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'Verification Failed!'});    
            }
        }
    }
    catch(e){
        console.log(e);
        console.log("xyzyzyz")
        if (req.file){
            fs.unlink(req.file.path, (err) => {
                if (err){
                    console.log("aaajsd", err);
                }
            })
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'Verification Failed!'});
        }
        else{
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'Verification Failed!'});
        }
    }
}