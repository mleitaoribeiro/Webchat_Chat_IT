#!/bin/bash
OUTPUT_BASE_MESSAGES=/var/www/cgi-bin/outputBox.log
if [ "REQUEST_METHOD" == "GET" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  if [ ! -f $OUTPUT_BASE_MESSAGES ]; then
    echo "<b>Welcome to Chat IT!!</b>" >> $OUTPUT_BASE_MESSAGES
  fi
  OUTPUT_MESSAGES=$(cat $OUTPUT_BASE_MESSAGES|tail -20)
  echo "$OUTPUT_MESSAGES"
  exit
fi
if [ "REQUEST_METHOD" == "POST" ]; then
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  DATE=$(date+"%R")
  echo "<p><b>$DATE</b> $(cat "$M_CONTENT_FILE")</p>" >> $OUTPUT_BASE_MESSAGES
  exit
fi
echo "Status: 400 Bad Request"
