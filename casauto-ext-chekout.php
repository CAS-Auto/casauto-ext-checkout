<?php 
/*
Plugin Name: Ext Checkout
Plugin URI: 
Description: This plugin has the purpose to to extend the checkout page
Author:
Author URI:
Version: 0.1
*/

defined ('ABSPATH') or die ('Hey, you can\t access this file');

class CasautoExtCheckout{

    private static $instance = null;
   
    function __construct()
	{
		
        $this->includeFiles();
	} 
    

    public static function getInstance()
    {
        if ( self::$instance == null )
        {
            self::$instance = new CasautoExtCheckout();
        }

        return self::$instance;
    }

    function includeFiles(){
        include_once('inc/terms/Terms.php');
        include_once('inc/order/Order.php');
        include_once('inc/shortCodeShipping/CheckoutShippingShortCode.php');
    }

    function activate ()
	{
		
		//Flush rewrite rules
		flush_rewrite_rules();
	}
	
	function deactivate ()
	{
		//Flush rewrite rules
     
        flush_rewrite_rules();
	}
    function uninstall(){
        flush_rewrite_rules();
    }


}


if (class_exists('CasautoExtCheckout'))
{
	$casautoCareerListing =  CasautoExtCheckout::getInstance();
    
}
//activation
register_activation_hook (__FILE__, array($casautoCareerListing, 'activate'));

//deactivate
register_deactivation_hook (__FILE__, array($casautoCareerListing, 'deactivate'));

//uninstall

register_uninstall_hook( __FILE__ , array($casautoCareerListing, 'uninstall') );