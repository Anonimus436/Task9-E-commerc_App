const User = require("../models/User");
const cookieService = require("../utils/cookies");
const passwordService = require("../utils/passwordUtils");
const tokenService = require("../utils/generateToken");
const UrlToken = require("../models/Token");
const sendmail = require("../utils/sendEmail") ;

class AuthController {

    async handledFailedLogin(user){
     // add  + 1
     user.failedLoginAttempts = user.failedLoginAttempts + 1 ;

     // check from limit 
     if(user.failedLoginAttempts >= 5){
       user.isLocked = true ;
     
     // locked -> locked until (30 m)
     const MIN = (30 * 60 * 1000);
     user.lockedUntil = new Date(Date.now() + MIN)
     }
    
     // save updates
    await user.save();
    }
 

    async resetFailedLoginAttempts (user){
      user.failedLoginAttempts = 0 ;
      user.isLocked = false ;
      user.lockedUntil = null ;
      await user.save();
    }

    async register(req, res) {

            const { name, email, password } = req.body;

            const existEmail = await User.findOne({ email })

            if(existEmail) {
                return res.status(400).json({ message: "Your Email Already Exist" })
            }

            // Check From Strength Password 
            try {
                passwordService.validatePasswordStrength(password);
            } catch (error) {
                return res.status(400).json({ message: error.message })
            }

            const hashed = await passwordService.hashPassword(password);

            await User.create({ email, name, password: hashed });

            return res.status(200).json({ 
                message: "Signed Up Successfully"
            })
        
    }

   login = async (req, res) => {
        
            const { email, password } = req.body

            const existEmail = await User.findOne({ email })

            if(!existEmail) {
                return res.status(404).json({ message: "Failed Login" })
            }


            if(existEmail.isLocked){
                if( existEmail.lockedUntil <=  Date.now() ){
                    await this.resetFailedLoginAttempts(existEmail);
                } else{
                    return res.status(404).json({message : "sorry you are locked now"})
                }
            }

            // Check From Strength Password 
            try {
                passwordService.validatePasswordStrength(password);
            } catch (error) {
                return res.status(400).json({ message: error.message })
            }

            // Password Verifing
            const verifed = await passwordService.verifyPassword(password, existEmail.password);
             
            if(!verifed) {
                // handle failed login attempt (5)
                await this.handledFailedLogin(existEmail);
                return res.status(404).json({ message: "Failed Login" });
            }

            // reset after one success Login
           await this.resetFailedLoginAttempts(existEmail);

            // Generate tokens
            const accessToken = tokenService.genrateAccessToken({
                id: existEmail._id,
                email: existEmail.email,
                role: existEmail.role
            });
            
            const refreshToken = tokenService.genrateRefreshToken({
                id: existEmail._id,
                email: existEmail.email,
                role: existEmail.role
            })

            // Save on cookies
            cookieService.setAccessToken(res, accessToken);
            cookieService.setRefreshToken(res, refreshToken);

            return res.status(200).json({ message: "Logged in Successfully" })
        
    }

    async logout(req, res) {
       
            cookieService.clearTokens(res);

            return res.status(200).json({ message: "Logged Out Successfuly" });
        
    }

    async refreshToken(req, res) {
        
            const refreshToken = cookieService.getRefreshToken(req);
            // req.headers.authorization

            if(!refreshToken) {
                return res.status(401).json({ message: "Refresh Token Required" });
            }

            // verify to refresh token (age, valid)
            const decoded = tokenService.verifyRefreshToken(refreshToken);

            const tokenPayload = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            }

            // generate tokens (access, refresh)
            const accessToken = tokenService.genrateAccessToken(tokenPayload)
            const newRefreshToken = tokenService.genrateRefreshToken(tokenPayload);

            // store cookies
            cookieService.setAccessToken(res, accessToken)
            cookieService.setRefreshToken(res, newRefreshToken);

            return res.status(200).json({
                message: "Tokens Refreshed Successfully"
            })
        
    }

    async askToUpdatePassword(req, res) {
        const userId = req.user.id;
        const email = req.user.email;

        const token = (Math.random() * 1e9) + ("ABC");

        await UrlToken.create({ user: userId, token });
        /* await sendMessage({ 
            from: "", 
            to: email, 
            subject: "Update Password", 
            text: `This is the <a href=''>http://localhost:3000/api/v1/auth/verify/${token}</a>`
        }) */
        console.log(`http://localhost:3000/api/v1/auth/verify/${token}`);

        res.status(200).json({ success: true, message: "Sent email successfully" });
    }

    async verifyToUpdatePassword(req, res) {
        const token = req.params.token;

        // valid the token
        const isExist = await UrlToken.findOne({ token }); 
        // => to add limit time you can play on createdAt field

        if(!isExist) {
            throw new Error("Invalid Token");
        }

        // knowing the user who ask to update the password
        await User.findByIdAndUpdate(isExist.user, { isVerifiedToUpdate: true });

        res.status(200).json({ success: true, message: "Verifing Successfully" });
    }

    async updatePassword(req, res) {
        const { password } = req.body;
        const { id } = req.user;

        const isExist = await User.findOne({ _id: id, isVerifiedToUpdate: true });

        if(!isExist) {
            throw new Error("You Can Not Make this Action");
        }

        await User.findByIdAndUpdate(id, { 
            password: await passwordService.hashPassword(password),
            isVerifiedToUpdate: false
        });

        res.status(200).json({ success: true, message: "Updated Password Successfully" })
    }
  
}

module.exports = new AuthController();