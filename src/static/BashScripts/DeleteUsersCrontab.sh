#comando que pesquisa os users que estão offline por mais de 20 min e os elimina
#foi colocado no Crontab
find /var/www/cgi-bin/users -type f -mmin +20 -exec rm {} \;