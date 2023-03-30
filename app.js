/****
 * Objetivo: Criar uma API para manipulaçao de dados um arquivo alunos e cursos
 * Autor: Lucas Vinicius e Clara Oliveira
 * Data: 10/03/2023
 * Versao: 1.0
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const alunos = require('./model/alunos.js')
const { allowedNodeEnvironmentFlags } = require('process')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//endPoints

// EndPoint para listar alunos
app.get('/v1/lion-school/alunos', cors(), async function(request, response, next){
    
    let listStudents = alunos.getlistStudents()
    let statusCode

    if(listStudents){
        // retorna o Json e o Status code
        response.json(listStudents)
        statusCode = 200
    }
    else{
        statusCode = 500
    }

    response.status(statusCode)

})

// app.get('/v1/lion-school/alunos/matricula', cors(), async function(request, response, next){

//     let matricula = request.query.numero
//     let statusCode
//     let dadosAlunoMatricula = {}

//     if(matricula == '' || matricula == undefined || isNaN(matricula)){
//         statusCode = 400
//         dadosAlunoMatricula.message =  'Não é possivel processar a requisição o paremetro esta errada'
//     }
//     else{
//         let matriculas = alunos.getDescriptionStudents(matricula)
        
//         if(cidades){
//             statusCode = 200
//             dadosAlunoMatricula = matriculas
//         }
//         else
//             statusCode = 404
//     }

//     response.status(statusCode)
//     response.json(dadosAlunoMatricula)

// })

app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
})