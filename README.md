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

- To mark a css file as a module use the syntax of `import style from "styleFile.module.scss"`

### Edit And Rename .env-example

All services expect to read env variables from .env.dev file. Please make sure you review the example and change the name to env.dev. AND that your gitignore handles env files before you commit super secret stuff to a public repo.

### Useful Commands

Build containers. Add -up flag to bring services up after build.

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

I can barely spell CORS, let alone decode all of the issues trying to get Cross-Origin Resource Sharing to work. Using NGINX to redirect/proxy requests/responses to/from the correct container/service/ports helps make your browser happy. And it simulates real world infrastructure as a bonus. This is an idea I picked up from the good folks at testdriven.io and I liked it enough to make it work(I think). So...

Please make all requests from your browser through http://localhost:8080 and NGINX will happily redirect the request and proxy all your services so your browser thinks it's all one and the same protocol/domain/port == CORS bliss.

## How to start developing in VSCode

1. Install the [Docker extensions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
2. Start the containers with `docker-compose up`
3. Open the Docker extension sidebar
4. Right click on the container you want to do development in
5. Select `Attach Visual Studio Code`
![](docs/vscode-docker-remote-tut.png)
