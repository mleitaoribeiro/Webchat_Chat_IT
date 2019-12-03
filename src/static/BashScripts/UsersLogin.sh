#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/users
USERS_GENERATOR=/var/www/cgi-bin/users/user
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

#recebe o pedido de login e envia uma http response a informar se é um login válido
if [ "$REQUEST_METHOD" == "PUT" ]; then

  # Salva o Body que é transmitido no http request realizado e que está disponível no stdin
  if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> You must provide a nickname!</p>"; fi

  #variável à qual é atribuida o $CONTENT_FILE que representa o nickname do user
  NICKNAME=$(cat $CONTENT_FILE)

  USER_LOGIN=${USERS_GENERATOR}.$NICKNAME

  #vê quantos ficheiros existem na pasta de Users
  COUNT_USERS_ONLINE=$(ls -l $USERS_REPOSITORY|wc -l)
  COUNT_USERS_ONLINE=$(($COUNT_USERS_ONLINE - 1))

  # envia uma resposta com um erro a avisar que não são permitidos mais users online
  if [ $COUNT_USERS_ONLINE -eq 30 ]; then
  response "503 Service Unavailable" "<p> This chat is temporarily unavailable due to excessive load.</p>"
  fi

  # se não existir um ficheiro com o nome do user, o nickname é validado e acrescentado à pasta users
  if [ ! -e $USER_LOGIN ]; then
    echo "$NICKNAME" > $USER_LOGIN
    chmod a+w $USER_LOGIN
    response "200 OK" ""
  fi

  #gera erro caso o nome do User já exista na pasta users
  if [ -e $USER_LOGIN ]; then
   response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> This nickname already exists. Please enter a new nickname!</p>"
  fi
exit
fi

#contorna a necessidade do brownser fazer um OPTIONS devio à CORS Policy
if [ "$REQUEST_METHOD" == "OPTIONS" ]; then
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo "Access-Control-Allow-Methods: PUT, OPTIONS"
 echo ""
exit
fi

#gera erro caso o método não seja o adequado
response "405 Method Not Allowed" ""