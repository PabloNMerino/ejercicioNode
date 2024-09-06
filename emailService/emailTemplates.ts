
 export const createRegistrationEmail = (name: string): string => {

    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a [Tu Aplicación]</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                color: #333;
            }
            .content p {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            }
            .footer {
                background-color: #f4f4f4;
                text-align: center;
                padding: 10px 0;
                color: #888;
                font-size: 12px;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <div class="header">
                <h1>Bienvenido a [Tu Aplicación]</h1>
            </div>
            <div class="content">
                <h2>Hola, ${name}!</h2>
                <p>
                    Gracias por registrarte en <strong> nuestro Ecommerce</strong>. Estamos muy contentos de tenerte con nosotros.
                    Aquí podrás explorar todas nuestras funcionalidades y aprovechar al máximo todo lo que tenemos para ofrecer.
                </p>
                <p>
                    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                </p>
                <a href="#" class="button">Ir a la aplicación</a>
            </div>
            <div class="footer">
                <p>© 2024 Ecommerce. Todos los derechos reservados.</p>
            </div>
        </div>

    </body>
    </html>`
    }


