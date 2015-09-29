[Movie Site Generator](../README.md)
==================================================

Build Requirements
--------------------------------------

1. [NodeJS](https://docs.npmjs.com/getting-started/installing-node) - NodeJS JavaScript Package Manager used to install many build tools
2. [Python](https://www.python.org/downloads/) - Python Programming Language

Building
--------------------------------------

1. Ensure that the requirements above have been satisfied.

	**Run the following commands with sudo or as root**

	* On debian based systems:
		```bash
		sudo apt-get update && \
		sudo apt-get install -y nodejs npm python-dev libxml2-dev libxslt1-dev && \
		sudo ln -s /usr/bin/nodejs /usr/bin/node && \
		sudo npm install
		```
	
	* On redhat based systems:
		```bash
		sudo yum install nodejs npm && \
		sudo npm install
		```
2. Initialize the application

	```bash
	sudo ./init
	```

