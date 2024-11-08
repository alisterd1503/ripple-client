import React, { useRef } from 'react';
import { Button, Stack, Typography } from "@mui/material";

interface CenteredButtonProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    text: string;
    red?: boolean;
    fileInput?: boolean;
    onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CenteredButton({
    onClick,
    icon,
    text,
    red,
    fileInput = false,
    onFileChange
}: CenteredButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput && inputRef.current) {
            // If it's a file input button, open the file dialog
            inputRef.current.click();
        } else if (onClick) {
            // Otherwise, trigger the usual click handler
            onClick();
        }
    };

    return (
        <Button
            sx={{
                color: red ? '#F44336' : '#fdfdfd', 
                borderTop: 'solid rgba(128, 128, 128, 0.2) 0.5px', 
                width: '100%',
                textTransform: 'none',
                fontSize: '20px',
                display: 'flex',
                padding: '10px 20px 10px 20px',
                justifyContent: 'center',
                alignItems: 'center',
            }} 
            onClick={handleClick}
        >
            <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {icon}
                <Typography fontWeight="bold">{text}</Typography>
            </Stack>
            {fileInput && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    hidden
                    ref={inputRef} // Set the ref for accessing the input
                />
            )}
        </Button>
    );
}
