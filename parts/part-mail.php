<?php
    $email = $_POST['email'];
    $main_setting = get_field("main_setting", "option");
    $after_subscribe = $main_setting['after_subscribe'];

    $to = $email;
    $subject = $email . "님, 텍스텀 클럽을 구독해주셔서 감사합니다.";
    // $headers = array('Content-Type: text/html; charset=UTF-8', 'CC: info@strx.kr', 'BCC: lizaillust@gmail.com');
    $headers = array('Content-Type: text/html; charset=UTF-8', 'CC: lizaillust@gmail.com');
    $message .= $after_subscribe;

    // Send mail
    $send = wp_mail( $to, $subject, $message, $headers );

    // Send the request
    if( $send ){
        echo "메일을 뉴스레터 구독자 리스트에 추가하였습니다. 감사합니다.";
    } else if( !$send ) {
        echo "메일 전송 관련 에러가 발생하였습니다. info@textumclub.com으로 알려주세요.";
    }
?>