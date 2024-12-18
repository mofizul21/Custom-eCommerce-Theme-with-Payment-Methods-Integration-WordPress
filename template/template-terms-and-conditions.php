<?php /* Template Name: Terms and Conditions */ ?>

<?php get_header(); ?>

<?php
    $index_child_terms_and_conditions = get_field('index_child_terms_and_conditions', 'option');
?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title"><?= $index_child_terms_and_conditions['heading']; ?></span>
</header>

<div id="main-content" class="index">
    <section class="section">
        <div class="content">
            <?= $index_child_terms_and_conditions['content']; ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>