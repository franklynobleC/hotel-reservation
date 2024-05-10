


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