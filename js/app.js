$(document).ready(function () {
  // READ get
  getData();
  //// elimina
  $(document).on("click", ".elimina", function () {
    var id = $(this).parent().attr("data-id");
    console.log(id);
    cancella(id);
  });
  ///PUT UPDATE
  $(document).on("click", ".modifica", function () {
    var id = $(this).parent().attr("data-id");
    var input = $(this).siblings(".input_modifica");
    var lettersNumber = /^[0-9a-zA-Z]+$/;
    var valore = input.val();
    if (valore.match(lettersNumber)) {
      modificadato(id, valore);
    }
  });

  /// inserisci
  $(".invia").click(invia);
  /// keypress
  $(document).on("keypress", function (e) {
    if (e.which == 13) {
      invia();
    }
  });
  $(document).on("click", ".datas_item", function () {
    $(this).children(".input_modifica").removeClass("hidden");
    $(this).children(".modifica").removeClass("nascosto");
  });
  // doppio click rimuove l'imput di modifica
  $(document).on("dblclick", ".datas_item", function () {
    $(this).children(".input_modifica").addClass("hidden");
    $(this).children(".modifica").addClass("nascosto");
  });
});
/// chiamta api per ottenere la lista
function invia() {
  var lettersNumber = /^[0-9a-zA-Z]+$/;
  var item = $(".input-top").val();
  if (item.match(lettersNumber)) {
    insert(item);
  }
}
function getData() {
  $.ajax({
    url: "http://157.230.17.132:3004/todos",
    method: "GET",
    success: function (risposta) {
      appenddata(risposta);
    },
    error: function () {
      alert("error");
    },
  });
}
// function cancella
function cancella(id) {
  $.ajax({
    url: "http://157.230.17.132:3004/todos/" + id,
    method: "DELETE",
    success: function (risposta) {
      $(".datas").empty();
      getData();
    },
    error: function () {
      alert(
        "Errore 404 di connessione al server operazioni di crud non disponibili"
      );
    },
  });
}
function modificadato(id, input) {
  $.ajax({
    url: "http://157.230.17.132:3004/todos/" + id,
    method: "PUT",
    data: {
      text: input,
    },
    success: function () {
      $(".datas").empty();
      getData();
    },
    error: function () {
      alert(
        "Errore 404 di connessione al server operazioni di crud non disponibili"
      );
    },
  });
}
//// function inserisci
function insert(item) {
  $.ajax({
    url: "http://157.230.17.132:3004/todos/",
    method: "POST",
    data: {
      text: item,
    },
    success: function () {
      $(".datas").empty();
      getData();
    },
    error: function () {
      alert(
        "Errore 404 di connessione al server operazioni di crud non disponibili"
      );
    },
  });
}
/////funzione per appendere
function appenddata(risposta) {
  var source = $("#template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < risposta.length; i++) {
    var context = {
      id: risposta[i].id,
      item: risposta[i].text,
    };
    var html = template(context);
    $(".datas").append(html);
  }
}
