import React, { useRef } from 'react';
import { Button, Stack, Typography } from "@mui/material";
import { isDisabled } from '@testing-library/user-event/dist/utils';

interface CenteredButtonProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    text: string;
    red?: boolean;
    fileInput?: boolean;
    disable?: boolean;
    onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CenteredButton({
    onClick,
    icon,
    text,
    red,
    fileInput = false,
    onFileChange,
    disable = false
}: CenteredButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput && inputRef.current) {
            inputRef.current.click();
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <Button
            sx={{
                color: red ? '#F44336' : 'primary', 
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
            disabled={disable} 
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
                    ref={inputRef}
                />
            )}
        </Button>
    );
}
