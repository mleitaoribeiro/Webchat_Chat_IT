#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log
if [ "REQUEST_METHOD" == "GET" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  if [ ! -f $OUTPUT_ROOM_MESSAGES ]; then
    echo "<b>Welcome to Chat IT!!</b>" >> $OUTPUT_ROOM_MESSAGES
  fi
  OUTPUT_MESSAGES=$(cat $OUTPUT_ROOM_MESSAGES|tail -20)
  echo "$OUTPUT_MESSAGES"
  exit
fi
if [ "REQUEST_METHOD" == "POST" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  DATE=$(date+"%R")
  echo "<p><b>$DATE</b> $(cat "$M_CONTENT_FILE")</p>" >> $OUTPUT_ROOM_MESSAGES
  exit
fi
echo "Status: 400 Bad Request"