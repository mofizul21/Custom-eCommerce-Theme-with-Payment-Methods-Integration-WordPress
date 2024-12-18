<?php /* Template Name: Discover */ ?>

<?php get_header(); ?>

<header id="main-header" class="discover">
    <?php get_template_part( "parts/common/part", "main-nav" ); ?>
    <?php get_template_part( "parts/common/part", "add-to-list-result" ); ?>
</header>

<div id="main-content">
    <section class="section discover">
        <?php
            $args = array(
                "post_type"         =>  "discover",
                "post_status"       =>  "publish",
                "posts_per_page"    =>  -1,
                "orderby"           =>  "date",
                "order"             =>  "DESC",
                "suppress_filters"  =>  true
            );
            $query = new WP_Query( $args );
        ?>
        <ul id="cont-discover">
            <?php if( $query->posts ) : ?>
            <?php foreach( $query->posts as $key => $value ) : ?>
            <?php
                $single_check_is_hilight = get_field( "single_check_is_hilight", $value->ID );
                $single_thumbnail_image = get_field( "single_thumbnail_image", $value->ID );
            ?>
                <li class="item-cont-discover<?php if( $single_check_is_hilight == true ) : echo ' special'; endif; ?>">
                    <a href="<?= get_permalink( $value->ID ); ?>">
                        <div class="cont-thumbnail">
                            <img 
                                class="thumbnail lazyload" 
                                data-src="<?= $single_thumbnail_image['url']; ?>" 
                                src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                            />
                        </div>
                    </a>
                </li>
            <?php endforeach; ?>
            <?php endif; ?>
        </ul>
    </section>
</div>

<?php get_footer(); ?>