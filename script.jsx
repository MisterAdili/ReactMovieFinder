const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div className="row">
      <div className="col-4 col-md-3 mb-3">
        <a href={'https://www.imbd.com/title/${imdbID}/'} target="_blank">
          <img src={Poster} className="img-fluid" />
        </a>
      </div> 
      <div className="col-8 col-md-3 mb-3">
        <a href={'https://www.imdb.com/title/${imdbID}/'} target="_blank">
          <h4>{Title}</h4>
          <p>{Type} | {Year}</p>
        </a>
      </div>
    </div>
  )
}

class MovieFinder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ sarchTerm: event.target.value });
  }

  handleSubmit(event){
    event.preventDetfault();
    let {searchTerm } = this.state;
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      return;
    }

    fetch('https://www.omdbapi.com/?s=${searchterm}&apikey=b7da8d63')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error ('Request was either a 404 or 500');
    }).then((data) => {
      this.setState({ results: data.Search });
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { searchTerm, results } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
          <form onSubmit={this.handleSubmit} className="form-inline my-4">
            <input
              type="text"
              className="formControl mr-sm-2"
              placeholder="frozen"
              value={searchTerm}
              onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {results.map((movie) => {
            return <Movie key={movie.imdbID} movie={movie} />;
          })}
          </div>
        </div>
      </div>
    )
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MovieFinder />);