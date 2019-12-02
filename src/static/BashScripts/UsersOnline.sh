#!/bin/bash
DATE=$(date +%s%N)
USERS_REPOSITORY=/var/www/cgi-bin/users
USER_LIST=/var/www/cgi-bin/userOnline.$DATE.log

if [ "$REQUEST_METHOD" == "GET" ]; then
 #gerar pesquisa caso o repositório exista
 if [ -d $USERS_REPOSITORY ];  then
  cd $USERS_REPOSITORY
  echo "" > $USER_LIST
  # shellcheck disable=SC2045
  for user in $(ls $USERS_REPOSITORY); do
    echo "<p><i class='fas fa-circle' style='color:limegreen; font-size:7px;'></i> ${user##*.}</p>" >> $USER_LIST
 done
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "$(cat $USER_LIST)"
 rm $USER_LIST
 fi
 exit
fi

#gera erro caso o método não seja adequado
echo "405 Method Not Allowed"



