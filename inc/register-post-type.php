<?php
// Example

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Regiser custom post types
 */
function post_type() {

	$labels = array(
		'name'               => _x( 'Destaques', 'Post Type General Name', 'understrap' ),
		'singular_name'      => _x( 'Destaque', 'Post Type Singular Name', 'understrap' ),
		'menu_name'          => _x( 'Destaques', 'Admin Menu', 'understrap' ),
		'parent_item_colon'  => __( 'Destaques pai', 'understrap' ),
		'all_items'          => __( 'Todos os Destaques', 'understrap' ),
		'view_item'          => __( 'Ver Destaque', 'understrap' ),
		'add_new_item'       => __( 'Adicionar Destaque', 'understrap' ),
		'add_new'            => _x( 'Adicionar', 'highligth', 'understrap' ),
		'edit_item'          => __( 'Editar Destaque', 'understrap' ),
		'update_item'        => __( 'Atualizar Destaque', 'understrap' ),
		'search_items'       => __( 'Procurar Destaque', 'understrap' ),
		'not_found'          => __( 'Não encontrado', 'understrap' ),
		'not_found_in_trash' => __( 'Não encontrado no Lixo', 'understrap' ),
	);

	$args = array(
		'labels'              => $labels,
		'label'               => __( 'highligth', 'understrap' ),
		'description'         => __( '<h2 class="body-text-15 __lower-lh text-white text-uppercase">o que está a <br><span class="body-text-20 __lower-lh text-white text-fw-black">acontecer</span></h2>', 'understrap' ),
		'supports'            => array( 'title', 'revisions' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		//'rewrite'             => array( 'slug' => 'o-que-esta-a-acontecer' ),
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		//'menu_icon'           => 'dashicons-awards',
	);

  register_post_type( 'highligth', $args );

}


//add_action( 'init', 'post_type', 0 );


flush_rewrite_rules(); // command to rewrite slug of post_type.

/*
EXAMPLE TO ADD COLUMN TO EDIT LIST

Just change post_type for your custom post type

*/

/**
 * Add head to collumn to edit list
 *
 * @param array $defaults is the default head.
 *
 * @return array
 */
function post_type_columns_head( $defaults ) {
	$defaults['checkins'] = 'checkins';
	return $defaults;
}

//add_filter( 'manage_post_type_posts_columns', 'post_type_columns_head' );

/**
 * Add column to edit list
 *
 * @param string $column_name is the column name
 * @param int    $post_ID is the post type ID
 */
function post_type_columns_content( $column_name, $post_ID ) {
	if ( 'checkins' === $column_name ) {
		echo intval( get_field( 'rei_ncheckins', $post_ID ) );
	}
}
//add_action( 'manage_post_type_posts_custom_column', 'post_type_columns_content', 10, 2 );

/**
 * Add sortable to the column
 *
 * @param array $columns is the default columns.
 *
 * @return array
 */
function post_type_sortable_column( $columns ) {
	$columns['checkins'] = 'checkins';
	return $columns;
}
//add_filter( 'manage_edit-post_type_sortable_columns', 'post_type_sortable_column' );

/**
 * Add orderby to query.
 *
 * @param array $query the WP query.
 *
 */
function participation_orderby( $query ) {
	if ( ! is_admin() ) {
		return;
	}

	$orderby = $query->get( 'orderby' );

	if ( 'participation_username' == $orderby ) {
		$query->set( 'meta_key', 'participation_username' );
		$query->set( 'orderby', 'meta_value' );
	}

	if ( 'participation_useremail' == $orderby ) {
		$query->set( 'meta_key', 'participation_useremail' );
		$query->set( 'orderby', 'meta_value' );
	}
}
// add_action( 'pre_get_posts', 'participation_orderby' );

