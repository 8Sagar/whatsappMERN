import { useState, useEffect, useContext } from 'react';
import { Box, styled, Divider } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';
import Conversation from './Conversation';
import { getUsers } from '../../../service/api';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    // Fetch users and filter based on search text
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
            const filteredData = data.filter(user =>
                user.name.toLowerCase().includes(text.toLowerCase())
            );
            setUsers(filteredData);
        };
        fetchData();
    }, [text]);

    // Socket: add user and listen for active users
    useEffect(() => {
        if (!socket.current) return;

        const currentSocket = socket.current; // copy ref for safe cleanup

        currentSocket.emit('addUser', account);

        const handleGetUsers = (users) => {
            setActiveUsers(users);
        };

        currentSocket.on("getUsers", handleGetUsers);

        // Cleanup listener on unmount or account change
        return () => {
            currentSocket.off("getUsers", handleGetUsers);
        };
    }, [account, socket, setActiveUsers]);

    return (
        <Component>
            {users && users.map((user, index) => (
                user.sub !== account.sub &&
                    <Box key={user.sub}>
                        <Conversation user={user} />
                        {users.length !== (index + 1) && <StyledDivider />}
                    </Box>
            ))}
        </Component>
    );
}

export default Conversations;
