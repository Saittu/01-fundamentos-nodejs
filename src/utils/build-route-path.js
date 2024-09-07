//user/:id
export function buildRoutePath(path) {
    //Quero encontrar tudo q começa com : e depois dos dois pontos tem letras de a-z que podem ser mínusculas ou A-Z maiusculas e essas letras podem se repetir uma ou mais vezes, o g a torna global para achar mais de um parametro na URL
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') //$1

    // ^ nossa string precisa começar o pathWithParams
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex


}