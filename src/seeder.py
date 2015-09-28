"""This module is designed to generate seeds for the movie site

To generate the seeds it takes in a user's favorite movies and
calls out to various APIs to get more information about the movies.
It then outputs a list of media.Movie objects to a pickle(serialized)
file.
"""

import imdb
import media
import pickle
import os.path
import sys
import json

from apiclient.discovery import build
#from apiclient.errors import HttpError
#from oauth2client.tools import argparser

# Constants for the youtube api
DEVELOPER_KEY = "AIzaSyAIc1Ve2hBkf4k_H-Ue6bS26IGKNT3ljjE"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def get_favorite_movie_titles():
    """This function gets a users favorite movie titles from input
    Returns: list of strings(movie titles)
    """

    movie_titles = []
    done_adding = False

    # If the file exists. We give the user the opportunity to add to it.
    if os.path.isfile('cache/movie_seed.pickled'):
        print "Movies already in the database."
        print "Press 'n' to wipe it and start over."
        print "or press 'Enter' to add to it."

        # N starts over - anything else adds to the movies in the pickle file
        if raw_input() != "n":
            # Load the serialized movies
            with open('cache/movie_seed.pickled', 'rb') as movie_file:
                movies = pickle.load(movie_file)
                for movie in movies:
                    movie_titles.append(movie.title)

    # Prompt for more movies until the user says stop
    while done_adding != True:

        print "Type a favorite movie name (Press enter twice when done):",
        user_input = raw_input()

        # No input means stop
        if len(user_input) == 0:
            done_adding = True

        # Double commas separate multiple movie titles
        elif user_input.find(',,'):
            for title in user_input.split(',,'):
                movie_titles.append(title)

        # Single movie title was entered
        else:
            movie_titles.append(user_input)

    return movie_titles

# Look up movies on imdb
def lookup_movies(movie_titles):
    """This method will lookup movies by their titles using IMDB's API

    After retrieving the movie info from IMDB the program will then
    reach out to various other API's for additional information

    Args:
        movie_titles: list of strings
    Returns:
        movies: list of media.Movie objects
    """

    # Get an handle to the imdb api
    imdb_api = imdb.IMDb()

    movies = []
    for title in movie_titles:

        results = imdb_api.search_movie(title)

        # Initialize variables in case no data found
        our_title = title
        cover_url = ""
        plot_outline = ""

        # Take the first match and create the movie object
        if len(results) > 0:
            result = results[0]
            imdb_api.update(result)

            #from pprint import pprint
            #pprint(vars(result))

            # Parse the AKA for the movie.
            # The first one is usually the best.
            # The rest are specific to certain countries
            if 'akas' in result.keys() and len(result['akas']) > 0:
                our_title = result['akas'][0][:result['akas'][0].find('::')]
            else:
                our_title = result['title']

            if 'full-size cover url' in result.keys():
                cover_url = result['full-size cover url']

            if 'plot outline' in result.keys():
                plot_outline = result['plot outline']

        movie = media.Movie(
            our_title,
            plot_outline,
            cover_url,
            "",
            ""
        )

        youtube_lookup_trailer(movie)
        try:
            #goodreads_lookup_book(movie)
            google_lookup_book(movie)
        except: 
            print sys.exc_info()[0]

        movies.append(movie)

    return movies

def google_lookup_book(movie):
    books_api = build('books', 'v1')
    vol = books_api.volumes()
    request = vol.list(q = movie.title)

    bookResponse = request.execute()

    if len(bookResponse) > 0 and len(bookResponse['items']) > 0 and bookResponse['items'][0]['volumeInfo']['title'].lower() == movie.title.lower():
        print bookResponse['items'][0]['volumeInfo']['title']
        movie.google_books_id = bookResponse['items'][0]['id']
    
    return ""

def goodreads_lookup_book(movie):
    booksearch = [movie.title]
    from goodreads import client
    gc = client.GoodreadsClient("zkaEljr59glgBtXNfXlZ1A", "L2UGbEH54khYDvh3NbcAMCjHY7NpWf7nbO5WmGFikg")
    books = gc.search_books(booksearch, 1, "title")
    if len(books) > 0:
        print books[0].title

def youtube_lookup_trailer(movie):
    """This method will lookup a trailer for a movie

    Note the movies passed in will have their youtube movie id injected

    Args:
        movie: media.Movie object
    """

    movie.youtube_trailer_id = youtube_search(movie.title + ' Trailer')

def youtube_search(title):
    """This method will look up a movie on youtube by the title

    Args:
        title: string - the title of the movie
    Returns:
        movie_id: string key of the movie on youtube - empty if not found
    """

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                    developerKey=DEVELOPER_KEY)

    # Call the search.list method to retrieve results matching the specified
    # query term.
    search_response = youtube.search().list(
        q=title,
        part="id,snippet",
        maxResults=1
    ).execute()

    # Add each result to the appropriate list, and then display the lists of
    # matching videos, channels, and playlists.
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            return search_result["id"]["videoId"]

    return ""

def main():
    """Entry point of the seed program
    """

    # Ask the user for their favorite movies
    favorite_movie_titles = get_favorite_movie_titles()

    # Look up the movies on IMDB
    movies = lookup_movies(favorite_movie_titles)

    with open('cache/movie_seed.pickled', 'wb') as movie_file:
        pickle.dump(movies, movie_file)

main()
