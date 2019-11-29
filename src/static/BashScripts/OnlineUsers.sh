#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/users

#função que gera os erros que são transmitidos nas response headers
response() {
 echo "Status: ${1}"
 echo "Contente-type: text/plain"
 echo "Acess-Control-Allow-Origin: *"
 echo ""
 echo "${2}"
 exit
}

if [ "REQUEST_METHOD" == "GET" ]; then
 #gerar pesquisa caso o repositório exista
 if [ -d $USERS_REPOSITORY ];  then
   cd $USERS_REPOSITORY
   for user in $(ls $USERS_REPOSITORY); do
   response "200 OK" "<p>${user##*.}</p>"
  done
 fi
 exit
 fi

#gera erro caso o método  não seja adequado
response "405 Method Not Allowed" ""


