<nav id="main-nav">
    <ul id="main-menu" class="
        <?php if( is_page('licensing') ) : echo 'licensing'; endif; ?>
    ">
        <li class="item-main-menu font<?php if( is_page('font') ) : echo ' active'; endif; ?>">
            <a href="<?= home_url(); ?>/font">
                <span class="text">font</span>
            </a>

            <div class="cont-family">
                <div class="name">Naar</div>
                <ul class="family"></ul>
            </div>

            <div class="cont-expression">
                <ul class="expression">
                    <li class="item-expression active"><button>
                        <span class="text">Sample</span>
                    </button></li>
                    <li class="item-expression"><button>
                        <span class="text">Scale</span>
                    </button></li>
                    <li class="item-expression"><button>
                        <span class="text">Demo</span>
                    </button></li>
                    <li class="item-expression"><button>
                        <span class="text">Learn</span>
                    </button></li>
                </ul>
            </div>
        </li>
        <li class="item-main-menu<?php if( is_page('licensing') ) : echo ' active'; endif; ?>">
            <a href="<?= home_url(); ?>/licensing">
                <span class="text">licensing</span>
            </a>

            <div class="cont-tab">
                <ul class="tab">
                    <li class="item-tab active"><button>
                        <span class="text">Types</span>
                    </button></li>
                    <li class="item-tab"><button>
                        <span class="text">Pricing</span>
                    </button></li>
                </ul>
            </div>
        </li>
        <li class="item-main-menu<?php if( is_page('shop') ) : echo ' active'; endif; ?>"><a href="<?= home_url(); ?>/shop">
            <span class="text">shop</span>
        </a></li>
        <li class="item-main-menu<?php if( is_page('discover') ) : echo ' active'; endif; ?>"><a href="<?= home_url(); ?>/discover">
            <span class="text">discover</span>
        </a></li>
    </ul>
</nav>