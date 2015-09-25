	var MovieGridCard = React.createClass({
		render: function() {

			var mov = this.props.movie;

			return (
				<section className="movie-grid-card">

					<figure data-trailer-url={mov.trailer_youtube_url}>
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
		<input
		    type="text"
		    placeholder="Search..."
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
	render: function() {

	    var rows = [];
	    console.log(this.props);
	    this.props.movies.forEach(function(movie) {

	    if (movie.title.indexOf(this.props.filterText) === -1) {
		return;
	    }

	    rows.push(<MovieGridCard movie={movie} key={movie.title}></MovieGridCard>);
	    }.bind(this));
	    return (
		<div>
		{rows}
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

