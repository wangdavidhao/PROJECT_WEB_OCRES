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
    let newHospit4 = 0;
    let newRea4 = 0;
    let newDeaths4 = 0;


    let dataArray = [];
    let yearsMonths = [];
    let yearsMonthsNames = [];

    var monthNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var monthNames = ["Janvier", "Fevrier", "Mars", "Avril",
                      "Mai", "Juin", "Juillet", "Août", "Septembre",
                      "Octobre", "Novembre", "Dimanche"];
    let d;
    let month;
    let year;

    for(let i = 5; i > 0; i -= 1) {
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
          || info[i].jour.includes(yearsMonths[4])){
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
                case `${yearsMonths[4]}`:
                  newHospit4 += parseInt(genInfo.incid_hosp);
                  newRea4 += parseInt(genInfo.incid_rea);
                  newDeaths4 += parseInt(genInfo.incid_dc);
                break;
                default:
                  console.log("Dans aucun des cas");
              }
                
            })()}
        </div>));
    }


    let buildGraph = (d) => {
        const inf =  {
            labels: [`${yearsMonthsNames[0]}`, `${yearsMonthsNames[1]}`,`${yearsMonthsNames[2]}`,
            `${yearsMonthsNames[3]}`, `${yearsMonthsNames[4]}`],
            datasets: [
              {
                label: "Nouv. hosp",
                backgroundColor: "#FF3232",
                borderColor: "FF3232",
                borderWidth: 1,
                hoverBackgroundColor: "#FFB4B4",
                hoverBorderColor: "#FFB4B4",
                data: [`${newHospit0}`, `${newHospit1}`, `${newHospit2}`, `${newHospit3}`, `${newHospit4}`,],
              },
              {
                label: "Nouv.réa",
                backgroundColor: "#FF9364",
                borderColor: "#FF9364",
                borderWidth: 1,
                hoverBackgroundColor: "#FFCB9C",
                hoverBorderColor: "#FFCB9C",
                data: [`${newRea0}`, `${newRea1}`, `${newRea2}`, `${newRea3}`, `${newRea4}`,],
              },
              {
                label: "Nouv. décès",
                backgroundColor: "#94EB3E",
                borderColor: "#94EB3E",
                borderWidth: 1,
                hoverBackgroundColor: "#BEF5BE",
                hoverBorderColor: "#BEF5BE",
                data: [`${newDeaths0}`, `${newDeaths1}`, `${newDeaths2}`, `${newDeaths3}`, `${newDeaths4}`,]
              }
            ]
          };
        return inf; 
    };
    let data = buildGraph(info);
    return (
        <Container>
          <Row>
            <Col lg={12}>
                  <Bar className="dptBar" data={data} height={150} />
            </Col>
          </Row>
        </Container>
        
    );
}

export default DptBar;

