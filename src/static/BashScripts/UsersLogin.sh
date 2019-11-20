#!/bin/bash
OUTPUT_BASE_MESSAGES=/var/www/cgi-bin/usersLogin.log
if [ "REQUEST_METHOD" == "PUT" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  if [ ! $M_CONTENTE_FILE ]; then
    echo "<b>Welcome to Chat IT!!</b>" >> $OUTPUT_BASE_MESSAGES
  fi
  OUTPUT_MESSAGES=$(cat $OUTPUT_BASE_MESSAGES|tail -20)
  exit
fi