# Web Client

## Executando projeto
### Na raiz do projeto realizar o comando:

```yarn ```

### Subindo a aplicação:

```yarn dev```


### Domain:
- Os contextos e hooks react são implementados dentro de suas respecitivas parastas
- models: responsável por manter uma interface que represente o domínio
- services: responsavel por manter a interface de um serviço(arquivos terminados com "Skeleton");
- services/implementations: Implementação a interface Skeleton


### Infra:

- A camada mais externa da aplicação(usada para ORM's, clientes http, sockets e etc);

### main/factories:

- Responsável um componente que represente uma página da aplicação. Em factories instanciamos e repassamos implementações necessárias para uma página functionar;

### Shared:
- Responsável por manter hooks, contextos, componentes e demais estruturas compartilhadas entre vários domínios

### Presentation:

- A camada mais negocial da aplicação onde toda a lógica do componente é desenvolvida

### Pages:
- Pasta nativa next, responsável por manter as rotas da aplicação e implementações de server-side


## Documentação sobre commits:

https://www.conventionalcommits.org/en/v1.0.0/




