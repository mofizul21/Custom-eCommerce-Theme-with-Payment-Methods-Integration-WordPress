<?php /* Template Name: Frequently Asked Question */ ?>

<?php get_header(); ?>

<?php
    $index_child_frequently_asked_question = get_field('index_child_frequently_asked_question', 'option');
?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title"><?= $index_child_frequently_asked_question['heading']; ?></span>
</header>

<div id="main-content" class="index">
    <section class="section">
        <div class="content">
            <?= $index_child_frequently_asked_question['content']; ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>