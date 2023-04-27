
const login = async (req, res) => {
    
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    console.log('AAAA')
    res.status(200).send('OK')
}

module.exports = { login };