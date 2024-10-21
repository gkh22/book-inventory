require("dotenv").config();

const { client } = require("./pool.js");

const SQL = `
-- Drop tables if they exist
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS book_genres CASCADE;

-- Create authors table
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    bio TEXT NOT NULL
);

-- Create genres table
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Create books table
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    author_id INTEGER NOT NULL,
    img_url VARCHAR (255) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

-- Junction table for books and genres
CREATE TABLE book_genres (
    book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

INSERT INTO authors (name, bio) VALUES
    ('Han Kang', 'Nobel prize winner.')
ON CONFLICT (author_id) DO NOTHING;

INSERT INTO books (title, author_id, img_url, description) VALUES
    ('The Vegetarian', 1, '/images/TheVegetarian.png', 'In-hye opens her mouth. “What I''m trying to say...,” she whispers to Yeong-hye. The ambulance chassis rattles over a hollow in the road. In-hye squeezes Yeong-hye''s shoulders. “Perhaps this is all a kind of dream.” She bows her head. But then, as though suddenly struck by something, she brings her mouth right up to Yeong-hye''s ear and carries on speaking, forming the words carefully, one by one. “I have dreams too, you know. Dreams... and I could let myself dissolve into them, let them take me over... but surely the dream isn''t all there is? We have to wake up at some point, don''t we? Because... because then...” \nShe raises her head again. The ambulance is rounding the last bend in the road, leaving Mount Chukseong. She sees a black bird flying up toward the dark clouds. The summer sunlight dazzles her eyes, makes them sting, and her gaze cannot follow the bird''s flight anymore.\nQuietly, she breathes in. The trees by the side of the road are blazing, green fire undulating like the rippling flanks of a massive animal, wild and savage. In-hye stares fiercely at the trees, as if waiting for an answer. As if protesting against something. The look in her eyes is dark and insistent.'),
    ('Human Acts', 1, '/images/HumanActs.jpg', 'Human Acts, (Korean: 소년이 온다; RR: Sonyeoni onda) is a South Korean novel written by Han Kang. The novel draws upon the democratization uprising that occurred on May 18, 1980, in Gwangju, Korea. In the novel, one boy''s death provides the impetus for a dimensional look into the Gwangju uprising and the lives of the people in that city. Human Acts won Korea''s Manhae Prize for Literature and Italy''s Premio Malaparte.'),
    ('작별하지 않는다', 1, '/images/FareWell.png', 'I Do Not Bid Farewell, published in September 2021, depicts the tragedy of a 1948 civilian massacre on Korea''s southern island of Jeju from the perspective of three women. The French edition of the novel was published by Grasset in August last year under the title "Impossibles adieux."'),
    ('흰', 1, '/images/hau.jpg', 'The White Book by Han Kang, translated by Deborah Smith, is a lyrical journey through the author''s grief of losing her mother. As with most grief, however, the reader, alongside the author, discovers more than just a single sorrow. The death of her mother allows the author to confront a lifetime of losses. We meet her as she explores Warsaw, a city that was nearly demolished during WWII. The author walks along the streets marveling at the mix of new and old which juxtapose past sorrows and present joys. The overpowering force of life in the face of death is echoed in all her observations.'),
    ('Greek Lessons', 1, '/images/greek.jpg', 'Greek Lessons tells the story of two ordinary people brought together at a moment of private anguish—the fading light of a man losing his vision meeting the silence of a woman who has lost her language. Yet these are the very things that draw them to each other. Slowly the two discover a profound sense of unity—their voices intersecting with startling beauty, as they move from darkness to light, from silence to breath and expression.'),
    ('The Wind Is Blowing', 1, '/images/thewind.jpg', 'In the novel The Wind Is Blowing, Go, a woman tries to understand her friend''s death through the art she made in life')
ON CONFLICT (book_id) DO NOTHING;


INSERT INTO genres (name) VALUES
    ('Fiction'), ('Non-fiction'), ('Asian culture'), ('Literary Fiction'),
    ('Fantasy')
ON CONFLICT (genre_id) DO NOTHING;

INSERT INTO book_genres VALUES 
    (1, 3), (1, 4);

`

async function populateDb() {
    console.log("Seeding..");
    try {
        await client.connect();
        await client.query(SQL);
        console.log("Success seeding.");
    } catch (err) {
        console.log(err);
        console.log("Error seeding.");
    } finally {
        await client.end()
    }
}

populateDb()
