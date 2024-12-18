<?php
    header("Access-Control-Allow-Origin: https://openboek.info/");
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
    $result = array('msg' => '결제 준비 완료');
    echo json_encode($result);
?>