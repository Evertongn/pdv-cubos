create database pdv;

drop table if exists usuarios; 
drop table if exists categorias;

create table usuarios (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) not null unique,
  senha varchar(255) not null
);

create table categorias (
	id serial primary key,
  descricao text
);

insert into categorias (descricao) 
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

drop table if exists produtos;
drop table if exists clientes;

create table produtos(
  id serial primary key,
  descricao text not null,
  quantidade_estoque int not null,
  valor numeric not null,
  categoria_id text not null
); 

create table clientes(
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) not null unique,
  cpf varchar(14) not null unique,
  cep varchar(9),
  rua varchar(255),
  numero integer,
  bairro varchar(255),
  cidade varchar(255),
  estado text
);

drop table if exists pedidos;
drop table if exists pedido_produto;

alter table produtos add column produto_imagem text;

create table pedidos (
  id serial primary key,
  cliente_id int not null references clientes(id),
  observacao text,
  valor_total real
);