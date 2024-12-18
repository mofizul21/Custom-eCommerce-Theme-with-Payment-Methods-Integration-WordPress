window.addEventListener("load", function() {
    (function handleAddToListResult() {
        if( sessionStorage.getItem("global-order") !== null && sessionStorage.getItem("global-order") !== undefined ) {
            const ORDER = JSON.parse(sessionStorage.getItem("global-order"));
            // console.log(ORDER);

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

                    product_list.appendChild( product );
                }
            })();

            (function handleOrderTotalPrice() {
                const price = document.querySelector("#price");
                price.querySelector(".number").innerText = ORDER.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            })();

            (function handleCheckoutSubmit() {
                const submit_checkout_form = document.querySelector("#submit-checkout-form");
                submit_checkout_form.addEventListener("click", function() {
                    const checkout_form = document.querySelector("#checkout-form");
                    const formIsValid = checkout_form.checkValidity();
                    if( formIsValid ) {
                        const checking = document.querySelector("#checking");
                        checking.style.display = "block";
                        
                        const USER_INFO = {
                            user_contact: null,
                            user_last_name: null,
                            user_first_name: null,
                            user_province: null,
                            user_address_1: null,
                            user_address_2: null,
                            user_phone: null,
                            user_check_eula: null,
                            user_check_privacy_policy: null,
                            user_check_terms_and_conditions: null,
                            user_check_all: null
                        }
    
                        USER_INFO.user_contact = document.querySelector("#user-contact").value;
                        USER_INFO.user_last_name = document.querySelector("#user-last-name").value;
                        USER_INFO.user_first_name = document.querySelector("#user-first-name").value;
                        USER_INFO.user_province = document.querySelector("#user-province").value;
                        USER_INFO.user_address_1 = document.querySelector("#user-address-1").value;
                        USER_INFO.user_address_2 = document.querySelector("#user-address-2").value;
                        USER_INFO.user_phone = document.querySelector("#user-phone").value;
                        USER_INFO.user_check_eula = document.querySelector("#user-check-eula").checked;
                        USER_INFO.user_check_privacy_policy = document.querySelector("#user-check-privacy-policy").checked;
                        USER_INFO.user_check_terms_and_conditions = document.querySelector("#user-check-terms-and-conditions").checked;
                        USER_INFO.user_check_all = document.querySelector("#user-check-all").checked;
    
                        readyForOrder( ORDER, USER_INFO );
                    } else {
                        checkout_form.reportValidity();
                    }

                    return false;
                }, false);

                function readyForOrder( _order, _user_info ) {
                    prepare().then(( data ) => {
                        console.log( data.msg );
                        // window.alert( data.msg );
                        requestOrder( _order, _user_info );
                    }).catch(( error ) => {
                        console.log( error );
                    });
                }

                async function prepare( _order, _user_info ) {
                    const requestData = {
                        _order: _order,
                        _user_info: _user_info
                    };

                    const url = `https://openboek.info/wp-content/themes/openboek_2024/checkout/prepare.php`;

                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify( requestData ),
                        });
        
                        if( !response.ok ) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
        
                        const json = await response.json();
        
                        return json;
                    } catch( error ) {
                        console.error("Error during request_prepare:", error);
                    }
                }

                function requestOrder( _order, _user_info ) {
                    confirm( _order, _user_info );

                    async function confirm( _order, _user_info ) {
                        const requestData = {
                            _order: _order,
                            _user_info: _user_info
                        };

                        const url = `https://openboek.info/wp-content/themes/openboek_2024/checkout/confirm.php`;

                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify( requestData ),
                        });

                        if( !response.ok ) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
        
                        const json = await response.json();

                        if( json.status === 201 ) {
                            // window.alert("주문 생성 완료.");
                            console.log("주문 생성 완료.");

                            const url = "https://openboek.info/wp-admin/admin-ajax.php";
                            let isAjaxRunning = false;

                            if( isAjaxRunning ) {
                                return false;
                            }
            
                            isAjaxRunning = true;
            
                            const action = 'get_data_for_mail';
                            
                            jQuery.ajax({
                                url: url,
                                type: "post",
                                data: {
                                    action: action,
                                    order: _order,
                                    user_info: _user_info
                                },
                                beforeSend: function(xhr) {
									console.log(_order, _user_info);
                                },
                                success: function( res ) {
                                    const result = JSON.parse( res );
                                    isAjaxRunning = false;

                                    if( result.state === 200 ) {
                                        window.alert("주문을 발송하였습니다. 메일을 확인해주세요. 감사합니다.");
                                        sessionStorage.clear();
                                        window.location.href = "https://openboek.info/font/";
                                    } else if( result.state === 500 ) {
                                        window.alert("주문이 접수되었으나 메일 발송이 되지 않았습니다. 관리자에게 알려주세요.");
                                        window.location.href = "https://openboek.info/shop/";
                                    }
                                },
                                error: function(thrownError) {
                                    console.log(thrownError);
                                }
                            });
                        }
                    }
                }
            })();
        }
    })();

    (function handleUserCheckAll() {
        let is_all_checked = false;
        const user_check_all = document.querySelector("#user-check-all");
        user_check_all.addEventListener("click", function( e ) {
            if( !is_all_checked ) {
                is_all_checked = true;

                const cont_checkbox = document.querySelectorAll(".cont-checkbox");
                for( let i = 0; i < cont_checkbox.length; i += 1 ) {
                    const checkbox = cont_checkbox[i].querySelector("input");
                    checkbox.checked = true;
                }
            } else {
                is_all_checked = false;

                const cont_checkbox = document.querySelectorAll(".cont-checkbox");
                for( let i = 0; i < cont_checkbox.length; i += 1 ) {
                    const checkbox = cont_checkbox[i].querySelector("input");
                    checkbox.checked = false;
                }
            }
        });

        const cont_checkbox = document.querySelectorAll(".cont-checkbox");
        console.log(cont_checkbox);
        for( let i = 0; i < cont_checkbox.length; i += 1 ) {
            const input = cont_checkbox[i].querySelector("input");
            input.addEventListener("click", function() {
                const result = confirm();
                if( result[0] && result[1] && result[2] ) {
                    is_all_checked = true;
                    user_check_all.checked = true;
                } else {
                    is_all_checked = false;
                    user_check_all.checked = false;
                }
            });
        }

        function confirm() {
            let temp = [];
            const cont_checkbox = document.querySelectorAll(".cont-checkbox");
            for( let i = 0; i < cont_checkbox.length; i += 1 ) {
                if( i !== cont_checkbox.length - 1 ) {
                    const input = cont_checkbox[i].querySelector("input");
                    temp.push( input.checked );
                }
            }

            return temp;
        }
    })();
}, false);