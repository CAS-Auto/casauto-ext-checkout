(function ($) {

  $(document).ready(function () {
    //    $('#wpforms-form-1747').submit(function(){
          
    //    var checkExist =  setInterval(function(){
    //         if($('#wpforms-confirmation-1747').length){
    //             setTimeout(function(){
    //             $('#wpforms-1747').css('display', 'none');
    //             $('.form-compliance').addClass('visible-ext');
    //             $(".casauto-ext_terms__heading div:eq(1)").addClass('active');
    //             $(".casauto-ext_terms__heading div:eq(2)").addClass('active');
    //             $(".casauto-ext_terms__subheading span:eq(0)").removeClass('active');
    //             $(".casauto-ext_terms__subheading span:eq(1)").addClass('active');
                
    //             }, 1000)
    //             clearInterval(checkExist);
    //         }
    //      },1000)
    //    })
    //    $('#wpforms-form-1511').submit(function(){
    //     var checkExistForm = setInterval(function(){
    //         if($('#wpforms-confirmation-1511').length){
                    
    //             setTimeout(function(){
    //             $('#wpforms-1511').css('display', 'none');
    //             $('.casauto-ext_terms__wrapper').css('display', 'none');
    //             $('.casauto-ext_account_approved').css('display', 'block')
    //             }, 1000)

    //             clearInterval(checkExistForm);
    //         }
    //     }, 1000)
    //    })
    //    $('.casauto-ext_account_approved button').click(function(){
    //        setTimeout(function(){
    //         $('.casauto-ext_account_approved').css('display', 'none');
    //         $('.sales-representative_wrapper').css('display', 'none');
    //         $('.not-sales-representative_wrapper').css('display', 'none');
    //         $('form.checkout').css('display', 'block');
    //         $(".casauto-ext_terms__heading div:eq(3)").addClass('active');
    //         $(".casauto-ext_terms__heading div:eq(4)").addClass('active');
    //         $(".casauto-ext_terms__subheading span:eq(1)").removeClass('active');
    //         $(".casauto-ext_terms__subheading span:eq(2)").addClass('active');
    //        }, 300)
    //    })

    const costumerId = $('.casauto-ext-terms__wrapper').data('costumerId');
 
   const billingAdress = JSON.parse($('.casauto-ext-billing_data pre').html());
   const shippingAddress = JSON.parse($('.casauto-ext-shipping_data pre').html());
   const productItems = JSON.parse($('.casauto-ext-shipping_item_data pre').html());
   
   
    //const productItems = $('.casauto-ext-terms__wrapper').data('productItems');
//    console.log("i am here")
//     console.log(productItems);
    const formId = $('.casauto-ext-terms__wrapper').data('formId');

    $(`#wpforms-${formId}-field_6`).val(costumerId);
    $(`#wpforms-${formId}-field_7`).val(billingAdress);
    $(`#wpforms-${formId}-field_9`).val(shippingAddress);
    $(`#wpforms-${formId}-field_8`).val(productItems);
    
      
    $(`#wpforms-form-${formId}`).on('submit',function (e) { 
        e.preventDefault();
        const creditCard = $(`#wpforms-2318-field_1`).val();
    const expirationDate  = $(`#wpforms-${formId}-field_4`).val(); 
    const ccv  = $(`#wpforms-${formId}-field_5`).val(); 
    

        const data = {
             costumerId,
            billingAdress,
            shippingAddress,
            productItems,
            creditCard,
            expirationDate,
            ccv

            
        }
       $.ajax({
            method: "POST",
            url: "/wp-json/orders/v1/order",
            data,
            dataType: "JSON",
           
        }).done((response)=>{
            console.log(response);
        });
    });
      
      
   });

})(jQuery)