import { useState } from 'react'

const PersonalForm = ({ addPerson, persons, updatePerson, setMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const addName = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(
            person => person.name === newName
        )

        if (existingPerson) {

            if (existingPerson.number === newNumber) {
                /*alert(`${newName} ya existe en la lista`)
                return*/
                setMessage({
                    text: `Person ${existingPerson.name} exist in the server`,
                    type: 'error'
                })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                return

            }

            // Nombre igual pero número distinto
            const confirmUpdate = window.confirm(
                `${newName} ya existe. ¿Desea reemplazar el número antiguo por ${newNumber}?`
            )

            if (confirmUpdate) {
                const updatedPersonMod = {
                    ...existingPerson,
                    number: newNumber
                }
                updatePerson(existingPerson.id, updatedPersonMod)

                setMessage({
                    text: `Person ${existingPerson.name} updated`,
                    type: 'success'
                })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                return
            }




        } else {

            const personObject = {
                name: newName,
                number: newNumber,
                important: Math.random() < 0.5,
            }

            addPerson(personObject)
            setNewName('')
            setNewNumber('')

            setMessage({
                text: `Person ${existingPerson.name} added`,
                type: 'success'
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return

        }

    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return <form onSubmit={addName}>
        <div>
            name:
            <input
                value={newName}
                onChange={handleNameChange}
            />
        </div>
        <div>
            Telephone:
            <input
                value={newNumber}
                onChange={handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>

            <div>debug: {newName}</div>
        </div>
    </form>


}

export default PersonalForm
