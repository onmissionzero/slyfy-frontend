import { useState, useEffect } from 'react';

const RadioButton = ({ onSelect, defaultValue }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
  
    useEffect(() => {
      setSelectedOption(defaultValue);
    }, [defaultValue]);
  
    const handleChange = (event) => {
      const value = event.target.value;
      setSelectedOption(value);
      onSelect(value);
    };

    const options = [
        {value: "long_term", label: "1 Year"},
        {value: "medium_term", label: "6 Months"},
        {value: "short_term", label: "1 Month"}
    ];
    
    return (
        <div className='font-palanquin font-light m-10 space-x-1'>
        {options.map(option => (
            <label key={option.value}
            className={`rounded-full px-3 py-1.5 hover:cursor-pointer
                ${selectedOption == option.value ? "bg-white text-black" : "bg-black text-white"}`}
            >
                <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleChange}
                className="hidden"
                />
                    {option.label}
            </label>
        ))}
        </div>
    );
};

export default RadioButton;
