<?php /* Template Name: Shop */ ?>

<?php get_header(); ?>

<header id="main-header" class="shop">
    <?php get_template_part( "parts/common/part", "main-nav" ); ?>
    <?php get_template_part( "parts/common/part", "add-to-list-result" ); ?>
</header>

<div id="main-content">
    <section class="section cat-fonts">
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
        <ul id="cont-cat-fonts">
            <?php if( $query->posts ) : ?>
            <?php foreach( $query->posts as $key => $value ) : ?>
            <?php
                $post_id = $value->ID;
                $count = 0;
                $family_name = get_the_title( $post_id );
                $thumbnail_image = get_field( "thumbnail_image", $post_id );
                $family_price = get_field( "family_price", $post_id );
                $font_files = get_field( "font_files", $post_id );
            ?>
            <li class="item-cont-cat-fonts">
                <div class="heading child-item-cont-cat-fonts"><?= $family_name; ?></div>
                <div class="thumbnail child-item-cont-cat-fonts">
                    <img
                        src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                        data-src="<?= $thumbnail_image['url']; ?>"
                        class="lazyload"
                    />
                </div>
                <div class="content child-item-cont-cat-fonts">
                    <ul class="cat-fonts-family">
                        <?php
                            foreach( $font_files as $key => $ff ) :
                                $count += 1;
                        ?>
                            <li class="item-family">
                                <button id="product-id-<?= $post_id . $key; ?>" class="product">
                                    <div class="name"><?= $ff['child_name']; ?></div>
                                    <div class="price">
                                        <span class="currency">₩</span><span class="number"><?= number_format( $ff['child_price'] ); ?></span>
                                    </div>
                                </button>
                            </li>
                        <?php endforeach; ?>

                        <li class="item-family">
                            <button id="product-id-<?= $post_id . $count; ?>" class="product">
                                <div class="name">Family</div>
                                <div class="price">
                                    <span class="currency">₩</span><span class="number"><?= number_format( $family_price ); ?></span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
            <?php endforeach; ?>
            <?php endif; ?>
        </ul>
    </section>
</div>

<?php get_template_part( "parts/shop/part", "cont-proceed" ); ?>

<?php get_footer(); ?>