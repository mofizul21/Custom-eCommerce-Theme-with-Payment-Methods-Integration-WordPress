window.addEventListener("load", function() {
    (function handleGridGuide() {
        window.addEventListener("keydown", function( event ) {
            if( event.key === "`" ) {
                const cont_guide = document.querySelector("#cont-guide");
                if( cont_guide.className.indexOf("active") > -1 ) {
                    cont_guide.classList.remove("active");
                } else {
                    cont_guide.classList.add("active");
                }
            }
        }, false);
    })();

    (function handleAnchor() {
        const anchor = document.querySelectorAll("a");
        for( let i = 0; i < anchor.length; i += 1 ) {
            anchor[i].addEventListener("click", function( event ) {
                if( anchor[i].getAttribute("target") !== "_blank" ) {
                    event.preventDefault();
                    const url = anchor[i].href;
                    if( url.indexOf("#") <= -1 ) {
                        const main_content = document.querySelector("#main-content");
                        if( main_content !== null && main_content !== undefined ) {
                            main_content.classList.remove("active");
                            main_content.classList.add("hide");
                        }
        
                        setTimeout(() => {
                            window.location.href = url;
                        }, 500);
                    }
                }
            });
        }
    })();

    (function handleAddToListResult() {
        if( sessionStorage.getItem("global-order") !== null && sessionStorage.getItem("global-order") !== undefined ) {
            const ORDER = JSON.parse(sessionStorage.getItem("global-order"));

            (function showAddToListResult() {
                const add_to_list_result = document.querySelector("#add-to-list-result");

                if( add_to_list_result !== null && add_to_list_result !== undefined ) {
                    if( ORDER.font_count > 0 ) {
                        add_to_list_result.classList.add("active");
                    } else {
                        add_to_list_result.classList.remove("active");
                    }

                    const count = add_to_list_result.querySelector(".count");
                    const total_price = add_to_list_result.querySelector(".total-price");
                    const currency = add_to_list_result.querySelector(".currency");
                    
                    count.innerText = ORDER.font_count;
                    total_price.innerText = ORDER.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    currency.innerText = ORDER.currency;

                    console.log(ORDER);

                    add_to_list_result.addEventListener("click", function( event ) {
                        event.preventDefault();

                        const main_content = document.querySelector("#main-content");
                        main_content.classList.remove("active");
                        main_content.classList.add("hide");

                        setTimeout(() => {
                            const base_url = "https://openboek.info/";
                            window.location.href = `${base_url}/checkout`;
                        }, 500);
                    }, false);
                }
            })();
        }
    })();

    (function handleApp() {
        // const app = document.querySelector("#app");
        // app.classList.add("active");

        const main_content = document.querySelector("#main-content");
        if( main_content !== null && main_content !== undefined ) {
            main_content.classList.add("active");
        }
    })();

    (function calcVh() {
        setVh();
        window.addEventListener("resize", setVh);

        function setVh() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
    })();

    (function handleCloseCookieNotice() {
        const close_cookie_notice = document.querySelector("#close-cookie-notice");
        close_cookie_notice.addEventListener("click", function() {
            const target = document.querySelector(".item-main-footer.cookie");
            target.parentNode.removeChild( target );
        }, false);
    })();
});