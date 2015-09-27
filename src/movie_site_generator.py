"""This module is used to create a web page from a list of movies

After creating the web page it will launch it in the user's
web browser.
"""

import webbrowser
import os
import json

def movies_to_json(movies):
    """This method will convert movie objects to a json array
    Args:
        movies: list of media.Movie objects
    """

    # Build a json representation of each movie and add it to
    # a json array
    json_string = "["
    for movie in movies:
        json_string = json_string + json.dumps(movie.__dict__) + ","

    # Strip trailing comma and close the array bracket
    json_string = json_string[:-1] + "]"

    return json_string

def open_movies_page(movies):
    """ Creates an html file and opens it in the browser
    Args:
        movies: list of media.Movie objects
    """

    # Create or overwrite the output file
    output_file = open('htdocs/index.html', 'w')

    # Load the index template
    template = open('templates/index.html', 'r')
    rendered_content = template.read()
    template.close()

    # Process template variables
    rendered_content = rendered_content.replace('"{%media%}"',
                                                movies_to_json(movies))

    # Output the file
    output_file.write(rendered_content)
    output_file.close()

    # open the output file in the browser (in a new tab, if possible)
    url = os.path.abspath(output_file.name)
    webbrowser.open('file://' + url, new=2)
