#!/bin/bash
#Devolve a lista dos users que fizeram log in.
USERS_REPOSITORY=/var/www/cgi-bin/usersLogin.Log
cat ${USERS_REPOSITORY}
