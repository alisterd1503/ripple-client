import { Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

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
                backgroundColor: '#054640',
                padding: '10px',
            }}
        >
            <Button
                sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '50%',
                }}
                //onClick={}
            >
                <AddIcon fontSize="medium" sx={{ color: 'white' }} />
            </Button>

            <TextField
                sx={{
                    width: "100%",
                    '& .MuiInputBase-root': {
                        padding: 0,
                        borderRadius: '20px',
                        backgroundColor: '#06625f',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '20px',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 16px',
                        color: 'white'
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
                    backgroundColor: '#25d366',
                    borderRadius: '50%',
                }}
                onClick={handleSend}
            >
                <SendIcon fontSize="medium" sx={{ color: 'black' }} />
            </Button>
        </Stack>
    )
}