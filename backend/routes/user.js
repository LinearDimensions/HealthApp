const router = require('express').Router();
let User = require('../models/user.model');
const { spawn } = require('child_process')


router.route('/addUser').post((req, res) => {    
  const newUser = new User({ //carpark, report, user, timestamp, status
      name: req.body.name,
      age: req.body.age,
      sex: req.body.sex,
      condition: req.body.condition,
      doctor: 'Dr. Joerg Koglin'
    });
    newUser.save()
    .then(() => res.json(200))
    .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/').get((req, res) => {
  User.find()
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/diagnosis').post((req, res) => {
  var dataToSend;
  const python = spawn(`python`, [`../backend/data/main.py`, req.body.condition]);
  
  python.stdout.on('data', function(data) {
    dataToSend = data.toString()
  })

  python.stderr.on('data', data => {
      console.error(`stderr: ${data}`)
  })

  python.on('exit', (code) => {
      console.log(`child process exited with code ${code}`);
      var data = JSON.parse(JSON.stringify(dataToSend));
      console.log(data);
      callback(data);
  })
});

/*
  router.route('/users').get((req, res) => {
  User.aggregate([{$match: {carpark: req.params.id}}])
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: ' + err));
});

  router.route('/users').post((req, res) => {    
    const newUser = new User({ //carpark, report, user, timestamp, status
        name: req.body.carpark,
        age: req.body.report,
        sex: 'Male',
        condition: 'Pending',
        doctor: ''
      });
      newUser.save()
      .then(() => res.json(200))
      .catch(err => res.status(400).json('Error: ' + err));
    });

  const newReport = new Report({ //carpark, report, user, timestamp, status
      carpark: req.body.carpark,
      report: req.body.report,
      user: 'Daniel Li',
      status: 'Pending',
    });
    newReport.save()
    .then(() => res.json(200))
    .catch(err => res.status(400).json('Error: ' + err));
  });
*/


module.exports = router;