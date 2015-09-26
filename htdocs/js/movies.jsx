	var MovieTrailerModal = React.createClass({
		render: function() {

			if (this.props.open == true) {
				var trailerYouTubeId = this.props.url.split('?')[1].split('v=')[1];
				var ampersandPosition = trailerYouTubeId.indexOf('&');
				if(ampersandPosition != -1) {
				  trailerYouTubeId = trailerYouTubeId.substring(0, ampersandPosition);
				}
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

				$('.trailer_modal').remodal().open();
				$('.trailer_modal').on('closed', function() {
					$('.trailer_modal').find('iframe').remove();
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
			this.props.onGridClick(this.props.movie.trailer_youtube_url);	
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
		openModal: function(trailerUrl) {
			this.setState({is_modal_open: true, url: trailerUrl});
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

