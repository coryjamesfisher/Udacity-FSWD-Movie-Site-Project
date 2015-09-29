[Movie Site Generator](../README.md)
==================================================

Build Requirements
--------------------------------------

1. [NodeJS](https://docs.npmjs.com/getting-started/installing-node) - NodeJS JavaScript Package Manager used to install many build tools
2. [PIP](https://pip.pypa.io/en/latest/installing/) - Python Package Manager used to install 3rd party api clients


Building
--------------------------------------

1. Ensure that the requirements above have been satisfied.

	On debian based systems:
	```bash
	apt-get update && \
	apt-get install nodejs npm python-dev libxml2-dev libxslt1-dev && \
	ln -s /usr/bin/nodejs /usr/bin/node && \
	npm install
	```
	
	On redhat based systems:
	```bash
	yum install nodejs npm && \
	npm install
	```
2. Install the python dependencies

	```bash
	sudo pip -r requirements.txt
	```
3. Install the npm dependencies

	```bash
	sudo npm install
	```

