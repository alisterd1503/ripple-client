import * as React from 'react';
import { Stack } from '@mui/system';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/AddBox';
import { getUsers } from '../../api/getUsers';
import { startChat } from '../../api/startChat';
import { startGroupChat } from '../../api/startGroupChat';
import { UserModel } from '../../models/UserModel';

export default function FindUsers() {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [value, setValue] = React.useState<UserModel[]>([]);
  const [title, setTitle] = React.useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        setAllUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleOnClick = () => {
    value.length > 1 ? startNewGroupChat(value, title) : startNewChat(value[0].userId, value[0].username)
  }

  const startNewChat = async (recipientUserId: number, recipientUsername: string) => {
    const body: UserModel = {
      username: recipientUsername,
      userId: recipientUserId
    };
    try {
      await startChat(body);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
    window.location.reload();
  };

  const startNewGroupChat = async (value: UserModel[], title: string) => {
    try {
      await startGroupChat(value, title);
    } catch (error) {
      console.error("Error starting group chat:", error);
    }
    window.location.reload();
  }

  return (
    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", width: '100%', paddingTop: 2}}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Autocomplete
          multiple
          id="tags-standard"
          options={allUsers}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          getOptionLabel={(option) => option.username}
          sx={style}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Username"
            />
          )}
        />

        <div>
          {(value.length > 0 && title)? (
            <Button
              sx={{
                width: '40px',
                height: '40px',
                minWidth: 'auto',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50%',
              }}
              onClick={handleOnClick}>
              <AddIcon fontSize="large" sx={{color: 'white'}} />
            </Button>
          ) : (
            <Button disabled
              sx={{
                width: '40px',
                height: '40px',
                minWidth: 'auto',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50%',
              }}
            >
              <AddIcon fontSize="large" />
            </Button>
          )}
        </div>
      </Stack>
      <TextField sx={Textstyle} required
        fullWidth
        id="title"
        placeholder="Add Group Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
      />
    </Stack>
  );
}

const style = {
  width: '100%',
  '& .MuiInputBase-root': {
    padding: 0,
    borderRadius: '8px',
    backgroundColor: '#272727',
    border: '1px solid #3C3D37',
    '&.Mui-focused': {
      borderColor: '#1d6d5b',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 16px',
    color: 'white',
    fontSize: '16px',
    marginLeft: 1,
    '::placeholder': {
      color: '#a0d7d1',
      opacity: 1,
    },
  },
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
  '& .MuiAutocomplete-paper': {
    backgroundColor: '#054640',
    color: 'white',
    borderRadius: '8px',
  },
  '& .MuiAutocomplete-option': {
    padding: '8px 16px',
    '&[aria-selected="true"]': {
      backgroundColor: '#1d6d5b',
    },
    '&:hover': {
      backgroundColor: '#065a4b',
    },
  },
};

const Textstyle = {
  width: '100%',
  '& .MuiInputBase-root': {
    padding: 0,
    borderRadius: '8px',
    backgroundColor: '#272727',
    border: '1px solid #3C3D37',
    '&.Mui-focused': {
      borderColor: '#1d6d5b',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    height: '15px',
    padding: '10px 16px',
    color: 'white',
    fontSize: '16px',
    '::placeholder': {
      color: '#a0d7d1',
      opacity: 1,
    },
  },
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
  '& .MuiAutocomplete-paper': {
    backgroundColor: '#054640',
    color: 'white',
    borderRadius: '8px',
  },
  '& .MuiAutocomplete-option': {
    padding: '8px 16px',
    '&[aria-selected="true"]': {
      backgroundColor: '#1d6d5b',
    },
    '&:hover': {
      backgroundColor: '#065a4b',
    },
  },
};