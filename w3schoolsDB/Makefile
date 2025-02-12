default:
	rm -f w3schools.sqlite
	sqlite3 w3schools.sqlite < w3schools.sql

w3schools_dump: w3schools.sqlite
	sqlite3 w3schools.sqlite .dump > $@
