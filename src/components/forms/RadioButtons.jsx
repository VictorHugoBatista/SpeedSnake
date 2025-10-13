import { useState } from "react";

const RadioButtons = (props) => {
  const { buttons, onChange, value } = props;

  const [ selectedButton, setSelectedButton ] = useState(value);

  const onChangeInternal = (newValue) => {
    setSelectedButton(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ul>
      {buttons.map((button) => (
        <li key={button.value}>
          <label>
            <input type="radio" name="difficulty" value={button.value}
            checked={selectedButton.toString() === button.value.toString()}
            onChange={(event) => onChangeInternal(event.target.value)} />
            {button.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioButtons;
