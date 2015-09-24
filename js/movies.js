	    var MovieGridCard = React.createClass({displayName: "MovieGridCard",
	       render: function() {

		   var mov = this.props.movie;

		   return (
			   React.createElement("section", {className: "movie-grid-card"}, 

                             React.createElement("figure", null, 
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
		render: function() {

		    var rows = [];
		    console.log(this.props);
		    this.props.movies.forEach(function(movie) {

			if (movie.title.indexOf(this.props.filterText) === -1) {
			    return;
			}

			rows.push(React.createElement(MovieGridCard, {movie: movie, key: movie.title}));
		    }.bind(this));
		    return (
			    React.createElement("div", null, 
				rows
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

