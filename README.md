## AntiSocial social-media experiments

Installation:
packages:
- apache2 python-mysqldb mysql-server mysql-client
setup apache:
# `sudo a2enmod ssl`
# `sudo a2enmod cgi`
# `sudo a2enmod rewrite`
# `sudo a2enmod headers`
# `sudo service apache2 restart`

setup mysql:
# `sudo mysql --user=root mysql` (to log in as root user)
# `create user 'simoncgi' identified by 'passsword';`
# `grant all privileges on * . * to 'simoncgi';`

setup database (within mysql command prompt):
# `source database_setup.sql;`

Create log dir:
# `sudo mkdir -p /var/log/antisocial/logs`
# `sudo chown -R simon.www-data /var/log/antisocial`
# `sudo chmod -R g+wx /var/log/antisocial`

Install placeholder images:
# (from repo dir) `scp public/resource/img/* node-simon:antisocial/img`


## Running:
- To list: `pm2 list`
- To stop: `pm2 delete antisocial`
- To start (in nextjs dir): `pm2 start yarn --name "antisocial" --interpreter bash -- start`

