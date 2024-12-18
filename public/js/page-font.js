window.addEventListener("load", function() {
    // order noew
    (function handleOrderNow() {
        const order_now = document.querySelector("#order-now");
        order_now.addEventListener("click", function() {
            const main_content = document.querySelector("#main-content");
            main_content.classList.remove("active");
            main_content.classList.add("hide");

            const font_family_name = document.querySelector(".cont-family > .name");
            const family_name = `font_family_name=${encodeURIComponent(font_family_name.textContent)}`;

            let item_family = document.querySelectorAll(".cont-family > .family > .item-family");
            let children_name = "";
            for( let i = 0; i < item_family.length; i += 1 ) {
                if( item_family[i].className.indexOf( "active" ) > -1 ) {
                    const text = item_family[i].querySelector(".text").textContent;
                    children_name += `&child_name=${encodeURIComponent(text)}`;
                }
            }

            const url = family_name + children_name;
            
            setTimeout(() => {
                const base_url = "https://openboek.info/";
                window.location.href = `${base_url}/shop?${url}`;
            }, 500);
        }, false);
    })();
    
    // mobile
    (function handleScroll() {
        const item_expression = document.querySelectorAll(".item-expression");
        const section = document.querySelectorAll(".section");
    
        for( let i = 0; i < item_expression.length; i += 1 ) {
            item_expression[i].addEventListener("click", function() {
                init();
    
                item_expression[i].classList.add("active");
    
                window.scrollTo({
                    top: section[i].offsetTop,
                    left: 0,
                    behavior: "smooth"
                });
            }, false);
        }
    
        function init() {
            for( let i = 0; i < item_expression.length; i += 1 ) {
                item_expression[i].classList.remove("active");
            }
        }
    
        // prevent default key event
        window.addEventListener('keydown', function( event ) {
            if( event.key === ' ' ) {
              event.preventDefault();
            }
        });
    })();

    (function handleMobileFontPage() {
        const font_page_info = document.querySelector("#font-page-info");
        font_page_info.addEventListener("click", function() {
            const section_learn = document.querySelector(".section.learn");
            if( section_learn.className.indexOf("active") > -1 ) {
                section_learn.classList.remove("active");
            } else {
                initSection();
                section_learn.classList.add("active");
            }
        }, false);

        const font_page_rotate = document.querySelector("#font-page-rotate");
        font_page_rotate.addEventListener("click", function() {
            const section_demo = document.querySelector(".section.demo");
            if( section_demo.className.indexOf("active") > -1 ) {
                section_demo.classList.remove("active");
            } else {
                initSection();
                section_demo.classList.add("active");

                const hidden_text = document.querySelector("#hidden-text");
                hidden_text.value = "";
                hidden_text.focus();
            }
        }, false);

        const hidden_text = document.querySelector("#hidden-text");
        hidden_text.addEventListener("keydown", function( event ) {
            if( event.key === "Enter" ) {
                event.preventDefault();
                hidden_text.blur();
            }
        });

        function initSection() {
            const section = document.querySelectorAll(".section");
            for( let i = 0; i < section.length; i += 1 ) {
                section[i].classList.remove("active");
            }
        }
    })();
});