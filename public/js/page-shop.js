window.addEventListener("load", function() {
    let ORDER = {
        products: [],
        licenses: ["Printing/desktop +"],
        user_size: "1-3",
        options: [],
        basic_sum: 0,
        total_price: 0,
        font_count: 0,
        currency: "₩"
    };

    (function initShop() {
        (function handleOrderList() {
            // product
            (function handleProduct() {
                const product = document.querySelectorAll("button.product");
                for( let i = 0; i < product.length; i += 1 ) {
                    product[i].addEventListener("click", function( e ) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();

                        const id = product[i].getAttribute("id").replace("product-id-", "");
                        const parent_name = product[i].closest(".item-cont-cat-fonts").querySelector(".heading").innerText;
                        const name = product[i].querySelector(".name").innerText;
                        const price = product[i].querySelector(".price").innerText;
            
                        const item_family = product[i].closest(".item-family");
                        if( item_family.className.indexOf("active") > -1 ) {
                            item_family.classList.remove("active");
                            removeProduct( id, parent_name );
                        } else {
                            item_family.classList.add("active");
                            addProduct( id, parent_name, name, price );
                        }
            
                        handleSpecs( ORDER );
                    }, false);
                }
            
                function addProduct( id, parent_name, name, price ) {
                    let temp = [...ORDER.products];
            
                    let selectedParentIdx = null;
                    let isParentExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i].parent_name === parent_name ) {
                            isParentExist = true;
                            selectedParentIdx = i;
                        }
                    }
            
                    if( !isParentExist ) {
                        const product = {
                            parent_name: parent_name,
                            children: [{
                                id: id, name: name, price: price
                            }]
                        };
                
                        temp.push( product );
                    } else {
                        const children = temp[selectedParentIdx].children;
                        let isChildExist = false;
                        for( let i = 0; i < children.length; i += 1 ) {
                            if( children[i].name === name ) {
                                isChildExist = true;
                            }
                        }
            
                        if( !isChildExist ) {
                            const child = {
                                id: id, name: name, price: price
                            };
            
                            children.push( child );
                        }
                    }
            
                    ORDER.products = [...temp];
                }
            
                function removeProduct( id, parent_name ) {
                    let temp = [...ORDER.products];
            
                    let selectedParentIdx = null;
                    let isParentExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i].parent_name === parent_name ) {
                            isParentExist = true;
                            selectedParentIdx = i;
                        }
                    }
            
                    if( isParentExist ) {
                        const children = temp[selectedParentIdx].children;
            
                        let selectedChildIdx = null;
                        let isChildExist = false;
                        for( let i = 0; i < children.length; i += 1 ) {
                            if( children[i].id === id ) {
                                isChildExist = true;
                                selectedChildIdx = i;
                            }
                        }
            
                        if( isChildExist ) {
                            children.splice(selectedChildIdx, 1);
                        }
                    }
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i].children.length <= 0 ) {
                            temp.splice(i, 1);
                        }
                    }
            
                    ORDER.products = [...temp];
                }
            })();
        
            // license
            (function handleLicense() {
                const license = document.querySelectorAll("button.license");
                for( let i = 0; i < license.length; i += 1 ) {
                    license[i].addEventListener("click", function() {
                        const cont_item_license = license[i].closest(".item-cont-license");
                        if( cont_item_license.className.indexOf("selected") > -1 ) {
                            cont_item_license.classList.remove("selected");
                            removeLicense( license[i].innerText );
                        } else {
                            cont_item_license.classList.add("selected");
                            addLicense( license[i].innerText );
                        }
            
                        if( ORDER.licenses.length === 0 ) {
                            const first_item = license[0].closest(".item-cont-license");
                            first_item.classList.add("selected");
    
                            addLicense( license[0].innerText );
                        }
    
                        handleSpecs( ORDER );
                    }, false);
                }
            
                function addLicense( name ) {
                    let temp = [...ORDER.licenses];
            
                    let isLicenseExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i] === name ) {
                            isLicenseExist = true;
                        }
                    }
            
                    if( !isLicenseExist ) {
                        temp.push( name );
                    }
            
                    ORDER.licenses = [...temp];
                }
            
                function removeLicense( name ) {
                    let temp = [...ORDER.licenses];
            
                    let selectedLicenseIdx = null;
                    let isLicenseExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i] === name ) {
                            isLicenseExist = true;
                            selectedLicenseIdx = i;
                        }
                    }
            
                    if( isLicenseExist ) {
                        temp.splice(selectedLicenseIdx, 1);
                    }
            
                    ORDER.licenses = [...temp];
                }
            })();
        
            // size
            (function handleUserSize() {
                const size = document.querySelectorAll("button.size");
                for( let i = 0; i < size.length; i += 1 ) {
                    size[i].addEventListener("click", function() {
                        initSize();
            
                        const item_sizes = size[i].closest(".item-sizes");
                        item_sizes.classList.add("selected");
            
                        ORDER.user_size = size[i].innerText.replace(/(\r\n|\n|\r| )/gm, "");
            
                        handleSpecs( ORDER );
                    }, false);
                }
            
                function initSize() {
                    for( let i = 0; i < size.length; i += 1 ) {
                        const item_sizes = size[i].closest(".item-sizes");
                        item_sizes.classList.remove("selected");
                    }   
                }
            })();
        
            // option
            (function handleOption() {
                const option = document.querySelectorAll("button.option");
                for( let i = 0; i < option.length; i += 1 ) {
                    option[i].addEventListener("click", function() {
                        const cont_item_option = option[i].closest(".item-cont-option");
                        if( cont_item_option.className.indexOf("selected") > -1 ) {
                            cont_item_option.classList.remove("selected");
                            removeOption( option[i].innerText );
                        } else {
                            cont_item_option.classList.add("selected");
                            addOption( option[i].innerText );
                        }
            
                        handleSpecs( ORDER );
                    }, false);
                }
            
                function addOption( name ) {
                    let temp = [...ORDER.options];
            
                    let isoptionExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i] === name ) {
                            isoptionExist = true;
                        }
                    }
            
                    if( !isoptionExist ) {
                        temp.push( name );
                    }
            
                    ORDER.options = [...temp];
                }
            
                function removeOption( name ) {
                    let temp = [...ORDER.options];
            
                    let selectedoptionIdx = null;
                    let isoptionExist = false;
            
                    for( let i = 0; i < temp.length; i += 1 ) {
                        if( temp[i] === name ) {
                            isoptionExist = true;
                            selectedoptionIdx = i;
                        }
                    }
            
                    if( isoptionExist ) {
                        temp.splice(selectedoptionIdx, 1);
                    }
            
                    ORDER.options = [...temp];
                }
            })();
        })();
        
        // add to list
        (function handleAddToList() {
            const add_to_list = document.querySelector("#add-to-list");
            add_to_list.addEventListener("click", function( event ) {
                event.preventDefault();
                closeContProceed();
            }, false);
        })();
    
        // checkout
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

        // on / off
        (function handleOnOff() {
            const proceed = document.querySelector("#proceed");
            proceed.addEventListener("click", function( e ) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
        
                const cont_proceed = document.querySelector("#cont-proceed");
                cont_proceed.classList.add("active");
        
                const specs = document.querySelector("#specs");
                specs.scrollTo({ top: 0, left: 0 });
        
                document.body.style.overflow = "hidden";
            }, false);
        
            const specs = document.querySelector("#specs");
            specs.addEventListener("click", function( e ) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }, false);
        
            window.addEventListener("click", function( e ) {
                const cont_proceed = document.querySelector("#cont-proceed");
                if( cont_proceed.className.indexOf("active") > -1 ) {
                    closeContProceed();
                }
            }, false);

            const close_specs = document.querySelector("#close-specs");
            close_specs.addEventListener("click", function( e ) {
                const cont_proceed = document.querySelector("#cont-proceed");
                if( cont_proceed.className.indexOf("active") > -1 ) {
                    closeContProceed();
                }
            }, false);
        })();
        
        // callback
        function handleSpecs( result ) {
            // // console.log( result );
            if( result.products.length > 0 ) {
                const proceed = document.querySelector("#proceed");
                proceed.classList.add("active");
            } else {
                const proceed = document.querySelector("#proceed");
                proceed.classList.remove("active");
            }
    
            const specs = document.querySelector("#specs");
    
            // total sum
            ORDER.basic_sum = 0;
    
            // products
            const selected_products = specs.querySelector("#selected-products");
            selected_products.innerHTML = "";
    
            let fontCount = 0;
            const products = result.products;
            let temp_products = "";
            for( let i = 0; i < products.length; i += 1 ) {
                let children = "";
                for( let j = 0; j < products[i].children.length; j += 1 ) {
                    const product_name = products[i].children[j].name;
                    const price_text = products[i].children[j].price;

                    const product = `
                        <li class="item-children">
                            <div class="desc">
                                <div class="name">${product_name}</div>
                                <div class="price">${price_text}</div>
                            </div>
                        </li>
                    `;
    
                    children += product;
                    fontCount += 1;

                    const each_price = parseInt(price_text.replace(/[₩,]/g, ''), 10);
                    ORDER.basic_sum += each_price;
                }
    
                temp_products += `
                    <li class="item-selected-products">
                        <div class="parent">
                            <div class="thumbnail"></div>
                            <div class="parent_name">${products[i].parent_name}</div>
                        </div>
                        <ul class="children">
                            ${children}
                        </ul>
                    </li>
                `;
            }
    
            selected_products.innerHTML = temp_products;
    
            const item_selected_fonts_count = document.querySelector(".item-selected.fonts > .count");
            item_selected_fonts_count.innerText = fontCount;
            ORDER.font_count = fontCount;
    
            // license
            const licenses = result.licenses;
            const item_selected_license_count = document.querySelector(".item-selected.license > .count");
            item_selected_license_count.innerText = licenses.length;
    
            // user size
            const item_selected_user_size_count = document.querySelector(".item-selected.user-size > .count");
            item_selected_user_size_count.innerText = result.user_size;
    
            // total price with license & company size & option
            // console.log("++++++++++++++++++++++++++\n++++++++++++++++++++++++++\n++++++++++++++++++++++++++");
            // console.log( `기본 가격: ${ORDER.basic_sum}` );

            let license_scale = 0;
            if( result.licenses.length > 0 ) {
                for( let i = 0; i < result.licenses.length; i += 1 ) {
                    const current_license = result.licenses[i];
                    if( current_license === "Printing/desktop +" || current_license === "Hosting/Web +" || current_license === "Logotype +" ) {
                        license_scale += 1;
                    }

                    if( current_license === "Broadcasting/Video +" || current_license === "Embedding +" ) {
                        license_scale += 1.5;
                    }
                }
            }
            ORDER.total_price = ORDER.basic_sum * license_scale;
            // console.log("--------------------------");
            // console.log( `라이센스 배율: ×${license_scale}` );
            // console.log( `라이센스 배율 합산: ${ORDER.basic_sum} × ${license_scale}` );
            // console.log( `소계: ${ORDER.basic_sum * license_scale}` );

            let company_size_scale = 0;
            if( result.user_size !== null && result.user_size !== undefined && result.user_size !== "" ) {
                switch( result.user_size ) {
                    case "1-3": 
                        company_size_scale = 0;
                        break;
                    case "4-10": 
                        company_size_scale = 1;
                        break;
                    case "11-25": 
                        company_size_scale = 2;
                        break;
                    case "26-50": 
                        company_size_scale = 3;
                        break;
                    case "51-100": 
                        company_size_scale = 6;
                        break;
                    case "101-150": 
                        company_size_scale = 9;
                        break;
                    case "151-200": 
                        company_size_scale = 12;
                        break;
                    case "201-250": 
                        company_size_scale = 15;
                        break;
                    case "251-500": 
                        company_size_scale = 20;
                        break;
                    case "501-750": 
                        company_size_scale = 25;
                        break;
                    case "751-1000": 
                        company_size_scale = 30;
                        break;
                }
            }
            ORDER.total_price += ORDER.basic_sum * company_size_scale;
            // console.log("--------------------------");
            // console.log( `유저 사이즈 배율: ×${company_size_scale}` );
            // console.log( `유저 사이즈 배율 합산: ${ORDER.basic_sum} × ${company_size_scale}` );
            // console.log( `소계: ${ORDER.basic_sum * company_size_scale}` );

            // console.log("--------------------------");
            // console.log( `라이센스 + 유저 사이즈: (${ORDER.basic_sum} × ${license_scale}) + (${ORDER.basic_sum} × ${company_size_scale})` );
            // console.log( `중계: ${ORDER.total_price}` );

            if( result.options.length > 0 ) {
                // console.log("--------------------------");
                // console.log( `학생 할인: 있음` );

                const cont_subtotal = document.querySelector(".cont-subtotal");
                cont_subtotal.classList.add("active");
    
                const sub_price = document.querySelector("#sub-price");
                sub_price.innerText = ORDER.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;

                ORDER.total_price = ORDER.total_price / 2;
            } else {
                const cont_subtotal = document.querySelector(".cont-subtotal");
                cont_subtotal.classList.remove("active");

                // console.log("--------------------------");
                // console.log( `학생 할인: 없음` );
            }
    
            const final_price = document.querySelector("#final-price");
            const final_price_value = ORDER.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            final_price.innerText = final_price_value;
            // console.log("--------------------------");
            // console.log( `합계: ${ORDER.total_price}` );
            // console.log("++++++++++++++++++++++++++\n++++++++++++++++++++++++++\n++++++++++++++++++++++++++");

            // final
            handleFinalResult();
        }

        function closeContProceed() {
            const cont_proceed = document.querySelector("#cont-proceed");
            if( cont_proceed.className.indexOf("active") > -1 ) {
                cont_proceed.classList.remove("active");
                document.body.style.overflow = "auto";
            }

            handleFinalResult();
        }

        function handleFinalResult() {
            // console.log( ORDER.font_count );

            const add_to_list_result = document.querySelector("#add-to-list-result");

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

            sessionStorage.setItem("global-order", JSON.stringify( ORDER ));

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

    // session
    (function handleSessionData() {
        if( sessionStorage.getItem("global-order") !== null && sessionStorage.getItem("global-order") !== undefined ) {
            const order_from_session = JSON.parse(sessionStorage.getItem("global-order"));
            // console.log( order_from_session );

            ORDER.products = [...order_from_session.products];
            ORDER.licenses = [...order_from_session.licenses];
            ORDER.user_size = order_from_session.user_size;
            ORDER.options = [...order_from_session.options];
            ORDER.basic_sum = order_from_session.basic_sum;
            ORDER.total_price = order_from_session.total_price;
            ORDER.font_count = order_from_session.font_count;
            ORDER.currency = order_from_session.currency;

            (function handleSorting() {
                for( let i = 0; i < ORDER.products.length; i += 1 ) {
                    const current = ORDER.products[i];
                    const parent_name = current.parent_name;
                    const children = current.children;
    
                    sorting( parent_name, children );
                }
    
                function sorting( parent_name, children ) {
                    const item_cont_cat_fonts = document.querySelectorAll(".item-cont-cat-fonts");
                    for( let i = 0; i < item_cont_cat_fonts.length; i += 1 ) {
                        const heading = item_cont_cat_fonts[i].querySelector(".heading").innerText;
                        if( parent_name === heading ) {
                            const cat_fonts_family = item_cont_cat_fonts[i].querySelector(".cat-fonts-family");
                            const item_family = cat_fonts_family.querySelectorAll(".item-family");
    
                            for( let j = 0; j < children.length; j += 1 ) {
                                const _id = children[j].id;
                                for( let k = 0; k < item_family.length; k += 1 ) {
                                    const id = item_family[k].querySelector("button.product").getAttribute("id").replace("product-id-", "");
                                    if( id === _id ) {
                                        item_family[k].querySelector("button.product").click();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            })();

            (function handleLicense() {
                const specs = document.querySelector("#specs");
                const cont_license = specs.querySelector(".cont-license");
                const item_cont_license = cont_license.querySelectorAll(".item-cont-license");

                for( let i = 0; i < ORDER.licenses.length; i += 1 ) {
                    for( let j = 0; j < item_cont_license.length; j += 1 ) {
                        const license = item_cont_license[j].querySelector(".license");
                        const _value = license.innerText;
                        if( ORDER.licenses[i] === _value && item_cont_license[j].className.indexOf("selected") <= -1 ) {
                            license.click();
                        }
                    }
                }
            })();

            (function handleUserSize() {
                const specs = document.querySelector("#specs");
                const sizes = specs.querySelector(".sizes");
                const item_sizes = sizes.querySelectorAll(".item-sizes");

                for( let i = 0; i < item_sizes.length; i += 1 ) {
                    const size = item_sizes[i].querySelector(".size");
                    const _value = size.innerText.replace(/(\r\n|\n|\r| )/gm, "");
                    if( ORDER.user_size === _value ) {
                        size.click();
                    }
                }
            })();

            (function handleOptions() {
                if( ORDER.options.length > 0 ) {
                    const specs = document.querySelector("#specs");
                    const cont_option = specs.querySelector(".cont-option");
                    const item_cont_option = cont_option.querySelector(".item-cont-option");
                    const option = item_cont_option.querySelector(".option");
                    option.click();
                }
            })();
        }
    })();

    // query
    (function handleGetQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const result = urlParams.get("font_family_name");
        const child_result = urlParams.getAll("child_name");

        if( result ) {
            let item_cont_cat_fonts_idx = null;

            const font_family_name = encodeURIComponent( result );

            const item_cont_cat_fonts = document.querySelectorAll(".item-cont-cat-fonts");
            for( let i = 0; i < item_cont_cat_fonts.length; i += 1 ) {
                const heading = item_cont_cat_fonts[i].querySelector(".heading").innerText;
                if( heading === font_family_name ) {
                    item_cont_cat_fonts_idx = i;
                    break;
                }
            }

            if( item_cont_cat_fonts_idx !== null && item_cont_cat_fonts_idx !== undefined ) {
                const cat_fonts_family = item_cont_cat_fonts[item_cont_cat_fonts_idx].querySelector(".cat-fonts-family");
                const item_family = cat_fonts_family.querySelectorAll(".item-family");
    
                for( let i = 0; i < item_family.length; i += 1 ) {
                    if( item_family[i].className.indexOf("active") <= -1 ) {
                        const name = item_family[i].querySelector(".name").textContent;
                        child_result.filter( query_name => {
                            if( encodeURIComponent( query_name ) === name ) {
                                item_family[i].querySelector(".product").click();
                            }
                        } );
                    }
                }
            }
            
            const proceed = document.querySelector("#proceed");
            proceed.click();
        }
    })();
}, false);