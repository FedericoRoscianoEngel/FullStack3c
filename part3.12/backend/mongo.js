const mongoose = require('mongoose')

const password = process.argv[2];
const argumento2 = process.argv[3];
const argumento3 = process.argv[4];

if (!password) {
    console.log('Usage: node mongo.js <password>')
    process.exit(1)
}
mongoose.set('strictQuery', false)

const url =
    `mongodb+srv://federosciano_db_user:${password}@fullstack.7hauzbg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstack`

console.log('connecting to MongoDB...')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Persons', personSchema)

mongoose.connect(url)
    .then(async () => {

        if (argumento2 && argumento3) {

            const personAdd = new Person({
                name: argumento2,
                number: argumento3,
            })

            await personAdd.save()

            console.log(`added ${argumento2} number ${argumento3} to phonebook`)
        }

        const persons = await Person.find({})

        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        return mongoose.connection.close()

    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })