import * as React from 'react';
import { Stack } from '@mui/system';
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { startChat } from '../api/startChat';
import { getUsers } from '../api/getUsers';
import { UserModel } from '../models/UserModel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

export default function FindUsers() {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [value, setValue] = React.useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        setAllUsers(result);
        console.log(result)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

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

  return (
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
        disablePortal
        options={allUsers}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        getOptionLabel={(option) => option.username}
        sx={{
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
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Username"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ opacity: 0.3, marginLeft: 1, marginRight: -1 }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />


      <div>
        {value ? (
          <Button
            sx={{
              width: '40px',
              height: '40px',
              minWidth: 'auto',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
            }}
            onClick={() => startNewChat(value.userId, value.username)}>
            <PersonAddIcon fontSize="medium" sx={{color: 'white'}} />
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
            <PersonAddIcon fontSize="medium" />
          </Button>
        )}
      </div>
    </Stack>
  );
}
