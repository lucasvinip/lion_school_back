var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga" :   "1200"
    }
];

// lista todos os cursos
const getListCourses = function(){
    let listArray = []

    cursos.forEach(function(date){
        listArray.push(
            {
                nome_curso: date.nome,
                sigla_curso: date.sigla,
                icone_curso: date.icone,
                carga_horaria: date.carga
            }
        )
    })
    return listArray
}

// console.log(getListCourses());


