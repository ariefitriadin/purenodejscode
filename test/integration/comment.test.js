const request = require('supertest');
const app = require('../../app'); // app server
const mongoose = require('mongoose');
const Comment = require('../../models/comment');

describe('Comments API', () => {

    let comment;
    const userId = new mongoose.Types.ObjectId(); 
    const profileId = new mongoose.Types.ObjectId();

    beforeEach(async () => {
        comment = await Comment.create({
            user: userId,
            profile: profileId,
            title: 'Test Comment',
            description: 'Test description',
            votes: {
                mbti: 'INFP',
                enneagram: '4w5',
                zodiac: 'Pisces'
            }
        });
    });

    afterEach(async () => {
        await Comment.findByIdAndDelete(comment._id);
    });

    describe('POST /comments', () => {
        it('should create a new comment', async () => {
            const res = await request(app)
                .post('/comments')
                .send({
                    user: userId,
                    profile: profileId,
                    title: 'New Comment',
                    description: 'New description',
                    votes: {
                        mbti: 'INTJ',
                        enneagram: '5w6',
                        zodiac: 'Aquarius'
                    }
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('title', 'New Comment');
        });
    });

    describe('GET /comments', () => {
        it('should get comments with filter', async () => {
            const res = await request(app)
                .get('/comments')
                .query({ profileId: profileId.toString() });

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(1);
            expect(res.body[0]).toHaveProperty('profile', '' + profileId.toString());
        });
    });

    describe('POST /comments/:id', () => {
        it('should increment likes when liking a comment', async () => {
            const res = await request(app)
                .post(`/comments/${comment._id}`)
                .query({ like: true });

            expect(res.statusCode).toEqual(200);
            expect(res.body.likes).toEqual(1);
        });

        it('should decrement likes when unliking a comment', async () => {
            await request(app)
                .post(`/comments/${comment._id}`)
                .query({ like: true });

            const res = await request(app)
                .post(`/comments/${comment._id}`)
                .query({ like: false });

            expect(res.statusCode).toEqual(200);
            expect(res.body.likes).toEqual(0);
        });
    });

});
