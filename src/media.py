import webbrowser
class Movie():
	__module__ = "media"
	__name__ = "Movie"

	def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube):
		self.title = movie_title
		self.storyline = movie_storyline
		self.poster_image_url = poster_image
		self.youtube_trailer_id = trailer_youtube

