/* eslint-disable react/prop-types */
import { useState } from 'react'
import axios from 'axios';
import { BsEmojiNeutralFill, BsEmojiSmileUpsideDownFill, BsFillEmojiAngryFill } from "react-icons/bs";
import { Spinner } from 'react-bootstrap';

function App() {
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(data);
  return (
    <>
      <h1 className='mb-3 text-center mt-3 border shadow rounded p-3'>Text <span className='bg-success text-light p-2 rounded'>Sentiment Analysis</span> App</h1>
      <div className="container">
        <div className="row">
          <div className="col m-4 p-3">
            <Home></Home>
          </div>
          <div className="col m-4 result-data p-3">
            <Result></Result>
          </div>
        </div>
      </div>

    </>
  )

  // Home Left Part Function
  function Home() {
    const [input, setInput] = useState('');
    // fetch data
    function fetchData() {
      const options = {
        method: 'POST',
        url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'f49aa5b9acmsh706d88ea05b7ab3p10791cjsn55c162d17248',
          'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
        },
        data: {
          language: 'english',
          text: input
        }
      };

      axios
        .request(options)
        .then(function (response) {
          setData(response.data.sentiment_list)
          setTotalData(response.data)
          setLoading(true)
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    const analysesHandler = async () => {
      fetchData()
    }
    return (
      <>
        <textarea onChange={(e) => setInput(e.target.value)} className='form-control' cols="50" rows="10" placeholder='Enter Your Text Here'></textarea>
        <button onClick={analysesHandler} className='btn btn-dark mt-5'>Analysis Data</button>
      </>

    )
  }


  // Right Bar Result Function

  function Result() {

    // calculate data
    const positive = Math.floor(totalData.aggregate_sentiment?.pos * 100)
    const negative = Math.floor(totalData.aggregate_sentiment?.neg * 100)
    const neutral = Math.floor(totalData.aggregate_sentiment?.neu * 100)


    return (
      <>
        {
          loading ? <div className="result-container">
            <div>
              <h6><span>Input Text: </span>{data[0]?.sentence?.toUpperCase()}</h6><br />
              <span>Sentiment : </span> <span>{totalData.sentiment?.toUpperCase()}</span>
              <span className='netural-icon'>
                {totalData.sentiment === 'neutral' ? <BsEmojiNeutralFill></BsEmojiNeutralFill> : ''}
                {totalData.sentiment === 'negative' ? <BsFillEmojiAngryFill></BsFillEmojiAngryFill> : ''}
                {totalData.sentiment === 'positive' ? <BsEmojiSmileUpsideDownFill></BsEmojiSmileUpsideDownFill> : ''}
              </span>
            </div>
            <div className="chart-show">
              <table className="graph">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Percent</th>
                  </tr>
                </thead><tbody>
                  <tr style={{ height: `${positive}%` }}>
                    <th scope="row">Positive</th>
                    <td><span>{positive} %</span></td>
                  </tr>
                  <tr style={{ height: `${negative}%` }}>
                    <th scope="row">Negative</th>
                    <td><span>{negative} %</span></td>
                  </tr>
                  <tr style={{ height: `${neutral}%` }}>
                    <th scope="row">Neutral</th>
                    <td><span>{neutral} %</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            :
            <div>
              <p>Wating for data ...</p> <Spinner animation="grow" />
            </div>
        }



      </>
    )
  }

}

export default App
