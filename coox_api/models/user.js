var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            unique: true,
            required: true,
        },
        pwd: {
            type: String,
            unique: false,
            required: true,
        },
        roles: {
            type: [Object],
            unique: false,
            required: true
        },
        customData: {
            email: {
                    type: String,
                  unique: true,
                required: true
            },
            imageUrl: {
                type: String,
                unique: true,
                required: false

            },
            postLikes: {
                type: Number,
                required: false
            },
            deleted: {
                   type: Boolean,
                 unique: false,
               required: true
            }
        }
    },
    { timestamps: true },
);

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

userSchema.pre('remove', function (next) {
    this.model('Post').deleteMany({ user: this._id }, next);
    this.model('Postcomment').deleteMany({ createdBy: this._id }, next);
});

const User = mongoose.model('User', userSchema);

module.exports = User;