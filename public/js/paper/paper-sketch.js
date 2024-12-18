var activated_idx = 0;
var font_family_slider = document.querySelector("#font-family-slider");
var item_font_family_slider = font_family_slider.querySelectorAll(".item-font-family-slider");
for( var i = 0; i < item_font_family_slider.length; i += 1 ) {
    if( item_font_family_slider[i].className.indexOf( "active" ) > -1 ) {
        activated_idx = i;
        break;
    }
}
// console.log(activated_idx);

var path, position, max;
var count = 0;
var coords = [];
var textItems = [];

var src = item_font_family_slider[activated_idx].querySelector("img").src;
// console.log(src);
var raster = new Raster( src );
raster.visible = false;
// raster.on('load', resetSpiral);

function growSpiral() {
    count++;
    var cycle = count / (100 - 10);
    if( window.innerWidth <= 740 ) {
        cycle = count / (100 - 10);
    }
    var vector = new Point({
        angle: count * 5.0,
        length: cycle
    });
    var rot = vector.rotate(90);
    var color = raster.getAverageColor(position + vector / 2);
    var value = color ? (1 - color.gray) * 4.0 : 0;
    rot.length = Math.max(value, 0.2);

    var p1 = position + vector - rot;
    var p2 = position + vector + rot;
    path.add(p1);
    path.insert(0, p2);
    position += vector;

    coords.push(p1);
    coords.push(p2);
}

function resetSpiral() {
    isResizing = true;

    raster.fitBounds(view.bounds);

    if( path ) path.remove();

    position = view.center;
    count = 0;
    path = new Path({
        fillColor: 'black',
        closed: true
    });

    coords = [];
    textItems.forEach(function(item) {
        item.remove();
    });
    textItems = [];

    max = Math.min(raster.bounds.width, raster.bounds.height) * 0.4875;

    while ((view.center - position).length < max) {
        growSpiral();
    }
    path.smooth();

    if( window.innerWidth > 740 ) {
        drawRandomText();
    }

    isResizing = false;
}

function changeTextureDesktop() {
    isResizing = true;

    raster.fitBounds(view.bounds);

    if( path ) path.remove();

    position = view.center;
    count = 0;
    path = new Path({
        fillColor: 'black',
        closed: true
    });

    max = Math.min(raster.bounds.width, raster.bounds.height) * 0.4875;

    while ((view.center - position).length < max) {
        growSpiral();
    }
    path.smooth();

    isResizing = false;
}

var isObjectSelected = false;
var isResizing = false;
function drawRandomText() {
    var fontFamilies = [];
    var font_family_slider = document.querySelector("#font-family-slider");
    var item_font_family_slider = font_family_slider.querySelectorAll(".item-font-family-slider");
    for( var i = 0; i < item_font_family_slider.length; i += 1 ) {
        var name = item_font_family_slider[i].querySelector(".name").textContent;
        var src = item_font_family_slider[i].querySelector("img").src;
        var post_id = item_font_family_slider[i].getAttribute("id").replace("post-id-", "");
        fontFamilies.push({
            name: name, src: src, post_id: post_id
        });
    }

    var randomPoints = [];
    for( var i = 0; i < fontFamilies.length; i += 1 ) {
        var randomIndex = Math.floor(Math.random() * coords.length);
        randomPoints.push({
            point: coords[randomIndex],
            name: fontFamilies[i].name,
            src: fontFamilies[i].src,
            post_id: fontFamilies[i].post_id
        });
    }

    var fontSize = 48;
    if( window.innerHeight < 740 ) {
        fontSize = 16;
    }
    
    for( var i = 0; i < randomPoints.length; i += 1 ) {
        var text = new PointText({
            justification: "center",
            point: randomPoints[i].point,
            content: randomPoints[i].name,
            fontSize: fontSize,
            customPropImgSrc: randomPoints[i].src,
            customPropPostId: randomPoints[i].post_id,
            fontFamily: "Comic Sans",
            fillColor: 'rgba(0, 0, 0, 1)'
        });

        text.onClick = function( event ) {
            if( !isObjectSelected ) {
                var name = this.content;
                var post_id = this.customPropPostId;
                handleResultWithfName( name );
                setFontFamilyFromAjax( post_id );

                isObjectSelected = true;
            }
        };

        text.onMouseEnter = function( event ) {
            document.querySelector("#paper-canvas").classList.add("pointer-cursor");
            if( raster.loaded ) {
                if( !isObjectSelected ) {
                    if( !isResizing ) {
                        var src = event.target.customPropImgSrc;
                        var _image = new Image();
                        _image.src = src;
                        _image.onload = function() {
                            raster = new Raster( _image );
                            raster.visible = false;
                    
                            changeTextureDesktop();
                        }
                    }
                }
            };
        };

        text.onMouseLeave = function( event ) {
            document.querySelector("#paper-canvas").classList.remove("pointer-cursor");
        };

        textItems.push( text );
    }

    var cont_paper_canvas = document.querySelector("#cont-paper-canvas");
    if( cont_paper_canvas.className.indexOf("active") <= -1 ) {
        cont_paper_canvas.classList.add("active");
    }

    // console.log(textItems);
}

