const express = require('express');
const User = require('../models/User');
const Location = require('../models/Location');

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();
const checkScopes = requiredScopes('read:admin');

// Configuración de JWT

const checkJwt = auth({
  audience: 'https://hello-world.example.com',
  issuerBaseURL: `https://dev-5ol1ls314c5jvis8.us.auth0.com/`,
  algorithms: ['RS256'],
});


router.get('/admin', checkJwt, checkScopes, (req, res) => {
  const { token } = req.body;
  console.log('El usuario es administrador', token);
  res.json({
    message: 'Admin.'
  });
});

router.post('/location', checkJwt, async (req, res) => {
  const { lt, lg, name, userName, userId} = req.body;
  try {
    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {

      console.log('La constructora ya esta registrada');
      return res.status(200).json({
        name: existingLocation.name,
      });
    }
    const newLocation = new Location({
      userId,
      userName,
      name,
      lt,
      lg
    });

    const savedLocation = await newLocation.save();

    console.log('Ubicación guardada:', savedLocation);
    res.status(200).json(savedLocation);
  } catch (error) {
    console.error('Error al guardar la ubicación:', error);
    res.status(500).json({ error: 'Error al guardar la ubicación' });
  }
}); 

router.post('/user', checkJwt, async (req, res) => {
  const { name, email, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('El usuario ya está registrado en la base de datos');
      return res.status(200).json({
        name: existingUser.name,
        email: existingUser.email
      });
    }

    const newUser = new User({
      name,
      email,
      admin: isAdmin || false
    });

    const savedUser = await newUser.save();

    console.log('Usuario guardado en MongoDB:', { name: savedUser.name, email: savedUser.email });
    res.status(200).json({
      name: savedUser.name,
      email: savedUser.email
    });
  } catch (error) {
    console.error('Error al guardar el usuario en MongoDB:', error);
    res.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
  }
});


router.get("/users", checkJwt, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    res.status(500).json({ error: "Error al obtener la lista de usuarios" });
  }
});

router.get("/locations", checkJwt, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error("Error al obtener la lista de locaciones:", error);
    res.status(500).json({ error: "Error al obtener la lista de locaciones" });
  }
});

router.delete('/locations/:id', checkJwt, async (req, res) => {
  const locationId = req.params.id;

  try {
    await Location.findByIdAndRemove(locationId);
    res.status(200).json({ message: 'Ubicación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la ubicación:', error);
    res.status(500).json({ error: 'Error al eliminar la ubicación' });
  }
});

module.exports = router;
