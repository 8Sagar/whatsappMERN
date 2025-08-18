import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    aud: {
        type: String
    },
    azp: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    exp: {
        type: Number
    },
    family_name: {
        type: String
        
    },
    given_name: {
        type: String
    
    },
    iat: {
        type: Number
        
    },
    iss: {
        type: String
        
    },
    jti: {
        type: String
        
    },
    name: {
        type: String,
        required: true
    },
    nbf: {
        type: Number,
        
    },
    picture: {
        type: String,
        required:true
        
    },
    sub: {
        type: String,
        required: true,
        unique : true
    }
})

//const user = mongoose.model('user', userSchema);
const user = mongoose.models.user || mongoose.model('user', userSchema);

export default user; 

