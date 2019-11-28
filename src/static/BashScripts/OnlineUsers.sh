#!/bin/bash
#Devolve a lista dos users que fizeram log in
USERS_DIRECTORY=/var/www/cgi-bin/users

#função que gera os erros que são transmitidos nas response headers
response() {
 echo "Status: ${1}"
 echo "Content-type: text/plain"
 echo "Access-Control-Allow-Origin: *"
 echo ""
 echo "${2}"
exit
}

if [ "REQUEST_METHOD" == "GET" ]; then
   if [ -d $USER_DIRECTORY - ]; then
    #Take action if $USERS_DIRECTORY exists
    for filename in $(ls $USER_DIRECTORY); do
  echo "<p>$filename</p>"
    done;
  fi
fi

#gera erro caso o método não seja o adequado
response "405 Method Not Allowed" ""
