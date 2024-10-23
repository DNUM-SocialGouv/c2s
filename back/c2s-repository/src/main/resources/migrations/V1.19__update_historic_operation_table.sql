DELETE FROM historic_operation;

ALTER TABLE historic_operation ADD COLUMN membre_id bigint NOT NULL;
