CREATE TABLE historic_operation (
                                    id BIGINT PRIMARY KEY,
                                    operation_date TIMESTAMP NOT NULL,
                                    section VARCHAR(255), -- Assume the length is 255.
                                    groupe VARCHAR(255), -- Assume the length is 255.
                                    membre_informations TEXT, -- Using TEXT to accommodate any length.
                                    action_type VARCHAR(255), -- Assume the length is 255.
                                    action_label TEXT -- Using TEXT to accommodate any length.
);

-- Creates sequence for the id in historic_operation
CREATE SEQUENCE historic_operation_id_seq
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sets the default NEXTVAL
ALTER TABLE historic_operation ALTER COLUMN id SET DEFAULT nextval('historic_operation_id_seq');
