<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Chat App</title>
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<style type="text/css" media="screen">
		body {
			background-color: #202b3f;	
		}
		.list-group{
			overflow-y: scroll;
			height: 250px;
			background-color: rgba(30, 30, 68, 0.58);
		}
		[v-cloak] {
		  display: none;
		}
	</style>
</head>
<body>
	
	<nav class="navbar navbar-light bg-light justify-content-between">
	  <a class="navbar-brand">Chat App</a>
	  <div class="navbar-nav">
		   <a class="nav-item nav-link" href="{{ route('logout') }}"
		        onclick="event.preventDefault();
		                 document.getElementById('logout-form').submit();">
		       ( {{Auth::user()->name}} ) - Cerrar Sesion
		    </a>
	   </div>
	    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
	        {{ csrf_field() }}
	    </form>
	</nav>

	<div class="container-fluid">
		<div style="margin-top: 50px;" id="app">
			<div class="row justify-content-center ">
				<h5 class="list-group-item active col-6">Chat en tiempo real
					<span v-cloak style="float: right" class="badge badge-pill badge-danger">
						Conectados : @{{numberOfUsers}}
					</span>
			    </h5>
			</div>
			<br>
			<div class="row justify-content-center">
				<div v-cloak class="badge badge-pill badge-info col-4">
					<p v-if="typing != ''" style="font-size: medium;padding-top: 5px;"> @{{ typing }} </p>
				</div>
			</div>
			<div class="row justify-content-center">
				<ul v-cloak class="list-group col-6" v-chat-scroll>
				  <message v-for="value,index in chat.message" 
				  :key=value.index 
				  :color="chat.color[index]"
				  :user="chat.user[index]"
				  :time="chat.time[index]"> 
				  	@{{value}} 
				  </message>
				</ul>
			</div>

			<div class="row justify-content-center">
				 <input @keyup.enter="send()" v-model="message" type="text" class="form-control col-6" placeholder="Escribe un mensaje...">
			</div>

		</div>
	</div>

	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>