#! /bin/sh

# En el archivo de ~/.ssh/config:
# Host demo-swarm-manager-01
# 	Hostname XXXXXXXXXXXXX.compute.amazonaws.com
# 	User docker
# 	IdentityFile /Users/XXXXX/.ssh/id_rsa

ssh -NL localhost:2374:/var/run/docker.sock "docker@${1}" &
export DOCKER_HOST="localhost:2374"
