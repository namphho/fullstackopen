import React, { useEffect, useState } from "react";
import PhoneService from "./services/phones";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notiBundle, setNotifiBundle] = useState({msg: null, isError: null});

  const hookPersons = () => {
    PhoneService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  };

  useEffect(hookPersons, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onPhoneChange = (event) => setNewPhone(event.target.value);

  const onSearchTextChange = (event) => setSearchText(event.target.value);

  const addNew = (event) => {
    event.preventDefault();
    const found = persons.find((p) => p.name === newName);
    if (found !== undefined) {
      if (found.number === newPhone) {
        alert(`${newName} is already added to phonebook`);
      } else {
        console.log("replace phone number");
        replaceNumberForExistingPerson(found);
      }
      setNewName("");
      setNewPhone("");
      return;
    }

    const userObject = {
      name: newName,
      number: newPhone,
    };
    PhoneService.create(userObject).then((newPerson) => {
      showNotificationMsg(`Added ${newPerson.name}`, false);
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhone("");
    });
  };

  const replaceNumberForExistingPerson = (person) => {
    const msg = `${person.name} is already added to phonebook, replace the old number with a new one?`;

    const result = window.confirm(msg);
    if (result) {
      const changedPerson = { ...person, number: newPhone };
      PhoneService.update(person.id, changedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === person.id ? returnedPerson : p))
        );
      });
    }
  };

  const deletePersonById = (id) => {
    const person = persons.filter((p) => p.id === id);
    const msg = `delete ${person[0].name}`;

    const result = window.confirm(msg);
    if (result) {
      PhoneService.deletePerson(id).then((resp) => {
        persons.splice(
          persons.findIndex((p) => p.id === id),
          1
        );
        setPersons([...persons]);
      }).catch(error => {
        showNotificationMsg(`Information of ${person[0].name} has already been removed from server`, true);
        persons.splice(
          persons.findIndex((p) => p.id === id),
          1
        );
        setPersons([...persons]);
      });
    }
  };

  const showNotificationMsg = (msg, isError) => {
    setNotifiBundle({msg, isError});
    setTimeout(() => {
      setNotifiBundle({ msg: null, isError: null });
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notiBundle.msg}
        isError={notiBundle.isError}
      />
      <Filter value={searchText} onChange={onSearchTextChange} />
      <h2>Add New</h2>
      <PersonsForm
        name={newName}
        onNameChange={onNameChange}
        phone={newPhone}
        onPhoneChange={onPhoneChange}
        onSubmit={addNew}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={(id) => deletePersonById(id)}
      />
    </div>
  );
};

export default App;
