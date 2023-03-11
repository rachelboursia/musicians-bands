const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

        const band1 = await Band.create({ name: 'Band1'});
        const band2 = await Band.create({ name: 'Band2'});

        const musician1 = await Musician.create({ name: 'Musician 1', instrument: 'Guitar'});
        const musician2 = await Musician.create({ name: 'Musician 2', instrument: 'Bass'});

        const song1 = await Song.create({ title: 'Song1', year: 2022});
        const song2 = await Song.create({ title: 'Song2', year: 2023});

        await band1.addMember(musician1);
        await band1.addMember(musician2);
        await band1.addSong(song1);
        await band2.addSong(song2);

    });

    test('can retrieve Bands with associated Musicians and Songs', async () => {
        const bandsWithMusicians = await Band.findAll({ include: Musician});

        expect(bandsWithMusicians.length).toBe(2);
        expect(bandsWithMusicians[0].Members.length).toBe(2);
        expect(bandsWithMusicians[0].Members.map(member => member.name)).toContain('Musician1');
        expect(bandsWithMusicians[0].Members.map(member => member.name)).toContain('Musician2');

        const bandWithSongs = await Band.findAll({ include: Song});

        expect(bandWithSongs.length).toBe(2);
        expect(bandWithSongs[0].Songs.length).toBe(1);
        expect(bandWithSongs[0].Songs.map(song => song.title)).toContain('Song1');
        expect(bandWithSongs[1].Songs.length).toBe(1);
        expect(bandWithSongs[1].Songs.map(song => song.title)).toContain('Song2');
    })
    test('can create a Band', async () => {
        // TODO - test creating a band
        const bandMember = await Band.create({ name: 'Rachel Boursia', genre:'Rock'});
        expect(bandMember.name).toBe('Rachel Boursia');
        expect(bandMember.genre).toBe('Rock'); 
    });

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const singer = await Musician.create({ name: 'Rachel Boursia', instrument: 'voice'});
        expect(singer.name).toBe('Rachel Boursia');
        expect(singer.instrument).toBe('voice');
    });

    test('can create a Song', async () => {
        // TODO - test creating a musician
        const song1 = await Song.create({ title: 'Always be my cutie', year: 2022});
        const song2 = await Song.create({ title: 'Pretend this is another cutie title', year: 2023});

        expect(song1.title).toBe('Always be my cutie');
        expect(song1.year).toBe(2022);
        expect(song2.title).toBe('Pretend this is another cutie title');
        expect(song2.year).toBe(2023);

    });

    test('Band can have multiple Musicians', async () => {
        const band = await Band.create({ name: 'Best Band Name' });
        const bandMember1 = await Musician.create({ name: 'Mariah Carey', instrument: 'Guitar' });
        const bandMember2 = await Musician.create({ name: 'JMSN', instrument: 'Bass' });

        await band.addMember(bandMember1);
        await band.addMember(bandMember2);

        const members = await band.getMembers();

        expect(members.length).toBe(2);
        expect(members.map(member => member.name)).toContain('Mariah Carey');
        expect(members.map(member => member.name)).toContain('JMSN');
    });

    test('Musician belongs to a Band', async () => {

        const band = await Band.create({ name: 'Best Band Name' });
        const mick = await Musician.create({ name: 'Rachel Boursia', instrument: 'Vocals' });

        await mick.setBand(band);

        const musicianBand = await mick.getBand();

        expect(musicianBand.name).toBe('Best Band Name');
    });
});