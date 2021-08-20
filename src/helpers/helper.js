 export const fillContainers = (data, totalAmount,totalLenght )=>{
    let containerA = {
        "qty":0,
        "maxLenght": 609.9,
        "isFull": false,
         "maxQty":2
    };
    let containerB = {
        "qty":0,
        "maxLenght":914.4,
        "isFull": false,
        "maxQty":3
    };
    let containerC = {
        "qty":0,
        "maxLenght":1219.2,
        "isFull": false,
        "maxQty":4
    }
   
        let containerArray = [];
        let tempArray = [];
    data.forEach((item, idx)=>{
    const {id,lenght } = item.itemData;

        if(totalAmount === 1 ){
            let itemToSave = {
                "itemId": id,
                "type":"Roro"
            }
            containerArray = [...containerArray, itemToSave];
           
        }
   
       
       
        if(totalAmount == 2 ){

           
                 let itemToSave = {
                     "itemId": id,
                     "type":"A"
                 }
               

                    tempArray = [...tempArray, itemToSave];
                
                if(containerA.maxQty === tempArray.length){
                   
                    containerArray = [...containerArray, tempArray];
                    totalAmount = totalAmount-tempArray.length;
                  
                    tempArray = []
                }
                
            
                
        }
        if(totalAmount === 3){
           
                let itemToSave = {
                    "itemId": id,
                    "type":"B"
                }
                tempArray = [...tempArray, itemToSave];
               if(containerB.maxQty === tempArray.length){
                   
                   containerArray = [...containerArray, tempArray];
                   totalAmount = totalAmount-tempArray.length

                   tempArray = []
               }
               
        
        }
        if(totalAmount >= 4){
         
            let itemToSave = {
                "itemId": id,
                "type":"C"
            }
            tempArray = [...tempArray, itemToSave];
            
           if(containerC.maxQty === tempArray.length){
                   
               containerArray = [...containerArray, tempArray];
               totalAmount = totalAmount-tempArray.length
              
               tempArray = []
           }
           
    
    }
})

       

       return containerArray;
    
}
export const amountItems  = (arrayData)=>{
    console.log(arrayData)
      let  containerType = {
                            "typeA":0,
                            "typeB":0,
                            "typeC":0,
                            "roro":0
                        };
    
    arrayData.forEach(item=>{
       if(Array.isArray(item)){
           if(item.length == 2){
               containerType.typeA =  containerType.typeA+ 1
           }
           if(item.length == 3){
               containerType.typeB = containerType.typeB + 1
           }
           if(item.length == 4){
               containerType.typeC = containerType.typeC +1
           }
       }else{
           containerType.roro = containerType.roro +1
       }
    })
    return containerType;
}

export const getCombinations  = (value, idx, arrayResult= [] )=>{
     if(value === 1){
        value = value-1
         return [...arrayResult, {"roro":1}] ;
     }
     if(value==2){
        value = value-2
        let combinations = [{"20ft":1},{ "roro":2}];
     //   let idxCombinations = Math.floor(Math.random() * 2);
        if(combinations[idx]){

            return [...arrayResult, combinations[idx]]
        }else{
            return [...arrayResult]
        }
     }
     if(value === 3){
        value = value-3
        let combinations= [ {"30ft": 1}, {"20ft": 1, "roro":1}, {"roro":3}]
      //  let idxCombinations = Math.floor(Math.random() * 2);
                if(combinations[idx]){

                    return [...arrayResult, combinations[idx]]
                }else{
                    return [...arrayResult]
                }
     }
     if(value === 4){
         value = value-4
         let combinations = [{"40ft":1}, {"20ft": 2}, {"30ft":1, "roro":1}, {"roro":4}];
       //  let idxCombinations = Math.floor(Math.random() * 2);

         if (combinations[idx]) {

             return [...arrayResult, combinations[idx]]
         } else {
             return [...arrayResult]
         }
     }
     if(value > 4 ){
        arrayResult = [...arrayResult,{"40ft":1}]

        return getCombinations(value-4,idx, arrayResult);
     }
     
    
}
 export const formatCombinationsResult = (arrayResult)=>{
    let responFormat = {
        "20ft":0,
        "30ft":0,
        "40ft":0,
        "roro":0, 
        "price":0
    }
   if(arrayResult){
      arrayResult.forEach(item=>{
          let keys = Object.keys(item);
          if(keys){
              keys.forEach(keyItem=>{
                  if(keyItem == "20ft"){
                      responFormat['20ft'] =responFormat['20ft'] +item['20ft'] 
                  }
                  if(keyItem == "30ft"){
                      responFormat['30ft'] =responFormat['30ft'] +item['30ft']  
                  }
                  if(keyItem == "40ft"){
                      responFormat['40ft'] =responFormat['40ft'] +item['40ft'] 
                  }
                  if(keyItem == "roro"){
                      responFormat['roro'] =responFormat['roro'] +item['roro'] 
                  }
                  
              })
          }
      })
   }
 
  
   let price = 0;

    for(const property in responFormat) {
       
        if(responFormat[property] !== 0){
            switch (property) {
                case '20ft':
                    price = price + (responFormat[property]*920)
                    break;
                case '30ft':
                    price = price + (responFormat[property]*920)
                    break;
                case '40ft':
                    price = price + (responFormat[property]*920)
                    break;
                case 'roro':
                    price = price + (responFormat[property]*850)
                    break;
                default:
                    break;
            }
        }
      }
     responFormat.price = price;
   return responFormat;
 }
 export  const generateRecomendations  = (totalAmount)=>{
        let result = [];
        let maxValue = 3;
        if(totalAmount === 2){
            maxValue = 2
        }
        if(totalAmount === 1){
            maxValue= 1
        }
       
    for(let i = 0; i< maxValue; i++){
        let resultCombinations =   getCombinations(totalAmount, i );
         let cheKIsOn = false;
        if(result.length === 0){

            result = [...result,formatCombinationsResult(resultCombinations)];  
        }else{
            result.forEach(item=>{
                if(isEqual(item ,formatCombinationsResult(resultCombinations) )){
                    cheKIsOn =  isEqual(item,formatCombinationsResult(resultCombinations) )
                }
                
            })
            if(!cheKIsOn){
                result = [...result,formatCombinationsResult(resultCombinations)];   
            }
        }
      }
      return result
  }

  const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));