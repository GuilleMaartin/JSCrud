import datos from '../data/data.json' assert {type:"json"};
import { Gift } from './clases.js'

const cuerpoTabla = document.querySelector('#cuerpo-tabla')
var myModal = new bootstrap.Modal(document.getElementById('modalGift'))

let idGiftUpdate = null


window.mostrarModal=(id)=>{
    console.log(id)
    idGiftUpdate=id
    let index = datos.findIndex((item)=> item.id== idGiftUpdate)

    document.querySelector('#giftModal').value = datos[index].gift
    document.querySelector('#tipoModal').value = datos[index].tipo 
    document.querySelector('#tiempoModal').value = datos[index].tiempo
    document.querySelector('#precioModal').value = datos[index].precio
    document.querySelector('#imagenModal').value = datos[index].imagen

    myModal.show()
}

const giftUpdate=(e)=>{
    e.preventDefault()

    let index = datos.findIndex((item)=> item.id== idGiftUpdate)

    datos[index].gift = document.querySelector('#giftModal').value
    datos[index].tipo =  document.querySelector('#tipoModal').value
    datos[index].tiempo = document.querySelector('#tiempoModal').value
    datos[index].precio = document.querySelector('#precioModal').value
    datos[index].imagen = document.querySelector('#imagenModal').value

    cargarTabla()
    myModal.hide()


}

const cargarTabla=()=>{
    cuerpoTabla.innerHTML = ''
   datos.map((item)=>{

    const fila = document.createElement('tr')

    const celda = 
    `<th>${item.gift}</th>
    <td>${item.tipo}</td>
    <td>${item.tiempo}</td>
    <td>$${item.precio}</td>
    <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning">
            <i class="fa-solid fa-pencil" aria-hidden="true" onclick="mostrarModal(${item.id})">Editar</i>
        </button>
        <button class="btn btn-outline-danger">
        <i class="fa-solid fa-pencil" aria-hidden="true" onclick="borrarGift(${item.id})">Eliminar</i>
        </button>
        </div>
    </td>`

    fila.innerHTML = celda
    cuerpoTabla.append(fila)

   })
}


const agregarGIft=(e)=>{
    e.preventDefault()
    
    let id = datos.at(-1).id + 1
    let gift = document.querySelector('#gift').value
    let tipo = document.querySelector('#tipo').value
    let tiempo = document.querySelector('#tiempo').value
    let precio = document.querySelector('#precio').value
    let imagen = document.querySelector('#imagen').value

    datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen))
    document.querySelector('#formGift').reset()
    cargarTabla()
}

window.borrarGift=(id)=>{
    
    let index = datos.findIndex((item)=>item.id==id)

    let validar = confirm(`Esta segurx que quiere eliminar la gift card ${datos[index].gift}?`)

    if (validar){
        datos.splice(index, 1)
        cargarTabla()
    }

}

cargarTabla();

document.querySelector('#formGift').addEventListener('submit', agregarGIft)
document.querySelector("#formModal").addEventListener("submit",giftUpdate)