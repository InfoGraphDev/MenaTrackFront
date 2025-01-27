

export class ComplainConstant{
        static Response_Constant=[
            "تم الحل",
            "جاري العمل",
            "تم الإرسال إلى الفريق",
            "قيد الانتظار",
            "غير قابل للحل"
        ]
        
        static Category_Constant=[
            "إنترنت",
            "هاتف",
            "جوال",
            "تلفزيون",
            "خدمات أخرى"
          ]
          static CategoryColor = {
            "إنترنت": "rgb(230, 57, 70)",   
            "هاتف": "rgb(29, 53, 87)",      
            "جوال": "rgb(244, 162, 97)",    
            "تلفزيون": "rgb(168, 218, 220)", 
            "خدمات أخرى": "rgb(109, 104, 117)" 
        };
        
        static CategoryInfo = [
            { name: "إنترنت", outline: [230, 57, 70],background: [230, 57, 70] },
            { name: "هاتف", outline: [29, 53, 87],background: [29, 53, 87] },
            { name: "جوال", outline: [244, 162, 97],background: [244, 162, 97] },
            { name: "تلفزيون", outline: [168, 218, 220],background: [168, 218, 220] },
            { name: "خدمات أخرى", outline:[109, 104, 117],background: [109, 104, 117] }
        ];
}
      
    