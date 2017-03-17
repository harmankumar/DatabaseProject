CREATE TRIGGER death_pred_trigger BEFORE INSERT ON deaths
FOR EACH ROW EXECUTE PROCEDURE killcharacter();

CREATE OR REPLACE FUNCTION killcharacter() RETURNS TRIGGER AS $$
    BEGIN
    	UPDATE deaths
    	SET actual = 0
    	WHERE name = new.name;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;