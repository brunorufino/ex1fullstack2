import FuncionarioDAO from "../Persistencia/funcionarioDAO.js";
import CategoriaDAO from "../Persistencia/funcionarioDAO.js";
//não esqueça do .js no final da importação

export default class Categoria {
    //definição dos atributos privados
    #func_codigo;
    #func_nome;
    #func_cargo;
    #func_salario;
    #func_dataAdmissao;
    #func_departamento;

    constructor(codigo=0, nome="",cargo="",salario=0.00,dataAdmissao='10/10/1990', departamento ){
        this.#func_codigo = codigo;
        this.#func_nome = nome;
        this.#func_cargo = cargo;
        this.#func_salario = salario;
        this.#func_dataAdmissao = dataAdmissao;
        this.#func_departamento = departamento;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#func_codigo;
    }

    set codigo(novoCodigo){
        this.#func_codigo = novoCodigo;
    }

    get nome(){
        return this.#func_nome;
    }

    set nome(novoNome){
        this.#func_nome = novoNome;
    }

    
    get cargo(){
        return this.#func_cargo;
    }

    set cargo(novoCargo){
        this.#func_cargo = novoCargo;
    }

    get salario(){
        return this.#func_salario;
    }

    set salario(novoSalario){
        this.#func_salario = novoSalario;
    }
    
    get dataAdmissao(){
        return this.#func_dataAdmissao;
    }

    set dataAdmissao(novaData){
        this.#func_dataAdmissao = novaData;
    }
    
    get departamento(){
        return this.#func_departamento;
    }

    set departamento(novoDepartamento){
        this.#func_departamento = novoDepartamento;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#func_codigo,
            nome:this.#func_nome,
            cargo:this.#func_cargo,
            salario:this.#func_salario,
            dataAdmissao:this.#func_dataAdmissao,
            departamento:this.#func_departamento
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.gravar(this);
    }

    async excluir(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.excluir(this);
    }

    async atualizar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.atualizar(this);

    }

    async consultar(parametro){
        const funcDAO = new FuncionarioDAO();
        return await funcDAO.consultar(parametro);
    }
}