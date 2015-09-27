# coding=UTF-8
"""This file loads the movies from a pickle file and generates the web page
"""

import movie_site_generator
import pickle

def load_movies():
    """This method will load the movies from a pickle file
    """

    # Load the serialized movies
    with open('cache/movie_seed.pickled', 'rb') as movie_file:

        # Deserialize the movies
        return pickle.load(movie_file)

# Load the site in the browser
movie_site_generator.open_movies_page(load_movies())
