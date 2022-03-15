import React, { useEffect, useState } from "react";
import './App.css';
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from 'axios';


const mudaCor1 = () => {
  document.getElementById("bruto").style.background = "#ed8e53";
  document.getElementById("bruto").style.color = "#fff";

}

const mudaCor2 = () => {
  document.getElementById("liquido").style.background = "#ed8e53";
  document.getElementById("liquido").style.color = "#fff";

}

const mudaCor3 = () => {
  document.getElementById("pos").style.background = "#ed8e53";
  document.getElementById("pos").style.color = "#fff";
}
const mudaCor4 = () => {
  document.getElementById("pre").style.background = "#ed8e53";
  document.getElementById("pre").style.color = "#fff";
}
const mudaCor5 = () => {
  document.getElementById("fixado").style.background = "#ed8e53";
  document.getElementById("fixado").style.color = "#fff";
}


function chama_Api() {

  var cheked = document.getElementsByName('Cheked');

  //Mudando a cor do Button
  document.getElementById("simular").style.background = "#ed8e53";

  //Passando valores dos campos para inteiros
  var aporteInicial = parseInt(document.getElementById("aporte_inicial").value);
  var aporteMensal = parseInt(document.getElementById("aporte_mensal").value);
  var rentabilidade = parseInt(document.getElementById("rentabilidade").value);

  //Validando Campos
  if (isNaN(aporteMensal)) {

    document.getElementById("aporte_label_mensal").style.color = "red";
    let validacion = document.getElementById('validar_mensal');
    validacion.innerHTML = `<p>Aporte deve ser em número</p>`
    if (isNaN(aporteInicial)) {

      document.getElementById("aporte_label_inicial").style.color = "red";
      let validacion = document.getElementById('validar_inicial');
      validacion.innerHTML = `<p>Aporte deve ser em número</p>`


    } if (isNaN(rentabilidade)) {

      document.getElementById("rentabilidade_label").style.color = "red";
      let validacion = document.getElementById('validar_rentabilidade');
      validacion.innerHTML = `<p>Rentabilidade deve ser em número</p>`


    }


  }
  //Recebendo e selecionando qual chekBox foi selecionado para passar a URL
  else {


    for (var i = 0; i < cheked.length; i++) {
      if (cheked[i].checked) {

        if (cheked[i].value == "pre") {
          var rendimento_chekde = "pre";
        }
        else if (cheked[i].value == "bruto") {
          var tipo_rendimento = "bruto";

        }
        if (cheked[i].value == "pos") {
          var rendimento_chekde = "pos";
        }
        else if (cheked[i].value == "bruto") {
          var tipo_rendimento = "bruto";

        }

        if (cheked[i].value == "fixado") {
          var rendimento_chekde = "ipca";
        }
        else if (cheked[i].value == "bruto") {
          var tipo_rendimento = "bruto";

        }
        if (cheked[i].value == "pre") {
          var rendimento_chekde = "pre";
        }
        else if (cheked[i].value == "liquido") {
          var tipo_rendimento = "liquido";

        }

        if (cheked[i].value == "pos") {
          var rendimento_chekde = "pos";
        }
        else if (cheked[i].value == "liquido") {
          var tipo_rendimento = "liquido";

        }
        if (cheked[i].value == "fixado") {
          var rendimento_chekde = "ipca";
        }
        else if (cheked[i].value == "liquido") {
          var tipo_rendimento = "liquido";

        }

      }
    }
    //Recebendo os valores das variaves na seleção e passando para a URL
    var url = ("http://localhost:3000/simulacoes?tipoIndexacao=" + rendimento_chekde + "&tipoRendimento=" + tipo_rendimento);

    //Recebendo dados da API e retornando para a função
    fetch(url).then(function (response) {
      response.json().then(function (data) {
        console.log(data[0]['graficoValores']['comAporte']);
        mostrar(data[0]);

      })

    })
  }


}

//Mostrando os dados da API e exibindo-os no card
function mostrar(dados) {
  let result = document.getElementById('div');
  result.innerHTML = `<div style=" width: 48%;height: 520px; margin-left: 40%; align-itens: left; flex-direction: row;">
                        <h4 style="text-align: left; margin-top: 0%;" >Resultado da Simulação</h4>
                          
                        <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 0%; height: 18%; ">

                            <p style="font-size: 15pt; font-weight: bold;"> Valor Final Bruto</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%"> R$ ${new Intl.NumberFormat().format(dados.valorFinalBruto)}</p>
                          </div>

                          <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 36%; height: 18%;margin-top:-14.8%; ">

                            <p style="font-size: 15pt; font-weight: bold;"> Aliquota do IR</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%"> ${new Intl.NumberFormat().format(dados.aliquotaIR)} %</p>
                          </div>

                          <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 72%; height: 18%;margin-top:-14.8%; ">

                            <p style="font-size: 15pt; font-weight: bold;"> Valor Pago em IR</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%"> R$${new Intl.NumberFormat().format(dados.valorPagoIR)} </p>
                          </div>

                          <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 0%; height: 18%; margin-top: 5%; float: left ">

                            <p style="font-size: 15pt; font-weight: bold; margin-top: 1%;"> Valor Final Líquido</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%; color: green;"> R$ ${new Intl.NumberFormat().format(dados.valorFinalLiquido)}</p>
                          </div>

                          <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 36%; height: 18%;margin-top: 5%; ">

                            <p style="font-size: 15pt; font-weight: bold;"> Valor Total Investido</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%"> R$ ${new Intl.NumberFormat().format(dados.valorTotalInvestido)} </p>
                          </div>

                          <div style="background-color:#efefef; -webkit-box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); 
                          box-shadow: 0px 3px 11px 2px rgba(0,0,0,0.28); border-radius: 2px 2px 2px 2px ; 
                            width: 35%; margin-left: 72%; height: 18%;margin-top:-14.8%; ">

                            <p style="font-size: 15pt; font-weight: bold;"> Ganho Líquido</p>  
                            <p style="font-size: 15pt; font-weight: normal; margin-top: 10%; color: green;"> R$ ${new Intl.NumberFormat().format(dados.ganhoLiquido)} </p>
                          </div>

                          
                                                 
                      </div>`



}



