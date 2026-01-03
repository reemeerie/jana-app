import "../styles/InputField.css"

export const InputField = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <>
    <div className="input-field">
      <i className={icon}></i>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
      />
    </div>
    {touched && error && <p className="error">{error}</p>}
  </>
)
