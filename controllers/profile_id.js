const profileId = (req, res, db) => {
  const { id } = req.params; // takes info from the поисковой строки
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) { //one id from database and one from req
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

export default profileId;