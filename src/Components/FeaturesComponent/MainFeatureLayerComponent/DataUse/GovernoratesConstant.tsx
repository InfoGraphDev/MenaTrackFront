export class GovernoratesConstant {
  static DataUse=(DarkMode,baseMapSelect) =>{    
    return(
      {
        "21": { "color": [190, 252, 179, .8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "12": { "color": [252, 240, 215, .8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "13": { "color": [179, 213, 252, .8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "32": { "color": [252, 207, 192, .8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "11": { "color": [182, 252, 216, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "34": { "color": [252, 179, 217, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "31": { "color": [252, 207, 224, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "22": { "color": [252, 179, 183, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "23": { "color": [252, 247, 189, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "24": { "color": [228, 199, 252, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "14": { "color": [252, 179, 250, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "33": { "color": [204, 248, 252, 0.8], "Outline": [130, 130, 130, 0.8], title: true,zoom:10 },
        "43": { "color":baseMapSelect!=="satellite"?DarkMode?[35, 35, 35, 1]:[242, 239, 233, 1]:[185, 145, 95, .9], "Outline": [116, 96, 116, .5], title: false,zoom:false },
        "44": { "color": [242, 239, 233, 0], "Outline": [169, 169, 169, .5], title: false,zoom:false },
        "48": { "color":DarkMode?[35, 35, 35, 1]:[242, 239, 233, 0], "Outline": [51, 129, 109, .5], title: false,zoom:false },
        "50": { "color":baseMapSelect=="satellite"?[20, 56, 72, 1]:DarkMode?[35, 35, 35, 1]:[170, 211, 223, 1], "Outline": [116, 96, 116, .5], title: false,zoom:false }
      }
    )
  }
}