function App() {

  //Buscando dados na API do IPCA
  const [pca, setPCA] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/indicadores?nome=ipca")
      .then((response) => {
        setPCA(response.data)
      }).catch(() => {
        console.log("Erro!!")
      })


  }, [])

  //Buscando dados na API do CDI
  const [cdi, setCdi] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/indicadores?nome=cdi")
      .then((response) => {
        setCdi(response.data)
      }).catch(() => {
        console.log("Erro!!")
      })


  }, [])


  return (


    <div className="App">
      <header className="App-header">

        <h2 >Simulador de investimentos</h2>

        {pca.map((pca, key) => { // Fazendo busca na API do IPCA e CDI 

          return (

            <form>

              <div className="format-form">
                <h4 className="h4">Simulador</h4>

                <IoMdInformationCircleOutline className="format-icon" />

                <p className="format-rendimento">Rendimento</p>

                <div className="format-div-chek">
                  <label className="format-label-chek" id="bruto" value="bruto">
                    <p className="format-p-chek">Bruto</p>
                    <input className="format-input-chek" name="Cheked" type="checkbox" value="bruto" onClick={() => mudaCor1()} ></input>
                  </label>



                  <label className="format-label-chek2" id="liquido" value="liquido">
                    <p className="format-p-chek">Liquido</p>
                    <input className="format-input-chek" name="Cheked" type="checkbox" value="liquido" onClick={() => mudaCor2()}></input>
                  </label>
                </div>

                <label id="aporte_label_inicial" name="aporte_label_inicial" >
                  Aporte inicial:
                  <input type="text" name="aporte_inicial" id="aporte_inicial" />
                  <p id="validar_inicial" name="validar_inicial" ></p>
                </label>

                <label>
                  Prazo(em meses):
                  <input type="text" name="Prazo" />
                </label>

                <label>
                  IPCA(ao ano):
                  <input type="text" value={pca.valor + " %"} name="IPCA" />

                </label>
                <button type="submit" value="Limpar Campos" className="format-button" >Limpar Campos</button>
              </div>

              <div className="format-form2">

                <IoMdInformationCircleOutline className="format-icon2" />
                <p className="format-rendimento2">Tipos de indexação</p>

                {cdi.map((cdi, key) => {
                  return (
                    <div className="format-div-chek2">
                      <label className="format-label-chekpre" id="pre" value="pre">
                        <p className="format-p-chek">PRÉ</p>
                        <input className="format-input-chekpre" name="Cheked" type="checkbox" value="pre" onClick={() => mudaCor4()} ></input>
                      </label>



                      <label className="format-label-chekpos" id="pos" value="pos">
                        <p className="format-p-chekpos">PÓS</p>
                        <input className="format-input-chekpos" id="mudapos" name="Cheked" type="checkbox" value="pos" onClick={() => mudaCor3()}></input>
                      </label>



                      <label className="format-label-chekfixado" id="fixado" value="fixado">
                        <p className="format-p-chekfixado">FIXADO</p>
                        <input className="format-input-chekfixado" name="Cheked" id="fixado" type="checkbox" onClick={() => mudaCor5()} value="fixado" ></input>
                      </label>


                      <label className="format-label" name="aporte_label_mensal" id="aporte_label_mensal">
                        Aporte Mensal:
                        <input className="format-input" id="aporte_mensal" type="text" name="aporte_mensal" />
                        <p id="validar_mensal" name="validar_mensal" ></p>
                      </label>

                      <label name="rentabilidade_label" id="rentabilidade_label">
                        Rentabilidade:
                        <input type="text" name="Prazo" id="rentabilidade" name="rentabilidade" />
                        <p id="validar_rentabilidade" name="validar_rentabilidade"></p>
                      </label>

                      <label>
                        CDI(ao ano):
                        <input type="text" name="CDI" value={cdi.valor + " %"} />

                      </label>
                      <button type="button" value="simular" id="simular" className="format-button2" onClick={() => chama_Api()}>Simular</button>
                    </div>
                  )
                })}
              </div>
            </form>
          )
        })}
        <div id="div" >{/* Mostra os dados da API */}
        
        </div>
      </header >
    </div >
  );

}

export default App;
