ejecutar npm run dev
abrir ruta en https://my.local.host:50000/

<!-- | -- Recomendaciones -- | -->
<!-- HACER CLIC AL CARGAR LA PÁGINA POR PRIMERA VEZ -->
-- Se necesita establecer un certificado ssl para localhost y un alias para localhost
**SSL y Alias para localhost **

**Alias**
abrir bloc de notas cómo administrador -> dar clic en archivo -> abrir -> Ir a la ruta C:\Windows\System32\drivers\etc\ -> abrir el archivo hosts y colocar lo siguiente 127.0.0.1 my.local.host -> Guardar y cerrar

------------------
**SSL** | Alternativamente puedes seguir este video https://www.youtube.com/watch?v=PttqtI8ml3E
**Abrir PowerShell cómo admin, colocar lo siguiente y dar enter: **New-SelfSignedCertificate -Subject "localhost" -TextExtension @("2.5.29.17={text}DNS=localhost&IPAddress=127.0.0.1&IPAddress=::1")

- Habilitar internet information services con ftp en panel de control -> Programas y caracteristicas -> Activar o desactivar caracteristicas de windows y abrirlo
- Default Web SIte -> bindings -> add -> https -> SSL cert: localhost
- Abrir mmc -> WIN + R -> mmc.exe
- File -> agregar o quitar complemento
- Certificate -> all computer -> ok
- Copiar archivo con CTRL + C y CTRL +V localhost de Personal/localhost a certificate to trusted root certificates y cerrar sin guardar
- iisreset /restart **en Powershell.**

DialogFlow TEST
{
    "languageCode": "es-CO",
    "queryText": "hola",
    "sessionId": "12312sgsdfg"
}