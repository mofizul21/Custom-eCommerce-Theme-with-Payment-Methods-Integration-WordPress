<?php
    $intro_header = get_field('intro_header', 'option');
    $item_intro_header_1 = $intro_header['item_intro_header_1'];
    $item_intro_header_2 = $intro_header['item_intro_header_2'];
    $item_intro_header_3 = $intro_header['item_intro_header_3'];
    $item_intro_header_4 = $intro_header['item_intro_header_4'];
?>
<div id="intro-header">
    <nav id="intro-nav">
        <ul id="intro-menu">
            <li class="item-intro-menu"><a href="<?= home_url(); ?>/font">
                <img 
                    data-src="<?= $item_intro_header_1['front_image']['url']; ?>"
                    class="lazyload"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
                <img
                    class="hover lazyload" 
                    data-src="<?= $item_intro_header_1['back_image']['url']; ?>"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
            </a></li>
            <li class="item-intro-menu"><a href="<?= home_url(); ?>/licensing">
                <img 
                    data-src="<?= $item_intro_header_2['front_image']['url']; ?>"
                    class="lazyload"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
                <img
                    class="hover lazyload" 
                    data-src="<?= $item_intro_header_2['back_image']['url']; ?>"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
            </a></li>
            <li class="item-intro-menu"><a href="<?= home_url(); ?>/shop">
                <img 
                    data-src="<?= $item_intro_header_3['front_image']['url']; ?>"
                    class="lazyload"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
                <img
                    class="hover lazyload" 
                    data-src="<?= $item_intro_header_3['back_image']['url']; ?>"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
            </a></li>
            <li class="item-intro-menu"><a href="<?= home_url(); ?>/discover">
                <img 
                    data-src="<?= $item_intro_header_4['front_image']['url']; ?>"
                    class="lazyload"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
                <img
                    class="hover lazyload" 
                    data-src="<?= $item_intro_header_4['back_image']['url']; ?>"
                    src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                />
            </a></li>
        </ul>
    </nav>
</div>