// TDE 9 - BackEnd

app.use('/v1', router) //prefixo

app.post('/login', async (req, res) => { 
    const {email, password} = req.body 
    const user = await prisma.users.findFirst({
        where: {
            email,
            password
        }
    }) //busca o usuário
    if (user) {
        res.json({message: 'Login successful'}) 
    } else {
        res.status(401).json({message: 'Invalid email or password'}) //email ou senha inválidos
    }
}) //post que faz o login com async await 


app.post('/register', async (req, res) => {
    const {email, password} = req.body
    const userAlreadyExists = await prisma.users.findFirst({
        where: {
            email
        }
    }) //busca o usuário
    if (userAlreadyExists) {
        res.status(409).json({message: 'Email already exists'}) //email ja existe
    } else { //cria o usuário
        const user = await prisma.users.create({
            data: {
                email,
                password
            }
        })
        res.json({message: 'User created successfully'}) 
    }
}) //post que faz o registro com async await


