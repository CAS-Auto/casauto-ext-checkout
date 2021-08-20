<?php

use function Genesis\PageBuilder\PluginUpdates\get_product_info;

class Order
{
    private static $instance = null;



    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Order();
        }

        return self::$instance;
    }

    function __construct()
    {
        add_action('rest_api_init',array($this,'createOrderEnpoint' ));
    }

    function createOrderEnpoint()
    {
        register_rest_route('orders/v1', '/order', array(
            'methods' => 'POST',
            'callback' => array($this, 'createOrderCallback'),
        ));
    }
    function createOrderCallback($request_data)
    {
        // Fetching values from API
        $parameters = $request_data->get_params();
       
        // var_dump($parameters); exit;
     
        global $woocommerce;

        $billingAddress = array(
            'first_name' => $parameters['billingAdress']['firstName'],
            'last_name'  => $parameters['billingAdress']['lastName'],
            'company'    =>  $parameters['billingAdress']['company'],
            'email'      => $parameters['billingAdress']['email'],
            'phone'      => $parameters['billingAdress']['phone'],
            'address'  => $parameters['billingAdress']['address'],
            'address_1'  =>  $parameters['billingAdress']['address_1'],
            'address_2'  => $parameters['billingAdress']['address_2'],
            'state'      => $parameters['billingAdress']['state'],
            'city'       => $parameters['billingAdress']['city'],
            'postcode'   => $parameters['billingAdress']['zipcode'],
            'country'    => $parameters['billingAdress']['country'],
        );
        $shippingAddress = array(
            'first_name' => $parameters['shippingAddress']['firstName'],
            'last_name'  => $parameters['shippingAddress']['lastName'],
            'company'    =>  $parameters['shippingAddress']['company'],          
            'address'  => $parameters['shippingAddress']['address'],
            'address_1'  =>  $parameters['shippingAddress']['address_1'],
            'address_2'  => $parameters['shippingAddress']['address_2'],
            'state'      => $parameters['shippingAddress']['state'],
            'city'       => $parameters['shippingAddress']['city'],
            'postcode'   => $parameters['shippingAddress']['zipcode'],
            'country'    => $parameters['shippingAddress']['country'],
        );
        // Now we create the order
        $order = wc_create_order();
        $order->set_customer_id($parameters['costumerId']);
        
        
     //   var_dump($parameters['productItems']); exit;
       // var_dump($items); exit;
        foreach($parameters['productItems'] as $item){
            for($i=1; $i<=  intval($item['qty']); $i++){

                $order->add_product(wc_get_product($item['id'])); 
            }
        }
        
        // The add_product() function below is located in /plugins/woocommerce/includes/abstracts/abstract_wc_order.php
      // $order->add_product(get_product('275962'), 1); // This is an existing SIMPLE product
        $order->set_address($billingAddress, 'billing');
        $order->set_address($shippingAddress, 'shipping');
        //
        $order->calculate_totals();
        $order->update_status("on-hold");
        $order->save();
        
        return "Success";
    }
}

$order = Order::getInstance();