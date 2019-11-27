#!/bin/bash
#Devolve a lista dos users que fizeram log in
USERS_REPOSITORY=/var/www/cgi-bin/usersLogin.log
if [ "REQUEST_METHOD" == "GET" ]; then
 echo "Content-type: text/plain"
 echo "Acess-Control-Allow-Origin: *"
 echo ""
 TOTAL_USERS=$(cat $USERS_REPOSITORY | wc -l)
 while read line; do
  echo "<p> $line </p>"
 done < $USERS_REPOSITORY
 exit
fi
echo "Status: 400 Bad Request"