// callback - desktop
function handleResultWithfName( fName ) {
    var main_content = document.querySelector("#main-content");
    main_content.classList.add("hide");

    var cont_family = document.querySelector(".cont-family");
    cont_family.classList.add("hide");

    setTimeout(function() {
        main_content.classList.remove("hide");
        main_content.classList.add("selected");
        var main_header = document.querySelector("#main-header");
        main_header.classList.add("selected");

        var main_menu = document.querySelector("#main-menu");
        main_menu.classList.add("font");

        var cont_family = document.querySelector(".cont-family");
        cont_family.classList.remove("hide");

        var name = main_menu.querySelector(".cont-family .name");
        name.innerText = fName;
    }, 500);
}

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

// dom - mobile
(function handleMobileFontFamilySelect() {
    var font_family_slider = document.querySelector("#font-family-slider");
    var item_font_family_slider = font_family_slider.querySelectorAll(".item-font-family-slider");

    // console.log(item_font_family_slider);
    for( var i = 0; i < item_font_family_slider.length; i += 1 ) {
        (function( index ) {
            item_font_family_slider[index].addEventListener("click", function() {
                var name = this.querySelector(".name").textContent;
                var post_id = this.getAttribute("id").replace("post-id-", "");
                if( this.className.indexOf("active") > -1 ) {
                    handleResultWithfName( name );
                    setFontFamilyFromAjax( post_id );
                } else {
                    var interval = Math.abs((activated_idx - index));

                    activated_idx = index;
                    current += (40 * interval);

                    calcFontSize();
                }
            }, false);
        })( i );
    }

    function handleResultWithfName( fName ) {
        var main_content = document.querySelector("#main-content");
        main_content.classList.add("hide");

        var main_menu = document.querySelector("#main-menu");
        main_menu.classList.add("font");

        var name = main_menu.querySelector(".cont-family .name");
        name.innerText = fName;

        var cont_family = document.querySelector(".cont-family");
        cont_family.classList.add("hide");
    
        setTimeout(function() {
            isObjectSelected = true;

            main_content.classList.remove("hide");
            main_content.classList.add("selected");
            var main_header = document.querySelector("#main-header");
            main_header.classList.add("selected");

            var main_menu = document.querySelector("#main-menu");
            main_menu.classList.add("font");

            var cont_family = document.querySelector(".cont-family");
            cont_family.classList.remove("hide");
        }, 500);
    }

    var cont_paper_canvas = document.querySelector("#cont-paper-canvas");
    if( cont_paper_canvas.className.indexOf("active") <= -1 ) {
        cont_paper_canvas.classList.add("active");
    }
})();

