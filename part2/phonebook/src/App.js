import axios from "axios";
import React, { useEffect, useState } from "react";

const Filter = ({ value, onChange }) => {
  return (
    <>
      <div>
        filter shown with <input value={value} onChange={onChange} />
      </div>
    </>
  );
};

const PersonsForm = ({
  name,
  onNameChange,
  phone,
  onPhoneChange,
  onSubmit,
}) => {
  console.log("renderingn....", name);
  return (
    <form>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        phone: <input value={phone} onChange={onPhoneChange} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchText, setSearchText] = useState("");

  const hookPersons = () => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      setPersons(resp.data);
    });
  };

  useEffect(hookPersons, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addNew = (event) => {
    event.preventDefault();
    const found = persons.find((p) => p.name === newName);
    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewPhone("");
      return;
    }

    const userObject = {
      name: newName,
      number: newPhone,
    };
    setPersons(persons.concat(userObject));
    setNewName("");
    setNewPhone("");
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onPhoneChange = (event) => setNewPhone(event.target.value);

  const onSearchTextChange = (event) => setSearchText(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
