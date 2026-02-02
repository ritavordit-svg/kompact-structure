const redirectionFromMail = function (body, link){
    return `
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Aftom</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }

                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }
            .parent-table {
                border-collapse:collapse;
                border-spacing: 0;
                border: 0;
                table-layout:fixed;
                min-width:100%;
                width:100%!important;
                color:#0a0836;
                font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
                font-size:14px;
                line-height:1.5;
                margin:0;
                padding:0;
                background-color: #f6fafb;
            }
            tr {
                padding:0
            }
            .logo {
                max-width:100%;
                outline:none;
                text-decoration:none;
                vertical-align:middle;
                border:none;
                height: 62px;
            }
        </style>
    </head>
    <body>
        <table class="parent-table" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td align="center" valign="top" style="border-collapse:collapse!important;word-break:break-word;min-width:100%;width:100%!important;margin:0;padding:20px 10px 30px">
                        <table border="0" cellpadding="0" cellspacing="0" width="580" style="border-collapse:collapse;border-spacing:0;table-layout:auto;border-radius:10px;padding:0" bgcolor="#fff">
                            <tbody>
                                <tr>
                                    <td align="left" valign="top" style="border-collapse:collapse!important;word-break:break-word;padding:30px 40px">
                                        <p style="font-size:14px;padding-bottom:20px;margin:0">
                                         ${body} 
                                        </p>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;table-layout:auto;padding:0">
                                            <tbody>
                                                <tr>
                                                    <td align="center" valign="middle" style="border-collapse:collapse!important;word-break:break-word;padding:30px 0 30px">
                                                        <a href="${link}"
                                                            style="cursor:pointer; border-radius: 10px;padding: 10px 20px 10px;color:#fff!important;display:block;font-size:15px;font-weight:700;text-decoration:none;background-color:#253d98;"
                                                            tagret="_blank">
                                                            Click here to view project
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    `;
}
module.exports = redirectionFromMail