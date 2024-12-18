<?php get_header(); ?>

<header id="main-header" class="discover">
    <?php get_template_part( "parts/common/part", "main-nav" ); ?>
    <?php get_template_part( "parts/common/part", "add-to-list-result" ); ?>
</header>

<div id="main-content" class="single">
    <?php
        $single_title = get_the_title();
        $single_thumbnail_image = get_field( "single_thumbnail_image" );
        $single_content = get_field( "single_content" );
        $single_embed = get_field( "single_embed" );
        $single_image_gallery = get_field( "single_image_gallery" );
    ?>
    <section class="section discover">
        <div class="above">
            <div class="item-above heading"><?= $single_title; ?></div>
            <div class="item-above content"><?= $single_content; ?></div>
        </div>
        <div class="below">
            <?php if( isset( $single_embed ) && !empty( $single_embed ) ) : ?>
                <div class="item-below type-video">
                    <div class="cont-video">
                        <iframe src="<?= $single_embed; ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            <?php endif; ?>
            <?php if( isset( $single_image_gallery ) && !empty( $single_image_gallery ) ) : ?>
                <div class="item-below type-gallery">
                    <div class="cont-gallery">
                        <ul class="gallery">
                            <?php foreach( $single_image_gallery as $sig ) : ?>
                                <li class="item-gallery">
                                    <img 
                                        class="thumbnail lazyload" 
                                        data-src="<?= $sig['url']; ?>" 
                                        src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                                    />
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>