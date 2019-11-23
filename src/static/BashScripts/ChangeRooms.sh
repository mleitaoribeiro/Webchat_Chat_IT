#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log

#função que gera os erros que são transmitidos nas response headers
error_response() {
    echo "Status: 400 Bad Request"
    echo "Content-type: text/plain"
    echo ""
    echo "ERROR: ${1}"
  exit
}

#Verifica se existe query-string
if [ -z "$QUERY_STRING" ]; then error_response "No query-string"; fi

#variável à qual é atribuida a query-string
ROOM=${QUERY_STRING#room=}

#verifica se é uma query string correcta
if [ "$ROOM" == "$QUERY_STRING" ]; then error_response "Bad query-string: $QUERY_STRING"; fi

#Valida o nome do room
case "$ROOM" in
  MainRoom|Just4Fun|YouShellNotPass|BashtardsOnly);;
  *) error_response "Invalid Room: $ROOM";;
esac

OUTPUT_MESSAGES=${OUTPUT_ROOM_MESSAGES}.$ROOM

# Create OUTPUT MESSAGES file if does not exist
if [ ! -f $OUTPUT_MESSAGES ]; then
  echo "<b>Welcome to $ROOM!</b>" >> $OUTPUT_MESSAGES
  chmod a+w $OUTPUT_MESSAGES
fi

#faz o reload das mensagens existentes no Room log correcto e manda-as como resposta
if [ "$REQUEST_METHOD" == "GET" ]; then
  OUTPUT_ROOM=$(cat $OUTPUT_MESSAGES|tail -50)
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  echo $OUTPUT_ROOM

  exit
fi

#gera erro caso o método não seja o adequado
error_response "Method Not Allowed"
