
CREATE DATABASE IF NOT EXISTS escola;

USE escola;

CREATE TABLE departamento(
    dept_codigo INT NOT NULL AUTO_INCREMENT,
    dept_nome VARCHAR(100) NOT NULL,
    dept_descricao VARCHAR(255),
    dept_localizacao VARCHAR(100),
    dept_responsavel VARCHAR(100),
    dept_telefone VARCHAR(20),
    CONSTRAINT pk_departamento PRIMARY KEY(dept_codigo)
);

CREATE TABLE funcionario(
    func_codigo INT NOT NULL AUTO_INCREMENT,
    func_nome VARCHAR(100) NOT NULL,
    func_cargo VARCHAR(100),
    func_salario DECIMAL(10,2),
    func_dataAdmissao DATE,
    func_departamento INT,
    CONSTRAINT pk_funcionario PRIMARY KEY(func_codigo),
    CONSTRAINT fk_departamento FOREIGN KEY(func_departamento) REFERENCES departamento(dept_codigo)
);