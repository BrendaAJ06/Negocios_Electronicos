<?php
header('Content-Type: text/html; charset=utf-8');
session_start();
require_once('CRUD-PROD-master.php');

$master = new Master();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['id']) && is_numeric($_POST['id']) && $_POST['id'] > 0) {
        $save = $master->update_json_data();
    } else {
        $save = $master->insert_to_json();
    }
    
    if (isset($save['status'])) {
        if ($save['status'] == 'success') {
            if (isset($_POST['id']) && is_numeric($_POST['id']) && $_POST['id'] > 0)
                $_SESSION['msg_success'] = 'Se ha agregado un nuevo miembro al archivo JSON con éxito';
            else
                $_SESSION['msg_success'] = 'Los detalles del miembro se han actualizado en el archivo JSON con éxito';
            header('location: ./');
            exit;
        }
    } else {
        $_SESSION['msg_error'] = 'Los detalles no se pudieron guardar debido a algún error del sistema.';
    }
}

$data = $master->get_data(isset($_GET['id']) ? $_GET['id'] : '');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Productos</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js"
        integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>

    <style>
        html,
        body {
            min-height: 100%;
            width: 100%;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger bg-gradient">
        <div class="container">
            <a class="navbar-brand" href="CRUD-PROD-index.php">CRUD DE PRODUCTOS</a>
            <div>
                <a href="https://www.configuroweb.com/46-aplicaciones-gratuitas-en-php-python-y-javascript/#Aplicaciones-gratuitas-en-PHP,-Python-y-Javascript"
                    class="text-light fw-bolder h6 text-decoration-none" target="_blank">Essentia</a>
            </div>
        </div>
    </nav>
    <div class="container px-5 my-3">
        <h2 class="text-center">Formulario de Ingreso de Productos</h2>
        <div class="row">
            <!-- Contenedor de contenido de página -->
            <div class="col-lg-10 col-md-11 col-sm-12 mt-4 pt-4 mx-auto">
                <div class="container-fluid">
                    <!-- Sesión de formulario de manejo de mensajes -->
                    <?php if (isset($_SESSION['msg_success']) || isset($_SESSION['msg_error'])): ?>
                        <?php if (isset($_SESSION['msg_success'])): ?>
                            <div class="alert alert-success rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1">
                                        <?= $_SESSION['msg_success'] ?>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()"
                                            class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_success']); ?>
                        <?php endif; ?>
                        <?php if (isset($_SESSION['msg_error'])): ?>
                            <div class="alert alert-danger rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1">
                                        <?= $_SESSION['msg_error'] ?>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()"
                                            class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_error']); ?>
                        <?php endif; ?>
                    <?php endif; ?>
                    <!--FIN de la Sesión del Formulario de Manejo de Mensajes -->

                    <div class="card rounded-0 shadow">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">CRUD PHP con datos en JSON
                                </div>
                                <div class="col-atuo">
                                    <button class="btn btn-danger btn-sm btn-flat" id="add"><i
                                            class="fa fa-plus-square"></i> Agregar Producto</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <?php if (isset($data->id)): ?>
                                    <p class="text-muted"><i>Actualizar los detalles de <b>
                                                <?= isset($data->name) ? $data->name : '' ?>
                                            </b></i></p>
                                <?php else: ?>
                                    <p class="text-muted"><i>Agregar Nuevo Producto</b></i></p>
                                <?php endif; ?>
                                <form id="product-form" action="" method="POST">
                                    <input type="hidden" name="id" value="<?= isset($data->id) ? $data->id : '' ?>">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nombre del Producto</label>
                                        <input type="text" class="form-control rounded-0" id="name" name="name"
                                            required="required" value="<?= isset($data->name) ? $data->name : '' ?>">
                                    </div>
                                    <div class="mb-3">
                                        <label for="marca" class="form-label">Marca del producto</label>
                                        <input type="text" class="form-control rounded-0" id="contact" name="marca"
                                            required="marca" value="<?= isset($data->marca) ? $data->marca : '' ?>">
                                    </div>
                                    <div class="mb-3">
                                        <label for="foto" class="form-label">Foto del producto</label>
                                        <input type="text" class="form-control rounded-0" id="foto" name="foto"
                                            required="required" value="<?= isset($data->foto) ? $data->foto : '' ?>">
                                        <?php if (isset($data->foto) && !empty($data->foto)): ?>
                                            <a href="<?= htmlspecialchars($data->foto) ?>" target="_blank">Ver Foto</a>
                                        <?php endif; ?>
                                    </div>
                                    <div class="mb-3">
                                        <label for="precio" class="form-label">Precio del producto</label>
                                        <input type="number" step="0.01" class="form-control rounded-0" id="precio"
                                            name="precio" required="precio"
                                            value="<?= isset($data->precio) ? number_format($data->precio, 2, '.', '') : '' ?>">
                                    </div>  
                                    <div class="mb-3">
                                        <label for="descCorta" class="form-label">Descripcion corta del producto</label>
                                        <textarea rows="3" class="form-control rounded-0" id="descCorta"
                                            name="descCorta"
                                            required="descCorta"><?= isset($data->descCorta) ? $data->descCorta : '' ?></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="descLarga" class="form-label">Descripcion larga del producto</label>
                                        <textarea rows="3" class="form-control rounded-0" id="descLarga"
                                            name="descLarga"
                                            required="descLarga"><?= isset($data->descLarga) ? $data->descLarga : '' ?></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="Link" class="form-label">Link del producto</label>
                                        <textarea rows="3" class="form-control rounded-0" id="link" name="link"
                                            required="required"><?= isset($data->link) ? htmlspecialchars($data->link) : '' ?></textarea>

                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-danger rounded-0" form="product-form" type="submit">
                                <i class="fa-solid fa-save"></i> Guardar Usuario
                            </button>
                            <a class="btn btn-light border rounded-0" href="CRUD-PROD-index.php">
                                <i class="fa-solid fa-times"></i> Cancelar
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Contenedor de contenido de fin de página -->
        </div>
    </div>
</body>

</html>
