import React, {useState} from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import './CircularGraph.css';

let data = [
    { name: 'Hommes', value: 10, },
    { name: 'Femmes', value: 35, },
  ];

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

function parseHSL(str) {
    var hsl, h, s, l
    hsl = str.replace(/[^\d,]/g, '').split(',')   // strip non digits ('%')  
    h = Number(hsl[0])                            // convert to number
    s = Number(hsl[1])
    l = Number(hsl[2])
    return [h, s, l]                              // return parts
}

function harmonize(color, start=30, end=90, interval=10) {
    const colors = [color]
    const [h, s, l] = parseHSL(color)

    for(let i = start; i <= end; i += interval) {
        const h1 = (h + i) % 360;
        const c1 = `hsl(${h1}, ${s}%, ${l}%)`;
        colors.push(c1);
    }
    return colors
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} cas`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
};


function CircularGraph({info, color, type}) {

    const colorHSL = hexToHSL(color);
    const [active, setActive] = useState(0);
    const onPieEnter = (data, index) => {
        setActive(index);
    };
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
    console.log(date);
    let male = 0;
    let female = 0;

    let age1 = 0;
    let age1_9 = 0;
    let age9_19 = 0;
    let age19_29 = 0;
    let age29_39 = 0;
    let age39_49 = 0;
    let age49_59 = 0;
    let age59_69 = 0;
    let age69_79 = 0;
    let age79_89 = 0;
    let age90_ = 0;

    let newHospit = 0;
    let newRea = 0;
    let newDeaths = 0;

    console.log(info[0]);
    let buildGraph = function(){ return 1; };

    switch (type) {
        case 'gender':
            info.filter(gender => ((gender.jour === date) && (gender.sexe !== "0") ))
                .map((gdr) => (gdr.sexe === "1" ? male += parseInt(gdr.hosp) : female += parseInt(gdr.hosp)));
            //
            // console.log(g)
            // console.log("male", male);
            // console.log("female", female);

            buildGraph = (d) => {
                const inf = [
                    { name : 'Hommes', value: male, },
                    { name : 'Femmes', value: female,},
                ];
            return inf;  
            };
            data = buildGraph(info);
            break;
        case 'age':
            info.filter(age => ((age.jour === date)))
                .map((a) => (<div>
                    {(() => {
                        switch (a.cl_age90){
                            case '0':
                                age1 += parseInt(a.cl_age90);
                                break;
                            case '09':
                                age1_9 += parseInt(a.cl_age90);
                                break;
                            case '19':
                                age9_19 += parseInt(a.cl_age90);
                                break;
                            case '29':
                                age19_29 += parseInt(a.cl_age90);
                                break;
                            case '39':
                                age29_39 += parseInt(a.cl_age90);
                                break;
                            case '49':
                                age39_49 += parseInt(a.cl_age90);
                                break;
                            case '59':
                                age49_59 += parseInt(a.cl_age90);
                                break;
                            case '69':
                                age59_69 += parseInt(a.cl_age90);
                                break;
                            case '79':
                                age69_79 += parseInt(a.cl_age90);
                                break;
                            case '89':
                                age79_89 += parseInt(a.cl_age90);
                                break;
                            case '90':
                                age90_ += parseInt(a.cl_age90);
                                break;
                        };
                    })()}
                  </div>));
            buildGraph = (d) => {
                const inf = [
                    { name : '<1 an', value: age1, },
                    { name : '1-9 ans', value: age1_9,},
                    { name : '10-19 ans', value: age9_19, },
                    { name : '20-29 ans', value: age19_29,},
                    { name : '29-39 ans', value: age29_39, },
                    { name : '39-49 ans', value: age39_49,},
                    { name : '49-59 ans', value: age49_59, },
                    { name : '59-69 ans', value: age59_69,},
                    { name : '69-79 ans', value: age69_79, },
                    { name : '79-89 ans', value: age79_89,},
                    { name : '>90 ans', value: age90_, },
                ];
                return inf; 
            };
            data = buildGraph(info);
            break;
            case 'generalInfo':
            info.filter(generalInfo => ((generalInfo.jour === date)))
                .map((genInfo) => (<div>
                    {(() => {
                        newHospit += parseInt(genInfo.incid_hosp);
                        newRea += parseInt(genInfo.incid_rea);
                        newDeaths += parseInt(genInfo.incid_dc);
                    })()}
                  </div>));
            buildGraph = (d) => {
                const inf = [
                    { name : 'New Hospit.', value: newHospit, },
                    { name : 'New Rea cases', value: newRea,},
                    { name : 'New Deaths', value: newDeaths, },
                ];
                return inf; 
            };
            data = buildGraph(info);

            break;
        default:
            console.log(`SORRY NOT FOUND`);
            
    }
    // console.log('New deaths',newDeaths );
    // console.log(harmonize(colorHSL));
    // info.filter(gdr => ((gdr.jour === date) && (gdr.sexe !== "0") ))
    //     .map((g) => (g.sexe === "1" ? male += parseInt(g.hosp) : female += parseInt(g.hosp)));
    // //
    // // console.log(g)
    // // console.log("male", male);
    // // console.log("female", female);

    // buildGraph = (d) => {
    //     const inf = [
    //         { name : 'Hommes', value: male, },
    //         { name : 'Femmes', value: female,},
    //       ];
    //   return inf;  
    // };
    

    return (
        <div class="circularGraph">
                <PieChart width={400} height={400}>
                    <Pie
                    isAnimationActive = {true}
                    activeIndex={active}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill={colorHSL}
                    //harmonize(colorHSL)[Math.floor(Math.random() * Math.floor(13))]
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    >
                    {   
                        data.map((entry, index) => <Cell fill={harmonize(colorHSL)[index % harmonize(colorHSL).length]}/>)
                    }
                    </Pie>
                </PieChart>
        </div>
    );
}

export default CircularGraph;