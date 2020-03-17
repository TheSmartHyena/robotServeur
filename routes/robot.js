exports.initRobot = async function (app){
    app.route('/robot')
      .get(async function(req, res) {
          if (req.query.id) {
              robots = await app.models.Robot.findAll({where: {id: req.query.id}});
              robots.length > 0 ? res.json(robots[0]) : res.json(robots);
          }else{
              res.status(204).send("Id does not exist or invalid id");
          }

      })
      .post(async function(req, res) {
          const r = req.body;
          if (r.name && r.description && r.price) {
              await app.models.Robot.create({name: r.name, description: r.description, price:r.price});
              res.status(200).send("Robot created");
          } else {
              res.status(204).send("Invalid data sent.");
          }
      })
      .delete(async function(req, res) {
          if ( !(req.query.id) ) {
              res.status(204).send("Invalid id.");
          }

          robots = await app.models.Robot.destroy({where: {id: req.query.id}});
          res.status(202).send();
      });

          // Removed for speed
          /*
          robots = await Robot.findAll({where: {id: req.query.id}});
          if (robots.length > 0) {
              robots = await app.models.Robot.destroy({where: {id: req.query.id}});
              res.status(200).send("Item deleted with success.");
          } else {
              res.status(204).send("Id does not exist.");
          }*/
}
