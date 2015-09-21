# coding=UTF-8
import fresh_tomatoes
import media
import json

#toy_story = media.Movie("Toy Story", "A movie about a boy and his toys", "http://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg", "https://www.youtube.com/watch?v=vwyZH85NQC4")
#toy_story.show_trailer()

movies = []
movies.append(media.Movie("Spirited Away", "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.", "https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.JPG", "https://www.youtube.com/watch?v=ByXuk9QqQkk"))
movies.append(media.Movie(
"Princess Mononoke",
"On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
"http://ia.media-imdb.com/images/M/MV5BMjgzNTUwODQzN15BMl5BanBnXkFtZTcwMTc4ODE3OQ@@._V1_SX214_AL_.jpg",
"https://www.youtube.com/watch?v=4OiMOHRDs14"
))
movies.append(media.Movie(
"Howl's Moving Castle",
"When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
"http://ia.media-imdb.com/images/M/MV5BMTY1OTg0MjE3MV5BMl5BanBnXkFtZTcwNTUxMTkyMQ@@._V1_SX214_AL_.jpg",
"https://www.youtube.com/watch?v=iwROgK94zcM"
))
movies.append(media.Movie(
"Kiki's Delivery Service",
"A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
"http://ia.media-imdb.com/images/M/MV5BOTc0ODM1Njk1NF5BMl5BanBnXkFtZTcwMDI5OTEyNw@@._V1_SY317_CR4,0,214,317_AL_.jpg",
"https://www.youtube.com/watch?v=4bG17OYs-GA"
))
movies.append(media.Movie(
"Nausicaä of the Valley of the Wind",
"Warrior/pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet.",
"http://ia.media-imdb.com/images/M/MV5BMTM1NjIxNTY4OF5BMl5BanBnXkFtZTcwNDE5MDIyNw@@._V1_SY317_CR5,0,214,317_AL_.jpg",
"https://www.youtube.com/watch?v=6zhLBe319KE"
))

#booksearch = ["Dune", "Ender's Game"]
#from goodreads import client
#gc = client.GoodreadsClient("zkaEljr59glgBtXNfXlZ1A", "L2UGbEH54khYDvh3NbcAMCjHY7NpWf7nbO5WmGFikg")
#books = gc.search_books(booksearch, 1, "title")
#print(books)
fresh_tomatoes.open_movies_page(movies)
