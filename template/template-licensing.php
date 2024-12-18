<?php /* Template Name: Licensing */ ?>

<?php get_header(); ?>

<header id="main-header" class="licensing">
    <?php get_template_part( "parts/common/part", "main-nav" ); ?>
    <?php get_template_part( "parts/common/part", "add-to-list-result" ); ?>
</header>

<?php
    $section_licensing = get_field('section_licensing', 'option');
    $section_licensing_item_types = $section_licensing['section_licensing_item_types'];
    $section_licensing_item_pricing = $section_licensing['section_licensing_item_pricing'];
?>

<div id="main-content">
    <div id="tab-result">
        <section class="section item-tab-result active">
            <div class="item-section section-heading">
                <?= $section_licensing_item_types['heading']; ?>
            </div>
            <div class="item-section section-content">
                <?php
                    $content = $section_licensing_item_types['content'];
                    foreach( $content as $item ) :
                ?>
                <div class="item-section-content">
                    <div class="child-item-section-content">
                        <div class="cont-thumb">
                            <img 
                                class="thumbnail lazyload" 
                                data-src="<?= $item['thumbnail_image']['url']; ?>" 
                                src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                            />
                        </div>
                    </div>
                    <div class="child-item-section-content">
                        <div class="heading"><?= $item['heading']; ?></div>
                        <div class="content"><?= $item['content']; ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section item-tab-result">
            <div class="item-section section-heading">
                    <?= $section_licensing_item_pricing['heading']; ?>
                </div>
                <div class="item-section section-content">
                <?php
                    $content = $section_licensing_item_pricing['content'];
                    foreach( $content as $item ) :
                ?>
                <div class="item-section-content">
                    <div class="child-item-section-content">
                        <div class="cont-thumb">
                            <img 
                                class="thumbnail lazyload" 
                                data-src="<?= $item['thumbnail_image']['url']; ?>" 
                                src="<?= get_template_directory_uri(); ?>/public/assets/ready.jpg" 
                            />
                        </div>
                    </div>
                    <div class="child-item-section-content">
                        <div class="heading"><?= $item['heading']; ?></div>
                        <div class="content"><?= $item['content']; ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
    </div>
</div>

<?php get_footer(); ?>