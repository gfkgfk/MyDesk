function handler (commandLine, terminal, cancelToken, resolve, page) {
    switch (commandLine.toUpperCase()) {
        case 'HELP':
            terminal.writeLine('****help document****')
            terminal.writeLine('help: show help info')
            terminal.writeLine('login: user login')
            resolve();
            break;
        case 'LOGIN':
            terminal.writeLine('login...')
            page.$router.push('/login');
            resolve();
            break;
        case 'CONSOLE':
            terminal.writeLine('console...')
            page.$router.push('/console');
            resolve();
            break;
        case 'DOWNLOAD':
            terminal.writeLine('downloading...')
            page.download()
            resolve();
            break;
        default:
            terminal.writeLine('unknown command')
            resolve();
            break;
    }
}
export default {
    handler

}