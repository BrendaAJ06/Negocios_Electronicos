        let listaEmpleados = [];

        const objEmpleado = {
            id: '',
            nombre: '',
            descripcion: '',
        };

        let editando = false;

        const formulario = document.querySelector('#formulario');
        const nombreInput = document.querySelector('#nombre');
        const descripcionInput = document.querySelector('#descripcion');
        const btnAgregarInput = document.querySelector('#btnAgregar');

        formulario.addEventListener('submit', validarFormulario);

        function validarFormulario(e) {
            e.preventDefault();

            if (nombreInput.value === '' || descripcionInput.value === '') {
                alert('Todos los campos se deben llenar');
                return;
            }

            if (editando) {
                editarEmpleado();
                editando = false;
            } else {
                objEmpleado.id = ('00' + (listaEmpleados.length + 1)).slice(-3);
                objEmpleado.nombre = nombreInput.value;
                objEmpleado.descripcion = descripcionInput.value;

                agregarEmpleado();
            }
        }

        function agregarEmpleado() {
            listaEmpleados.push({ ...objEmpleado });

            mostrarEmpleados();

            formulario.reset();
            limpiarObjeto();
        }

        function limpiarObjeto() {
            objEmpleado.id = '';
            objEmpleado.nombre = '';
            objEmpleado.descripcion = '';
        }

        function mostrarEmpleados() {
            limpiarHTML();

            const divEmpleados = document.querySelector('.div-empleados');
            
            listaEmpleados.forEach(empleado => {
                const { id, nombre, descripcion } = empleado;

                const parrafo = document.createElement('p');
                parrafo.textContent = `${id} - ${nombre} - ${descripcion}`;
                parrafo.dataset.id = id;

                const editarBoton = document.createElement('button');
                editarBoton.onclick = () => cargarEmpleado(empleado);
                editarBoton.textContent = 'Editar';
                editarBoton.classList.add('btn', 'btn-editar');
                parrafo.append(editarBoton);

                const eliminarBoton = document.createElement('button');
                eliminarBoton.onclick = () => eliminarEmpleado(id);
                eliminarBoton.textContent = 'Eliminar';
                eliminarBoton.classList.add('btn', 'btn-eliminar');
                parrafo.append(eliminarBoton);

                const hr = document.createElement('hr');

                divEmpleados.appendChild(parrafo);
                divEmpleados.appendChild(hr);
            });
        }

        function cargarEmpleado(empleado) {
            const { id, nombre, descripcion } = empleado;

            nombreInput.value = nombre;
            descripcionInput.value = descripcion;

            objEmpleado.id = id;

            formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
            
            editando = true;
        }

        function editarEmpleado() {

            objEmpleado.nombre = nombreInput.value;
            objEmpleado.descripcion = descripcionInput.value;

            listaEmpleados.map(empleado => {

                if (empleado.id === objEmpleado.id) {
                    empleado.id = objEmpleado.id;
                    empleado.nombre = objEmpleado.nombre;
                    empleado.descripcion = objEmpleado.descripcion;

                }

            });

            limpiarHTML();
            mostrarEmpleados();
            formulario.reset();

            formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
            
            editando = false;
        }

        function eliminarEmpleado(id) {

            listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

            limpiarHTML();
            mostrarEmpleados();
        }

        function limpiarHTML() {
            const divEmpleados = document.querySelector('.div-empleados');
            while (divEmpleados.firstChild) {
                divEmpleados.removeChild(divEmpleados.firstChild);
            }
        }

        mostrarEmpleados();