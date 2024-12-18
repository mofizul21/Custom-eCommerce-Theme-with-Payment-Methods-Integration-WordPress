<?php
    $main_setting = get_field( 'main_setting', 'option' );
    $subscribe_text = $main_setting['subscribe_text'];
    $ko = $subscribe_text['ko'];
    $en = $subscribe_text['en'];
?>

<div id="modal-subscribe">
    <button id="close-subscribe">
        <img src="<?= get_template_directory_uri(); ?>/public/assets/icon/toggle_icon.svg" alt="toggle" />
    </button>
    <div class="heading">
        <div class="ko"><?= $ko; ?></div>
        <div class="en"><?= $en; ?></div>
    </div>
    <form id="subscribe-form">
        <input type="email" name="user-email" id="user-email" placeholder="textumclub@gmail.com" autocomplete="off" required />
        <button type="submit" id="subscribe">
            <div class="ko">제출하기</div>
            <div class="en">Submit</div>
        </button>
    </form>
</div>