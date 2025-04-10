const { createRoot } = ReactDOM;
const { useState, useEffect, useMemo, memo } = React;

function PoliticianCard ({ politician }) {
  console.log("Card")
  return (
    <div className="col-3">
      <div className="card">
        <img className="card-image" src={politician.image} alt={politician.name} />
        <div className="card-info p-4">
          <h3>{politician.name}</h3>
          <h5>{politician.position}</h5>
          <p>{politician.biography}</p>
        </div>
      </div> 
    </div> 
  ) 
};

const MemoizedPoliticianCard = memo(PoliticianCard);

const App = () => {
  const [politicians, setPoliticians] = useState([]);
  const [ search, setSearch ] = useState('');

  async function getPolitician() {
    const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians');
    const politicians = await response.json();
    setPoliticians(politicians);
  }

  useEffect(() => {
    getPolitician();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
        const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
        const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());
        return isInName || isInBio;
      })
  }, [search, politicians]);

  return (
    <>
    <div className="container pt-4">
      <h1 className="text-center">Politicians</h1>
      <div>
        <label className="p-3" htmlFor="search-bar">Search politician</label>
        <input 
          type="text"
          name="search-bar"
          id="search-bar"
          placeholder="Search politician"
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="row p-3">
        {filteredPoliticians.map((politician, index) => (
          <MemoizedPoliticianCard politician={politician} key={index} />
        ))}
      </div>
    </div>
    </>
  );
}

createRoot(document.getElementById('app-container')).render(<App />);