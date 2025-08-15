import { useState, useEffect, useContext } from 'react';
import { Box, styled, Divider } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';
import { UserContext } from '../../../context/UserProvider';
import { getUsers } from '../../../service/api';
import Loader from '../../Loader';
import Conversation from './Conversation';

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
    const [loading, setLoading] = useState(false);

    const { account, socket, setActiveUsers } = useContext(AccountContext);
    const { setPerson } = useContext(UserContext);

    // Fetch users from backend
    useEffect(() => {
        const fetchData = async () => {
            if (!account?.email) return;
            setLoading(true);
            try {
                const data = await getUsers(account.email); // backend route /users/all/:email
                if (Array.isArray(data)) {
                    const filteredData = data.filter(user =>
                        user.name?.toLowerCase().includes(text.toLowerCase())
                    );
                    setUsers(filteredData);
                } else {
                    setUsers([]);
                    console.error("getUsers() did not return an array", data);
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setUsers([]);
            }
            setLoading(false);
        };

        fetchData();
    }, [text, account]);

    // Socket: add user & track active users
    useEffect(() => {
        if (!account) return;

        socket.current.emit('addUser', account);
        socket.current.on('getUsers', (users) => {
            setActiveUsers(users);
        });

        return () => socket.current.off('getUsers'); // cleanup
    }, [account, socket, setActiveUsers]);

    if (loading) return <Loader />;

    return (
        <Component>
            {users.map((user, index) => (
                <div key={user._id} onClick={() => setPerson(user)}>
                    <Conversation user={user} />
                    {users.length !== index + 1 && <StyledDivider />}
                </div>
            ))}
        </Component>
    );
};

export default Conversations;
