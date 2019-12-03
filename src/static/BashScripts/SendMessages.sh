#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log
CONTENT_FILE=/tmp/http_body.tmp
USERS_GENERATOR=/var/www/cgi-bin/users/user

#função que gera os erros que são transmitidos nas response headers
response() {
 echo "Status: ${1}"
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "${2}"
exit
}

#faz o envio da mensagem para o ficheiro de onde as mensagens são carregadas no ChatRoom
if [ "$REQUEST_METHOD" == "POST" ]; then

 # Salva o Body que é transmitido no http request realizado e que está disponível no stdin
 if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p style='font-size: small;
 color: #B61919'><i class='fas fa-exclamation-circle'></i> You must write a message!</p>"; fi

 MESSAGE=$(cat $CONTENT_FILE)

 #Verifica se existe query-string
 if [ -z "$QUERY_STRING" ]; then response "400 Bad Request" "No query-string"; fi

 #retira o Room da Query-String
 ROOM=$(echo $QUERY_STRING|cut -d "&" -f 1)
 ROOM=${ROOM#room=}

 #retira o Nickname da Query-String
 NICKNAME=$(echo $QUERY_STRING|cut -d "&" -f 2)
 NICKNAME=${NICKNAME#nickname=}

 #Valida o nome do room
 case "$ROOM" in
   MainRoom|Just4Fun|YouShellNotPass|BashtardsOnly);;
   *) response "404 Not Found" "Invalid Room: $ROOM";;
 esac

 OUTPUT_MESSAGES=${OUTPUT_ROOM_MESSAGES}.$ROOM

 # Cria o ficheiro outputRoom.$ROOM.log se ele não existir
 if [ ! -f $OUTPUT_MESSAGES ]; then
  echo "<b style='color: rgb(182,25,25); font-size: large'>Welcome to Room $ROOM!</b>" >> $OUTPUT_MESSAGES
  #e dá-lhe permissões de escrita
  chmod a+w $OUTPUT_MESSAGES
 fi

 #manda a http response com a mensagem, que inclui a data e o nickname
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 DATE=$(date +"%R")
 echo "<p><b style='color:#B61919'>$NICKNAME:</b> $MESSAGE <i style='font-size: small; color: darkgray; text-align:
 right'> $DATE </i></p>" >> $OUTPUT_MESSAGES

 #atualiza a data de modificação do ficheiro para o momento em que o user manda a mensagem, impedindo que este seja
 #eliminado
 USER_LOGIN=${USERS_GENERATOR}.$NICKNAME
 touch $USER_LOGIN
 exit
fi

#gera erro caso o método não seja o adequado
response "405 Method Not Allowed" ""
