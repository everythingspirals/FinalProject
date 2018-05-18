import mongoose from 'mongoose';

class User extends mongoose.Model {
    static get name() {
        return 'user';
    }
}

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 25,
            trim: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

const model = mongoose.model(User, schema, 'user');

export default model;