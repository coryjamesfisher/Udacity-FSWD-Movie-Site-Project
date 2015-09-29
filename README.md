Movie Site Generator
==================================================

Programs
--------------------------------------

1. [Seeder](docs/seeder.md)

    Downloads Movie/Book information and creates a data seed file
2. [Main Program](docs/main.md)

    Reads data seed file and creates a web page

Package Structure
--------------------------------------
|Folder/File                 | Purpose                                                                       |
|----------------------------|-------------------------------------------------------------------------------|
|**[init](init)**            | Bash script helper to install PIP and NPM dependencies
|**[seed](seed)**            | Bash script helper to run the Seeder Program which builds the movie cache
|**[run](run)**              | Bash script helper to run the Main Program which generates a web page
|[gulpfile.js](gulpfile.js)  | File holding project's gulp tasks. Useful for recompiling JSX/SCSS or minifying
|[package.json](package.json)| File holding project's NPM dependencies. This is used during the init script
|[bower.json](bower.json)    | File holding project's JavaScript/CSS dependencies. Used during init and a gulp task
|**[htdocs](htdocs)**        | Files used by the web page itself go here. Equivalent to htdocs in Apache     
|**[src](src)**              | All python application (non-install related) files go here                    
|   - [media.py](src/media.py)     | The module holding project's Movie object
|   - [seeder.py](src/seeder.py)   | The module for seeding project's movie data
|   - [program.py](src/program.py) | The main module run to generate the web page and open it                      
|   - [movie_site_generator.py](src/movie_site_generator.py)| The helper module that does the web page generation
|**[scss](scss)**            | All CSS style work should be done in this folder
|   - [styles.scss](scss/styles.sss) | The main SASS/CSS file for the project
|**[templates](templates)**  | All HTML work is done here
|   - [index.html](templates/index.html) | The HTML file for the site
|**[cache](cache)**          | A storage directory for the cached movie information
|   - [movie_seed.pickled](cache/movie_seed.pickled) | Movie information cache
|**[docs](docs)**            | Additional documentation files go here
|   - [seeder.md](docs/seeder.md) | Seeder Documentation
|   - [main.md](docs/main.md)     | Main Program Documentation
