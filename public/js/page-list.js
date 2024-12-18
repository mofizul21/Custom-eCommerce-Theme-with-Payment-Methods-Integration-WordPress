window.addEventListener("load", function() {
    (function handleAddToListResult() {
        if( sessionStorage.getItem("global-order") !== null && sessionStorage.getItem("global-order") !== undefined ) {
            const ORDER = JSON.parse(sessionStorage.getItem("global-order"));
            console.log(ORDER);

            (function handleProductList() {
                const product_list = document.querySelector("#product-list");
                for( let i = 0; i < ORDER.products.length; i += 1 ) {
                    const product = document.createElement("li");
                    product.classList.add("item-product-list");

                    const parent_name = ORDER.products[i].parent_name;

                    let children_name = "";
                    for( let j = 0; j < ORDER.products[i].children.length; j += 1 ) {
                        children_name += ORDER.products[i].children[j].name;
                        if( j !== ORDER.products[i].children.length - 1 ) {
                            children_name += " & ";
                        }
                    }

                    let licenses = "";
                    for( let j = 0; j < ORDER.licenses.length; j += 1 ) {
                        licenses += ORDER.licenses[j].replace(" +", "");
                        if( j !== ORDER.licenses.length - 1 ) {
                            licenses += ", ";
                        }
                    }

                    let elem = `
                            <div class="thumbnail"></div>
                            <div class="desc">
                                <div class="item-desc">
                                    <span class="family-name">${parent_name}</span> <span class="child-name">${children_name}</span>
                                </div>
                                <ul class="item-desc">
                                    <li class="child-item-desc">
                                        <span class="selected-license">${licenses} / <span class="company-size">${ORDER.user_size}</span>
                                    </li>
                    `;

                    if( ORDER.options.length > 0 ) {
                        elem += `
                                    <li class="child-item-desc">
                                        <span class="is-education">EDU</span>
                                    </li>
                        `;
                    }

                    elem += `
                                </ul>
                            </div>
                    `;

                    product.innerHTML = elem;

                    const remove_item = document.createElement("button");
                    remove_item.classList.add("remove-item");
                    remove_item.innerText = "remove";
                    product.appendChild( remove_item );

                    remove_item.addEventListener("click", function() {
                        removeProduct( parent_name );
                    });

                    product_list.appendChild( product );
                }
            })();

            function removeProduct( parent_name ) {
                let temp = [...ORDER.products];
        
                let selectedParentIdx = null;
                let isParentExist = false;
        
                for( let i = 0; i < temp.length; i += 1 ) {
                    if( temp[i].parent_name === parent_name ) {
                        isParentExist = true;
                        selectedParentIdx = i;
                        temp.splice(selectedParentIdx, 1);
                        break;
                    }
                }
        
                ORDER.products = [...temp];

                handleSpecs( ORDER );
            }

            (function handleOrderTotalPrice() {
                const price = document.querySelector("#price");
                price.querySelector(".number").innerText = ORDER.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            })();
        }
    })();

    (function handleCheckOut() {
        const checkout = document.querySelector("#checkout");
        checkout.addEventListener("click", function( event ) {
            event.preventDefault();
            
            const main_content = document.querySelector("#main-content");
            main_content.classList.remove("active");
            main_content.classList.add("hide");

            setTimeout(() => {
                const base_url = "https://openboek.info/";
                window.location.href = `${base_url}/checkout`;
            }, 500);
        }, false);
    })();
}, false);