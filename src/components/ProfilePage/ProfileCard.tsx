import { Paper, Stack, Typography } from "@mui/material";
import ProfileAvatar from "../Reusable/ProfileAvatar";

export default function ProfileCard({ avatar, username, bio, isOnline }: { avatar: string | undefined, username: string | undefined, bio: string | undefined, isOnline: boolean | undefined}) {
    return (
        <Paper elevation={1} sx={{ width: '100%', padding: '15px', borderRadius: '7px', }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <ProfileAvatar avatarPath={avatar} username={username} height="80px" width="80px" isOnline={isOnline}/>
                    <Stack
                        direction="column"
                        spacing={-1}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography variant="h5">{username}</Typography>
                        <Typography fontSize="17px" sx={{ opacity: '0.7' }}>{bio}</Typography>
                    </Stack>
                </Stack>
            </Paper>
    )
}