// slider
var current = 0;
(function handleMobileFontFamilySlider() {
    // init
    var font_family_slider = document.querySelector("#font-family-slider");
    var item_font_family_slider = font_family_slider.querySelectorAll(".item-font-family-slider");

    for( var i = 0; i < item_font_family_slider.length; i += 1 ) {
        if( item_font_family_slider[i].className.indexOf( "active" ) > -1 ) {
            activated_idx = i;
            break;
        }
    }

    // event
    var mobile_font_family_slider = document.querySelector("#mobile-font-family-silder");

    var startY = 0;
    var endY = 0;
    
    mobile_font_family_slider.addEventListener("touchstart", function( event ) {
        startY = event.touches[0].clientY;
    }, false);

    mobile_font_family_slider.addEventListener("touchmove", function( event ) {
        event.preventDefault();
    }, { passive: false });
    
    mobile_font_family_slider.addEventListener("touchend", function( event ) {
        endY = event.changedTouches[0].clientY;
    
        var deltaY = endY - startY;
    
        if( deltaY > 0 ) { // down
            if( activated_idx > 0 ) {
                activated_idx -= 1;
                current -= (40);

                calcFontSize();
            }
        } else if( deltaY < 0 ) { // up
            if( activated_idx < item_font_family_slider.length - 1 ) {
                activated_idx += 1;
                current += (40);

                calcFontSize();
            }
        } else {
            return false;
        }
    }, false);
})();

// callback
function calcFontSize() {
    for( var i = 0; i < item_font_family_slider.length; i += 1 ) {
        item_font_family_slider[i].classList.remove("active");
    }

    item_font_family_slider[activated_idx].classList.add("active");

    var font_family_slider = document.querySelector("#font-family-slider");
    font_family_slider.style.transform = "translateY(" + current * (-1) + "px)";

    if( activated_idx === item_font_family_slider.length - 1 ) {
        var main_graphic = document.querySelector("#main-graphic");
        main_graphic.classList.add("end");
    } else {
        var main_graphic = document.querySelector("#main-graphic");
        main_graphic.classList.remove("end");
    }

    // console.log(activated_idx, item_font_family_slider.length);

    if( raster.loaded ) {
        if( !isObjectSelected ) {
            if( !isResizing ) {
                var src = item_font_family_slider[activated_idx].querySelector("img").src;
                var _image = new Image();
                _image.src = src;
                _image.onload = function() {
                    raster = new Raster( _image );
                    raster.visible = false;
            
                    resetSpiral();
                }
            }
        }
    };
}

// resize
function onResize() {
    if( raster.loaded ) {
        if( !isObjectSelected ) {
            if( !isResizing ) {
                resetSpiral();
            }
        }
    };
}

// ajax
var isAjaxRunning = false;
var ajaxBasicUrl = "https://openboek.info/wp-admin/admin-ajax.php";
function setFontFamilyFromAjax( post_id ) {
    // console.log( post_id );
    
    if( isAjaxRunning ) {
        return false;
    }

    isAjaxRunning = true;

    var action = 'get_data_from_family_name';
    
    jQuery.ajax({
        url: ajaxBasicUrl,
        type: "post",
        data: {
            action: action,
            post_id: post_id
        },
        beforeSend: function(xhr) {

        },
        success: function( res ) {
            isAjaxRunning = false;

            jQuery('.cont-family > .family').html( res );

            setFontFromAjax( post_id );
        },
        error: function(thrownError) {
            console.log(thrownError);
        }
    });
}

