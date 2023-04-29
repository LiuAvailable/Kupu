const jwt = require('jsonwebtoken');

const userService = require('../../services/users/usersService')

const login = (async (req, res) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    const userCredentials = check(req.body)
    if(userCredentials.valid){
        try{
            const id = req.body.user;
            if(validateId(id)){
                const user =  await userService.getUser(decodeURIComponent(req.body.user), decodeURIComponent(req.body.password))
                if(user) {
                    if(!user.error){
                        const token = jwt.sign(user, 'secret-key', { expiresIn: '1h' });
                        res.status(200).send({token})
                    } else res.status(422).send({data:'Invalid password'})
                } else res.status(404).send({data:'User does not exist'})
            } else res.status(422).send({data:'User id is not valid'})
        } catch(e){
            console.log(e)
            res.status(500).send({data:'server error'})
        }
        
    } else res.status(422).send({data:userCredentials.message})
});

const check = (userParam) => {
    let valid = false;
    let message = '';
    if(userParam){
        if(userParam.user != ''){
            if(userParam.password != ''){
                valid = true;
            } else message = 'Password is null'
        } else message = 'User is null'
    } else message = 'Nothing was recived';

    return {valid, message}
}

const validateId = (id) => {
    const tagRegex = /^#[a-zA-Z0-9]{6,19}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = false;
    if(tagRegex.test(id) || emailRegex.test(id)){
        valid = true;
    }
    
    return valid;
}

module.exports = { login };