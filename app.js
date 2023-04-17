/****
 * Objetivo: Criar uma API para manipulaçao de dados um arquivo alunos e cursos
 * Autor: Lucas Vinicius e Clara Oliveira
 * Data: 27/03/2023
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
app.get('/v1/lion-school/alunos', cors(), async function(request, response){
    
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

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response){

    let matricula = request.params.matricula
    let statusCode
    let matriculasAluno = alunos.getDescriptionStudents(matricula)
    let dateStudents = {}

    if(matriculasAluno){
        if(matricula == '' || matricula == undefined || isNaN(matricula)){
            statusCode = 400
            dateStudents.message =  'Não é possivel processar a requisição o paremetro esta errada'
        }
        else{
            if(matriculasAluno){
                statusCode = 200
                dateStudents = matriculasAluno
            }
            else
                statusCode = 404
        }
    }
    
    response.status(statusCode)
    response.json(dateStudents)

})

// EndPoint para listar alunos em tal curso
app.get('/v1/lion-school/alunos', cors(), async function(request, response, next){

    let siglaCourse = request.query.curso
    let statusCode
    let course = alunos.getStudentsInCourses(siglaCourse)
    let dateCourse = {}

    if(course){
        if(siglaCourse == '' || siglaCourse == undefined || !isNaN(siglaCourse)){
            statusCode = 400
            dateCourse.message =  'Não é possivel processar a requisição o paremetro esta errada'
        }
        else{
            if(course){
                statusCode = 200 // estado encontrado
                dateCourse = course
            }
            else
                statusCode = 404 // estado nao encontrado
        }
    }

    response.status(statusCode)
    response.json(dateCourse)
})

// EndPoint para listar alunos pelo status
app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    let statusAluno = request.query.status
    let statusCode
    let status = alunos.getStudentsStatus(statusAluno)
    let dateStatus = {}

    if(status){
        if(statusAluno == '' || statusAluno == undefined || !isNaN(statusAluno)){
            statusCode = 400
            dateStatus.message =  'Não é possivel processar a requisição o paremetro esta errada'
        }
        else{
            if(status){
                statusCode = 200 // estado encontrado
                dateStatus = status
            }
            else
                statusCode = 404 // estado nao encontrado
        }
    }

    response.status(statusCode)
    response.json(dateStatus)
})


app.listen(8080, function(){
    console.log('Servidor aguardando requisições na porta 8080.')
})