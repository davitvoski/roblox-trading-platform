import express from "express";
import passport from "passport";

const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {

})

router.get('/login', (_: express.Request, res: express.Response) => {
    res.send('login')
})

router.get('/google', passport.authenticate('google'))

router.get('/oauth2/redirect',
    passport.authenticate('google',
        { failureRedirect: '/login', failureMessage: true }
    ), (req, res) => {
        res.redirect('/');
    }
)

export { router as authenticationRouter }
