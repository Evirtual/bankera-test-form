import './App.css';
import logo from './bankera-min.png';
import InputField from './comps/inputfield'
import DynamicField from './comps/dynamicfield.js'
import OptionField from './comps/optionfield'
import { useState, useEffect } from 'react';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setAPI] = useState( { bpi: {}, disclaimer: '', time: {}, chartName: "" } );
  const apiRefreshTime = 60000;
  const [filter, setFilter] = useState([]);
  const [amount, setAmount] = useState()

  const fetchAPi = async() => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAPI(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    fetchAPi();
    const interval = setInterval(() => {
      fetchAPi();
    }, apiRefreshTime);
    return () => clearInterval(interval);
  }, [])

  if (error) {
    return (
      <div className="Bankera-app loading">
         <img className="Bankera-logo" src={logo} alt="logo" />
        <div className="Bankera-loading">Error: {error.message}</div>
      </div>
    )

  } else if (!isLoaded) {
    return (
      <div className="Bankera-app loading">
         <img className="Bankera-logo" src={logo} alt="logo" />
        <div className="Bankera-loading">Loading...</div>
      </div>
    )

  } else {

    const addItem = (item) => {
      filter.includes(item) && setFilter(state => state.filter(key => key !== item))
    }

    const removeItem = (item) => {
      !filter.includes(item) && setFilter(state => state.concat([item]))
    }

    return (
      <div className="Bankera-app">
        <header className="Bankera-header">
          <h1 className="Bankera-title">Bankera Test Form</h1>
          <p className="Bankera-disclaimer">{api?.disclaimer}</p>
          <p className="Bankera-time">{`API fetched: ${api?.time?.updated}`}</p>
        </header>
        <form className="Bankera-form">
          <InputField name="BTC" rate="1" amount={amount} setAmount={e => setAmount(e.target.value)} />
          {Object.keys(api?.bpi).filter(key => !filter.includes(key)).map((item) => (
            <DynamicField 
              key={api?.bpi[item]?.code}
              name={api?.bpi[item]?.code}
              amount={amount * api?.bpi[item]?.rate_float}
              rate={api?.bpi[item]?.rate_float}
              onClick={() => removeItem(api?.bpi[item]?.code)} />
          ))}
          {filter.length !== 0 && <select className="Bankera-select" onChange={(e) => addItem(e.target.value) }>
            <OptionField name="Add new currency" />
            {Object.keys(api?.bpi).filter(key => filter.includes(key)).map((item) => (
              <OptionField
                value={api?.bpi[item]?.code}
                key={api?.bpi[item]?.code}
                name={api?.bpi[item]?.code}
                rate={api?.bpi[item]?.rate_float} />
            ))}
          </select>}
        </form>
        <footer className="Bankera-footer">Created by Edgaras Neverdauskas @ 2022</footer>
      </div>
    );
  }
}

export default App;