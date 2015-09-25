import webbrowser
import os
import re
import json

def moviesToJson(movies):

    jsonString = "["
    for movie in movies:
        jsonString = jsonString + json.dumps(movie.__dict__) + ","

    jsonString = jsonString[:-1] + "]"

    return jsonString

def open_movies_page(movies):
    # Create or overwrite the output file
    output_file = open('movie_madness.html', 'w')

    main_page_head = ""
    template = open('movies.html', 'r')
    rendered_content = template.read()
    template.close()

    rendered_content = rendered_content.replace('"{%media%}"', moviesToJson(movies));

    # Replace the movie tiles placeholder generated content
    #rendered_content = main_page_content.format(
    #    movie_tiles=create_movie_tiles_content(movies))

    # Output the file
    output_file.write(main_page_head + rendered_content)
    output_file.close()

    # open the output file in the browser (in a new tab, if possible)
    url = os.path.abspath(output_file.name)
    webbrowser.open('file://' + url, new=2)
