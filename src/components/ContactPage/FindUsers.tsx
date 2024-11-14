import * as React from 'react';
import { Stack } from '@mui/system';
import { Autocomplete, Backdrop, Button, SvgIcon, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers } from '../../api/getUsers';
import { startChat } from '../../api/startChat';
import { UserModel } from '../../models/UserModel';
import MakeNewGroup from '../GroupChatSettings/MakeNewGroup';

export default function FindUsers() {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [users, setUsers] = React.useState<UserModel[]>([]);

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const handleClose = () => {
      setOpenBackdrop(false);
  };

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

  useEffect(() => {
    if (users.length <= 1) {
      handleClose()
    }
  }, [users]);


  const handleOnClick = () => {
    users.length > 1 ? setOpenBackdrop(true) : startNewChat(users[0].userId, users[0].username)
  }

  const startNewChat = async (recipientUserId: number, recipientUsername: string) => {
    const body: UserModel = {
      username: recipientUsername,
      userId: recipientUserId,
      avatar: ''
    };
    try {
      await startChat(body);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
    window.location.reload();
  };  

  const CustomAddIcon = (props: any) => (
    <SvgIcon {...props}>
      <path
        d="M12 4v16m8-8H4" 
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        fontSize={20}
      />
    </SvgIcon>
  );

  return (
    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", width: '100%'}}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Autocomplete
          multiple
          id="tags-standard"
          options={allUsers}
          value={users}
          onChange={(event, newValue) => setUsers(newValue)}
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
          {(users.length > 0) ? (
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
              <CustomAddIcon sx={{color: 'primary', borderRadius: '50%'}}/>
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
              <CustomAddIcon sx={{color: 'inherit', border: 'solid inherit 2px', borderRadius: '50%'}}/>
            </Button>
          )}
        </div>
      </Stack>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openBackdrop}
        onClick={handleClose}
      >
        <MakeNewGroup users={users} setUsers={setUsers} setOpenBackdrop={setOpenBackdrop}/>
      </Backdrop>
    </Stack>
    
  );
}

const style = {
  width: '100%',
  '& .MuiInputBase-root': {
    padding: 0,
    borderRadius: '20px',
    backgroundColor: 'primary',
    border: '1px solid white',
    '&.Mui-focused': {
      borderColor: 'primary',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 16px',
    color: 'primary',
    fontSize: '16px',
    marginLeft: 1,
    '::placeholder': {
      color: 'primary',
      opacity: 1,
    },
  },
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
  '& .MuiAutocomplete-paper': {
    backgroundColor: 'primary',
    color: 'primary',
    borderRadius: '8px',
  },
  '& .MuiAutocomplete-option': {
    padding: '8px 16px',
    '&[aria-selected="true"]': {
      backgroundColor: 'primary',
    },
    '&:hover': {
      backgroundColor: 'primary',
    },
  },
};