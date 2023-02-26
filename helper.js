const { stat } = require('fs')
const { spawn } = require('child_process')
var mysql = require('mysql')


function connect(callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'shihong',
        password: 'password',
        database: 'fault_reporting'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
        callback(connection)
    })
}


function insert_incident_report(carpark, report) {
    connect(function(connection) {
        connection.query('INSERT INTO incident_report (carpark, report, user, timestamp, status)'
        + ` VALUES('${carpark}', '${report}', 'David Li', NOW(), 'in-progress')`, function(err, rows, fields){
            if (err) throw err
            connection.end
        })
    })
}


function get_incident_report(carpark, callback) {
    connect(function(connection) {
        connection.query(`SELECT * FROM incident_report WHERE carpark ='${carpark}'`, function(err, result){
            if (err) throw err
            //console.log(result)
            //callback(rows)
            var data = JSON.parse(JSON.stringify(result))
            console.log(data)
            connection.end
            callback(data)
        })
    })
}

function get_carpark(carpark, callback) {
    connect(function(connection) {
        connection.query(`SELECT * FROM carpark WHERE car_park_no ='${carpark}'`, function(err, result){
            if (err) throw err
            //console.log(result)
            //callback(rows)
            var data = JSON.parse(JSON.stringify(result))
            console.log(data)
            connection.end
            callback(data)
        })
    })
}


function get_carparklot_availability(carpark, callback) {
    var lot_availability
    const python = spawn('python', [`Carpark Prediction/predict.py`, carpark]); // Integrating Node and Python using (1)Node child process (2)python-shell package (3)message broker RabbitMQ

    python.stdout.on('data', function(data) {
        lot_availability = data.toString()
    })

    python.stderr.on('data', data => {
        console.error(`stderr: $d{data}`)
    })

    python.on('exit', (code) => {
        console.log(`child process exited with code ${code}`)
        lot_availability = lot_availability.replace('[', '')
        lot_availability = lot_availability.replace(']', '')
        lot_availability = lot_availability.replace(/\,/g, '')
        lot_availability = lot_availability.replace(/(\r\n|\n|\r)/gm, "");
        lot_availability = lot_availability.split(" ")
        var data = JSON.parse(JSON.stringify(lot_availability))
        console.log(data)
        callback(data)
    })

}


//get_carparklot_availability("SE17")

//insert_incident_report('Blk 850', 'Bruh', 'in-progress')
//get_incident_report("Blk 850")

exports.insert_incident_report = insert_incident_report
exports.get_incident_report = get_incident_report
exports.get_carpark = get_carpark
exports.get_carparklot_availability = get_carparklot_availability