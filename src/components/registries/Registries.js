import React from "react";

import { connect } from "react-redux";

import DataTable from "../common/DataTable";

const Registries = activities => {
  return (
    <div>
      <DataTable columns={["Oi", "Olá"]} rows={[{ a: "1", b: "2" }]} />
      <br />
      - Register working activity
      <br />
      <ol>
        <ul>
          <u>
            <b>Backlog</b>
          </u>
        </ul>
        <li>
          Colocar os tipos de atividades em "acordions" dependentes (abre um e
          fecha o outro)
        </li>
        <li>
          Colocar o botão de adicionar atividades dentro da tabela (ao lado do
          nome do tipo)
        </li>
        <li>
          Substituir a adição de atividades por um modal, com os campos, "Name"
          (obrigratory), "Started at" (optional), "Ended at" (optional) e "type
          (fixed)"{" "}
        </li>
        <li>
          Na tabela de atividades, cada linha precisa ter o nome da atividade,
          total de minutos estudados um botão para iniciar um cronômetro, outro
          para pará-lo, outro para remover a atividade e um para editá-la.{" "}
        </li>
        <li>Criar área no menu para adicionar tipos de atividades </li>
        <li>Deve exibir uma tabela para cada tipo de atividade </li>
        <li>Enviar e-mail com relatório diário</li>
        <li>
          Listar atividades por dia selecionado (inicia a tela com o dia atual)
        </li>
      </ol>
      <br />
    </div>
  );
};

const mapStateToProps = ({ activities }) => ({ data: activities });

export default connect(mapStateToProps)(Registries);
