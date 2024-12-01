import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Footer from "../components/Footer";
import FindUsers from "../components/ContactPage/FindUsers";
import FavouriteList from "../components/ContactPage/FavouriteList";

export default function FavouritesPage() {
    return (
        <>
            <AppBar 
                position="sticky" 
                sx={{ 
                    zIndex: 1100, 
                    backgroundColor: 'primary', 
                    boxShadow: 'none',
                    padding: 0
                }}
                elevation={0}
            >
                <Toolbar sx={{padding: '10px 10px 10px 10px'}}>
                    <FindUsers />
                </Toolbar>
            </AppBar>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: '20px'
                }}
                >
                <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                    Favourites
                </Typography>
                <FavouriteList />
                <Footer/>
            </Stack>
        </>
    )
}