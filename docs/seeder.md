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

Technology Overview
--------------------------------------
As this project was academic I attempted to use as many
unfamiliar (but useful) technologies as possible. As a result
the build process is slightly more complicated but demonstrates an
effective use of the following technologies.

1. Build Tools
	1. NPM (Node Js)
		This tool is useful because it can install many other build tools that greatly
		assist in development. The main tools installed using node are as follows:
		
		*Note you can find more info in NodeJS's [package.json](../package.json) file where all of the module dependencies are defined*
		* Gulp
		* Bower
		* SASS
		* CSS Minifier

	2. Gulp (Installed from Node)
		This tool is useful because it acts as a JavaScript task manager. It has a useful
		stream syntax that allows you to pipe source files to Gulp modules. We use this as
		our primary build tool. If you need to update the jsx/sass files or bower dependencies
		you would run: ```gulp init```. For more information see ```gulp help``` or take a look
		at the [gulpfile.js](../gulpfile.js) file.

	3. SASS (CSS Precompiler - Run from a Gulp Task)
		This tool is useful because it simplifies your CSS syntax but expanding a nested curly
		brace structure into fully qualified CSS selectors. It also has support for variables
		and plugins of it's own. We compile our grid system (Susy) as well as some responsive
		helper mixins.
	4. Bower (JS/CSS Dependency/Package Manager)
		
