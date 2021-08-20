<?php

class CheckoutShippingShortCode{

    public function __construct()
    {
        add_shortcode('checkout_shipping', array($this, 'handleShortCode'));
        add_action('wp_enqueue_scripts', array($this, 'addAssets'));
    }
    public function handleShortCode(){
        $items = WC()->cart->get_cart();
        $itemsData = [];
      
        $i= 0;
        foreach($items as  $item){
          
            $itemsData[$i] = array(
                "itemData"=>  [
                    "id"=>$item['product_id'],
                    "width"=> $item['data']->get_width(),
                    "height"=> $item['data']->get_height(),
                    "lenght"=>$item['data']->get_length(),
                    "qty"=>$item['quantity']
                       
                 ]
            ) ;
            
            $i++;
       }


       
        ob_start(); ?>

         <pre id="shipping_data" style="display: none;"  ><?php echo wp_json_encode($itemsData) ?></pre>
        <div class="checkout-shipping-shortcode" >
       
        
         
        </div>
        <?php return ob_get_clean();
    }
    public function addAssets(){
        if(is_page('checkout')){
           wp_enqueue_style( 'shipping_style',  plugin_dir_url(__FILE__). '../../build/index.css' );
            wp_register_script('shipping_js', plugin_dir_url(__FILE__). '../../build/index.js', array('wp-element'),'1.0', true);
            wp_enqueue_script('shipping_js');
        }
    }

}

if(class_exists('CheckoutShippingShortCode')){
    
    $checkoutShippingShortCode = new CheckoutShippingShortCode();
}
