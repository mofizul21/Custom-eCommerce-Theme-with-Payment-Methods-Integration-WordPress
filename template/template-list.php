<?php /* Template Name: List */ ?>

<?php get_header(); ?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title">List</span>
</header>

<div id="main-content" class="list">
    <section class="section">
        <div class="content">
            <ul id="product-list"></ul>

            <div id="cont-price">
                <div class="custom-label">
                    Order total
                </div>
                <div id="price">
                    <span class="number">0</span><span class="currency">KRW</span>
                </div>
                <input type="hidden" name="order-total-price" readonly>
            </div>

            <div id="after-price">
                <button id="save-as-pdf">Save as PDF</button>
                <button id="checkout">Checkout</button>
            </div>
        </div>
    </section>
</div>

<div 
    id="checking"
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.875); z-index: 9999; display: none;"
>
</div>

<?php get_footer(); ?>