/****
 * Objetivo: Criar uma API para manipulaçao de dados um arquivo alunos e cursos
 * Autor: Lucas Vinicius e Clara Oliveira
 * Data: 10/03/2023
 * Versao: 1.0
 */

const express = require('express')
const cors = require('cors')


const alunos = require('./functions_alunos.js')
const cursos = require('./functions_curso.js')


const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//endPoints

// EndPoint para listar cursos
app.get('/v1/lion-school/cursos', cors(), async function(request, response, next){

    let listCourses = cursos.getListCourses()
    let statusCode

    if(listCourses){
        listCourses
        statusCode = 200
    }
    else 
        statusCode = 500

    response.status(statusCode)
    response.json(listCourses)
})


// EndPoint para listar alunos
app.get('/v1/lion-school/alunos', cors(), async function(request, response, next){
    
    let listStudents = alunos.getlistStudents()
    let statusCode

    if(listStudents){
        listStudents
        statusCode = 200
    }
    else
        statusCode = 500
    

    response.status(statusCode)
    response.json(listStudents)
})

app.get('/v1/lion-school/alunos/matricula', cors(), async function(request, response, next){

    let matricula = request.query.numero
    let statusCode
    let dadosAlunoMatricula = {}

    if(matricula == '' || matricula == undefined || isNaN(matricula)){
        statusCode = 400
        dadosAlunoMatricula.message =  'Não é possivel processar a requisição o paremetro esta errada'
    }
    else{
        let matriculas = alunos.getDescriptionStudents(matricula)
        
        if(matriculas){
            statusCode = 200
            dadosAlunoMatricula = matriculas
        }
        else
            statusCode = 404
    }

    response.status(statusCode)
    response.json(dadosAlunoMatricula)

})

// EndPoint para listar alunos em tal curso
app.get('/v1/lion-school/alunos/curso', cors(), async function(request, response, next){

    let siglaCourse = request.query.sigla
    let statusCode
    let dadosCourse = {}

    if(siglaCourse == '' || siglaCourse == undefined || !isNaN(siglaCourse)){
        statusCode = 400
        dadosEstado.message =  'Não é possivel processar a requisição o paremetro esta errada'
    }
    else{
        
        let course = alunos.getStudentsInCourses(siglaCourse)
        
        
        if(course){
            statusCode = 200 // estado encontrado
            dadosCourse = course
        }
        else
            statusCode = 404 // estado nao encontrado
    }

    response.status(statusCode)
    response.json(dadosCourse)
})

// EndPoint para listar alunos pelo status
app.get('/v1/lion-school/alunos/classificacao', cors(), async function(request, response, next){

    let statusAluno = request.query.status
    let statusCode
    let dadosStatus = {}

    if(statusAluno == '' || statusAluno == undefined || !isNaN(statusAluno)){
        statusCode = 400
        dadosEstado.message =  'Não é possivel processar a requisição o paremetro esta errada'
    }
    else{
        let status = alunos.getStudentsStatus(statusAluno)
        
        if(status){
            statusCode = 200 // estado encontrado
            dadosStatus = status
        }
        else
            statusCode = 404 // estado nao encontrado
    }

    response.status(statusCode)
    response.json(dadosStatus)
})


app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
})