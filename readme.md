

## React + Laravel
### Formulário de exemplo

## Pré requisitos
 - Linux
 - npm
 - php >= 7.1
 - mysql
 - composer

## Frameworks | Lib
 - React
 - Laravel 5.8
 
#### Baixando o projeto
`$ git clone https://github.com/AndreEzias/react-laravel-form.git`

`$ cd react-laravel-form`

##### Instalando dependências

`$ composer install`

`$ npm install`

## configurações

Crie um banco de dados no mysql:

`$ sudo mysql`

`> create database react_laravel_form;quit;`

Crie um arquivo de variáveis de ambiente:

`$ cp .env.example .env & nano .env`

Insira os acessos para seu banco de dados:
 
 ```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=react_laravel_form
  DB_USERNAME=<user>
  DB_PASSWORD=<password>
```

##### Building

Criar tabelas no banco:

`$ php artisan migrate`

Gerar chave da aplicação:

`php artisan key:generate`

Servir aplicação:

`$ php artisan serve`

Retornará um link local. Ex:

[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

Os arquivos enviados estarão no diretório:

`storage/app/file`
