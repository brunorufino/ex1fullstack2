import Funcionario from "../Modelo/funcionario.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class FuncionarioDAO{
    async gravar(funcionario){
        if (funcionario instanceof Funcionario){
            const sql = "INSERT INTO funcionario(func_nome,func_cargo,func_salario,func_dataAdmissao,func_departamento) VALUES(?,?,?,?,?)"; 
            const parametros = [funcionario.nome,funcionario.cargo,funcionario.salario,funcionario.dataAdmissao,funcionario.departamento];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(funcionario){
        if (funcionario instanceof Funcionario){
            const sql = "UPDATE funcionario SET func_nome = ?, func_cargo = ?, func_salario = ?, func_dataAdmissao = ?, func_departamento = ? WHERE func_codigo = ? "; 
            const parametros = [funcionario.nome, funcionario.cargo, funcionario.salario, funcionario.dataAdmissao, funcionario.departamento, funcionario.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(funcionario){
        if (funcionario instanceof Funcionario){
            const sql = "DELETE FROM funcionario WHERE func_codigo = ?"; 
            const parametros = [funcionario.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo){
       
        let parametros=[];
      
        var condicao="";
         if(!isNaN(termo)){
                condicao = " func_nome LIKE "
         }
        else{
                condicao = " func_codigo = "
        }
        const conexao = await conectar();
        const sql = "SELECT a.func_codigo, a.func_cargo, a.func_salario, a.func_dataAdmissao , b.dept_nome  FROM funcionario a INNER JOIN departamento b ON func_departamento = dept_codigo ORDER BY func_nome";
        const [registros, campos] = await conexao.execute(sql,parametros);
        const valores = ['%' + termo +'%'];
        const [rows] = await conexao.query(sql,valores);
        let listaFuncionarios = [];

        for(const row of rows){
       
            const funcionario = new Funcionario(row['func_codigo'],row['func_nome'],row['func_cargo'],row['func_salario'],row['func_dataAdmissao'],row['dept_nome']);
            listaFuncionarios.push(funcionario);
        }



        return listaFuncionarios;
    }
}