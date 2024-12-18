<?php /* Template Name: Mailing List */ ?>

<?php get_header(); ?>

<?php
    $index_child_mailing_list = get_field('index_child_mailing_list', 'option');
?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title"><?= $index_child_mailing_list['heading']; ?></span>
</header>

<div id="main-content" class="index">
    <section class="section">
        <div class="content">
            <form id="cont-subscribe">
                <div class="item-form">
                    <?= $index_child_mailing_list['content']; ?>
                </div>
                <div class="item-form">
                    <input type="email" name="user-email" id="user-email" placeholder="email" autocomplete="off">
                </div>
                <div class="item-form">
                    <input type="checkbox" name="user-check" id="user-check">
                    <p><?= $index_child_mailing_list['user_check_text']; ?></p>
                </div>
                <div class="item-form">
                    <button id="submit">Subscribe</button>
                </div>
            </form>
        </div>
    </section>
</div>

<?php get_footer(); ?>