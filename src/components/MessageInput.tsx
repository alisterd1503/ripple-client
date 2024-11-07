import { Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

interface MessagesInputProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
}

export default function MessagesInput({ input, setInput, handleSend }: MessagesInputProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#0077b6',
                padding: '10px',
            }}
        >
            <TextField
                sx={{
                    width: "100%",
                    '& .MuiInputBase-root': {
                        padding: 0,
                        borderRadius: '20px',
                        backgroundColor: '#90e0ef',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '20px',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 16px',
                        color: 'black'
                    },
                }}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={input}
                onChange={handleChange}
            />
            <Button
                sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#0077b6',
                    borderRadius: '50%',
                }}
                onClick={handleSend}
            >
                <SendIcon fontSize="medium" sx={{ color: '#03045e' }} />
            </Button>
        </Stack>
    )
}