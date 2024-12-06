import * as React from 'react';
import { Stack } from '@mui/system';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SettingsModel {
  id: number;
  setting: string;
}

export default function SearchSettings() {
  const [value, setValue] = React.useState<SettingsModel | null>(null);
  const settings: SettingsModel[] = [
    { id: 1, setting: 'Edit Username' },
    { id: 2, setting: 'Edit Bio' }
  ];

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
        options={settings}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        getOptionLabel={(option) => option.setting}
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
            color: '#ece5dd',
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
            color: '#ece5dd',
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
            placeholder="Search Settings"
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
    </Stack>
  );
}
