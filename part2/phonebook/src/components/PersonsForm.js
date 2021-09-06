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
        phone: <input type="tel" value={phone} onChange={onPhoneChange} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonsForm;
