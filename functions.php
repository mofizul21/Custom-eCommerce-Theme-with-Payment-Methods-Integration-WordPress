<?php
  add_action( 'wp_footer', function() {
    # wp jquery
    wp_enqueue_script('jquery');

    # javascript
    if( !is_404() ) {
      wp_enqueue_script( 'lazysizes.min', get_template_directory_uri() . '/public/js/lazysizes.min.js?v=1.3', true );
      wp_enqueue_script( 'script', get_template_directory_uri() . '/public/js/script.js?v=1.3', true );
    }

    if( is_single() ) {
      wp_enqueue_script( 'single', get_template_directory_uri() . '/public/js/single.js?v=1.3', true );
    } else {
      wp_enqueue_script( 'index', get_template_directory_uri() . '/public/js/index.js?v=1.3', true );
    }

    if( is_page( 'font' ) ) {
      wp_enqueue_script( 'p5.min', get_template_directory_uri() . '/public/js/p5.min.js?v=1.3', true );
      wp_enqueue_script( 'codemirror', get_template_directory_uri() . '/public/js/paper/codemirror.js?v=1.3', true );
      wp_enqueue_script( 'paper', get_template_directory_uri() . '/public/js/paper/paper.js?v=1.3', true );

      wp_enqueue_script( 'paper-sketch', get_template_directory_uri() . '/public/js/paper/paper-sketch.js?v=1.3', true );
      add_filter( 'script_loader_tag', 'add_type_to_script', 10, 3 );
      function add_type_to_script( $tag, $handle, $src ) {
        if ( in_array( $handle, array( 'paper-sketch' ) ) ) {
          $tag = '<script type="text/paperscript" src="' . esc_url( $src ) . '" canvas="paper-canvas"></script>';
        } 
        return $tag;
      }

      wp_enqueue_script( 'page-font', get_template_directory_uri() . '/public/js/page-font.js?v=1.3', true );
    }

    if( is_page( 'licensing' ) ) {
      wp_enqueue_script( 'page-licensing', get_template_directory_uri() . '/public/js/page-licensing.js?v=1.3', true );
    }

    if( is_page( 'shop' ) ) {
      wp_enqueue_script( 'page-shop', get_template_directory_uri() . '/public/js/page-shop.js?v=1.3', true );
    }

    if( is_page( 'checkout' ) ) {
      wp_enqueue_script( 'page-checkout', get_template_directory_uri() . '/public/js/page-checkout.js?v=1.3', true );
      // wp_localize_script('page-checkout', 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
    }

    if( is_page( 'list' ) ) {
      wp_enqueue_script( 'page-list', get_template_directory_uri() . '/public/js/page-list.js?v=1.3', true );
      // wp_localize_script('page-list', 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
    }
  });

  // custom taxonomy
  add_action( 'init', 'custom_category_taxonomy' );
  function custom_category_taxonomy() {
    register_taxonomy(
      'category-font-product',
      'font-product',
      array(
        'rewrite' => array(
          'slug' => 'category-font-product', 
          'with_front' => false
        ),
        'show_admin_column' => true,
        'label' => __( 'Category (product)' ),
        'show_in_rest' => true,
        'hierarchical' => true
        )
    );

    register_taxonomy(
      'category-customer-order',
      'customer-order',
      array(
        'rewrite' => array(
          'slug' => 'category-customer-order', 
          'with_front' => false
        ),
        'show_admin_column' => true,
        'label' => __( 'Category (customer order)' ),
        'show_in_rest' => true,
        'hierarchical' => true
        )
    );

    register_taxonomy(
      'category-discover',
      'discover',
      array(
        'rewrite' => array(
          'slug' => 'category-discover', 
          'with_front' => false
        ),
        'show_admin_column' => true,
        'label' => __( 'Category (discover)' ),
        'show_in_rest' => true,
        'hierarchical' => true
        )
    );
  }

  // custom post type
  add_action('init', 'create_post_type');
  function create_post_type()
  {
    register_post_type( 'font-product',
      array(
        'labels' => array(
            'name' => __( 'Product (post)' ),
            'singular_name' => __( 'Product (post)' )
        ),
        'public'              => true,
        // 'register_meta_box_cb' => null,
        'publicly_queryable'  => true,
        'show_in_nav_menus'   => true,
        'show_ui'             => true,
        'query_var'           => true,
        'has_archive'         => true,
        'capability_type'     => 'post',
        'rewrite' => array(
          'slug' => 'font-product/%category-font-product%',
          'with_front' => false
        ),
        'show_in_rest' => true,
        // 'supports' => array( 'title', 'editor', 'category' )
        'supports' => array( 'title', 'category' ),
        'menu_icon' => 'dashicons-edit'
      )
    );

    register_post_type( 'customer-order',
      array(
        'labels' => array(
            'name' => __( 'Customer Order (post)' ),
            'singular_name' => __( 'Customer Order (post)' )
        ),
        'public'              => true,
        // 'register_meta_box_cb' => null,
        'publicly_queryable'  => true,
        'show_in_nav_menus'   => true,
        'show_ui'             => true,
        'query_var'           => true,
        'has_archive'         => true,
        'capability_type'     => 'post',
        'rewrite' => array(
          'slug' => 'customer-order/%category-customer-order%',
          'with_front' => false
        ),
        'show_in_rest' => true,
        // 'supports' => array( 'title', 'editor', 'category' )
        'supports' => array( 'title', 'category' ),
        'menu_icon' => 'dashicons-edit'
      )
    );

    register_post_type( 'discover',
      array(
        'labels' => array(
            'name' => __( 'Discover (post)' ),
            'singular_name' => __( 'Discover (post)' )
        ),
        'public'              => true,
        // 'register_meta_box_cb' => null,
        'publicly_queryable'  => true,
        'show_in_nav_menus'   => true,
        'show_ui'             => true,
        'query_var'           => true,
        'has_archive'         => true,
        'capability_type'     => 'post',
        'rewrite' => array(
          'slug' => 'discover/%category-discover%',
          'with_front' => false
        ),
        'show_in_rest' => true,
        // 'supports' => array( 'title', 'editor', 'category' )
        'supports' => array( 'title', 'category' ),
        'menu_icon' => 'dashicons-edit'
      )
    );
  }

  // custom permalinks
  function wpa_permalinks( $post_link, $post ){
    if ( is_object( $post ) && $post->post_type == 'font-product' ){
        $terms = wp_get_object_terms( $post->ID, 'category-font-product' );
        if( $terms ){
            return str_replace( '%category-font-product%' , $terms[0]->slug , $post_link );
        }
    }

    if ( is_object( $post ) && $post->post_type == 'customer-order' ){
      $terms = wp_get_object_terms( $post->ID, 'category-customer-order' );
      if( $terms ){
          return str_replace( '%category-customer-order%' , $terms[0]->slug , $post_link );
      }
    }

    if ( is_object( $post ) && $post->post_type == 'discover' ){
      $terms = wp_get_object_terms( $post->ID, 'category-discover' );
      if( $terms ){
          return str_replace( '%category-discover%' , $terms[0]->slug , $post_link );
      }
    }

    return $post_link;
  }
  add_filter( 'post_type_link', 'wpa_permalinks', 1, 2 );

  // option pages
  if( function_exists('acf_add_options_page') ) {
    $parent = acf_add_options_page(array(
      'page_title' 	=> 'Main Setting',
      'menu_title'	=> 'Main Setting',
      'menu_slug' 	=> 'main setting',
      'capability'	=> 'edit_posts',
      'redirect'		=> true,
      'position'      => 1,
      'icon_url'      => 'dashicons-admin-generic'
    ));

    acf_add_options_sub_page(array(
      'page_title' 	=> 'Main Setting',
      'menu_title' 	=> 'Main Setting',
      'parent_slug' 	=> $parent['menu_slug'],
    ));

    // $parent = acf_add_options_page(array(
    //   'page_title' 	=> 'Font (section)',
    //   'menu_title'	=> 'Font (section)',
    //   'menu_slug' 	=> 'section-font',
    //   'capability'	=> 'edit_posts',
    //   'redirect'		=> true,
    //   'position'      => 1,
    //   'icon_url'      => 'dashicons-admin-page'
    // ));

    // acf_add_options_sub_page(array(
    //   'page_title' 	=> 'Font (section)',
    //   'menu_title' 	=> 'Section - Font',
    //   'parent_slug' 	=> $parent['menu_slug'],
    // ));

    $parent = acf_add_options_page(array(
      'page_title' 	=> 'Licensing (section)',
      'menu_title'	=> 'Licensing (section)',
      'menu_slug' 	=> 'section-licensing',
      'capability'	=> 'edit_posts',
      'redirect'		=> true,
      'position'      => 1,
      'icon_url'      => 'dashicons-admin-page'
    ));

    acf_add_options_sub_page(array(
      'page_title' 	=> 'Licensing (section)',
      'menu_title' 	=> 'Section - Licensing',
      'parent_slug' 	=> $parent['menu_slug'],
    ));

    // $parent = acf_add_options_page(array(
    //   'page_title' 	=> 'Shop (section)',
    //   'menu_title'	=> 'Shop (section)',
    //   'menu_slug' 	=> 'section-shop',
    //   'capability'	=> 'edit_posts',
    //   'redirect'		=> true,
    //   'position'      => 1,
    //   'icon_url'      => 'dashicons-admin-page'
    // ));

    // acf_add_options_sub_page(array(
    //   'page_title' 	=> 'Shop (section)',
    //   'menu_title' 	=> 'Section - Shop',
    //   'parent_slug' 	=> $parent['menu_slug'],
    // ));

    // $parent = acf_add_options_page(array(
    //   'page_title' 	=> 'Discover (section)',
    //   'menu_title'	=> 'Discover (section)',
    //   'menu_slug' 	=> 'section-discover',
    //   'capability'	=> 'edit_posts',
    //   'redirect'		=> true,
    //   'position'      => 1,
    //   'icon_url'      => 'dashicons-admin-page'
    // ));

    // acf_add_options_sub_page(array(
    //   'page_title' 	=> 'Discover (section)',
    //   'menu_title' 	=> 'Section - Discover',
    //   'parent_slug' 	=> $parent['menu_slug'],
    // ));
  }

  // ajax
  add_action('wp_ajax_get_data_from_family_name', 'get_data_from_family_name_filter_function');
  add_action('wp_ajax_nopriv_get_data_from_family_name', 'get_data_from_family_name_filter_function');
  function get_data_from_family_name_filter_function() {
    if( $_POST['action'] == 'get_data_from_family_name' ) {
      get_template_part( "parts/ajax/part", "font-nav" );
      // echo $_POST['keyword'];
    }

    wp_die();
  }

  add_action('wp_ajax_get_font_data_from_post_id', 'get_font_data_from_post_id_filter_function');
  add_action('wp_ajax_nopriv_get_font_data_from_post_id', 'get_font_data_from_post_id_filter_function');
  function get_font_data_from_post_id_filter_function() {
    if( $_POST['action'] == 'get_font_data_from_post_id' ) {
      $post_id = $_POST['post_id'];
      
      $sample = get_field( "sample", $post_id, 'font-product' );      
      $sample_texts = array();
      foreach( $sample as $s ) :
        array_push($sample_texts, $s['child_text_content']);
      endforeach;

      $scale = get_field( "scale", $post_id, 'font-product' );
      $scale_texts = array();
      foreach( $scale as $s ) :
        array_push($scale_texts, $s['child_text_content']);
      endforeach;

      $font_files = get_field( "font_files", $post_id, 'font-product' );
      $font_files_file = array();
      foreach( $font_files as $f ) :
        array_push($font_files_file, array(
          'family_name' => get_the_title( $post_id ),
          'child_name' => $f['child_name'],
          'child_file' => $f['child_file']['url'],
          'child_base_64' => $f['child_base_64'],
          'child_format' => $f['child_format']
        ));
      endforeach;

      $learn = get_field( "learn", $post_id, 'font-product' );
      $learn_texts = array(
        'item_learn_1' => $learn['item_learn_1'],
        'item_learn_2' => $learn['item_learn_2']
      );

      $results = array(
        'sample_texts' => $sample_texts,
        'scale_texts' => $scale_texts,
        'font_files_file' => $font_files_file,
        'learn_texts' => $learn_texts
      );

      echo json_encode( $results );
    }

    wp_die();
  }

  add_action('wp_ajax_get_data_for_mail', 'get_data_for_mail_filter_function');
  add_action('wp_ajax_nopriv_get_data_for_mail', 'get_data_for_mail_filter_function');
  function get_data_for_mail_filter_function() {
      if( $_POST["action"] == "get_data_for_mail" ) {
		  // echo json_encode(array("state"=>"test"));
		  get_template_part( 'parts/ajax/part', 'send-mail' );
      }
  
      wp_die();
  }

  // other
  add_filter( 'upload_mimes', 'my_custom_mime_types' );
  function my_custom_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    $mimes['ase'] = 'application/ase';

    $mimes['otf'] = 'font/otf';
    $mimes['ttf'] = 'font/ttf';
  
    $mimes['woff'] = 'font/woff';
    $mimes['woff2'] = 'font/woff2';

    return $mimes;
  }

  add_action('init', 'restrict_font_file_access');
  function restrict_font_file_access() {
      if (preg_match('/wp-content\/uploads\/.*\.(ttf|otf|woff|woff2)$/i', $_SERVER['REQUEST_URI'])) {
          // 예를 들어, 관리자가 아닌 경우 접근을 차단
          if (!current_user_can('manage_options')) {
              header('HTTP/1.0 403 Forbidden');
              exit;
          }
      }
  }

  add_filter( 'show_admin_bar', '__return_false' );

  add_filter('admin_footer_text', 'remove_footer_admin');
  function remove_footer_admin () {
    echo '<span id="footer-thankyou">Maintenance Contact: <a href="http://www.jungju.kr" target="_blank">Jungju</a></span>';
  }

  function new_dashboard_home($username, $user){
    if( array_key_exists('administrator', $user->caps) ){
      wp_redirect(admin_url('edit.php?post_type=font-product', 'https'), 301);
      exit;
    }
  }
  add_action('wp_login', 'new_dashboard_home', 10, 2);

  function redirect_dashboard_home() {
    global $pagenow;
    if ( $pagenow == 'index.php' ) {
      wp_redirect(admin_url('edit.php?post_type=font-product', 'https'), 301);
      exit;
    }
  }
  add_action('admin_init', 'redirect_dashboard_home');

  add_filter('mce_buttons', 'remove_link_button', 2000);
  function remove_link_button( $buttons ) {
    $remove = array(
      // "aligncenter",
      "alignjustify",
      // "alignleft",
      // "alignright",
      // "blockquote",
      "fullscreen",
      "bullist",
      "numlist",
      "formatselect",
      "wp_more",
      "wp_adv"
    );

    return array_diff( $buttons, $remove );
  }

  // function mytheme_add_init() {
  //   $file_dir = get_template_directory_uri();
  //   add_editor_style( $file_dir . "/public/css/button-editor.css" );
  // }
  // add_action( 'admin_print_styles', 'mytheme_add_init' );

  // function change_publish_button( $translation, $text ) {
  //   if( $text == 'Publish' ) {
  //     return '발행하기';
  //   }

  //   if( $text == 'Update' || $text == 'Save' ) {
  //     return '업데이트';
  //   }

  //   return $translation;
  // }
  // add_filter( 'gettext', 'change_publish_button', 10, 2 );

  function login_logo() { ?>
    <style type="text/css">
      #login h1 a, .login h1 a {
        width: 200px;
        height: 200px;
        background-image: url('https://openboek.info/wp-content/uploads/2024/08/cropped-openboek_index_repSquare_Font_basic.png');
        background-size: contain;
        pointer-events: none;
      }
    </style>
  <?php }
  add_action( 'login_enqueue_scripts', 'login_logo' );

  add_action('admin_menu', function () {
    remove_menu_page('index.php');
    remove_menu_page('edit.php');
    remove_menu_page('edit-comments.php');
    remove_menu_page('profile.php');
    // remove_menu_page('edit.php?post_type=page');
    // remove_menu_page('plugins.php');
    remove_menu_page('tools.php');
    remove_menu_page('users.php');
    // remove_menu_page('themes.php');
    // remove_menu_page('options-general.php');
    // remove_menu_page('upload.php');
  });

  add_filter('xmlrpc_enabled', false);
?>