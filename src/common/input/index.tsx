import React from "react";

interface Props {
  placeholder: string;
  register: any;
  required: boolean;
  size: "mini" | "small" | "medium" | "large" | "big" | "huge" | "massive";
  fluid: boolean;
  inverted?: boolean;
  transparent?: boolean;
  action?: {
    color:
      | "red"
      | "orange"
      | "yellow"
      | "olive"
      | "green"
      | "teal"
      | "blue"
      | "violet"
      | "purple"
      | "pink"
      | "brown"
      | "grey"
      | "black";
    content: string;
    icon: string;
    labelPosition: "left" | "right";
    loading: boolean;
    onClick: () => void;
  };
  icon?: string;
  error: boolean;
  disabled?: boolean;
  loading: boolean;
  focus?: boolean;
  iconPosition?: "left" | "right";
  label: string;
  type?: "text" | "number"; // Added type property
  maxLength?: number; // Added maxLength property
  minLength?: number; // Added minLength property
}

const CInput: React.FC<Props> = ({
  placeholder,
  register,
  required,
  label,
  type = "text", // Set default value for type
  maxLength, // Received maxLength property
  minLength, // Received minLength property
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);

      // Allow numeric values or empty input
      if (keyValue !== "" && !/^[0-9]+$/.test(keyValue)) {
        event.preventDefault();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    // Trim the input value if it exceeds maxLength
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    // Convert input value to number if possible (only for type "number")
    const parsedValue = type === "number" ? /^\d+$/.test(inputValue) ? parseInt(inputValue) : inputValue : inputValue;

    // Do something with the parsed value, like updating state or calling a callback
    console.log(parsedValue);
  };

  return (
    <input
      {...register(label, { required })}
      type={type} // Set the type attribute
      placeholder={placeholder}
      style={{
        borderRadius: "100px",
        padding: "16px",
        border: "1px solid gray",
        textAlign: "center",
      }}
      onKeyPress={handleKeyPress}
      onChange={handleInputChange}
      maxLength={maxLength} // Set the maxLength attribute
      minLength={minLength} // Set the minLength attribute
    />
  );
};

export default CInput;