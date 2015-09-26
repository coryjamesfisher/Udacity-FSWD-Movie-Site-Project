# coding=UTF-8
import movie_site_generator
import media
import json
import pickle

# Load the serialized movies
with open('cache/movie_seed.pickled','rb') as f:
    movies = pickle.load(f)

# Load the site in the browser
movie_site_generator.open_movies_page(movies)

