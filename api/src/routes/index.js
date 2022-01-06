const { Router } = require("express");
const {
  getCountries,
  getCountryByID,
  // getCountryByName,
  createActivity,
  getActivity,
  // getCountriesByOrder,
  // getCountriesByPopulation,
  // getCountriesByContinent,
  // pagination,
} = require("../model");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", async function (req, res) {
  try {
    let { name, order, type, continente, actividad, subregion } = req.query;
    let countries = await getCountries(
      name,
      order,
      type,
      continente,
      actividad,
      subregion
    );
    return res.json(countries);
  } catch (e) {
    console.log(e);
  }

  // if (order && !type) {
  //   let countries = await getCountriesByOrder(order);
  //   return res.json(countries);
  // }
  // if (order && type) {
  //   let countries = await getCountriesByPopulation(order);
  //   return res.json(countries);
  // }
  // if (continente) {
  //   let countries = await getCountriesByContinent(continente);
  //   return res.json(countries);
  // }
  // if (page) {
  //   let countries = await pagination(page);
  //   return res.json(countries);
  // }
  // if (name) {
  //   let countries = await getCountryByName(name);
  //   if (!countries) {
  //     res.send("No se pudo encontrar un país");
  //   } else {
  //     res.json(countries);
  //   }
  // } else {
  //   let countries = await getCountries();
  //   res.json(countries);
  // }
});

router.get("/countries/:id", async function (req, res) {
  res.json(await getCountryByID(req.params.id));
});

router.get("/activity", async function (req, res) {
  res.json(await getActivity());
});
router.post("/activity", async function (req, res) {
  let { nombre, dificultad, duracion, temporada, paises } = req.body;

  let activity = await createActivity(
    nombre,
    dificultad,
    duracion,
    temporada,
    paises
  );
  if (!activity) {
    res.status(404).send("La actividad no pudo ser creada ");
  } else {
    res.json(activity);
  }
});

module.exports = router;
