import { useState } from "react";

const RadioButtons = (props) => {
  const { buttons, onChange } = props;
  const [ buttonFirst ] = buttons;

  const [ selectedButton, setSelectedButton ] = useState(buttonFirst.value);

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
            checked={selectedButton === button.value}
            onChange={(event) => onChangeInternal(event.target.value)} />
            {button.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioButtons;
