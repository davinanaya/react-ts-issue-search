import React, { ChangeEvent, KeyboardEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

interface IPropsInput {
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputSearch = ({ placeholder, onChange, onKeyDown }: IPropsInput): JSX.Element => {
    return (
        <InputGroup className="mb-3">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Filters"
                id="input-group-dropdown-1"
            >
                <Dropdown.Item href="#">Open issues</Dropdown.Item>
            </DropdownButton>
            <FormControl
                aria-describedby="basic-addon1"
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </InputGroup>
    );
};

export { InputSearch };
