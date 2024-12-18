<?php /* Template Name: Font */ ?>

<?php get_header(); ?>

<header id="main-header" class="font">
    <?php get_template_part( "parts/common/part", "main-nav" ); ?>
    <?php get_template_part( "parts/common/part", "add-to-list-result" ); ?>

    <div id="cont-page-font-mobile-buttons">
        <button id="font-page-info">
            <img src="<?= get_template_directory_uri(); ?>/public/assets/icon/icon-info.svg" />
        </button>
        <button id="font-page-rotate">
            <img src="<?= get_template_directory_uri(); ?>/public/assets/icon/icon-rotate.svg" />
        </button>
    </div>
</header>

<div id="main-content">
    <div id="main-graphic">
        <div id="cont-paper-canvas">
            <canvas 
                resize="true" 
                id="paper-canvas" 
                data-paper-scope="1"
            ></canvas>
        </div>
    </div>

    <div id="mobile-font-family-silder">
        <?php
            $args = array(
                "post_type"         =>  "font-product",
                "post_status"       =>  "publish",
                "posts_per_page"    =>  -1,
                "orderby"           =>  "date",
                "order"             =>  "DESC",
                "suppress_filters"  =>  true
            );
            $query = new WP_Query( $args );
        ?>
        <ul id="font-family-slider">
            <?php if( $query->posts ) : ?>
            <?php foreach( $query->posts as $key => $value ) : ?>
            <?php
                $family_name = get_the_title( $value->ID );
                $thumbnail_image = get_field( "thumbnail_image", $value->ID );
                $learn = get_field( "learn", $value->ID );
            ?>
                <li id="post-id-<?= $value->ID; ?>" class="item-font-family-slider<?php if( $key == 0 ) : echo ' active'; endif; ?>">
                    <span class="name"><?= $family_name; ?></span>
                    <img src="<?= $thumbnail_image['url']; ?>" style="display: none;" />
                </li>
            <?php endforeach; ?>
            <?php endif; ?>
        </ul>
        <div id="guide"></div>
    </div>
    
    <div id="result">
        <section class="section sample full">
            <p id="container-item-sample"></p>
        </section>

        <section class="section scale full">
            <div class="item-scale">
                <div class="cont-scroll">
                    <div class="child-item-scale">
                        <div class="heading">150px</div>
                        <div class="line-height">1</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">120px</div>
                        <div class="line-height">1.125</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">96px</div>
                        <div class="line-height">1.125</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">72px</div>
                        <div class="line-height">1.125</div>
                        <div class="content">dummy</div>
                    </div>
                </div>
            </div>

            <div class="item-scale">
                <div class="cont-scroll">
                    <div class="child-item-scale">
                        <div class="heading">60px</div>
                        <div class="line-height">1.125</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">48px</div>
                        <div class="line-height">1.1875</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">36px</div>
                        <div class="line-height">1.275</div>
                        <div class="content">dummy</div>
                    </div>
                </div>
            </div>
            
            <div class="item-scale">
                <div class="cont-scroll">
                    <div class="child-item-scale">
                        <div class="heading">24px</div>
                        <div class="line-height">1.275</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">18px</div>
                        <div class="line-height">1.375</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">14px</div>
                        <div class="line-height">1.375</div>
                        <div class="content">dummy</div>
                    </div>
                    <div class="child-item-scale">
                        <div class="heading">10px</div>
                        <div class="line-height">1.375</div>
                        <div class="content">dummy</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section demo full">
            <div id="cont-p5-canvas"></div>
            <input type="text" name="hidden-text" id="hidden-text" placeholder="Type here." inputmode="text" autocomplete="off" spellcheck="false">
        </section>

        <section class="section learn full">
            <div class="cont-learn">
                <div class="item-cont-learn"><p></p></div>
                <div class="item-cont-learn"><p></p></div>
            </div>
        </section>
    </div>
</div>

<div id="cont-order-now">
    <button id="order-now">
        <span class="text">Order Now</span>
        <span class="text mobile">Order</span>
    </button>
</div>

<?php get_footer(); ?>