	var MovieTrailerModal = React.createClass({displayName: "MovieTrailerModal",
		componentDidUpdate: function() {

			if (this.props.open == true) {
				jQuery('body').append(jQuery(jQuery(this).html()).addClass('theRealOne').removeAttr('data-reactid'));
				jQuery('.theRealOne').remodal().show();
			} else {
				//$().remodal().hide();
			}

	
		},
		render: function() {

			return (
				React.createElement("div", {"data-remodal-id": "modal", "data-is-opened": this.props.open}, 
					"Hello", 
					React.createElement("iframe", {style: {width:"100%", height: "100%"}, src: this.props.url}
					)
				)
			);
		}
	});

	var MovieGridCard = React.createClass({displayName: "MovieGridCard",
		handleClick: function() {
			this.props.onGridClick();	
		},
		render: function() {

			var mov = this.props.movie;

			return (
				React.createElement("section", {onClick: this.handleClick, className: "movie-grid-card"}, 

					React.createElement("figure", {"data-trailer-url": mov.trailer_youtube_url}, 
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
				url: "",
				is_modal_open: false
			}
		},
		openModal: function() {
//			this.state.is_modal_open = true;
			this.setState({is_modal_open: true});
		},
		closeModal: function() {
			this.state.is_modal_open = false;
		},
		render: function() {

			var rows = [];

			this.props.movies.forEach(function(movie) {

				if (movie.title.indexOf(this.props.filterText) === -1) {
					return;
				}

				rows.push(React.createElement(MovieGridCard, {onGridClick: this.openModal, movie: movie, key: movie.title}));
			}.bind(this));

			return (
			React.createElement("div", null, 
				React.createElement("div", null, rows), 
				React.createElement(MovieTrailerModal, {url: this.state.url, open: this.state.is_modal_open})
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

