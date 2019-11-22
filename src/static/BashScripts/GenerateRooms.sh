#!/bin/bash
OUTPUT_ROOM_MESSAGES=/var/www/cgi-bin/outputRoom.log

error_response() {
    echo "Status: 400 Bad Request"
    echo "Content-type: text/plain"
    echo ""
    echo "ERROR: ${1}"
  exit
}

if [ -z "$QUERY_STRING" ]; then error_response "No query-string"; fi

ROOM=${QUERY_STRING#room=}

if [ "$ROOM" == "$QUERY_STRING" ]; then error_response "Bad query-string: $QUERY_STRING"; fi
case "$ROOM" in
  just4Fun|youShellNotPass|bashtardsOnly);;
  *) error_response "Invalid hash algorithm: $ROOM";;
esac

OUTPUT_MESSAGES=${OUTPUT_ROOM_MESSAGES}.$ROOM

if [ ! -f $OUTPUT_MESSAGES ]; then
  echo "<b>Welcome to Chat IT!!</b>" >> $OUTPUT_MESSAGES
fi

if [ "REQUEST_METHOD" == "GET" ]; then
  OUTPUT_ROOM=$(cat $OUTPUT_MESSAGES|tail -20)
  echo "Content-type: text/plain"
  echo "Access-Control-Allow-Origin: *"
  echo ""
  echo "$OUTPUT_ROOM"
  exit
fi

echo "Status: 400 Bad Request"
