<?php
 
 class Terms{

    private static $instance = null;

    

    public static function getInstance()
    {
        if ( self::$instance == null )
        {
            self::$instance = new Terms();
        }

        return self::$instance;
    }

     public function __construct()
     {
         add_action('woocommerce_before_checkout_form', array($this, 'add_terms_forms'));
         add_action('wp_enqueue_scripts', array($this, 'add_terms_style'));
        add_action('init', array($this, 'customizeCheckoutPage'));        
     }

     function add_terms_forms(){
           
        

        $file = __DIR__.'/helpers/index.php';
       
        if(!file_exists($file)){
            return;
        }
        ob_start();
        include_once 'helpers/index.php';

        $content = ob_get_contents(); ob_end_clean();

        echo $content;

     }
     function add_terms_style()
    {
        if(is_page('checkout')){
           
            wp_register_style('terms_plugin',plugin_dir_url( __FILE__ ).'../assets/css/terms.css');
             wp_enqueue_style('terms_plugin');
             wp_register_script('custom_js', plugin_dir_url( __FILE__ ).'../assets/js/custom.js', '1.1', true );
              wp_enqueue_script('custom_js');
           
           //   wp_enqueue_script('codaFrontEnd', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-element'),  '', true);
        }
       
       
    }
    public function customizeCheckoutPage()
    {
        remove_action( 'woocommerce_checkout_billing', 'action_woocommerce_checkout_billing', 10, 2); 
     
       remove_action( 'woocommerce_checkout_order_review', 'action_woocommerce_checkout_order_review', 10, 2 ); 
        remove_action( 'woocommerce_checkout_billing', 'action_woocommerce_checkout_order_review', 10, 2 );        
    }
   



 }

 if(class_exists('Terms')){
    $terms = Terms::getInstance();
 }
 