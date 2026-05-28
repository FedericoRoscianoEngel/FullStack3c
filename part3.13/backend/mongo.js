const mongoose = require('mongoose')

const password = process.argv[2];

if (!password) {
    console.log('Usage: node mongo.js <password>')
    process.exit(1)
}
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)



personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



/*mongoose.connect(url)
    .then(() => {

        app.post('/api/notes', (request, response) => {
            const body = request.body

            if (body.content === undefined) {
                return response.status(400).json({ error: 'content missing' })
            }

            const note = new Note({
                content: body.content,
                important: body.important || false,
            })

            note.save().then(savedNote => {
                response.json(savedNote)
            })
        })

        return mongoose.connection.close()

    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })*/