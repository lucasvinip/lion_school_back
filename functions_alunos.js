const alunos = require('./model/alunos.js')

// lista todos os alunos
const getlistStudents = function () {
    let listArray = []
    let listjson = {}

    alunos.alunos.forEach(date => {
        listArray.push(
            {
                image_aluno: date.foto,
                nome_aluno: date.nome.toUpperCase(),
                status: date.status
            }
        )
        listjson.alunos = listArray
    })
    return listjson
}
// console.log(getlistStudents());

// pega informaçoes do aluno pela matricula
const getDescriptionStudents = function (registration) {
    let listArray = []
    let listJson = {}

    alunos.alunos.forEach(date => {
        if (registration == date.matricula) {
            listArray.push(
                {
                    numero_matricula: date.matricula,
                    image_aluno: date.foto,
                    nome_aluno: date.nome.toUpperCase(),
                    sexo_aluno: date.sexo,
                    curso_aluno: date.curso
                }
            )
        }
        listJson.matricula = listArray
    })
    return listJson
}
//console.log(getDescriptionStudents(20151001002));

// pega aluno pelo curso
const getStudentsInCourses = function (course) {
    let listArray = []
    let listJson = {}

    alunos.alunos.forEach(date => {
        date.curso.forEach(dateName => {
            if (course == dateName.sigla) {
                listArray.push(
                    {
                        foto: date.foto,
                        nome: date.nome.toUpperCase(),
                        matricula: date.matricula,
                        status: date.status,
                        sexo: date.sexo,
                        curso: dateName.sigla
                    }
                )
            }
        })
        listJson.curso = listArray
    })
    return listJson
}
// console.log(getStudentsInCourses('RDS'))

// pega aluno pelo status
const getStudentsStatus = function (status) {
    let listArray = []
    let listJson = {}

    let caseStatus = status[0].toUpperCase() + status.substring(1).toLowerCase()

    alunos.alunos.forEach(date => {
        date.curso.forEach(info => {
            if (caseStatus == date.status) {
                listArray.push(
                    {
                        foto: date.foto,
                        nome: date.nome.toUpperCase(),
                        status: date.status,
                        ano_conclusao: info.conclusao,
                    }
                )
            }
        })
        listJson.status = listArray
    })
    return listJson
}

// console.log(getStudentsStatus('CurSando'));
// console.log(getStudentsStatus('Finalizado'));

module.exports = {
    getlistStudents,
    getDescriptionStudents,
    getStudentsInCourses,
    getStudentsStatus
}