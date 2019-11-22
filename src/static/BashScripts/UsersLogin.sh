#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/usersLogin.log
if [ "$REQUEST_METHOD" == "PUT" ]; then
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""

 if [ ! -f $USERS_REPOSITORY ]; then
  touch $USERS_REPOSITORY && chmod a+w+x $USERS_REPOSITORY
 fi

 IS_IN_REPOSITORY=$(grep -c ${M_CONTENT_FILE} $USERS_REPOSITORY)
 echo $IS_IN_REPOSITORY
 COUNT_USERS_ONLINE=$(cat $USERS_REPOSITORY|wc -l)
 if [ $COUNT_USERS_ONLINE -eq 50 ]; then
  echo "<p> This chat is temporarily unvailable due to excessive load.</p>"
 fi
 if [ $IS_IN_REPOSITORY -eq 0 ]; then
   cat $M_CONTENT_FILE
   echo $M_CONTENT_FILE >> $USERS_REPOSITORY
   echo "" >> $USERS_REPOSITORY
   echo "True"
 fi
 if [ $IS_IN_REPOSITORY -gt 0 ]; then
  echo "<p><i class='fas fa-exclamation-circle'></i> This nickname already exists. Please enter a new one <p>"
 fi
 exit
fi
echo "Status: 400 Bad Request"
