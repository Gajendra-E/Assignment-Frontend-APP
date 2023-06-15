
import axios from "axios";






export const getMatches = () => {
 
	axios.get(`/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon`).then((response) => {
    console.log("-----sss---------"+JSON.stringify(response.data))
  return response.data
  });
};

//get the score of the cuurent match

export const getMatchDetail = (id) => {
  // const url = `https://api.cricapi.com/v1/match_info?unique_id=${id}&apikey=${API_KEY}`;

  //const newurl= "https://api.cricapi.com/v1/match_scorecard?apikey=cd198c20-23a2-4afb-b36e-a4f647eb6d19&id=c8742d20-c3cb-4423-aea1-b436f3ac65c3"

  const url = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${id}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};


export const getCriketAPIMatchDetail = () => {
  // const url = `https://apiv2.api-cricket.com/cricket/?method=get_events&APIkey=f7ef8cb25c1f6d8d5736716f77c74568dc3701547d79f4f24cdbe1e21759c5f5&date_start=${moment(new Date(Date.now())).format("YYYY-MM-DD")}&date_stop=${moment(new Date(Date.now())).format("YYYY-MM-DD")}&league_key=745`
  // return fetch(url)
  //   .then((response) => response.json())
  //   .catch((error) => console.log(error));

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const getNewCriketAPIMatchDetail = () => {


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon",requestOptions).then(response => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(data => {
      console.log("------------1-----------"+data)
      // The response was a JSON object
      // Process your data as a JavaScript object
    });
  } else {
    return response.text().then(text => {
      console.log("--------.3----------"+text)
      // The response wasn't a JSON object
      // Process your text as a String
    });
  }
  })

};



// return fetch('/titan-xml-feed/worldoftitanxml.json')
// .then((response) => response.json())
// .then((responseText) => {
//   temp_array = responseText.map(e => {
//     const obj2 = {};
//     for (const key of Object.getOwnPropertyNames(e)) {
//       obj2[key.slice(2)] = e[key];
//     }
//     return obj2
//   })
//   return temp_array
// }
// )


export const getNewMatches = () => {


  return fetch(`/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon`)
    .then((response) => {
      console.log("---------"+JSON.stringify(response))
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR ", error);
    });

};

  
