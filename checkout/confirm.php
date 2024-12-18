<?php
    $path = preg_replace( '/wp-content.*$/', '', __DIR__ );
    require_once( $path . 'wp-load.php' );
    
    header("Access-Control-Allow-Origin: https://openboek.info//");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
?>

<?php
    if( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
        http_response_code(403);
        exit('Forbidden');
    }
?>

<?php
    $dataFromPOST = file_get_contents('php://input');
    $decodedData = json_decode($dataFromPOST, true);

    $api_url = 'https://openboek.info//wp-json/wp/v2/customer-order';

    $user_contact = $decodedData['_user_info']['user_contact'];
    $post_data = array(
        'title'   => $user_contact . "님의 새로운 주문",
        'status'  => 'publish'
    );

    $username = getenv('USERNAME');
    $password = getenv('PASSWORD');

    // remote
    $response = wp_remote_post($api_url, array(
        'method'    => 'POST',
        'body'      => json_encode($post_data),
        'headers'   => array(
            'Authorization' => 'Basic ' . base64_encode($username . ':' . $password),
            'Content-Type'  => 'application/json',
        ),
        'timeout'   => 45,
        'blocking'  => true,
        'sslverify' => false,
    ));
    
    // error
    if (is_wp_error($response)) {
        $error_message = $response->get_error_message();
        die('Request failed: ' . $error_message);
    }
    
    // response state
    $response_code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    
    // echo 'Response Code: ' . $response_code . '<br>';
    // echo 'Response Body: ' . $body . '<br>';
    
    $data = json_decode($body, true);
    
    if( isset($data['id']) ) {
        $post_id = $data['id'];

        $taxonomy = 'category-customer-order';
        $term_slug = 'success';
        $term = get_term_by('slug', $term_slug, $taxonomy);

        if( $term ) {
            wp_set_object_terms($post_id, $term->term_id, $taxonomy);
            $result = array(
                'post_id' => $post_id,
                'status' => 201
            );
            // $result = array('message' => '결제 완료, 주문이 생성됨.');
        } else {
            // $result = array('message' => '결제는 완료되었으나, 주문이 생성되지 않음.');
        }

        // acf update
        if( function_exists('update_field') ) {
            $user_contact = $decodedData['_user_info']['user_contact'];
            update_field('user_contact', $user_contact, $post_id);

            $product_order = "font_count: " . $decodedData['_order']['font_count'] . "<br /><br />";
            $product_order .= "products: " . "<br />";
            $o_products = $decodedData['_order']['products'];
            foreach( $o_products as $op ) {
                $product_order .= "parent_name: " . $op['parent_name'] . "<br />";

                $op_children = $op['children'];
                foreach( $op_children as $key=>$opc ) {
                    if( $key == count($op_children) - 1 ) {
                        $product_order .= "child_name: " . $opc['name'] . "<br /><br />";
                    } else {
                        $product_order .= "child_name: " . $opc['name'] . "<br />";
                    }
                }
            }
            
            $product_order .= "licenses: " . "<br />";
            $o_licenses = $decodedData['_order']['licenses'];
            foreach( $o_licenses as $key=>$ol ) {
                if( $key == count($o_licenses) - 1 ) {
                    $product_order .= $ol . "<br /><br />";
                } else {
                    $product_order .= $ol . "<br />";
                }
            }

            $o_user_size = $decodedData['_order']['user_size'];
            $product_order .= "user_size: " . $o_user_size;

            $product_order .= "<br /><br />" . "options: ";
            $o_options = $decodedData['_order']['options'];
            if( count($o_options) > 0 ) {
                $product_order .= "EDU";
            }
            update_field('product_order', $product_order, $post_id);

            $total_price = $decodedData['_order']['total_price'];
            update_field('total_price', $total_price, $post_id);
        }

        // $result = array(
        //     'post_id' => $post_id,
        //     'status' => 201
        // );

        echo json_encode( $result );
    } else {
        die('Failed to retrieve post ID');
    }
?>

<?php
    // $decodedData = json_decode($paymentData, true);
    // $result = array('_order' => $order);
    // echo json_encode($result);
?>