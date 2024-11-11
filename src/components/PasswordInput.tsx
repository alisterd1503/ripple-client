import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordInputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    password: string,
    label: string
    marginBottom?: string | number,
}

export default function PasswordInput({onChange, password, label, marginBottom}: PasswordInputProps){
    const [seePassword, setSeePassword] = useState(false) 
    return(
        <TextField
            required
            fullWidth
            id="password"
            label={label}
            type={seePassword ? "text" : "password"}
            value={password}
            onChange={onChange}
            variant="outlined"
            sx={{marginBottom: marginBottom}}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    disableRipple
                    onClick={() => setSeePassword(!seePassword)}
                    edge="end"
                    sx={{
                        '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.7,
                        },
                    }}
                    >
                    {seePassword ? <VisibilityIcon sx={{height: '20px', width: '20px', marginRight: '10px'}}/> : <VisibilityOffIcon sx={{height: '20px', width: '20px', marginRight: '10px'}}/>}
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
    )

}