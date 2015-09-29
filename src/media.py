"""
This module contains datastructures surrounding
media objects.
"""

class Movie(object):
    """Class representing a movie in the application

    See the constructor for public property information.
    """

    __module__ = "media"
    __name__ = "Movie"

    def __init__(self, movie_title, movie_storyline,
                 poster_image, trailer_youtube, book_google):
        """Creates a Movie object

        Args:
            movie_title: string containing the movie's title
            movie_storyline: string containing the movie's plot/storyline
            poster_image: string containing the URL of the poster image
            trailer_youtube: string ID of the video for the trailer
            book_google: string ID of the book matching the movie's name
        """

        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.youtube_trailer_id = trailer_youtube
        self.google_book_id = book_google

