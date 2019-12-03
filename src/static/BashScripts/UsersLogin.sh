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

#request to get the login
if [ "$REQUEST_METHOD" == "PUT" ]; then

  # Save Body content (available in the STDIN)
  if [ "$CONTENT_LENGTH" -ne 0 ]; then cat > $CONTENT_FILE; else response "400 Bad Request" "<p><i class='fas fa-exclamation-circle'></i> You must provide a nickname!</p>"; fi

  #variável à qual é atribuida o $CONTENT_FILE que é o nickname do utilizador
  NICKNAME=$(cat $CONTENT_FILE)

  USER_LOGIN=${USERS_GENERATOR}.$NICKNAME

  #criar COUNT_USERS_ONLINE - vê quantas ficheiros existem na pasta de Users
  COUNT_USERS_ONLINE=$(ls -l $USERS_REPOSITORY|wc -l)
  COUNT_USERS_ONLINE=$(($COUNT_USERS_ONLINE - 1))

  # Error : reached limit of users online
  if [ $COUNT_USERS_ONLINE -eq 30 ]; then
  response "503 Service Unavailable" "<p> This chat is temporarily unavailable due to excessive load.</p>"
  fi

  # Create USER_LOGIN file if does not exist and Nickname can be added
  if [ ! -e $USER_LOGIN ]; then
    echo " user is: $USER_LOGIN"
    echo "$NICKNAME" > $USER_LOGIN
    chmod a+w $USER_LOGIN
    response "200 OK" ""
  fi

  #gera erro caso caso o nome do User já exista no usersLogin.log
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
