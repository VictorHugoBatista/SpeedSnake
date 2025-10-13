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
    <ul class="radio-buttons">
      {buttons.map((button) => (
        <li key={button.value}>
          <label class="radio-buttons-label">
            <input type="radio" name="difficulty" value={button.value}
            checked={selectedButton.toString() === button.value.toString()}
            onChange={(event) => onChangeInternal(event.target.value)} />
            <span class="radio-buttons-button">{button.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioButtons;
