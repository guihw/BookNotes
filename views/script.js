const btnCriar = document.querySelector("div.btn-criar button");
const modal = document.querySelector("dialog");
const btnClose = document.querySelector("dialog form button.close");;

btnCriar.onclick = function(){
    modal.showModal()
}

btnClose.onclick = function(){
    modal.close();
}

