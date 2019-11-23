#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log
CONTENT_FILE=/tmp/http_body.tmp

#função que gera os erros que são transmitidos nas response headers
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
 if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> You must write a message!</p>"; fi

 # Debug
 #echo -n "Body content is: "
 #cat $M_CONTENT_FILE

 #coloca o body recebido nesta variável, para que ela não se perca
 MESSAGE=$(cat $CONTENT_FILE)

 #Verifica se existe query-string
 if [ -z "$QUERY_STRING" ]; then response "400 Bad Request" "No query-string"; fi

 #variável à qual é atribuida a query-string
 ROOM=${QUERY_STRING#room=}

 #verifica se é uma query string correcta
 if [ "$ROOM" == "$QUERY_STRING" ]; then response "400 Bad Request" "Bad query-string: $QUERY_STRING"; fi

 #Valida o nome do room
 case "$ROOM" in
   MainRoom|Just4Fun|YouShellNotPass|BashtardsOnly);;
   *) response "400 Bad Request" "Invalid Room: $ROOM";;
 esac

 OUTPUT_MESSAGES=${OUTPUT_ROOM_MESSAGES}.$ROOM

 # Create OUTPUT MESSAGES file if does not exist
 if [ ! -f $OUTPUT_MESSAGES ]; then
  echo "<b>Welcome to Room $ROOM!</b>" >> $OUTPUT_MESSAGES
  chmod a+w $OUTPUT_MESSAGES
 fi

 #manda mensagem para o Room log correcto
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 DATE=$(date +"%R")
 echo "<p><b>$DATE: </b>$MESSAGE</p>" >> $OUTPUT_MESSAGES
 exit
fi

#gera erro caso o método não seja o adequado
response "405 Method Not Allowed" ""
