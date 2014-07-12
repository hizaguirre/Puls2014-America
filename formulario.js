var $form = $('#formulario'), $titulo = $('#titulo'), $url = $('#url'),
$button = $('#mostrar-form'), $list = $('#contenido'), $post = $('.item').first();

function mostrarFormulario(){
	$form.slideToggle()
	return false;
}

function agregarPost(/*e*/){
	//e.target ->Elemento que disparo el evento
	var url = $url.val(), 
		titulo = $titulo.val(),
		$clone = $post.clone();//Representacion identica del objeto
	
	$clone.find('.titulo_item a').text(titulo).attr('href',url);
	
	$clone.hide();	
	
	$list.prepend($clone); // Agregar un contenido de primero en el elemento
	
	$clone.fadeIn();
	
	return false;
}

//Eventos
$button.click(mostrarFormulario)
$form.on('submit', agregarPost);