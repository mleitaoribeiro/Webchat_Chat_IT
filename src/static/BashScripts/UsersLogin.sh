#!/bin/bash
USER_REPOSITORY=/cgi-bin/usersLogin.log
if [ "REQUEST_METHOD" == "PUT" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  if [ ! -f $USER_REPOSITORY]; then
    touch $USERS_REPOSITORY
  fi
  IS_IN_REPOSITORY=$(grep -c "^($M_CONTENT_FILE)$" $USERS_REPOSITORY)
  COUNT_USERS_ONLINE = $(cat $USERS_REPOSITORY| wc -l)
  if [ $IS_IN_REPOSITORY -eq "0"]; then
    $M_CONTENT_FILE >> $USERS_REPOSITORY
  fi
  if [ $IS_IN_REPOSITORY -gt "0" ]; then
    echo "<p><i class='fas fa-exclamation-circle'></i> This nickname already exists. Please enter a new one!</p>"
  fi
  if [ $COUNT_USERS_ONLINE -eq "50" ]; then
  echo "<p> This chat is temporarily unavailable due to excessive load.</p>"
  fi
fi
