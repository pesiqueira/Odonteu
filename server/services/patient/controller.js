module.exports = (dbConnection)=>{
    return {
        CreatePatient:(req,res)=>{
            let post = req.body;
            let body = {};
            for (const key in post) {
                if (post.hasOwnProperty(key)) {
                    let element = post[key];
                    if (element instanceof Date)
                        element = element.toISOString().substr(0,10);
                    body['paciente_'+key]=element;
                }
            }
            var query = dbConnection.query('INSERT INTO pacientes SET ?',body,function (error,results, fields) {
                if (error) throw error;
                res.send(results);
            });
        },
        AllPatients:(req,res)=>{
            dbConnection.query('SELECT * FROM pacientes', function (error, results, fields){
                res.send(results);
            })
        },
        DeletePatient:(req,res)=>{
            let idpaciente = req.params.idpaciente
            dbConnection.query('DELETE FROM pacientes WHERE idpacientes='+idpaciente, function (error, results, fields){
                res.send(results);
            })
        }
    }
    
}