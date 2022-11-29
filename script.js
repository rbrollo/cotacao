$(document).ready(
  $.ajax({
    url: "https://economia.awesomeapi.com.br/json/available/uniq",
    type: "get",
  }).done(function (data) {
    for (var k in data) {
      $("#moeda1").append(
        "<option value='" +
          k +
          "' title='" +
          data[k] +
          "'>" +
          data[k] +
          "</option>"
      );
      $("#moeda2").append(
        "<option value='" +
          k +
          "' title='" +
          data[k] +
          "'>" +
          data[k] +
          "</option>"
      );
    }
  })
);

function cotacao() {
  let moeda1 = $("#moeda1").val();
  let moeda2 = $("#moeda2").val();
  let qtdMoeda1 = $("#qtdMoeda1").val();
  let moedas = (moeda1 + moeda2).toUpperCase();
  $.ajax({
    url: "https://economia.awesomeapi.com.br/last/" + moeda1 + "-" + moeda2,
    type: "get",
  })
    .done(function (data) {
      $("#cotacao").html(
        "Cotacao: " +
          qtdMoeda1 +
          " " +
          data[moedas].code +
          " vale " +
          data[moedas].bid * qtdMoeda1 +
          " " +
          data[moedas].codein
      );
      $("#dthrConsulta").html(
        "Data e hora da atualização: " + data[moedas].create_date
      );
    })
    .fail(function (jqXHR, textStatus, data) {
      if (jqXHR.responseJSON.code == "CoinNotExists") {
        alert("Conversão não existe");
      } else {
        alert("Tenta novamente");
      }
    });
}

function inverter() {
  let moeda1 = $("#moeda1").val();
  let moeda2 = $("#moeda2").val();
  let moeda1Invertida = moeda2;
  let moeda2Invertida = moeda1;
  $("#moeda1").val(moeda1Invertida);
  $("#moeda2").val(moeda2Invertida);

  cotacao();
}
