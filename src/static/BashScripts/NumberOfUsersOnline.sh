#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/users

#função que gera os erros que são transmitidos nas response header

if [ "$REQUEST_METHOD" == "GET" ]; then
 #só vai contar caso o repositório exista
 if [ -d $USERS_REPOSITORY ];  then
  cd $USERS_REPOSITORY
  COUNT_USERS=$(ls $USERS_REPOSITORY | wc -l)
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  echo "$COUNT_USERS"
 fi
 exit
fi

#gera erro caso o método não seja adequado
echo "405 Method Not Allowed"