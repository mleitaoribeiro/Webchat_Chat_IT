#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log
CONTENT_FILE=/tmp/http_body.tmp
USERS_GENERATOR=/var/www/cgi-bin/users/user

response() {
 echo "Status: ${1}"
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "${2}"
exit
}

if [ "$REQUEST_METHOD" == "POST" ]; then

 # Save Body content (available in the STDIN)
 # shellcheck disable=SC1073
 # shellcheck disable=SC1073
 if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p style='font-size: small; color: #B61919'><i class='fas fa-exclamation-circle'></i> You must write a message!</p>"; fi

 # Debug
 #echo -n "Body content is: "
 #cat $M_CONTENT_FILE

 MESSAGE=$(cat $CONTENT_FILE)

 if [ -z "$QUERY_STRING" ]; then response "400 Bad Request" "No query-string"; fi

 #parsing the query_string to room
 ROOM=$(echo $QUERY_STRING|cut -d "&" -f 1)
 ROOM=${ROOM#room=}

 #parsing the query-string to nickname
 NICKNAME=$(echo $QUERY_STRING|cut -d "&" -f 2)
 NICKNAME=${NICKNAME#nickname=}

 case "$ROOM" in
   MainRoom|Just4Fun|YouShellNotPass|BashtardsOnly);;
   *) response "404 Not Found" "Invalid Room: $ROOM";;
 esac

 OUTPUT_MESSAGES=${OUTPUT_ROOM_MESSAGES}.$ROOM

 # Create OUTPUT MESSAGES file if does not exist
 if [ ! -f $OUTPUT_MESSAGES ]; then
  echo "<b style='color: rgb(182,25,25); font-size: large'>Welcome to Room $ROOM!</b>" >> $OUTPUT_MESSAGES
  chmod a+w $OUTPUT_MESSAGES
 fi

 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 DATE=$(date +"%R")
  echo "<p><b style='color:#B61919'>$NICKNAME:</b> $MESSAGE <i style='font-size: small; color: darkgray; text-align:
  right'> $DATE </i></p>" >> $OUTPUT_MESSAGES

 #updating last modified time of the user's file
 USER_LOGIN=${USERS_GENERATOR}.$NICKNAME
 touch $USER_LOGIN
 exit
fi

#gera erro caso o método não seja o adequado
response "405 Method Not Allowed" ""
