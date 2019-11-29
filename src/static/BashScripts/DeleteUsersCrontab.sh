#command that searches the users that are offline for more than 20 min and deletes them
find /var/www/cgi-bin/users -type f -mmin +20 -exec rm {} \;

