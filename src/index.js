import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {generateRecomendations} from './helpers/helper'

import './shipping.scss';

document.addEventListener('DOMContentLoaded', function(){

    const divAll = document.querySelectorAll('.checkout-shipping-shortcode');
    const dataToAdd = document.getElementById('shipping_data').textContent;


    
    if(divAll){
        divAll.forEach(divToUpdate=>{
            ReactDOM.render(<ShippingComponent  data={JSON.parse(dataToAdd)}  />, divToUpdate);

        })
    }
   
   
})

const calculateShipping = (data)=>{
    const containerAlenght = 609.9;
    const containerBlenght = 914.4;
    const containerCcaplenght = 1219.2;
    
    let totalAmount = 0;
    let totalLenght = 0;
    let heightArray = [];
    let itemsArray = [];
   
    data.forEach((item)=>{
        const {id, width, height,lenght, qty} = item.itemData;
        totalLenght = totalLenght+(lenght*qty);
        totalAmount = totalAmount+ qty
        heightArray =[...heightArray, height];
       for(let i= 0; i< qty; i++){
           itemsArray = [...itemsArray, item]
       }
        
    })
    
    return generateRecomendations(totalAmount);
    // console.log(generateRecomendations(totalAmount));
    // return fillContainers(itemsArray, totalAmount, totalLenght);
    
    
     
    
}


 const ShippingComponent = ({data}) => {
   const result =  calculateShipping(data);
   console.log(result)
   
   
   
   
    return (
        <>
            <div className="casauto-shipping-box">
                <h5>Your Shipping Options</h5>
                <p>Prices are estimates and subject to change</p>
                <div className="shipping-list-wrapper" >
                  {
                      result.map(item =>(
                        <div className="shipping-list-item">
                             <div className="shipping-list-item-radio"><input type="radio" name="recommendation" value="other"/></div>
                                 <div className="shipping-list-item-value">
                                     {item['roro'] !== 0 && <p>{item['roro'] + ' roro'}</p> }
                                     {item['20ft'] !== 0 &&  <p>{item['20ft'] + ' Container 20ft'}</p>  } 
                                     {item['30ft'] !== 0 &&  <p>{item['30ft'] + ' Container 30ft'}</p>} 
                                     {item['40ft'] !== 0 && <p>{item['40ft'] + ' Container 40ft'}</p>} 
                                </div> 
                                <div className="shipping-list-item-price">${item.price}</div>  
                        </div>
                      ))
                  }
                   <div className="shipping-list-item-last">
                             <div className="shipping-list-item-radio"><input type="radio" name="recommendation" value="other"/></div>
                             <div className="shipping-list-item-input"><label>Other</label><input type="text" name="custom_value" value=""/></div>
                    </div>
                 
                </div>

                {/* <ul id="shipping-ul-list">
                   {dataBytype.roro !== 0 && <li>{`${dataBytype.roro} roro`}</li> }
                   {dataBytype.typeA !== 0  && <li>{`${dataBytype.typeA} Container 20ft `}</li> }
                   {dataBytype.typeB !== 0 && <li>{`${dataBytype.typeB} Container 30ft`}</li> }
                   {dataBytype.typeC !== 0 && <li>{`${dataBytype.typeC} Container 40ft`}</li> }
                </ul> */}
                {/* <div id="shipping-terms" className="wpforms-field wpforms-field-checkbox" data-field-id="11">
                    
                    <ul id="shipping-terms-ul">
                        <li className="choice-1 depth-1">
                       
                            <input type="checkbox" name="wpforms[fields][11][]" value="First Choice"/>
                            <label className="wpforms-field-label-inline" for="wpforms-2318-field_11_1">Mark to accept our recommendation</label>
                            </li>
                        </ul>
                    </div>
                <div id="shipping-info" className="wpforms-field wpforms-field-text" data-field-id="1">
                    <label className="wpforms-field-label" for="wpforms-2318-field_1">What's your preferred shipping option</label>
                    <input type="text" className="wpforms-field-medium" name="wpforms[fields][1]"/>

                    </div> */}
            </div>
          
        </>
    )
}
