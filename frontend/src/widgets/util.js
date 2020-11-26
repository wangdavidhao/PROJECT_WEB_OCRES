
export const hexToHSL = (H) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
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
  
    if (delta === 0)
      h = 0;
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    else if (cmax === g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

export const parseHSL = (str) => {
    var hsl, h, s, l
    hsl = str.replace(/[^\d,]/g, '').split(',')   // strip non digits ('%')  
    h = Number(hsl[0])                            // convert to number
    s = Number(hsl[1])
    l = Number(hsl[2])
    return [h, s, l]                              // return parts
}

export const harmonize = (color, start=30, end=90, interval=10) => {
    const colors = [color]
    const [h, s, l] = parseHSL(color)

    for(let i = start; i <= end; i += interval) {
        const h1 = (h + i) % 360;
        const c1 = `hsl(${h1}, ${s}%, ${l}%)`;
        colors.push(c1);
    }
    return colors
}


