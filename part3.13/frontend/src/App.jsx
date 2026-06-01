import { useState } from 'react'
import PersonalForm from './components/PersonalForm'
import List from './components/List'
import Filter from './components/Filter'
import { useEffect } from 'react'
import PersonsService from './services/PersonsServices'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Persons app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
    console.log('effect')
    PersonsService.getAll().then(initialPersons => {

      console.log(initialPersons)
      console.log(typeof initialPersons)
      console.log(Array.isArray(initialPersons))
      setPersons(initialPersons)
    })
  }, [])



  console.log('render', persons, 'persons')

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  const addPerson = (personObject) => {

    const existingPerson = persons.find(
      p => p.name === personObject.name
    )

    // SI YA EXISTE
    if (existingPerson) {

      const confirmUpdate = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {

        const updatedPerson = {
          ...existingPerson,
          number: personObject.number
        }

        PersonsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {

            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id
                  ? person
                  : returnedPerson
              )
            )

            setMessage({
              text: `Person ${returnedPerson.name} updated`,
              type: 'success'
            })

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {

            setMessage({
              text: `Person couldn't be updated`,
              type: 'error'
            })

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }

      return
    }

    // SI NO EXISTE
    PersonsService
      .create(personObject)
      .then(returnedPerson => {

        setPersons(persons.concat(returnedPerson))

        setMessage({
          text: `Person ${returnedPerson.name} added`,
          type: 'success'
        })

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)

        setMessage({
          text: `${error.response.data.error}`,
          type: 'error'
        })

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    PersonsService.remove(id)
      .then(() => {
        setPersons(prev =>
          prev.filter(p => p.id !== id)
        )

        setPersons(persons.filter(n => n.id !== id))

        setMessage({
          text: `Person deleted`,
          type: 'success'
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      }).catch(error => {

        setPersons(persons.filter(n => n.id !== id))

        setMessage({
          text: `Person ${persons.name} wasn't deleted`,
          type: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      })
  }

  const updatePerson = (id, updatedPersonMod) => {
    PersonsService
      .update(id, updatedPersonMod)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== id
              ? person
              : returnedPerson
          )
        )
      }).catch(error => {
        setMessage({
          text: `Person ${persons.name} wasn't updated`,
          type: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <h2>Numbers</h2>

      <PersonalForm
        addPerson={addPerson}
        updatePerson={updatePerson}
        persons={persons}
        setMessage={setMessage} />

      <List
        persons={personsToShow}
        deletePerson={deletePerson}
      />

      <Footer />

    </div>
  )
}

export default App