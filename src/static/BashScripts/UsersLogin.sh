#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/usersLogin.log
CONTENT_FILE=/tmp/http_body.tmp

response() {
 echo "Status: ${1}"
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "${2}"
exit
}

if [ "$REQUEST_METHOD" == "PUT" ]; then

 # Save Body content (available in the STDIN)
 if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> You must provide a nickname!</p>"; fi

 # Debug
 #echo -n "Body content is: "
 #cat $M_CONTENT_FILE

 NICKNAME=$(cat $CONTENT_FILE)

 # Create users repository file if does not exist
 if [ ! -f "$USERS_REPOSITORY" ]; then
  #echo "Creating repository file"
  echo "USERS LIST" > $USERS_REPOSITORY
  chmod a+w+x $USERS_REPOSITORY
 fi

 IS_IN_REPOSITORY=$(grep -w -o -i $NICKNAME $USERS_REPOSITORY | wc -l)
 COUNT_USERS_ONLINE=$(cat $USERS_REPOSITORY|wc -l)
 COUNT_USERS_ONLINE=$((COUNT_USERS_ONLINE - 1))

 #echo -ne "\n\tREPOSITORY: "
 #cat $USERS_REPOSITORY
 #echo -e "\n\tIS IN REPOSITORY? " $IS_IN_REPOSITORY
 #echo -e "\tCOUNT USERS ONLINE " $COUNT_USERS_ONLINE

 # Error : reached limit of users online
 if [ $COUNT_USERS_ONLINE -eq 50 ]; then
 response "503 Service Unavailable" "<p> This chat is temporarily unvailable due to excessive load.</p>"
 fi

 # Nickname can be added
 if [ $IS_IN_REPOSITORY -eq 0 ]; then
   #echo -n "Nickname to be added to the file: "
   #cat $M_CONTENT_FILE
   echo $NICKNAME >> $USERS_REPOSITORY
   #cat $USERS_REPOSITORY
   response "200 OK" ""
 fi

 if [ $IS_IN_REPOSITORY -gt 0 ]; then
  response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> This nickname already exists. Please enter a new nickname</p>"
 fi
 exit
fi

if [ "$REQUEST_METHOD" == "OPTIONS" ]; then
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo "Access-Control-Allow-Methods: PUT, OPTIONS"
 echo ""
 exit
fi
