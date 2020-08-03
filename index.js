const express = require ('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({ extended: true }))


app.use('/api/', require('./routes/index'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function mongooseConnect() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        const PORT = config.get('port') || 5000
        app.listen(PORT, () => console.log(`Started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

mongooseConnect().then( () => console.log("Base is connected"))
