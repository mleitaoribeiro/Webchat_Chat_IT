#!/bin/bash
VAR_EMAIL=/var/www/cgi-bin/emailContent
M_CONTENT_FILE=${1}
to="1191743@isep.ipp.pt"
if [ "$REQUEST_METHOD" == "POST" ]; then
echo "Content-type: text/plain"
echo "Access-Control-Allow-Origin: *"
echo ""
if [ ! -f $VAR_EMAIL ]; then echo "" >> $VAR_EMAIL; fi
echo "$(date) $(echo "$M_CONTENT_FILE")" > $VAR_EMAIL
sendmail $to < $VAR_EMAIL
exit
fi
echo "Status: 400 Bad Request"