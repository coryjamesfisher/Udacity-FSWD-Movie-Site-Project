import webbrowser
import os
import re
import json

def moviesToJson(movies):

    # Build a json representation of each movie and add it to
    # a json array
    jsonString = "["
    for movie in movies:
        jsonString = jsonString + json.dumps(movie.__dict__) + ","

    jsonString = jsonString[:-1] + "]"

    return jsonString

def open_movies_page(movies):
    # Create or overwrite the output file
    output_file = open('htdocs/index.html', 'w')

    # Load the index template
    template = open('templates/index.html', 'r')
    rendered_content = template.read()
    template.close()

    # Process template variables
    rendered_content = rendered_content.replace('"{%media%}"', moviesToJson(movies));

    # Output the file
    output_file.write(rendered_content)
    output_file.close()

    # open the output file in the browser (in a new tab, if possible)
    url = os.path.abspath(output_file.name)
    webbrowser.open('file://' + url, new=2)
