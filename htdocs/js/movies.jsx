	var MovieTrailerModal = React.createClass({
		render: function() {

			if (this.props.open == true) {
				var trailerYouTubeId = this.props.youtube_trailer_id;
				var sourceUrl = 'http://www.youtube.com/embed/' + trailerYouTubeId + '?autoplay=1&html5=1';
				var trailerModal = $('.trailer_modal');
				trailerModal.find('div').remove().end().find('a').remove();
				
				var container = $('<div></div>');
				container.append($("<iframe></iframe>", {
				  'id': 'trailer-video',
				  'type': 'text-html',
				  'src': sourceUrl,
				  'frameborder': 0,
				  'width': 480,
				  'height': 390,
				  'allowfullscreen': ''
				}));

				if (this.props.google_book_id) {
					container.append($('<a></a>', {
						'href': 'https://books.google.com/books?id=' + this.props.google_book_id,
						'target': '_blank',
						'class': 'book-link'
					}).text('Check Out the Book'));
				}

				trailerModal.append(container);

				self = this;
				trailerModal.remodal().open();
				trailerModal.on('closed', function() {
					self.props.onCloseModal();
					trailerModal.find('div').remove();
				});
				
			}

			// Note this is currently a stub component.
			// @todo figure out how to make reactJS play well with others
			return (
				<div></div>	
			);
		}
	});

	var MovieGridCard = React.createClass({
		handleClick: function() {
			this.props.onGridClick(this.props.movie.youtube_trailer_id, this.props.movie.google_book_id);	
		},
		render: function() {

			var mov = this.props.movie;

			return (
				<section onClick={this.handleClick} className="movie-grid-card">

					<figure data-trailer-id={mov.youtube_trailer_id}>
						<img src={mov.poster_image_url}/>
						<figcaption>{mov.title}</figcaption>
					</figure>
					{mov.storyline}
				</section>
			)
		}
	});

	var SearchBar = React.createClass({
	handleChange: function() {
	    this.props.onUserInput(
		this.refs.filterTextInput.getDOMNode().value,
		this.refs.moviesWithBooksInput.getDOMNode().checked
	    );
	},
	render: function() {
	    return (
		<form>
		<span className="movie-search-label">Find Movies:</span>
		<input
		    type="text"
		    placeholder="Enter a Movie Title"
		    value={this.props.filterText}
		    ref="filterTextInput"
		    onChange={this.handleChange}
		    />
		<p>
		    <input
			type="checkbox"
			checked={this.props.moviesWithBooks}
			ref="moviesWithBooksInput"
			onChange={this.handleChange}
			/>
		    {' '}
		    Only show movies with books
		</p>
		</form>
	    );
	}
	});

	var MovieGrid = React.createClass({
		getInitialState: function() {
			return {
				youtube_trailer_id: "",
				google_book_id: "",
				is_modal_open: false
			}
		},
		openModal: function(trailer_id, book_id) {
			this.setState({is_modal_open: true, youtube_trailer_id: trailer_id, google_book_id: book_id});
		},
		closeModal: function() {
			this.state.is_modal_open = false;
		},
		render: function() {

			var rows = [];

			this.props.movies.forEach(function(movie) {

				if (movie.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
					return;
				}

				if (this.props.moviesWithBooks === true && movie.google_book_id.length == 0) {
					return;
				}

				rows.push(<MovieGridCard onGridClick={this.openModal} movie={movie} key={movie.title}></MovieGridCard>);
			}.bind(this));

			return (
			<div>
				<div>{rows}</div>
				<MovieTrailerModal youtube_trailer_id={this.state.youtube_trailer_id} google_book_id={this.state.google_book_id} open={this.state.is_modal_open} onCloseModal={this.closeModal}></MovieTrailerModal>
			</div>
			);
		}
	});

	var MoviePage = React.createClass({
	getInitialState: function() {
	    return {
	    filterText: '',
	    moviesWithBooks: false
	    };
	},

	handleUserInput: function(filterText, moviesWithBooks) {
	    this.setState({
	    filterText: filterText,
	    moviesWithBooks: moviesWithBooks
	    });
	},

	render: function() {
	    return (
		<div className="movie-page">
		<SearchBar
		    filterText={this.state.filterText}
		    moviesWithBooks={this.state.moviesWithBooks}
		    onUserInput={this.handleUserInput}
		    />
		<MovieGrid
		    filterText={this.state.filterText}
		    moviesWithBooks={this.state.moviesWithBooks}
		    movies={this.props.movies}
		    />
		</div>
	    );
	}
	});

