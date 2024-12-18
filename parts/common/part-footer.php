<?php
    $external_link = get_field( 'external_link', 'option' );
?>
<footer id="main-footer">
    <nav class="item-main-footer footer-nav">
        <ul class="footer-menu">
            <li class="item-footer-menu"><a href="<?= $external_link['external_link_instagram']; ?>" target="_blank">
                <span class="text">instagram</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= $external_link['external_link_youtube']; ?>" target="_blank">
                <span class="text">youtube</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= $external_link['external_link_github']; ?>" target="_blank">
                <span class="text">github</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= $external_link['external_link_apple_music']; ?>" target="_blank">
                <span class="text">apple music</span>
            </a></li>
        </ul>
        <ul class="footer-menu">
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/about">
                <span class="text">about</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/mailing-list">
                <span class="text">mailing list</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/license-agreement">
                <span class="text">license agreement</span>
            </a></li>
        </ul>
    </nav>
    <nav class="item-main-footer footer-nav sub">
        <ul class="footer-menu">
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/frequently-asked-question">
                <span class="text">frequently asked q</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/terms-and-conditions">
                <span class="text">terms & conditions</span>
            </a></li>
            <li class="item-footer-menu"><a href="<?= home_url(); ?>/privacy-policy">
                <span class="text">privacy policy</span>
            </a></li>
        </ul>
    </nav>
    <div class="item-main-footer copyright">
        <span class="text">Openboek Inc. Since 2022. All rights reserved.</span>
    </div>
    <div class="item-main-footer cookie">
        <span class="text">THE OPENBOEK SITE REQUIRES COOKIES TO BE ACCEPTED. BY CONTINUING TO BROWSE THE SITE YOU ARE AGREEING TO OUR USE OF COOKIES AS DESCRIBED <a href="">HERE</a> <button id="close-cookie-notice">x</button></span>
    </div>
</footer>