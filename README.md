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
|Folder/File                                                | Purpose                                                                       |
|-----------------------------------------------------------|-------------------------------------------------------------------------------|
|[htdocs](htdocs)                                           | Files used by the web page itself go here. Equivalent to htdocs in Apache     |
|[src](src)                                                 | All python application (non-install related) files go here                    |
|   - [media.py](src/media.py)                              | The module holding our Movie object                                           |
|   - [seeder.py](src/seeder.py)                            | The module for seeding our movie data                                         |
|   - [program.py](src/program.py)                          | The main module run to generate the web page and open it                      |
|   - [movie_site_generator.py](src/movie_site_generator.py)| The helper module that does the web page generation                           |
