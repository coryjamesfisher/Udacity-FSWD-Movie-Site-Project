[Movie Site Generator](../README.md)
==================================================

Build Requirements
--------------------------------------

1. [NodeJS](https://docs.npmjs.com/getting-started/installing-node) - NodeJS JavaScript Package Manager used to install many build tools
2. [Python](https://www.python.org/downloads/) - Python Programming Language

Build Instructions
--------------------------------------

1. Ensure that the requirements above have been satisfied.

	**Run the following commands with sudo or as root**

	* On debian based systems:
		```bash
		sudo apt-get update && \
		sudo apt-get install -y git nodejs npm python-dev libxml2-dev libxslt1-dev && \
		sudo ln -s /usr/bin/nodejs /usr/bin/node && \
		sudo npm install
		```
	
	* On redhat based systems:
		```bash
		curl -sL https://rpm.nodesource.com/setup | bash - && \
		yum install -y git python-devel.x86_64 nodejs libxml2-devel.x86_64 libxslt-devel.x86_64 gcc.x86_64
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

###1. Build Tools###
1. NPM (Node Js)

	This tool is useful because it can install many other build tools that greatly
	assist in development. The main tools installed using node are as follows:
	
	*For more info check out the project's [package.json](../package.json) file where all of the module dependencies are defined*
	* Gulp
	* Bower
	* SASS
	* CSS Minifier

2. Gulp (Installed from Node)

	This tool is useful because it acts as a JavaScript task manager. It has a useful
	stream syntax that allows you to pipe source files to Gulp modules. We use this as
	our primary build tool. If you need to update the jsx/sass files or bower dependencies
	you would run: ```gulp init```. 

	*For more info try ```gulp help``` or take a look at the [gulpfile.js](../gulpfile.js) file.*

3. SASS (CSS Precompiler - Run from a Gulp Task)

	This tool is useful because it simplifies your CSS syntax but expanding a nested curly
	brace structure into fully qualified CSS selectors. It also has support for variables
	and plugins of it's own. We compile our grid system (Susy) as well as some responsive
	helper mixins. 

	*See [styles.scss](../scss/styles.scss) or take a look at the sass task in [gulpfile.js](../gulpfile.js).*
4. Bower (JS/CSS Dependency/Package Manager)

	This tool is useful because it will download and manage javascript package
	versions and dependencies. We install Susy, Compass Breakpoint, NormalizeCSS, Remodal, and jQuery with Bower. 

	*See the [bower.json](../bower.json) file for more information.*

###2. CSS Technologies###
1. Susy - A pure CSS responsive grid solution.
2. Compass Breakpoint - Helps us build Susy grids with easy responsive breakpoints.
3. NormalizeCSS - Forces browsers to render elements closer to modern standards.

###3. JS Technologies###
1. jQuery - The worlds most used JavaScript library
2. JSX - A descendent of JavaScript which allows html to be written free-form in the JS code. This compiles to plain JavaScript using a task in [gulpfile.js](../gulpfile.js).
3. ReactJS - Facebook's newest framework for creating a JavaScript component+event model for page elements.
4. Modernizr.js - Enables feature detection/shiming for HTML5
5. Remodal - A simple jQuery modal plugin
6. 

###4. Program Flow###
1. Load Movie Titles
	1. Ask the user if they want to modify the existing file or start from sratch.
	2. If modifying existing preload the movies from the file
	3. Allow the user to type in movies all one one line separated by **,,** or one movie on each line
2. Pull Information from APIs
	1. A loop processes one movie at a time that way we don't make APIs angry by making the calls too fast
	2. First we get the base info from the IMDB API
	3. Then we attempt to get a youtube video id matching the trailer from the Youtube API
	4. Finally we try to get a google books id matching the book from the Google Books API
3. Write Movie Information to a File
	1. Info is written in pickle format to cache/movie_seed.pickled where it can be picked up by the [Main Program](site_generator.md) program
	
