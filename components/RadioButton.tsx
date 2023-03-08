import React from 'react';

function RadioButton({
  label,
  selected,
  radioGroup,
  onSelect,
}: {
  label: string;
  selected: string;
  radioGroup: string;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className='flex' htmlFor={label}>
      <input
        type='radio'
        value={label}
        onChange={onSelect}
        checked={label === selected}
        className='mx-1'
        name={radioGroup}
        id={label}
      />

      {label}
    </label>
  );
}

export default RadioButton;
