<?php /* Template Name: License Agreement */ ?>

<?php get_header(); ?>

<?php
    $index_child_license_agreement = get_field('index_child_license_agreement', 'option');
?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title"><?= $index_child_license_agreement['heading']; ?></span>
</header>

<div id="main-content" class="index">
    <section class="section">
        <div class="content">
            <?= $index_child_license_agreement['content']; ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>