var mongoose = require('mongoose');

const postcommentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true
        },
        postId: { type: String, 
                required: true
            },
        imageUrl: {
            type: String,
            required: false
        },
        parentcommentId: {
            type: String,
            required: false
        },
        childCommentsCount: {
            type: Number,
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
        ]
    },
    { timestamps: true }
);

const Postcomment = mongoose.model('Postcomment', postcommentSchema);


module.exports = Postcomment;