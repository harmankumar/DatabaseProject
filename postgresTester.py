import math
import time
import psycopg2
import csv


def main():

	# Bulk Load!
	conn = psycopg2.connect(dbname='GOTDB', user='postgres', password='root')
	cur = conn.cursor()
	
	# IGNORE	
	# cur.execute("SELECT table_schema,table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_schema,table_name")
	# rows = cur.fetchall()
	# for row in rows:
	# 	print "dropping table: ", row[1]
	# 	cur.execute("drop table " + row[1] + " cascade")    


	# query = """CREATE TABLE deaths
	# 				(
	# 					YearStart      INT     ,
	# 					YearEnd        INT     ,
	# 					LocationAbbr   LONGTEXT,
	# 					LocationDesc   LONGTEXT,
	# 					DataSource     LONGTEXT,
	# 					Topic          LONGTEXT
	# 				)
	# 		"""

	# some bool fields have been made int, hope youre cool wih that :p
	query = """CREATE TABLE deaths
					(
						Name	LONGTEXT,
						Allegiances	LONGTEXT,	
						DeathYear	INT,
						BookofDeath INT,	
						DeathChapter INT,
						BookIntroChapter INT,	
						Gender	LONGTEXT,
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
						defender_king LONGTEXT,	
						attacker_1	LONGTEXT,
						attacker_2	LONGTEXT,
						attacker_3	LONGTEXT,
						attacker_4	LONGTEXT,
						defender_1	LONGTEXT,
						defender_2	LONGTEXT,
						defender_3	LONGTEXT,
						defender_4	LONGTEXT,
						attacker_outcome	LONGTEXT,
						battle_type	LONGTEXT,
						major_death	INT,
						major_capture	INT,
						attacker_size	INT,
						defender_size	INT,
						attacker_commander	LONGTEXT,
						defender_commander LONGTEXT,	
						summer	INT,
						location LONGTEXT,
						region	LONGTEXT,
						note LONGTEXT
					)
			"""
	cur.execute(query)

	query = """CREATE TABLE predictions
					(
						SNo	INT,
						actual	INT,
						pred	INT,
						alive	DOUBLE,
						plod	DOUBLE,
						name	LONGTEXT,
						title	LONGTEXT,
						Gender	LONGTEXT,
						culture	LONGTEXT,
						dateOfBirth	INT,
						DateoFdeath	INT,
						mother	LONGTEXT,
						father	LONGTEXT,
						heir	LONGTEXT,
						house	LONGTEXT,
						spouse	LONGTEXT,
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
						popularity	DOUBLE,
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

