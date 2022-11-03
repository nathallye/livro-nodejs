-- Criando tabelas
CREATE TABLE patents (
	id serial PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE divisions (
	id serial PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE stormtroopers (
	id serial PRIMARY KEY,
	name TEXT NOT NULL,
	nickname TEXT NOT NULL,
	id_parent INT NOT NULL,
	FOREIGN KEY (id_parent) REFERENCES patents(id)
);

CREATE TABLE stormtrooper_division (
	id_stormtrooper INT NOT NULL,
	id_division INT NOT NULL,
	FOREIGN KEY (id_stormtrooper) REFERENCES stormtroopers(id),
	FOREIGN KEY (id_division) REFERENCES divisions(id)
);

--------------------------------------------------------------------------------------------------------
-- Inserindo dados na tabela patentes/patents
INSERT INTO patents (name) 
	VALUES ('Soldier'), ('Commander'), ('Captain'), ('Lieutenant'), ('Sergent');

-- Inserindo dados na tabela soldados/stormtroopers
INSERT INTO stormtroopers (name, nickname, id_parent) 
	VALUES ('CC-1010', 'Fox', 2);

-- Visualizando os dados inseridos 
SELECT stormtroopers.id, stormtroopers.name, nickname, patents.name 
	FROM stormtroopers 
	INNER JOIN patents ON patents.id = stormtroopers.id_parent;

--------------------------------------------------------------------------------------------------------
-- Inserindo dados na tabela divisões/divisions
INSERT INTO divisions (name) 
	VALUES ('Breakout Squad'), ('501st Legion'), ('35th Infantry'), ('212th Attck Battalion'), ('Squad Seven'), ('44th Special Operations Division'), ('Lightning Squadron'), ('Coruscant Guard');

-- Inserindo dados na tabela de relacionamentos soldado_divisão/stormtrooper_division
INSERT INTO stormtrooper_division (id_stormtrooper, id_division) 
	VALUES (1, 2), (1, 8);

-- Visualizando os dados inseridos 
SELECT id_stormtrooper, name, nickname, id_parent, stormtrooper_division.id_division 
	FROM stormtroopers 
	INNER JOIN stormtrooper_division ON stormtroopers.id = stormtrooper_division.id_stormtrooper;

-- Visualizando os dados inseridos com mais informações(name patent, name division)
SELECT id_stormtrooper, stormtroopers.name, nickname, patents.name, divisions.name 
	FROM stormtroopers 
	INNER JOIN stormtrooper_division ON stormtroopers.id = stormtrooper_division.id_stormtrooper
	INNER JOIN patents ON patents.id = stormtroopers.id_parent
	INNER JOIN divisions ON divisions.id = stormtrooper_division.id_division;

--------------------------------------------------------------------------------------------------------
-- Inserindo novos dados na tabela soldados/stormtroopers
INSERT INTO stormtroopers (name, nickname, id_parent) VALUES ('CT-7567', 'Rex', 3), ('CC-2224', 'Cody', 2), ('CT-2755', 'Hardcase', 1), ('CT-27-5555', 'Fives', 1);

INSERT INTO stormtrooper_division (id_stormtrooper, id_division) VALUES (5, 2), (4, 2), (3, 4), (2, 2);

-- Visualizando os dados inseridos 
SELECT stormtroopers.id, stormtroopers.name, nickname, patents.name, divisions.name 
	FROM stormtroopers 
	INNER JOIN stormtrooper_division ON stormtroopers.id = stormtrooper_division.id_stormtrooper
	INNER JOIN patents ON patents.id = stormtroopers.id_parent
	INNER JOIN divisions ON divisions.id = stormtrooper_division.id_division;
