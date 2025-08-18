import { useContext } from 'react';
import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // ✅ Correct import for decoding token

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
    display: flex; 
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const QRCode = styled('img')({   // ✅ Fixed typo: was "QRCOde" → now "QRCode" (naming convention issue)
    margin: '50px 0 0 50px',
    height: 264,
    width: 264
});

const Title = styled(Typography)`
    font-size: 26px;
    margin-bottom: 25px;
    color: #525252;
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    font-weight: 300;
`;

const StyledList = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
    }
`;

const dialogStyle = {
    marginTop: '12%',
    height: '94%',
    width: '60%',
    maxWidth: '95%',   // ✅ Fixed: was string '100' (invalid), should be '100%'
    maxHeight: '95%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden'
}

const LoginDialog = () => {
    const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        // ✅ Decode Google credential response to get user info
        const decoded = jwtDecode(res.credential);

        // ✅ Save user info in context for global access
        setAccount(decoded);

        // ✅ Toggle login/logout button visibility
        setShowloginButton(false);
        setShowlogoutButton(true);

        // ✅ Store user in DB if not already exists
        await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.error('Login Failed:', res);  // ✅ Changed console.log to console.error (better debugging)
    };

    return (
        <Dialog
            open={true}
            BackdropProps={{ style: { backgroundColor: 'unset' } }}
            maxWidth={'md'}
            PaperProps={{ sx: dialogStyle }}
        >
            <Component>
                <Container>
                    <Title>To use WhatsApp on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position: 'relative' }}>
                    <QRCode src={qrCodeImage} alt="QR Code" /> {/* ✅ Fixed name */}
                    <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)' }}>
                        {showloginButton && (   // ✅ Cleaner conditional rendering
                            <GoogleLogin
                                buttonText=""
                                onSuccess={onLoginSuccess}
                                onError={onLoginFailure}
                            />
                        )}
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;
