import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

// const dataBar = {
//     labels: ["Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7"],
//     datasets: [
//       {
//         label: "Unsync Block",
//         backgroundColor: "#FF3232",
//         borderColor: "FF3232",
//         borderWidth: 1,
//         hoverBackgroundColor: "#FFB4B4",
//         hoverBorderColor: "#FFB4B4",
//         data: [1, 2, 3, 4, 3, 0, 1]
//       },
//       {
//         label: "Uncomfirmed Block",
//         backgroundColor: "#FF9364",
//         borderColor: "#FF9364",
//         borderWidth: 1,
//         hoverBackgroundColor: "#FFCB9C",
//         hoverBorderColor: "#FFCB9C",
//         data: [2, 3, 4, 0, 1, 2, 3]
//       },
//       {
//         label: "Slow Response",
//         backgroundColor: "#94EB3E",
//         borderColor: "#94EB3E",
//         borderWidth: 1,
//         hoverBackgroundColor: "#BEF5BE",
//         hoverBorderColor: "#BEF5BE",
//         data: [2, 4, 3, 2, 1, 0, 1]
//       }
//     ]
//   };


  
function DptBar({info}) {
    
    let today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);

    let newHospit = 0;
    let newRea = 0;
    let newDeaths = 0;

    let yearMonth;
    yearMonth = date.substr(0, 7);

    let dataArray = [];

    
    if (info.length > 0){

      for(let i = 0 ; i< info.length-1 ;i++){

          if(info[i].jour.includes(yearMonth)){
            dataArray.push(info[i]);
          }
      }

        dataArray.map((genInfo) => (<div>
            {(() => {
                newHospit += parseInt(genInfo.incid_hosp);
                newRea += parseInt(genInfo.incid_rea);
                newDeaths += parseInt(genInfo.incid_dc);
            })()}
        </div>));
    }


    let buildGraph = (d) => {
        const inf =  {
            labels: ["Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6", "Jul 7"],
            datasets: [
              {
                label: "Unsync Block",
                backgroundColor: "#FF3232",
                borderColor: "FF3232",
                borderWidth: 1,
                hoverBackgroundColor: "#FFB4B4",
                hoverBorderColor: "#FFB4B4",
                data: [1, 2, 3, 4, 3, 0, 1]
              },
              {
                label: "Uncomfirmed Block",
                backgroundColor: "#FF9364",
                borderColor: "#FF9364",
                borderWidth: 1,
                hoverBackgroundColor: "#FFCB9C",
                hoverBorderColor: "#FFCB9C",
                data: [2, 3, 4, 0, 1, 2, 3]
              },
              {
                label: "Slow Response",
                backgroundColor: "#94EB3E",
                borderColor: "#94EB3E",
                borderWidth: 1,
                hoverBackgroundColor: "#BEF5BE",
                hoverBorderColor: "#BEF5BE",
                data: [2, 4, 3, 2, 1, 0, 1]
              }
            ]
          };
        return inf; 
    };
    let data = buildGraph(info);
    return (
        <div>
            <h2>Bar Example (custom size)</h2>
            <Bar data={data} width={70} height={30} />
        </div>
    );
}

export default DptBar;

