import React from "react";
import { Bar } from "react-chartjs-2";
import {Container, Row, Col} from 'react-bootstrap';
import './DptBar.css'
  
function DptBar({info}) {
    
    let today = new Date();

    let newHospit0 = 0;
    let newRea0 = 0;
    let newDeaths0 = 0;
    let newHospit1 = 0;
    let newRea1 = 0;
    let newDeaths1 = 0;
    let newHospit2 = 0;
    let newRea2 = 0;
    let newDeaths2 = 0;
    let newHospit3 = 0;
    let newRea3 = 0;
    let newDeaths3 = 0;


    let dataArray = [];
    let yearsMonths = [];
    let yearsMonthsNames = [];

    var monthNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var monthNames = ["Janvier", "Fevrier", "Mars", "Avril",
                      "Mai", "Juin", "Juillet", "Août", "Septembre",
                      "Octobre", "Novembre", "Décembre"];
    let d;
    let month;
    let year;

    for(let i = 4; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthNumbers[d.getMonth()];
      year = d.getFullYear().toString();
      let ym = year + '-' + month;
      yearsMonths.push(ym);
      yearsMonthsNames.push(monthNames[d.getMonth()]);
    }
    
    if (info.length > 0){

      for(let i = 0 ; i< info.length-1 ;i++){

          if(info[i].jour.includes(yearsMonths[0]) || info[i].jour.includes(yearsMonths[1])
          || info[i].jour.includes(yearsMonths[2])|| info[i].jour.includes(yearsMonths[3])
          ){
            dataArray.push(info[i]);
          }
      }
        dataArray.map((genInfo) => (<div>
            {(() => {
              let dateInfo = genInfo.jour.substr(0, 7);
              switch (dateInfo){
                case `${yearsMonths[0]}`:
                  newHospit0 += parseInt(genInfo.incid_hosp);
                  newRea0 += parseInt(genInfo.incid_rea);
                  newDeaths0 += parseInt(genInfo.incid_dc);
                break;
                case `${yearsMonths[1]}`:
                  newHospit1 += parseInt(genInfo.incid_hosp);
                  newRea1 += parseInt(genInfo.incid_rea);
                  newDeaths1 += parseInt(genInfo.incid_dc);
                break;
                case `${yearsMonths[2]}`:
                  newHospit2 += parseInt(genInfo.incid_hosp);
                  newRea2 += parseInt(genInfo.incid_rea);
                  newDeaths2 += parseInt(genInfo.incid_dc);
                break;
                case `${yearsMonths[3]}`:
                  newHospit3 += parseInt(genInfo.incid_hosp);
                  newRea3 += parseInt(genInfo.incid_rea);
                  newDeaths3 += parseInt(genInfo.incid_dc);
                break;
                default:
                  console.log("Dans aucun des cas");
              }   
            })()}
        </div>));
    }

    const options = {
      responsive : true,
      maintainAspectRatio: false,

      legend : {
        labels  : {
          fontColor:'white',
        }
        
      },

      scales : {
        xAxes: [{
                  display: true,
                  ticks: {
                    fontColor: "white",
                    fontSize: 14
                    }
        }],
        
        yAxes:[
          {
            display:true,
            ticks:{
              fontColor:"white",
              fontSize:14,
              maxTicksLimit:8,
            }
          }
        ]
      },
    }


    let buildGraph = (d) => {
        const inf = (canvas) => {
          const ctx = canvas.getContext("2d");
          const gradientBlue = ctx.createLinearGradient(0, 0, 0, 130);
          gradientBlue.addColorStop(0, 'rgba(30,144,255,1)');   
          gradientBlue.addColorStop(1, 'rgba(55,66,250,0.6)');

          const gradientPurple = ctx.createLinearGradient(0,0,0,10);
          gradientPurple.addColorStop(0, 'rgba(130,88,159,1)');   
          gradientPurple.addColorStop(1, 'rgba(142,68,173,0.6)');

          const gradientRed = ctx.createLinearGradient(0,0,0,10);
          gradientRed.addColorStop(0, 'rgba(235,59,90,1)');   
          gradientRed.addColorStop(1, 'rgba(234,32,39,0.6)');


          return{
              labels: [`${yearsMonthsNames[0]}`, `${yearsMonthsNames[1]}`,`${yearsMonthsNames[2]}`,
              `${yearsMonthsNames[3]}`],
              datasets: [
                {
                  label: "Hosp",
                  backgroundColor: gradientBlue,
                  borderColor: gradientBlue,
                  borderWidth: 1,
                  hoverBackgroundColor: "#4a69bd",
                  hoverBorderColor: "#4a69bd",
                  data: [`${newHospit0}`, `${newHospit1}`, `${newHospit2}`, `${newHospit3}`, ],
                },
                {
                  label: "Réa",
                  backgroundColor: gradientPurple,
                  borderColor: gradientPurple,
                  borderWidth: 1,
                  hoverBackgroundColor: "#82589F",
                  hoverBorderColor: "#82589F",
                  data: [`${newRea0}`, `${newRea1}`, `${newRea2}`, `${newRea3}`, ],
                },
                {
                  label: "Décès",
                  backgroundColor: gradientRed,
                  borderColor: gradientRed,
                  borderWidth: 1,
                  hoverBackgroundColor: "#eb3b5a",
                  hoverBorderColor: "#eb3b5a",
                  data: [`${newDeaths0}`, `${newDeaths1}`, `${newDeaths2}`, `${newDeaths3}`, ]
                }
              ]
          }
            
          };
        return inf; 
    };
    let data = buildGraph(info);
    return (
        <Container>
          <Row>
            <Col lg={12}>
                  <Bar className="dptBar" data={data} height={180} options={options} />
            </Col>
          </Row>
        </Container>
        
    );
}

export default DptBar;

