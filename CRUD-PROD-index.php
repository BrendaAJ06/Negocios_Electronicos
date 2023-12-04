<?php
session_start();
require_once('CRUD-PROD-master.php');
$master = new Master();
$json_data = $master->get_all_data();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD DE PRODUCTOS</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>

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
            <a class="navbar-brand" href="./">CRUD PHP con datos en JSON</a>
            <div>
                <a href="paneldecontrol.html" style="color: #fff;">Volver a Inicio</a>
            </div>
        </div>
    </nav>
    <div class="container px-5 my-3">
        <h2 class="text-center">Creación, lectura, actualización y eliminación de productos de Essentia</h2>
        <div class="row">
            <!-- Page Content Container -->
            <div class="col-lg-10 col-md-11 col-sm-12 mt-4 pt-4 mx-auto">
                <div class="container-fluid">
                    <!-- Handling Messages Form Session -->
                    <?php foreach (['success', 'error'] as $msgType) : ?>
                        <?php if (isset($_SESSION["msg_$msgType"])) : ?>
                            <div class="alert alert-<?= $msgType == 'success' ? 'success' : 'danger' ?> rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1"><?= $_SESSION["msg_$msgType"] ?></div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()" class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION["msg_$msgType"]); ?>
                        <?php endif; ?>
                    <?php endforeach; ?>
                    <!--END of Handling Messages Form Session -->
                    <div class="card rounded-0 shadow">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">CRUD DE PRODUCTOS</div>
                                <div class="col-atuo">
                                    <a class="btn btn-danger btn-sm btn-flat" href="CRUD-PROD-product_form.php"><i class="fa fa-plus-square"></i> Agregar Producto</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="table-responsive">
                                    <table class="table table-stripped table-bordered">
                                        <thead>
                                            <tr>
                                                <th class="text-center">ID</th>
                                                <th class="text-center">Nombre</th>
                                                <th class="text-center">Marca</th>
                                                <th class="text-center">Foto</th>
                                                <th class="text-center">Precio</th>
                                                <th class="text-center">Descripcion Corta</th>
                                                <th class="text-center">Descripcion Larga</th>
                                                <th class="text-center">Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($json_data as $data) : ?>
                                                <tr>
                                                    <td class="text-center"><?= $data->id ?></td>
                                                    <td><?= $data->name ?></td>
                                                    <td><?= $data->marca ?></td>
                                                    <td><?= $data->foto ?></td>
                                                    <td><?= $data->precio ?></td>
                                                    <td><?= $data->descCorta ?></td>
                                                    <td><?= nl2br($data->descLarga) ?></td>
                                                    <td><?= $data->link ?></td>
                                                    <td class="text-center">
                                                        <a href="CRUD-PROD-product_form.php?id=<?= $data->id ?>" class="btn btn-sm btn-outline-info rounded-0">
                                                            <i class="fa-solid fa-edit"></i>
                                                        </a>
                                                        <a href="CRUD-PROD-delete_data.php?id=<?= $data->id ?>" class="btn btn-sm btn-outline-danger rounded-0" onclick="if(confirm(`¿Deseas eliminar del registro a <?= $data->name ?>?`) === false) event.preventDefault();">
                                                            <i class="fa-solid fa-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
