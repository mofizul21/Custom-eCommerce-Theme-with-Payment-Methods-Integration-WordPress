<?php /* Template Name: About */ ?>

<?php get_header(); ?>

<?php
    $index_child_about = get_field('index_child_about', 'option');
?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title"><?= $index_child_about['heading']; ?></span>
</header>

<div id="main-content" class="index">
    <section class="section">
        <div class="content">
            <?= $index_child_about['content']; ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>