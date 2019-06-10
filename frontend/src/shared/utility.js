export const wrapUrl = path => {
    if( path.includes('http')){
        return path;
    } else {
        return ('http://127.0.0.1:8000' + path);
    }
};