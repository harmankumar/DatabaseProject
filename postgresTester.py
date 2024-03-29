import math
import time
import psycopg2
import csv


def main():

	# Bulk Load!
	conn = psycopg2.connect(dbname='gotdb', user='postgres', password='root')
	cur = conn.cursor()
	
	# IGNORE	
	# cur.execute("SELECT table_schema,table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_schema,table_name")
	# rows = cur.fetchall()
	# for row in rows:
	# 	print "dropping table: ", row[1]
	# 	cur.execute("drop table " + row[1] + " cascade")    





	# some bool fields have been made int, hope youre cool wih that :p
	
	query = """CREATE TABLE deaths
					(
						Name	TEXT,
						Allegiances	TEXT,	
						DeathYear	INT,
						BookofDeath INT,	
						DeathChapter INT,
						BookIntroChapter INT,	
						Gender	TEXT,
						Nobility	INT,	
						GoT	INT,
						CoK	 INT,
						SoS	 INT,
						FfC	INT,	
						DwD INT
					)
			"""
	cur.execute(query)


	query = """CREATE TABLE battles
					(
						name TEXT,
						year INT,
						battle_number INT,
						attacker_king TEXT,
						defender_king TEXT,	
						attacker_1	TEXT,
						attacker_2	TEXT,
						attacker_3	TEXT,
						attacker_4	TEXT,
						defender_1	TEXT,
						defender_2	TEXT,
						defender_3	TEXT,
						defender_4	TEXT,
						attacker_outcome	TEXT,
						battle_type	TEXT,
						major_death	INT,
						major_capture	INT,
						attacker_size	INT,
						defender_size	INT,
						attacker_commander	TEXT,
						defender_commander TEXT,	
						summer	INT,
						location TEXT,
						region	TEXT,
						note TEXT
					)
			"""
	cur.execute(query)

	query = """CREATE TABLE predictions
					(
						SNo	INT,
						actual	INT,
						pred	INT,
						alive	DOUBLE PRECISION,
						plod	DOUBLE PRECISION,
						name	TEXT,
						title	TEXT,
						Gender	TEXT,
						culture	TEXT,
						dateOfBirth	INT,
						DateoFdeath	INT,
						mother	TEXT,
						father	TEXT,
						heir	TEXT,
						house	TEXT,
						spouse	TEXT,
						book1	INT,
						book2	INT,
						book3	INT,
						book4	INT,
						book5	INT,
						isAliveMother	INT,
						isAliveFather	INT,
						isAliveHeir	INT,
						isAliveSpouse	INT,
						isMarried	INT,
						isNoble	INT,
						age	INT,
						numDeadRelations INT,	
						boolDeadRelations	INT,
						isPopular	INT,
						popularity	DOUBLE PRECISION,
						isAlive INT
					)
			"""
	cur.execute(query)

	# add the right directories etc. to bulk load.

	query = """COPY predictions (SNo,	actual,	pred,	alive,	plod,	name,	title,	Gender,	culture,	dateOfBirth,	DateoFdeath,	mother,	father,	heir,	house,	spouse,	book1,	book2,	book3,	book4,	book5,	isAliveMother,	isAliveFather,	isAliveHeir, isAliveSpouse,	isMarried,	isNoble,	age,	numDeadRelations,	boolDeadRelations,	isPopular,	popularity,	isAlive)
				FROM '/Users/Nikhil/Desktop/Sem 8/COL362/DatabaseProject/character-predictions.csv'
				WITH DELIMITER ','  
				CSV HEADER
			"""
	cur.execute(query)

	query = """COPY deaths (Name,	Allegiances,	DeathYear,	BookofDeath,	DeathChapter,	BookIntroChapter,	Gender,	Nobility,	GoT,	CoK,	SoS,	FfC,	DwD)
				FROM '/Users/Nikhil/Desktop/Sem 8/COL362/DatabaseProject/character-deaths.csv'
				WITH DELIMITER ','  
				CSV HEADER
			"""
	cur.execute(query)

	query = """COPY battles (name,	year,	battle_number,	attacker_king,	defender_king,	attacker_1,	attacker_2,	attacker_3,	attacker_4,	defender_1,	defender_2,	defender_3,	defender_4,	attacker_outcome,	battle_type,	major_death,	major_capture,	attacker_size,	defender_size,	attacker_commander,	defender_commander,	summer,	location,	region,	note)
				FROM '/Users/Nikhil/Desktop/Sem 8/COL362/DatabaseProject/battles.csv'
				WITH DELIMITER ','  
				CSV HEADER
			"""
	cur.execute(query)


	


	# query = """COPY chronic1 (YearStart,    YearEnd,    LocationAbbr,   LocationDesc,   DataSource, Topic)
	# 			FROM 'C:\Chronic.csv'
	# 			WITH DELIMITER ','  
	# 			CSV HEADER
	# 		"""
	# cur.execute(query)
	
	cur.close()
	conn.commit()



if __name__ == '__main__':
	main()

