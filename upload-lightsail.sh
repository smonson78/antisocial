#!/bin/sh

# Create production.vars first!

yarn build || exit 1

tar zcf antisocial-site.tar.gz .next package.json .env.production public node_modules || exit 1

owner=simon.www-data
dest=node-simon

ssh $dest "rm -rf old-nextjs" || exit 1
sleep 2

scp antisocial-site.tar.gz $dest: || exit 1
sleep 2

install_cmd='rm -rf install.tmp && mkdir install.tmp && tar zxf antisocial-site.tar.gz -C install.tmp && mkdir -p antisocial/nextjs && mv antisocial/nextjs old-nextjs && mv install.tmp antisocial/nextjs'
ssh $dest "$install_cmd" || exit 1
echo "Installed NextJS site"
sleep 2

install_cmd1='rm -rf install.ws.tmp && mkdir install.ws.tmp'
ssh $dest "$install_cmd1" || exit 1
sleep 2

# Install production version of smonson.vars
scp production.vars $dest:install.ws.tmp/antisocial.vars || exit 1
sleep 2

install_cmd25='chmod o-rwx install.ws.tmp/* && chmod o+rx install.ws.tmp/*.cgi'
ssh $dest "$install_cmd25" || exit 1
sleep 2

install_cmd31='sudo mkdir -p antisocial/img /var/log/antisocial/logs'
ssh $dest "$install_cmd31" || exit 1
echo "Created default directories"
sleep 2

install_cmd21='sudo chown -R '$owner' antisocial'
ssh $dest "$install_cmd21" || exit 1
echo "Set file ownership"
sleep 2

ssh $dest "rm -rf old-nextjs" || exit 1
echo "Deleted temporary files"
