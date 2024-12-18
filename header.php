<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Openboek</title>
    <link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>?v=1.3'">
    <?php if( is_home() ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-index.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'font' ) || is_singular( 'font' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-not-index.css'; ?>?v=1.3'">
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-font.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'licensing' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-not-index.css'; ?>?v=1.3'">
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-licensing.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'shop' ) || is_singular( 'shop' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-not-index.css'; ?>?v=1.3'">
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-shop.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'discover' ) || is_singular( 'discover' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-not-index.css'; ?>?v=1.3'">
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-discover.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if(
        is_page( 'about' ) || is_page( 'mailing-list' ) || 
        is_page( 'license-agreement' ) || is_page( 'frequently-asked-question' ) || 
        is_page( 'terms-and-conditions' ) || is_page( 'privacy-policy' ) || is_page( 'checkout' ) || is_page( 'list' )
    ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-index-child.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'checkout' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-checkout.css'; ?>?v=1.3'">
    <?php endif; ?>
    <?php if( is_page( 'list' ) ) : ?>
        <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/page-list.css'; ?>?v=1.3'">
    <?php endif; ?>
    <link rel="stylesheet" href="<?= get_template_directory_uri() . '/public/css/grid.css'; ?>?v=1.3'">
    <?php wp_head(); ?>
    
    <!-- meta -->
    <meta name="description" content="Unconciously make it concious. It better!">
    <meta name="keywords" content="OPENBOEK, DONGBIN HAN, Openboek Lettering, Type foundry">
    <meta itemprop="name" content="OPENBOEK">
    <meta itemprop="description" content="Unconciously make it concious. It better!">
    <meta itemprop="image" content="<?= get_template_directory_uri(); ?>/openboek_title_2024.png">
    <meta property="og:url" content="https://openboek.info/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="openboek">
    <meta property="og:description" content="Unconciously make it concious. It better!">
    <meta itemprop="image" content="<?= get_template_directory_uri(); ?>/openboek_title_2024.png">
    <meta property="og:image" content="<?= get_template_directory_uri(); ?>/openboek_title_2024.png">
    <meta name="twitter:image" content="<?= get_template_directory_uri(); ?>/openboek_title_2024.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="openboek">
    <meta name="twitter:description" content="Unconciously make it concious. It better!">
	<meta name="author" content="OPENBOEK">
</head>
<body>
<div id="app" class="
    <?php
        if( is_home() ) {
            echo ' index';
        } else {
            echo ' not-index';
        }

        if( is_single() ) {
            echo ' single';
        }
    ?>
">