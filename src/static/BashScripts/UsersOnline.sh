#!/bin/bash
DATE=$(date +%s%N)
USERS_REPOSITORY=/var/www/cgi-bin/users
USER_LIST=/var/www/cgi-bin/userOnline.$DATE.log

#faz a listagem dos users online
if [ "$REQUEST_METHOD" == "GET" ]; then
 #gerar pesquisa caso o repositório exista
 if [ -d $USERS_REPOSITORY ];  then
  #abre a pasta que contém os users
  cd $USERS_REPOSITORY
  echo "" > $USER_LIST
  #armazena na variável user a lista de cada user existente na pasta users
  # shellcheck disable=SC2045
  for user in $(ls $USERS_REPOSITORY); do
    echo "<p><i class='fas fa-circle' style='color:limegreen; font-size:7px;'></i> ${user##*.}</p>" >> $USER_LIST
 done

 #envia http response com a lista atualizada dos users Online
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "$(cat $USER_LIST)"
 #remove o ficheiro auxiliar criado
 rm $USER_LIST
 fi
 exit
fi

#gera erro caso o método não seja adequado
echo "405 Method Not Allowed"



