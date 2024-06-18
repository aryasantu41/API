
  // sendEmail.js
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const smtpConfig = require('./smtpConfig.js');
const parser = require("body-parser"); 
const cors = require("cors");
// const apikey = "E3EE329B2279D6D8F36DD9A3FAB75A2EE41E52A77A7465A88E9565B001F170951C1CF0328373273F09D3FD886AA6849B"

app.use(parser.json());
app.use(cors({ origin: true }));
// app.use(cors({
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE 11) choke on 204
// }));


app.post('/elastic-email', (req, res) => {
  try {
    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
      from: 'aryasantu41@gmail.com',
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.text,
    };

    const info =  transporter.sendMail(mailOptions);
    res.status(200).send({
      status: true,
      data: info.messageId,
      msg: "email sent successfylly"
    });

    // console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});



app.post('/google-email', (req, res) => {
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure:false,
      logger: true,
      debug: true,
      auth:{
          // user:'gharairahul05@gmail.com',
          // pass:'telrwctpsapasdfv',
          user:'aryasantu41@gmail.com',
          pass:'stskfzmiqkjxiiin',
      }
  });
  let mailOptions = {
      from: 'aryasantu41@gmail.com',
      to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };
  transporter.sendMail(mailOptions,function(error,info){
      if(error){
          console.log("error",error);
          
      }
      else{
        res.status(200).send({
          status: true,
          data: info.response,
          msg: "email sent successfylly"
        });
          console.log('Email sent: '+ info.response);
          
      }
     
  });


});

app.post('/brevo-email', (req, res) => {
  let transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure:false,
      logger: true,
      debug: true,
      auth:{
          // user:'gharairahul05@gmail.com',
          // pass:'telrwctpsapasdfv',
          user:'aryasantu41@gmail.com',
          pass:'0FBskta5PRTV7GrS',
      }
  });
  let mailOptions = {
      from: 'aryasantu41@gmail.com',
      to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };
  transporter.sendMail(mailOptions,function(error,info){
      if(error){
          console.log("error",error);
          
      }
      else{
        res.status(200).send({
          status: true,
          data: info.response,
          msg: "email sent successfylly"
        });
          console.log('Email sent: '+ info.response);
          
      }
     
  });


});

app.use('/getstockbysearch', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/search/v1/entity?app=false&page=0&q=${q}&size=6`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstockbytopgainer', async (req, res) => {
  const  size  = req.query.size;
  const stockName=req.query.stockName
  const url = `https://groww.in/v1/api/stocks_data/explore/v2/indices/${stockName}/market_trends?discovery_filter_types=TOP_GAINERS&size=${size}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstockbytoploosers', async (req, res) => {
  const  size  = req.query.size;
  const stockName=req.query.stockName
  const url = `https://groww.in/v1/api/stocks_data/explore/v2/indices/${stockName}/market_trends?discovery_filter_types=TOP_LOSERS&size=${size}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstockbyfilter', async (req, res) => {
  const  size  = req.query.size;
  const stockName=req.query.stockName
  const filterBy=req.query.filterBy
  const url = `https://groww.in/v1/api/stocks_data/explore/v2/indices/${stockName}/market_trends?discovery_filter_types=${filterBy}&size=${size}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstocknews', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/groww_news/v1/stocks_news/news?page=0&size=${q}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.use('/getstockid', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/stocks_data/v1/company/search_id/${q}?page=0&size=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstockcode', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/stocks_data/v1/accord_points/exchange/NSE/segment/CASH/latest_prices_ohlc/${q}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getstockgraph', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/${q}/daily?intervalInMinutes=1&minimal=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/getmatchlist', async (req, res) => {
  const url = 'https://www.cricbuzz.com/api/html/homepage-scag';

  try {
    const response = await fetch(url);
    
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();  // Use text() instead of json()
    res.send(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getmatchdetails', async (req, res) => {
  const { q } = req.query;
  const url = `https://www.cricbuzz.com/api/cricket-match/commentary/${q}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getmatchscorecard', async (req, res) => {
  const { q } = req.query;
  const url = `https://www.cricbuzz.com/api/html/cricket-scorecard/${q}`;

  try {
    const response = await fetch(url);
    
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();  // Use text() instead of json()
    res.send(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getmatchsquads', async (req, res) => {
  const { q } = req.query;
  const url = `https://www.cricbuzz.com/api/html/match-squads/${q}`;

  try {
    const response = await fetch(url);
    
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();  // Use text() instead of json()
    res.send(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use('/getmatchhighlights', async (req, res) => {
  const { q } = req.query;
  // const url = `https://www.cricbuzz.com/api/html/match-squads/${q}`;
  const url = `https://www.cricbuzz.com/api/cricket-match/${q}/highlights/1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.use('/getmatchcommentary', async (req, res) => {
  const { q } = req.query;
  // const url = `https://www.cricbuzz.com/api/html/match-squads/${q}`;
  const url = `https://www.cricbuzz.com/api/cricket-match/${q}/full-commentary/0`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/getjobtitle', async (req, res) => {
  const { q } = req.query;
  const url = `https://autocomplete.indeed.com/api/v0/suggestions/what?country=IN&language=en&count=10&formatted=1&query=${q}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.use('/getstocktoploosegain', async (req, res) => {
  const { q } = req.query;
  const url = `https://groww.in/v1/api/stocks_data/v2/explore/list/top?discoveryFilterTypes=TOP_GAINERS%2CTOP_LOSERS&page=0&size=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/stock-event', async (req, res) => {
  const size = req.query.size;
  console.log("helppp",size)
  const url = `https://groww.in/v1/api/stocks_data/v1/company/search_id/${size}/corporate_actions`;
  console.log("urlurlurlurlurlurlurl",url)
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/stock-event-news', async (req, res) => {
  const size = req.query.size;
  const url = `https://groww.in/v1/api/stocks_company_master/v1/company_news/groww_contract_id/${size}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});










const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
