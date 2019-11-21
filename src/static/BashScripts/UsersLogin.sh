#!/bin/bash
USERS_REPOSITORY=/var/www/cgi-bin/usersLogin.log
if [ "$REQUEST_METHOD" == "POST" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  if [ ! -f $USERS_REPOSITORY ]; then
    touch $USERS_REPOSITORY && chmod a+w+x $USERS_REPOSITORY
  fi
  IS_IN_REPOSITORY=$(cat ${USERS_REPOSITORY}|grep -c "($M_CONTENT_FILE)")
  echo $IS_IN_REPOSITORY
  COUNT_USERS_ONLINE=$(cat $USERS_REPOSITORY|wc -l)
  if [ $IS_IN_REPOSITORY -eq 0 ]; then
    echo "$M_CONTENT_FILE" >> $USERS_REPOSITORY
  fi
  if [ $IS_IN_REPOSITORY -gt 0 ]; then
    echo "<p><i class='fas fa-exclamation-circle'></i> This nickname already exists. Please enter a new one!</p>"
  fi
  if [ $COUNT_USERS_ONLINE -eq 50 ]; then
    echo "<p> This chat is temporarily unavailable due to excessive load.</p>"
  fi
  exit
fi
echo "Status: 400 Bas Request"

