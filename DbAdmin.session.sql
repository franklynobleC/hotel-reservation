-- DROP Table rooms;

CREATE TABLE  rooms (
    id serial PRIMARY KEY,
    room_number VARCHAR(30) NOT  NULL UNIQUE,
    room_type  VARCHAR(10) NOT NULL CHECK (room_type IN ('suite', 'single','double')),
    price VARCHAR(10) NOT  NULL,
    number_of_occupants  INT DEFAULT 1 CHECK  (number_of_occupants > 0),
    availability_status VARCHAR(10) NOT NULL CHECK (availability_status IN ('Available', 'Booked')),
    image_url VARCHAR(255),
    room_description TEXT,
    create_at  TIMESTAMP
);

CREATE TABLE reservation(
   id SERIAL PRIMARY KEY,
   user_id int REFERENCES users(id),
   room_id int REFERENCES rooms(id),
   type VARCHAR(255),
   price VARCHAR (255),
   details VARCHAR(255),
   check_in_date  DATE NOT NULL,
   check_out_date  DATE NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
