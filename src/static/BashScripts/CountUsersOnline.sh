#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/users

#faz a contagem dos users online
if [ "$REQUEST_METHOD" == "GET" ]; then
 #só vai contar caso o repositório exista
 if [ -d $USERS_REPOSITORY ];  then
  #abre a pasta que contém os users
  cd $USERS_REPOSITORY
  COUNT_USERS=$(ls $USERS_REPOSITORY | wc -l)
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  #responde com o número de users online
  echo "$COUNT_USERS"
 fi
 exit
fi

#gera erro caso o método não seja adequado
echo "405 Method Not Allowed"