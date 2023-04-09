import React from "react";
import { Dropdown } from "semantic-ui-react";

interface Props {
  placeholder: string;
  fluid: boolean;
  search: boolean;
  selection: boolean;
  options: any;
  onChange?: (event: React.SyntheticEvent<HTMLElement>, data: any) => void;
}

const DropDown: React.FC<Props> = ({
  placeholder,
  fluid,
  search,
  selection,
  options,
  onChange,
}) => {
  return (
    <Dropdown
      placeholder={placeholder}
      fluid={fluid}
      search={search}
      selection={selection}
      options={options}
      className="drop-down"
      onChange={onChange}
    />
  );
};

export default DropDown;
