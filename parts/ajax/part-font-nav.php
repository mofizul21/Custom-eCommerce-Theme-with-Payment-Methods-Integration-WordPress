<?php
    $post_id = $_POST['post_id'];
    $font_files = get_field( "font_files", $post_id, 'font-product' );
?>
<?php foreach( $font_files as $key => $ff ) :?>
    <li class="item-family<?php if( $key == 0 ) : echo ' active'; endif; ?>"><button>
        <span class="text"><?= $ff['child_name']; ?></span>
    </button></li>
<?php endforeach; ?>