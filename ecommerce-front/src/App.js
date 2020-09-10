import React, { useState, useEffect } from 'react';

const App = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('React');
    const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=react`);

    const fetchNews = () => {
        fetch(url)
        .then(result => result.json())
        .then(data => setNews(data.hits))
        .catch(err => console.log(err))
    };

    useEffect(() => { fetchNews(); }, [ url ])
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    };

    return (
        <div>
            <h2>NEWWWWWWWWWWWWS</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchQuery} onChange={handleChange} />
                <button>SEARCHHHHHH</button>
            </form>
            {news.map((n, idx) => (<p key={idx}>{n.title}</p>))}
        </div>
    )
}

export default App;
