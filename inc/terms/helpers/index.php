<?php
?>



<?php

do_action('woocommerce_before_checkout_form', $checkout);




$items = WC()->cart->get_cart();

$productsId = [];
$i = 0;
foreach ($items as $item => $values) {
   
    $productsId[$i] = ["id"=> $values['product_id'], "qty"=>$values['quantity']];
    
   
    $i++;
}


$amount = WC()->cart->get_cart_contents_count();
$deposit_due = $amount * 500;



$costumer = WC()->cart->get_customer();
$costumer_data = WC()->cart->get_customer()->get_meta_data();
$company_name = get_user_meta($costumer->get_id(), 'company_name');
$country = get_user_meta($costumer->get_id(), 'country');
$costumerBillinAdressData = [
    "firstName" => $costumer->get_billing_first_name(),
    "lastName" => $costumer->get_billing_last_name(),
    "company" => $costumer->get_billing_company(),
    "country" => $costumer->get_billing_country(),
    "email" => $costumer->get_billing_email(),
    "phone" => $costumer->get_billing_phone(),
    "zipCode" => $costumer->get_billing_postcode(),
    "address" => $costumer->get_billing_address(),
    "address_1" => $costumer->get_billing_address_1(),
    "address_2" => $costumer->get_billing_address_2(),
    "state" => $costumer->get_billing_state(),
    "city" => $costumer->get_billing_city(),
];

$costumerShippinData = [

    "firstName" => $costumer->get_shipping_first_name(),
    "lastName" => $costumer->get_shipping_last_name(),
    "company" => $costumer->get_shipping_company(),
    "country" => $costumer->get_shipping_country(),
    "zipCode" => $costumer->get_shipping_postcode(),
    "address" => $costumer->get_shipping_address(),
    "address_1" => $costumer->get_shipping_address_1(),
    "address_2" => $costumer->get_shipping_address_2(),
    "state" => $costumer->get_shipping_state(),
    "address_2" => $costumer->get_shipping_city()
];



if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
?>
    <!-- <?php  // echo do_shortcode('[checkout_shipping]') ?> -->
    <div class="casauto-ext-terms__wrapper" data-costumer-id="<?php echo $costumer->id ?>"  data-form-id="2318">
        <div class="casauto-ext-billing_data" style="display:none">
            <pre> <?php echo wp_json_encode($costumerBillinAdressData) ?></pre>
        </div>
        <div class="casauto-ext-shipping_data" style="display:none">
            <pre> <?php echo wp_json_encode($costumerShippinData) ?></pre>
        </div>
        <div class="casauto-ext-shipping_item_data" style="display:none">
            <pre> <?php echo wp_json_encode($productsId) ?></pre>
        </div>


        <div class="casauto-ext_terms__wrapper">
            <div class="casauto-ext_terms_vehicle_wrapper">
                <h3>Vehicle Info</h2>

                    <div class="casauto-ext_terms_vehicle_wrapper_info">
                        <?php foreach ($items as $item => $values) {
                            $_product =  wc_get_product($values['data']->get_id());
                            $price =   get_post_meta($values['product_id'], '_price', true);



                            $price = number_format(intval($price), 2);



                        ?>
                            <div class="casauto-ext_terms_vehicle_item">
                                <?php
                                echo $_product->get_image(array(100, 120));
                                ?>
                                <h4><?php echo $_product->get_title() ?></h4>

                                <h4 style="margin-left: auto;"><?php echo '$' . $price ?></h4>


                            </div>





                        <?php } ?>
                    </div>
                    <div class="casauto-ext_terms_vehicle_deposit">
                        <div class="casauto-ext_terms_feed">
                            <h3>
                                Deposit Due Today
                            </h3>
                            <h3><?php echo '$' . $deposit_due ?></h3>
                        </div>
                        <p>Handling Fee of $195 per vehicle. </p>

                    </div>


                    <div class="casuto-ext_terms_costumer_info">
                        <h3>Customer Info</h3>
                        <p><?php echo $costumer->get_first_name() . " " . $costumer->get_last_name() ?><br><?php echo $company_name[0]  ?><br> <?php echo $costumer->get_address(); ?> <br> <?php echo $costumer->get_country() ?> , <?php echo $costumer->get_billing_phone() ?> </p>


                        <p><?php echo $costumer->get_email() ?><br><?php echo $costumer->get_billing_phone() ?></p>
                    </div>
                    <div class="casauto-ext_terms_excerpt_terms">
                        <h3>Additional Terms</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                        </p>
                        <p>
                            Your vehicle will be put on hold for 3 days

                        </p>
                    </div>

            </div>

            <div class="casauto-ext_terms_form">

                <!-- <?php //   echo do_shortcode('[wpforms id="2307"]');
                        ?>  -->
                <?php echo do_shortcode('[wpforms id="2318"]'); ?>
                <?php // echo do_shortcode('[wpforms id="1511"]');
                ?>

            </div>

        </div>
    </div>
<?php } else {



    global $woocommerce;
    $woocommerce->cart->empty_cart();
?>


    <div class="casauto-success-checkout">
        <div class="casauto-success-checkout_alert">
            <div class="casauto-success-checkout_alert_icon">
                <span> &#10003;</span>
            </div>
            <div class="casauto-success-checkout_alert_text">
                <h3> Success!</h3>
                <span>You will receive an email shortly with your order details</span>
            </div>
        </div>
        <div class="casauto-success-checkout_next">
            <div class="casauto-success-checkout_next_item">
                <h4>What's Next?</h4>
            </div>
            <div class="casauto-success-checkout_next_item">
                <span>&#10003;</span>
                <p>Complete $500 deposit to hold your vehicle.</p>
            </div>
            <div class="casauto-success-checkout_next_item">
                <span>+</span>
                <p>Sign sales agreement.</p>
            </div>
            <div class="casauto-success-checkout_next_item">
                <span>+</span>
                <p>Complete wire transfer.</p>
            </div>
            <div class="casauto-success-checkout_next_item">
                <span>+</span>
                <p>Complete Shipping order</p>
            </div>

        </div>
        <div class="casauto-success-checkout_question">
            <h4>Any question?</h4>
            <a href="#">Start a chat</a> <span>with your Account Manager.</span>
        </div>
    </div>
<?php } ?>

<!-- <div class="casauto-ext_account_approved">
    <h3>Your account is approved</h3>
    <p>Thank you for verifying your account</p>
    <p>You can procced to checkout. if you have any question, don't hesitate to contact your sales representative</p>
    <button>Continue</button>
</div> -->
<?php echo do_shortcode('[sales-representative]') ?>

<!-- <div class="casauto-success-checkout_go__dashboard">
    <a href="/my-account">View your Dashboard</a>
</div> -->