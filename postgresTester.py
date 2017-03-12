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

	
	# add the right format and directories etc. to bulk load.

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

