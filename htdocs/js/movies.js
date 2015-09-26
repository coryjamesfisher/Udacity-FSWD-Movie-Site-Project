	var MovieTrailerModal = React.createClass({displayName: "MovieTrailerModal",
		render: function() {

			if (this.props.open == true) {
				var trailerYouTubeId = this.props.youtube_trailer_id;
				var sourceUrl = 'http://www.youtube.com/embed/' + trailerYouTubeId + '?autoplay=1&html5=1';
				$('.trailer_modal').find('iframe').remove();
				$('.trailer_modal').append($("<iframe></iframe>", {
				  'id': 'trailer-video',
				  'type': 'text-html',
				  'src': sourceUrl,
				  'frameborder': 0,
				  'width': 480,
				  'height': 390,
				  'allowfullscreen': ''
				}));

				self = this;
				$('.trailer_modal').remodal().open();
				$('.trailer_modal').on('closed', function() {
					self.props.onCloseModal();
					$('.trailer_modal').find('iframe').remove();
				});
				
			}

			// Note this is currently a stub component.
			// @todo figure out how to make reactJS play well with others
			return (
				React.createElement("div", null)	
			);
		}
	});

	var MovieGridCard = React.createClass({displayName: "MovieGridCard",
		handleClick: function() {
			this.props.onGridClick(this.props.movie.youtube_trailer_id);	
		},
		render: function() {

			var mov = this.props.movie;

			return (
				React.createElement("section", {onClick: this.handleClick, className: "movie-grid-card"}, 

					React.createElement("figure", {"data-trailer-id": mov.youtube_trailer_id}, 
						React.createElement("img", {src: mov.poster_image_url}), 
						React.createElement("figcaption", null, mov.title)
					), 
					mov.storyline
				)
			)
		}
	});

	var SearchBar = React.createClass({displayName: "SearchBar",
	handleChange: function() {
	    this.props.onUserInput(
		this.refs.filterTextInput.getDOMNode().value,
		this.refs.moviesWithBooksInput.getDOMNode().checked
	    );
	},
	render: function() {
	    return (
		React.createElement("form", null, 
		React.createElement("input", {
		    type: "text", 
		    placeholder: "Search...", 
		    value: this.props.filterText, 
		    ref: "filterTextInput", 
		    onChange: this.handleChange}
		    ), 
		React.createElement("p", null, 
		    React.createElement("input", {
			type: "checkbox", 
			checked: this.props.moviesWithBooks, 
			ref: "moviesWithBooksInput", 
			onChange: this.handleChange}
			), 
		    ' ', 
		    "Only show movies with books"
		)
		)
	    );
	}
	});

	var MovieGrid = React.createClass({displayName: "MovieGrid",
		getInitialState: function() {
			return {
				youtube_trailer_id: "",
				is_modal_open: false
			}
		},
		openModal: function(trailer_id) {
			this.setState({is_modal_open: true, youtube_trailer_id: trailer_id});
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

				rows.push(React.createElement(MovieGridCard, {onGridClick: this.openModal, movie: movie, key: movie.title}));
			}.bind(this));

			return (
			React.createElement("div", null, 
				React.createElement("div", null, rows), 
				React.createElement(MovieTrailerModal, {youtube_trailer_id: this.state.youtube_trailer_id, open: this.state.is_modal_open, onCloseModal: this.closeModal})
			)
			);
		}
	});

	var MoviePage = React.createClass({displayName: "MoviePage",
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
		React.createElement("div", {className: "movie-page"}, 
		React.createElement(SearchBar, {
		    filterText: this.state.filterText, 
		    moviesWithBooks: this.state.moviesWithBooks, 
		    onUserInput: this.handleUserInput}
		    ), 
		React.createElement(MovieGrid, {
		    filterText: this.state.filterText, 
		    moviesWithBooks: this.state.moviesWithBooks, 
		    movies: this.props.movies}
		    )
		)
	    );
	}
	});

