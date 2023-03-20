const { Router } = require("express")

const authController = require('../controllers/authController')

const router = Router()

router.get("/signup", authController.signup_get)

router.post("/signup", authController.signup_post)

router.get("/login", authController.login_get)

router.post("/login", authController.login_post)

//Just for funny haha
router.get('/getAll', authController.get_all)

router.delete('/delete/:id', authController.delete)


module.exports = router;