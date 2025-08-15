// import express from 'express';


// import { newConversation, getConversation } from '../controller/conversation-controller.js';
// import { addUser, getUser } from '../controller/user-controller.js';
// import { newMessage, getMessage }from '../controller/message-controller.js';
// import { uploadImage, getImage } from '../controller/image-controller.js';

// import upload from '../utils/upload.js';

// const route = express.Router();

// route.post('/add', addUser);
// route.get('/users', getUser);

// route.post('/conversation/add', newConversation);
// route.post('/conversation/get', getConversation);

// route.post('/message/add', newMessage);
// route.get('/message/get/:id', getMessage);

// route.post('/file/upload', upload.single('file'), uploadImage);
// route.get('/file/:filename', getImage);


// export default route;

import express from 'express';
import { addUser, getUser, getAllUsersExcept } from '../controller/user-controller.js';
import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { newMessage, getMessage } from '../controller/message-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const route = express.Router();

// Add user if not exists
route.post('/add', addUser);

// Get single user (optional)
route.get('/users', getUser);

// ✅ Get all users except current logged-in user
route.get('/users/all/:email', getAllUsersExcept);

// Conversation routes
route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

// Message routes
route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessage);

// File upload
route.post('/file/upload', upload.single('file'), uploadImage);
route.get('/file/:filename', getImage);

export default route;
