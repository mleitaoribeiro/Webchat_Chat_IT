#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/users

#command that searches the users that are offline for more than 20 min and deletes them
find $USERS_REPOSITORY -type f -mmin +20 -exec rm {} \;

