var $form = $('#formulario'), 
	$titulo = $('#titulo'), 
	$url = $('#url'),	
	$lista = $('#contenido'), 
	$primerPost = $('.item').first();
	
if(localStorage.getItem('autosave')){
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'))
}

function mostrarOcultarFormulario(tito){
	tito.preventDefault();
	$form.slideToggle();
	$lista.slideToggle();
}

var id = setInterval(function(){
	sessionStorage.setItem('titulo',$titulo.val());
	sessionStorage.setItem('url',$url.val());
},1000)

function agregarPost(e){
	e.preventDefault();
	var url = $url.val(), 
		titulo = $titulo.val(),
		$clone = $primerPost.clone();//Representacion identica del objeto
	
	$clone.find('.titulo_item a').
		text(titulo).
		attr('href',url);
	
	$clone.hide();	
	
	$lista.prepend($clone); // Agregar un contenido de primero en el elemento
	mostrarOcultarFormulario();
	$titulo.val('');
	$url.val('');
	$clone.slideDown();
}

//Eventos
$('#publicar_nav a').click(mostrarOcultarFormulario);
$('#formulario').on('submit', agregarPost);