<?php /* Template Name: Checkout */ ?>

<?php get_header(); ?>

<header id="main-header" class="index">
    <a href="<?= home_url(); ?>" id="go-home">
        <span class="text">openboek</span>
    </a>
    <span class="page-title">Checkout</span>
</header>

<div id="main-content" class="checkout">
    <section class="section">
        <div class="content">
            <form id="checkout-form">
                <div class="left">
                    <div class="item-checkout-form">
                        <label for="user-contact">Contact</label>
                        <input type="email" name="user-contact" id="user-contact" placeholder="email" spellcheck="false" required>
                    </div>

                    <div class="item-checkout-form">
                        <label>License/billing</label>
                        <input class="child-item-checkout-form" type="text" name="user-country" id="user-country" placeholder="country / region" required inputmode="text" autocomplete="off" spellcheck="false">
                        <div class="child-item-checkout-form two-column">
                            <input type="text" name="user-last-name" id="user-last-name" placeholder="last name" required inputmode="text" autocomplete="off" spellcheck="false">
                            <input type="text" name="user-first-name" id="user-first-name" placeholder="first name" required inputmode="text" autocomplete="off" spellcheck="false">
                        </div>
                        <input class="child-item-checkout-form" type="text" name="user-compay-name" id="user-compay-name" placeholder="compay name" required inputmode="text" autocomplete="off" spellcheck="false">
                        <input class="child-item-checkout-form" type="text" name="user-postal-code" id="user-postal-code" placeholder="postal code" required inputmode="text" autocomplete="off" spellcheck="false">
                        <div class="child-item-checkout-form two-column">
                            <input type="text" name="user-province" id="user-province" placeholder="province" required inputmode="text" autocomplete="off" spellcheck="false">
                            <input type="text" name="user-city" id="user-city" placeholder="city" required inputmode="text" autocomplete="off" spellcheck="false">
                        </div>
                        <input class="child-item-checkout-form" type="text" name="user-address-1" id="user-address-1" placeholder="address 1" required inputmode="text" autocomplete="off" spellcheck="false">
                        <input class="child-item-checkout-form" type="text" name="user-address-2" id="user-address-2" placeholder="address 2" inputmode="text" autocomplete="off" spellcheck="false">
                        <input class="child-item-checkout-form" type="text" name="user-phone" id="user-phone" placeholder="phone" required inputmode="text" autocomplete="off" spellcheck="false">
                    </div>

                    <div class="item-checkout-form">
                        <label>Information</label>
                        <div class="cont-checkbox">
                            <input type="checkbox" name="user-check-eula" id="user-check-eula" required>
                            <p class="text">I have read and agree to the openboek <a target="_blank" href="<?= home_url(); ?>/license-agreement">End User License Agreement</a></p>
                        </div>
                        <div class="cont-checkbox">
                            <input type="checkbox" name="user-check-privacy-policy" id="user-check-privacy-policy" required>
                            <p class="text">I accept the collection and use of personal information (<a target="_blank" href="<?= home_url(); ?>/privacy-policy">openboek privacy policy</a>)</p>
                        </div>
                        <div class="cont-checkbox">
                            <input type="checkbox" name="user-check-terms-and-conditions" id="user-check-terms-and-conditions" required>
                            <p class="text">I accept the openboek <a target="_blank" href="<?= home_url(); ?>/terms-and-conditions">Terms & Conditions</a> and accept the return policy.</p>
                        </div>
                        <div class="cont-checkbox">
                            <input type="checkbox" name="user-check-all" id="user-check-all" required>
                            <p class="text">accept all</a></p>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <ul id="product-list" class="item-right"></ul>

                    <div id="cont-price" class="item-right">
                        <div class="custom-label">
                            Order total
                        </div>
                        <div id="price">
                            <span class="number">0</span><span class="currency">KRW</span>
                        </div>
                        <input type="hidden" name="order-total-price" readonly>
                    </div>

                    <div id="after-price" class="item-right">
                        depending on your payment method, some additional fees may apply. the total amount you pay includes all applicable customs duties & taxes. we guarantee no additional charges on delivery.
                    </div>
                </div>

                <div class="left-2">
                    <button type="button" id="submit-checkout-form">Send Order</button>
                </div>
            </form>
        </div>
    </section>
</div>

<div 
    id="checking"
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.875); z-index: 9999; display: none;"
>
</div>

<?php get_footer(); ?>