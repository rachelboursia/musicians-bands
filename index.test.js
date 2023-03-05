const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const bandMember = await Band.create({ name: 'Rachel Boursia', genre:'Rock'});
        expect(bandMember.name).toBe('Rachel Boursia');
        expect(bandMember.genre).toBe('Rock'); 
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const singer = await Musician.create({ name: 'Rachel Boursia', instrument: 'voice'});
        expect(singer.name).toBe('Rachel Boursia');
        expect(singer.instrument).toBe('voice');
    })
})