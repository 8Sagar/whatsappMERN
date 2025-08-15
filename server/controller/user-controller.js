// import User from "../modal/User.js";


// export const addUser = async (request, response) => {
//     try {
//         let exist = await User.findOne({ sub: request.body.sub });

//         if(exist) {
//             response.status(200).json('user already exists');
//             return;
//         }

//         const newUser = new User(request.body);
//         await newUser.save();
//         response.status(200).json(newUser);
//     } catch (error) {
//         response.status(500).json(error);
//     }
// }

// export const getUser = async (request, response) => {
//     try {
//         const user = await User.find({});
//         response.status(200).json(user);
//     } catch (error) {
//         response.status(500).json(error);
//     }
// }

import User from "../modal/User.js";

// Add user if not exists
export const addUser = async (request, response) => {
    try {
        const { email, name } = request.body;

        let exist = await User.findOne({ email }); // check by email instead of sub

        if (exist) {
            response.status(200).json(exist); // return existing user
            return;
        }

        const newUser = new User({ email, name });
        await newUser.save();
        response.status(200).json(newUser);
    } catch (error) {
        response.status(500).json(error);
    }
}

// Get all users (optional: keep for admin)
export const getUser = async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json(error);
    }
}

// ✅ Get all users except current logged-in user
export const getAllUsersExcept = async (request, response) => {
    try {
        const users = await User.find({ email: { $ne: request.params.email } });
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json(error);
    }
}
