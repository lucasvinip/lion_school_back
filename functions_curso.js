const cursos = require('./model/cursos.js')

// lista todos os cursos
const getListCourses = function(){
    let listArray = []
    let listJson = {}

    cursos.cursos.forEach(function(date){
        listArray.push(
            {
                nome_curso: date.nome,
                sigla_curso: date.sigla,
                icone_curso: date.icone,
                carga_horaria: date.carga
            }
        )
        listJson.cursos = listArray
    })
    return listJson
}

// console.log(getListCourses());

module.exports = {
    getListCourses
}