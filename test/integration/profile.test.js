const request = require('supertest');
const app = require('../../app');

describe('Boo test API', () => {
    let server;
    let profileId;
    let userId;

    beforeEach(async () => {
        server = app.listen(4000);
        // Create a new profile before running the tests
        const newProfileResponse = await request(app)
            .post('/profile')
            .send({
                name: 'Test Profile',
                description: 'Test description',
                mbti: 'INFP',
                enneagram: '5w6',
                variant: 'Self-pres',
                tritype: 135,
                socionics: 'IEI',
                sloan: 'RCOAI',
                psyche: 'NPA',
                image: 'test.jpg'
            });
        profileId = newProfileResponse.body._id; // Save the profile ID

        // Create a new user before running the tests
        const newUser = {
            name: 'Test User'
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)

        userId = response.body._id; // Save the user ID

    });

    afterEach((done) => {
        server.close(done);
    });


    it('should add a new comment', async () => {
        const newComment = {
            userId: userId,
            profileId: profileId,
            title: `Test Comment by ${userId}`,
            description: `Test description for comment by ${userId}`,
            votes: {
                mbti: 'INFP',
                enneagram: '5w6',
                zodiac: 'Libra'
            }
        };

        const response = await request(app)
            .post('/comments')
            .send(newComment)
            .expect(200);

        expect(response.body.title).toBe(`Test Comment by ${userId}`);

    });
});