<?php
    $order = $_POST['order'];
    $user_info = $_POST['user_info'];
    $email = $user_info['user_contact'];

    $to = $email;
    $subject = $email . "님, 주문 감사합니다.";
    $headers = array(
    	'Content-Type: text/html; charset=UTF-8', 
		'CC: openbooklettering@gmail.com'
	);

    $message = $email . "님, 주문 감사합니다.";
    $message .= "<br /><br />";
    $message .= "상품을 확인하고 회신 드리겠습니다.";

    // Send mail
    $send = wp_mail( $to, $subject, $message, $headers );

    // Send the request
    if( $send ){
        echo json_encode(array("state" => 200));
    } else if( !$send ) {
        echo json_encode(array("state" => 500));
    }
?>