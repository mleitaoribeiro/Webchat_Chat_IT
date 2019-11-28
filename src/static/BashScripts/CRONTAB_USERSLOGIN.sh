#!/bin/bash
/15 * * * * sudo find /var/cgi-bin/users -type f -mmin +15 -exec rm {} \;
