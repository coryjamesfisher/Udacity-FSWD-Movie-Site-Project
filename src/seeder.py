import imdb
import json
import media
import pickle
import os.path

from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser


# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
#   https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = "AIzaSyAIc1Ve2hBkf4k_H-Ue6bS26IGKNT3ljjE"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


# Get the users favorite movies
def get_favorite_movie_titles():
    movie_titles = []
    done_adding = False

    # If the file exists. We give the user the opportunity to add to it.
    if os.path.isfile('cache/movie_seed.pickled'):
	   print "Movies already in the database."
           print "Press 'n' to wipe it and start over."
           print "or press 'Enter' to add to it." 
           if raw_input() != "n":
               # Load the serialized movies
               with open('cache/movie_seed.pickled','rb') as f:
                   movies = pickle.load(f)
                   for movie in movies:
                       movie_titles.append(movie.title)

    while (done_adding != True):

        print "Type a favorite movie name (Press enter twice when done):",
        user_input = raw_input()

        if len(user_input) == 0:
          done_adding = True
        elif user_input.find(',,'):
            for title in user_input.split(',,'):
              movie_titles.append(title)
        else:
            movie_titles.append(user_input)

    return movie_titles

# Look up movies on imdb
def imdb_lookup_movies(movie_titles):

    # Get an handle to the imdb api
    ia = imdb.IMDb()

    movies = []
    for title in movie_titles:

        results = ia.search_movie(title)

        # Take the first match and create the movie object
	result = results[0]
	ia.update(result)

	#from pprint import pprint
	#pprint(vars(result))

	# Parse the AKA for the movie.
        # The first one is usually the best.
        # The rest are specific to certain countries
	if 'aka' in result.keys() and len(result['aka']) > 0:
          our_title = result['aka'][0][:result['aka'][0].find('::')]
        else:
          our_title = result['title']

        if 'full-size cover url' in result.keys():
          cover_url = result['full-size cover url']
        else:
          cover_url = ""
        
	movie = media.Movie(
		our_title,
		result['plot outline'],
		cover_url,
		""
	)
	movies.append(movie)

    return movies

def youtube_lookup_trailers(movies):
    for movie in movies:
        movie.youtube_trailer_id = youtube_search(movie.title + ' Trailer')

    return movies

def youtube_search(title):
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

# Ask the user for their favorite movies
favorite_movie_titles = get_favorite_movie_titles()

# Look up the movies on IMDB
movies = imdb_lookup_movies(favorite_movie_titles)
movies = youtube_lookup_trailers(movies)

with open('cache/movie_seed.pickled', 'wb') as f:
    pickle.dump(movies, f)

