	var MovieTrailerModal = React.createClass({
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
				<div data-remodal-id="modal" data-is-opened={this.props.open}>
					Hello
					<iframe style={{width:"100%", height: "100%"}} src={this.props.url}>
					</iframe>
				</div>
			);
		}
	});

	var MovieGridCard = React.createClass({
		handleClick: function() {
			this.props.onGridClick();	
		},
		render: function() {

			var mov = this.props.movie;

			return (
				<section onClick={this.handleClick} className="movie-grid-card">

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

				rows.push(<MovieGridCard onGridClick={this.openModal} movie={movie} key={movie.title}></MovieGridCard>);
			}.bind(this));

			return (
			<div>
				<div>{rows}</div>
				<MovieTrailerModal url={this.state.url} open={this.state.is_modal_open}></MovieTrailerModal>
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

