import * as React from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import authModel from '../models/auth';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Style for list
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Users({setOwnersName, owners}) {
  const theme = useTheme();
  const [names, setNames] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);


  // handle when user clicked
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    handleUsers(value)
  };


  // handle all users
  const handleUsers = (value) => {
    setPersonName(
        typeof value === 'string' ? value.split(',') : value,
      );
    setOwnersName(
        typeof value === 'string' ? value.split(',') : value,
      );
    }


  // fetch all users
  async function fetchUsers() {
    const result = await authModel.getUserGraphql();
    const arr = []

    result.map((users, index) => 
        arr.push(users['email'])
    )

    setNames(arr);

  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
      }
    )();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (owners !== "") {
        handleUsers(owners)
    } else {
        setPersonName([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owners]);

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Ägare</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}