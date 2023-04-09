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
}

const CInput: React.FC<Props> = ({
  placeholder,
  register,
  required,
  label,
}) => {
  // to do use of Input component from semantic-ui-react
  return (
    <input
      {...register(label, { required })}
      placeholder={placeholder}
      style={{
        borderRadius: "100px",
        padding: "16px",
        border: "1px solid gray",
        textAlign: "center",
      }}
    />
  );
};

export default CInput;
