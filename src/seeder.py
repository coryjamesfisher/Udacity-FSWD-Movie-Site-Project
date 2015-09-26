import imdb
import json
import media
import pickle
import os.path

# Get the users favorite movies
def get_favorite_movie_titles():
    movie_titles = []
    done_adding = False

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

    ia = imdb.IMDb() # by default access the web.

    movies = []
    for title in movie_titles:

        results = ia.search_movie(title)

        # Take the first match and create the movie object
	result = results[0]
	ia.update(result)

#        from pprint import pprint
#        pprint (vars(result))
	our_title = result['aka'][0][:result['aka'][0].find('::')]
        
	movie = media.Movie(
		our_title,
		result['plot outline'],
		result['full-size cover url'],
		""
	)
	movies.append(movie)

    return movies

# Ask the user for their favorite movies
favorite_movie_titles = get_favorite_movie_titles()

print favorite_movie_titles

# Look up the movies on IMDB
movies = imdb_lookup_movies(favorite_movie_titles)

with open('cache/movie_seed.pickled', 'wb') as f:
    pickle.dump(movies, f)

