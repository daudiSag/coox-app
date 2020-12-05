var mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageUrl: { 
            type: String,
            required: false
        },
        likes: [
            {
                username: {
                    type: String,
                    required: false,
                    unique: true
                },
                like: {
                    type: Boolean,
                    required: false
                }
            }
        ],
        shares: [
            {
                userId: {
                    type: String,
                    required: false
                },
                media: {
                    type: String,
                    required: false
                }
            }
        ],
        commentCount: {
            type: Number,
            required: false
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdBy: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
);

postSchema.pre('remove', function (next) {
    this.model('Postcomment').deleteMany({ postId: this._id }, next);
});

const Post = mongoose.model('Post', postSchema);


module.exports = Post;