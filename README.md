# Kurstudet V2

Initially created for "Kurzemes Inovaciju Granti Studentiem" project.

A website to help people navigate the scape of universities in Latvia.

## Main Frameworks/Libraries/Packages

Please see requirements.txt, package.json, Cargo.toml for full details.

Django

- Django v3 series
- Django Rest Framework
- Django Rest Framework Simple JWT
- PyTest

React

- Create React App
- Node dev server via Docker LTS alpine image
- Hot reload
- TypeScript/ESlint with very opinionated rules
- SASS support
- WebAssembly support
- Integration with the Rust-Wasm module

Postgress

- Docker v12.0 alpine image

Ngnix

- Docker stable alpine
- See conf for details. Serves Django's static and media files as well.

Rust

- Compilation on code change straight to WASM with all type definitions
- Rust 2018 edition
- wasm-bindgen for WEB APIs

## Notes

React

- To mark a css file as a module use the syntax of
  `import style from "styleFile.module.scss"`

### Useful Commands

Build containers

```sh

$> docker-compose build

```

Bring containers up. Add -d flag to run output detached from current shell.

```sh

$> docker-compose up

```

Bring containers down. Add -v flag to also delete named volumes

```sh

$> docker-compose down

```

View logs by service name.

```sh

$> docker-compose logs <service-name>

```

Enter shell for specified container (must be running)

```sh

$> docker exec -it <container-name> sh

```

### Containers, Services and Ports

| Container  | Service | Host Port | Docker Port |
| ---------- | ------- | --------- | ----------- |
| dev-django | django  | 8001      | 8000        |
| dev-react  | react   | 3001      | 3000        |
| dev-db     | db      | 5432      | 5432        |
| dev-nginx  | nginx   | 8080      | 80          |
| dev-rust   | rust    |           |             |

### Why NGINX for local dev

Please make all requests from your browser through http://localhost:8080 and
NGINX will happily redirect the request and proxy all your services so your
browser thinks it's all one and the same protocol/domain/port == CORS bliss.

## How to start developing in VSCode

1. Install the
   [Docker extensions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
   and
   [Remote container development extensions](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Install [Docker](https://docs.docker.com/engine/install/) and
   [docker-compose](https://docs.docker.com/compose/install/)
3. Start the containers with `docker-compose up`
4. Open the Docker extension sidebar
5. Right click on the container you want to do development in
6. Select `Attach Visual Studio Code`
   ![Tutorial on what to click](docs/vscode-docker-remote-tut.png)