function setFontFromAjax( post_id ) {
    if( isAjaxRunning ) {
        return false;
    }

    isAjaxRunning = true;

    var action = 'get_font_data_from_post_id';
    
    jQuery.ajax({
        url: ajaxBasicUrl,
        type: "post",
        data: {
            action: action,
            post_id: post_id
        },
        beforeSend: function(xhr) {

        },
        success: function( res ) {
            isAjaxRunning = false;

            var results = JSON.parse( res );
            // console.log( results );

            // global
            var elems = [];

            // font face
            var styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            var font_files_file = results.font_files_file;
            for( var i = 0; i < font_files_file.length; i += 1 ) {
                var fontFace = "@font-face { font-family: " + font_files_file[i].family_name + "-" + font_files_file[i].child_name + ";";
                // fontFace += "src: url('" + font_files_file[i].child_file + "') format('" + font_files_file[i].child_format + "'); }";
                fontFace += "src: url(data:application/font-woff;base64," + font_files_file[i].child_base_64 + "); }";
                styleSheet.appendChild(document.createTextNode(fontFace));
            }
            document.head.appendChild(styleSheet);

            // sample
            (function handleSectionSample() {
                var setting = {
                    texts: results.sample_texts,
                    currentTextIdx: 0,
                    currentText: null
                }
                setting.currentText = setting.texts[setting.currentTextIdx];
            
                var item_family = document.querySelectorAll(".cont-family .family .item-family");
                for( var i = 0; i < item_family.length; i += 1 ) {
                    var font_family_name = document.querySelector(".cont-family > .name").textContent;
                    var font_name = item_family[i].querySelector("button span.text").textContent;
            
                    var elem = {
                        el: item_family[i],
                        font_family_name: font_family_name,
                        font_name: font_name,
                        isSelected: false
                    };
            
                    elems[i] = elem;
                }
                
                for( var i = 0; i < elems.length; i += 1 ) {
                    (function( index ) {
                        elems[index].el.addEventListener("click", function() {
                            if( elems[index].isSelected ) {
                                elems[index].isSelected = false;
                                elems[index].el.classList.remove("active");
                            } else {
                                elems[index].isSelected = true;
                                elems[index].el.classList.add("active");
                            }
                
                            checkActivatedCount();
                            resultSample();
                        }, false);
                    })( i );
                }
            
                checkActivatedCount();
                function checkActivatedCount() {
                    var count = 0;
                    for( var i = 0; i < elems.length; i += 1 ) {
                        (function( index ) {
                            if( elems[index].isSelected ) {
                                count += 1;
                            }
                        })( i );
                    }
            
                    if( count <= 0 ) {
                        elems[0].isSelected = true;
                        elems[0].el.classList.add("active");
                    }
            
                    return false;
                }
            
                resultSample();
                function resultSample() {
                    // console.log(elems);
                    var container_item_sample = document.querySelector("#container-item-sample");
                    container_item_sample.innerHTML = "";
            
                    var letterCount = 0;
                    for( var i = 0; i < elems.length; i += 1 ) {
                        (function( index ) {
                            if( elems[index].isSelected ) {
                                var span = document.createElement("span");
                                span.classList.add("item-sample");
                                if( i === elems.length - 1 ) {
                                    span.innerText = setting.currentText;
                                } else {
                                    span.innerText = setting.currentText + " ";
                                }
                                container_item_sample.appendChild( span );
                                letterCount += setting.currentText.length;
                            }
                        })( i );
                    }
            
                    var _index = 0;
                    var item_sample = container_item_sample.querySelectorAll(".item-sample");
                    var count = 0;
                    for( var i = 0; i < elems.length; i += 1 ) {
                        (function( index ) {
                            if( elems[index].isSelected ) {
                                count += item_sample[_index].innerText.length;
                                _index += 1;
                            }
                        })( i );
                    }
            
                    var _index = 0;
                    for( var i = 0; i < elems.length; i += 1 ) {
                        (function( index ) {
                            if( elems[index].isSelected ) {
                                if( window.innerWidth > window.innerHeight ) {
                                    item_sample[_index].style.fontSize = (200 / count + 4) + "vw";
                                } else {
                                    item_sample[_index].style.fontSize = (200 / count + 4) + "vh";
                                }
                                item_sample[_index].style.fontFamily = elems[index].font_family_name + "-" + elems[index].font_name;
        
                                _index += 1;
                            }
                        })( i );
                    }
            
                    return false;
                }
            
                (function changeText() {
                    var limit = setting.texts.length;
            
                    var section_sample = document.querySelector(".section.sample");
                    section_sample.addEventListener("click", function() {
                        if( setting.currentTextIdx < limit - 1 ) {
                            setting.currentTextIdx += 1;
                        } else {
                            setting.currentTextIdx = 0;
                        }
                        setting.currentText = setting.texts[setting.currentTextIdx];
            
                        resultSample();
                    }, false);
                })();
        
                window.addEventListener("resize", reCalcFontSize);
                function reCalcFontSize() {
                    var count = 0;
                    var container_item_sample = document.querySelector("#container-item-sample");
                    var item_sample = container_item_sample.querySelectorAll(".item-sample");
        
                    for( var i = 0; i < item_sample.length; i += 1 ) {
                        (function( index ) {
                            count += item_sample[index].innerText.length;
                        })( i );
                    }
            
                    for( var i = 0; i < item_sample.length; i += 1 ) {
                        (function( index ) {
                            if( window.innerWidth > window.innerHeight ) {
                                item_sample[index].style.fontSize = (200 / count + 4) + "vw";
                            } else {
                                item_sample[index].style.fontSize = (200 / count + 4) + "vh";
                            }
                            item_sample[index].style.fontFamily = elems[index].font_family_name + "-" + elems[index].font_name;
                        })( i );
                    }
                }
            })();

            // scale
            (function handleSectionScale() {
                var setting = {
                    texts: results.scale_texts,
                    currentTextIdx: 0,
                    currentText: null
                }
                setting.currentText = setting.texts[setting.currentTextIdx];
            
                splitLetters();
                window.addEventListener("resize", splitLetters);
                function splitLetters() {
                    var text = setting.currentText;
            
                    var child_item_scale = document.querySelectorAll(".child-item-scale");
                    var limit = child_item_scale.length;
                
                    var weights = [];
                    for( var i = 0; i < limit; i += 1 ) {
                        var heading = child_item_scale[i].querySelector(".heading");
                        var weight = parseInt(heading.innerText.replace("px", ""));
                        if( i === 0 ) {
                            // weight *= 5;
                        }
                        weights[i] = weight;
                    }
                
                    var weightsSum = 0;
                    for( var i = 0; i < weights.length; i += 1 ) {
                        weightsSum += weights[i];
                    }
                    var reversedWeights = weights.slice().reverse();
                
                    var ratio = reversedWeights.map(function(item) {
                        return Math.floor((item / weightsSum) * 100);
                    });
                    var ratioSum = 0;
                    for( var i = 0; i < ratio.length; i += 1 ) {
                        ratioSum += ratio[i];
                    }
                    var sliceCount = [];
                    for( var i = 0; i < limit; i += 1 ) {
                        sliceCount[i] = Math.floor(( text.length / ratioSum ) * ratio[i]);
                    }
                    
                    var start = 0;
                    var end = 0;
                    var contents = [];
                    for( var i = 0; i < sliceCount.length; i += 1 ) {
                        if( i === sliceCount.length - 1 ) {
                            end = text.length;
                        } else {
                            end = start + sliceCount[i];
                        }
                        contents[i] = text.slice(start, end);
                        start = end;
                    }
                
                    for( var i = 0; i < contents.length; i += 1 ) {
                        var heading = child_item_scale[i].querySelector(".heading");
                        var line_height = child_item_scale[i].querySelector(".line-height");
                        var content = child_item_scale[i].querySelector(".content");
                        content.innerText = contents[i];
                        content.style.fontFamily = elems[0].font_family_name + "-" + elems[0].font_name;
                        content.style.fontSize = parseInt(heading.innerText.replace("px", "")) * 1.0 + "px";
                        content.style.lineHeight = parseFloat(line_height.innerText);
                    }
                }
            
                (function changeText() {
                    var limit = setting.texts.length;
            
                    var section_scale = document.querySelector(".section.scale");
                    section_scale.addEventListener("click", function() {
                        if( setting.currentTextIdx < limit - 1 ) {
                            setting.currentTextIdx += 1;
                        } else {
                            setting.currentTextIdx = 0;
                        }
                        setting.currentText = setting.texts[setting.currentTextIdx];
                        
                        splitLetters();
                    }, false);
                })();
            })();

            // demo
            (function handleSectionDemo() {
                var controller = {
                    pointSize: 32,
                    fontSize: 32,
                    fontFiles: [],
                    pastWindow: { w: 0, h: 0 },
                    count: 0,
                    points: [],
                    gAngle: 0,
                    letter: "type & move your text!"
                };
            
                new p5( p5Sketch );
                function p5Sketch(p) {
                    p.preload = function() {
                        p.noCanvas();

                        var font = p.loadFont( results.font_files_file[0].child_file );
                        controller.fontFiles.push({ font: font });
                    }
            
                    p.setup = function () {
                        var cont_p5_canvas = document.querySelector("#cont-p5-canvas");
                        var canvas = p.createCanvas(cont_p5_canvas.offsetWidth, cont_p5_canvas.offsetHeight);
                        canvas.parent( cont_p5_canvas );
            
                        controller.pastWindow.w = cont_p5_canvas.offsetWidth;
                        controller.pastWindow.h = cont_p5_canvas.offsetHeight;
                        controller.count = 4;
                        controller.points.push(
                            {
                                isEntered: false,
                                isHover: false,
                                position: { x: (controller.pointSize * 2), y: (p.height - controller.pointSize) / 2 }
                            }
                        );
                        controller.points.push(
                            {
                                isEntered: false,
                                isHover: false,
                                position: { x: (p.width - controller.pointSize) / 2, y: (p.height - controller.pointSize) / 2 - (controller.pointSize * 8) }
                            }
                        );
                        controller.points.push(
                            {
                                isEntered: false,
                                isHover: false,
                                position: { x: (p.width - controller.pointSize) / 2, y: (p.height - controller.pointSize) / 2 + (controller.pointSize * 8) }
                            }
                        );
                        controller.points.push(
                            {
                                isEntered: false,
                                isHover: false,
                                position: { x: p.width - (controller.pointSize * 2), y: (p.height - controller.pointSize) / 2 }
                            }
                        );
                    };
            
                    p.draw = function () {
                        p.background(255);
                    
                        // guide line
                        if( controller.points.length === 4 ) {
                            p.noFill();
                            p.stroke(200, 200, 200);
                            p.push();
                                p.noFill();
                                p.beginShape();
                                    p.vertex(controller.points[0].position.x, controller.points[0].position.y);
                                    p.bezierVertex(
                                        controller.points[1].position.x, controller.points[1].position.y,
                                        controller.points[2].position.x, controller.points[2].position.y,
                                        controller.points[3].position.x, controller.points[3].position.y
                                    );
                                p.endShape();
                            p.pop();
                        }
            
                        // guide ellipse
                        p.noStroke()
                        for( var i = 0; i < controller.points.length; i += 1 ) {
                            var x = controller.points[i].position.x;
                            var y = controller.points[i].position.y;
            
                            if( controller.points[i].isHover ) {
                                p.fill(230, 230, 230, 150);
                            } else {
                                p.fill(230, 230, 230);
                            }
                            p.ellipse(x, y, controller.pointSize);
                        }
                    
                        // letter
                        if( controller.points.length === 4 ) {
                            p.noStroke();
                            p.push();
                                for( var i = 0; i <= controller.letter.length; i += 1 ) {
                                    var total = (controller.letter.length - 1);
                                    if( controller.letter.length === 1 ) {
                                        total = 1;
                                    }
                                    var x = p.bezierPoint(
                                        controller.points[0].position.x,
                                        controller.points[1].position.x,
                                        controller.points[2].position.x,
                                        controller.points[3].position.x,
                                        i / total
                                    );
                    
                                    var y = p.bezierPoint(
                                        controller.points[0].position.y,
                                        controller.points[1].position.y,
                                        controller.points[2].position.y,
                                        controller.points[3].position.y,
                                        i / total
                                    );
                    
                                    // var _offset = p.map(i, 0, controller.letter.length, 180, 0);
                                    // var _cos = p.cos(p.radians(controller.gAngle + _offset));
                                    // p.fill(0, p.map(_cos, -1, 1, 255, 0));
                                    p.fill(0);
                                    p.textFont(controller.fontFiles[0].font);
                                    p.textSize(controller.fontSize);
                                    p.textAlign(p.CENTER, p.CENTER);
                                    p.text(controller.letter[i], x, y - controller.fontSize / 4);
                                }
                            p.pop();
                        }
            
                        p.update();
                    };
            
                    p.update = function () {
                        controller.gAngle += 10;
            
                        var isGlobalMouseHover = false;
            
                        for( var i = 0; i < controller.points.length; i += 1 ) {
                            controller.points[i].isHover = false;
            
                            var x = controller.points[i].position.x;
                            var y = controller.points[i].position.y;
                            
                            var distance = p.dist(p.mouseX, p.mouseY, x, y);
                            if( distance <= controller.pointSize / 2 ) {
                                isGlobalMouseHover = true;
                                controller.points[i].isHover = true;
                            }
            
                            if( controller.points[i].isEntered ) {
                                controller.points[i].position.x = p.mouseX;
                                controller.points[i].position.y = p.mouseY;
                            }
                        }
            
                        if( isGlobalMouseHover ) {
                            document.body.style.cursor = "pointer";
                        } else {
                            document.body.style.cursor = "default";
                        }
                    }
            
                    p.windowResized = function () {
                        var cont_p5_canvas = document.querySelector("#cont-p5-canvas");
                        p.resizeCanvas(cont_p5_canvas.offsetWidth, cont_p5_canvas.offsetHeight);
            
                        if( controller.points.length === 4 ) {
                            for( var i = 0; i < controller.points.length; i += 1 ) {
                                controller.points[i].position.x = p.map(
                                    controller.points[i].position.x,
                                    0, controller.pastWindow.w, 
                                    0, cont_p5_canvas.offsetWidth
                                );
                                
                                controller.points[i].position.y = p.map(
                                    controller.points[i].position.y,
                                    0, controller.pastWindow.h, 
                                    0, cont_p5_canvas.offsetHeight
                                );
                            }
                        }
            
                        controller.pastWindow.w = cont_p5_canvas.offsetWidth;
                        controller.pastWindow.h = cont_p5_canvas.offsetHeight;
                    }
                    
                    p.mousePressed = function () {
                        var isEntered = false;
            
                        for( var i = 0; i < controller.points.length; i += 1 ) {
                            var x = controller.points[i].position.x;
                            var y = controller.points[i].position.y;
                            var distance = p.dist(p.mouseX, p.mouseY, x, y);
                            if( distance <= controller.pointSize / 2 ) {
                                isEntered = true;
                                controller.points[i].isEntered = true;
                            }
                        }
                    
                        if( !isEntered ) {
                            if( controller.points.length < 4 ) {
                                controller.points[controller.count] = {
                                    isEntered: false,
                                    isHover: false,
                                    position: { x: p.mouseX, y: p.mouseY }
                                };
                    
                                controller.count += 1;
                            }
                        }
                    }
                    
                    p.mouseReleased = function () {
                        for( var i = 0; i < controller.points.length; i += 1 ) {
                            controller.points[i].isEntered = false;
                        }
                    }
            
                    p.keyReleased = function ( event ) {
                        if( controller.points.length === 4 ) {
                            var keyChar = event.key;
            
                            if( keyChar === "Backspace" ) {
                                controller.letter = controller.letter.substring(0, controller.letter.length - 1);
                            }
            
                            if( /^[A-Za-z0-9!? ]$/.test( keyChar ) ) {
                                controller.letter += keyChar;
                            }
                        }
                    }
                }
            })();

            // learn
            (function handleSectionLearn() {
                var item_cont_learn = document.querySelectorAll(".cont-learn > .item-cont-learn");
                item_cont_learn[0].querySelector("p").innerHTML = results.learn_texts.item_learn_1;
                item_cont_learn[1].querySelector("p").innerHTML = results.learn_texts.item_learn_2;
            })();

            // mobile hidden-text
            (function handleHiddenText() {
                var hidden_text = document.querySelector("#hidden-text");
                hidden_text.style.fontFamily = elems[0].font_family_name + "-" + elems[0].font_name;
            })();
        },
        error: function(thrownError) {
            console.log(thrownError);
        }
    });
}