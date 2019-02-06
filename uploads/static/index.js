firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    document.getElementById("user_div").style.display="block";
    document.getElementById("login_div").style.display="none";

    var user = firebase.auth().currentUser;

    if(user != null){
    	var email_id = user.email;
    	var email_verified = user.emailVerified;

    	if(email_verified){
    		document.getElementById("verify_btn").style.display = "none";
        document.getElementById("nao_verificado").style.display = "none";
        


    	}else{
    		document.getElementById("verify_btn").style.display = "block";
        document.getElementById("solicitar_btn").style.display = "none";
        document.getElementById("nao_verificado").style.display = "block";



    	}

    	//document.getElementById("user_para").innerHTML = "Seu email é: " +email_id +
    	  //                                                    "<br/>Verificado : " +email_verified;
    }


  } else {
  	document.getElementById("user_div").style.display="none";
    document.getElementById("login_div").style.display="block";
  }
});


function login(){

	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error: " + errorMessage );

  // ...
});

}

function create_account(){
	var userEmail = document.getElementById("newemail_field").value;
	var userPass = document.getElementById("newpassword_field").value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error: " + errorMessage );
  document.getElementById("cadastro_div").style.display = "none";
  document.getElementById("login_div").style.display="block";
  document.getElementById("suporte_div").style.display = "none";

  // ...
});

}

function send_verification(){

	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {

		window.alert("Verificação de e-mail enviada")
	  // Email sent.
	}).catch(function(error) {

		window.alert("Erro: " +error.message);

	  // An error happened.
	});

}

function logout(){

		firebase.auth().signOut();
}

function enviar_solicitacao(){
  document.getElementById("suporte_div").style.display = "block";
  document.getElementById("user_div").style.display="none";


}

function register_account(){
  document.getElementById("cadastro_div").style.display = "block";
  document.getElementById("login_div").style.display="none";

}

function backtofirstpage(){ 
  document.getElementById("login_div").style.display = "block";
  document.getElementById("cadastro_div").style.display = "none";

}

function backtouserpage(){
  document.getElementById("suporte_div").style.display = "none";
  document.getElementById("user_div").style.display="block";
}

function backtonewpostpage(){
  document.getElementById("preview_div").style.display = "none";
  document.getElementById("suporte_div").style.display="block";
}

function viewmysettings(){
  window.alert("Disponível em breve.");
}

function viewmyposts(){
  window.alert("Disponível em breve.");
}

function register_account_pessoal(){
  window.alert("Disponível em breve.");
}

function previewpost(){

  document.getElementById("suporte_div").style.display = "none";
  document.getElementById("preview_div").style.display = "block";

  var marcaVeiculo = document.getElementById("marca").value;
  var modeloVeiculo = document.getElementById("modelo").value;
  var anoVeiculo = document.getElementById("anodoveiculo").value;
  var quilometragemVeiculo = document.getElementById("marca").value;
  var motorVeiculo = document.getElementById("motor").value;
  var corVeiculo = document.getElementById("cor").value;
  var combustivelVeiculo = document.getElementById("combustivel").value;
  var valorVeiculo = document.getElementById("valor").value;
  var responsavelVeiculo = document.getElementById("responsavel").value;
  var celularVeiculo = document.getElementById("celular").value;
  var cambioVeiculo = document.getElementById("cambio").value;
  var direcaoVeiculo = document.getElementById("direcao").value;

  document.getElementById("preview_marca").innerHTML = "Veículo: " + marcaVeiculo + " " + modeloVeiculo;
  document.getElementById("preview_ano").innerHTML = "Ano: " + anoVeiculo;
  document.getElementById("preview_quilometragem").innerHTML = "Quilometragem: " + quilometragemVeiculo;
  document.getElementById("preview_motor").innerHTML = "Motor: " + motorVeiculo;
  document.getElementById("preview_cor").innerHTML = "Cor: " + corVeiculo;
  document.getElementById("preview_combustivel").innerHTML = "Combustível: " + combustivelVeiculo;
  document.getElementById("preview_cambio").innerHTML = "Câmbio: " + cambioVeiculo;
  document.getElementById("preview_direcao").innerHTML = "Direção: " + direcaoVeiculo;
  document.getElementById("preview_valor").innerHTML = "Valor: R$ " + valorVeiculo;
  document.getElementById("preview_responsavel").innerHTML = "Responsável pelo Veículo: " + responsavelVeiculo;
  document.getElementById("preview_telefone").innerHTML = "Contato: " + celularVeiculo;

}



