import * as React from 'react';
import { borderRadius, Stack } from '@mui/system';
import { Autocomplete, Backdrop, Button, SvgIcon, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { getUsers } from '../../api/getUsers';
import { startChat } from '../../api/startChat';
import { startGroupChat } from '../../api/startGroupChat';
import { UserModel } from '../../models/UserModel';
import MakeNewGroup from '../GroupChatSettings/MakeNewGroup';

export default function FindUsers() {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [value, setValue] = React.useState<UserModel[]>([]);
  const [title, setTitle] = React.useState<string>('');

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


  const handleOnClick = () => {
    value.length > 1 ? setOpenBackdrop(true) : startNewChat(value[0].userId, value[0].username)
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
          {(value.length > 0) ? (
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
      <TextField sx={Textstyle} required
        fullWidth
        id="title"
        placeholder="Add Group Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
      />

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openBackdrop}
        onClick={handleClose}
      >
        <MakeNewGroup/>
      </Backdrop>
    </Stack>
    
  );
}

const style = {
  width: '100%',
  '& .MuiInputBase-root': {
    padding: 0,
    borderRadius: '20px',
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