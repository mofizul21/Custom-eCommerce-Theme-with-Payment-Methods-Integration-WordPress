(function handleLicensingMenu() {
    const cont_tab = document.querySelector("#main-menu.licensing .cont-tab");
    const tab_result = document.querySelector("#tab-result");

    if(
        cont_tab !== null && cont_tab !== undefined && 
        tab_result !== null && tab_result !== undefined
    ) {
        const item_tab = cont_tab.querySelectorAll(".item-tab");
        for( let i = 0; i < item_tab.length; i += 1 ) {
            item_tab[i].addEventListener("click", function() {
                init();
                showSelectedItem( i );
            }, false);
        }

        function showSelectedItem( idx ) {
            const item_tab = cont_tab.querySelectorAll(".item-tab");
            item_tab[idx].classList.add("active");

            const item_tab_result = tab_result.querySelectorAll(".item-tab-result");
            item_tab_result[idx].classList.add("active");
        }

        function init() {
            const item_tab = cont_tab.querySelectorAll(".item-tab");
            for( let i = 0; i < item_tab.length; i += 1 ) {
                item_tab[i].classList.remove("active");
            }

            const item_tab_result = tab_result.querySelectorAll(".item-tab-result");
            for( let i = 0; i < item_tab_result.length; i += 1 ) {
                item_tab_result[i].classList.remove("active");
            }
        }
    }
})();