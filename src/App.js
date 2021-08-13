import React, { useState } from "react";
import "./styles.css";
import { Footer } from "./Footer";
import profit from "./assets/profit.gif";
import loss from "./assets/loss.gif";

export default function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.00);
  const [qty, setQty] = useState(0);
  const [curPrice, setCurPrice] = useState(0.00);
  const [output, setOutput] = useState("");
  const [gif, setGif] = useState("");

  const stockUrl = (name) => {
    let symbol = name.toUpperCase();
    return `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_API_TOKEN}`;
  };

  const setReaction = (react) => {
    react === "happy"
      ? setGif(profit)
      : setGif(loss);
  }

  const errorHandler = (err) => {
    console.log("error has occured",err);
    alert("some issue with the server: try after sometime.");
  };

  const fetchData = () => {
    fetch(stockUrl(name))
          .then((res) => res.json())
          .then((data) => {
              setCurPrice(data.c);
          })
      .catch(errorHandler);
  }

  const calculate = () => {
      
      if (!isNaN(price) && !isNaN(qty)) {
        fetchData();

        if (price > 0 && qty > 0 && curPrice > 0) {
              let cp = price;
              let sp = curPrice;
              if (cp > sp) {
                  const loss = ((cp - sp)*qty).toFixed(2);
                  const lossPer = (((cp - sp) * 100) / cp).toFixed(2);
                  setOutput(
                    `Suffered a ${lossPer}% loss. You total loss is $${loss}.`
                  );

                  if (lossPer > 50) {
                    setReaction("sad");
                  }
              }
              else {
                  const profit = ((sp - cp)*qty).toFixed(2);
                  const profitPer = (((sp - cp) * 100) / cp).toFixed(2);
                  setOutput(
                    `Yay! a ${profitPer}% pay off. You total profit is $${profit}.`
                  );
                
                  if (profitPer > 50) {
                    setReaction("happy");
                  }
              }
          } else {
              setOutput("Please give valid input(only numbers > 0)");
          }
      } else {
        setOutput("Please give valid input(only numbers > 0)");
      }

  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>
            pay<span className="text--focus">Off</span>
          </h1>
        </header>

        <section className="data">
          <input
            type="text"
            id="stock"
            className="input__box"
            placeholder="Stock (e.g: AAPL, TSLA)"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="cp"
            className="input__box"
            placeholder="Purchased for ?"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            type="text"
            id="qty"
            className="input__box"
            placeholder="How many ?"
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </section>

        <button className="btn primary__btn" onClick={calculate}>
          paid off?
        </button>

        <div className="output">
          <h4>{output}</h4>
          <img className="gif" src={gif} alt=""/>
        </div>

        <section className="help">
          <p>
            <strong>Note </strong>
          </p>
          <p>
            Profit/loss are calculated on current stock prices in the US market.
            Might not work for Indian stocks
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
