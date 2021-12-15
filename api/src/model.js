const fetch = require("node-fetch");
const {
  Country,
  Turistic_activity,
  CountryTuristicActivity,
} = require("./db.js");
const sequelize = require("sequelize");
const e = require("express");
// const { getActivity } = require("../../client/src/actions/Actions.jsx");

//Función para generar un ID random de 3 letras

function getRandomString(length) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

module.exports = {
  // async pagination(page) {
  //   let limit = 10;
  //   let offset = (page - 1) * limit + 1;
  //   const countries = await Country.findAndCountAll({
  //     offset: offset,
  //     limit: limit,
  //   });
  //   return countries;
  // },
  async createActivity(nombre, dificultad, duracion, temporada, paises) {
    const activity = await Turistic_activity.create({
      id: getRandomString(3),
      nombre: nombre,
      dificultad: dificultad,
      duracion: duracion,
      temporada: temporada,
    });

    await activity.addCountry(paises);
    return activity;
  },
  async getCountries(name, order, type, page, continente, actividad) {
    let filter = { where: {} };

    if (page) {
      let limit = 10;
      let offset = (page - 1) * limit;
      filter.offset = offset;
      filter.limit = limit;
    }

    if (actividad) {
      filter.include = [
        {
          model: Turistic_activity,
          where: { id: actividad },
        },
      ];
      //   include: [{
      //     model: Models.Orders,
      //     where: {}
      // }]
    }

    if (continente) {
      filter.where.continente = continente;
    }
    if (name) {
      filter.where.nombre = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("country.nombre")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      );
    }
    if (order && type) {
      filter.order = [["poblacion", order]];
    } else if (order && !type) {
      filter.order = [["nombre", order]];
    }
    const register = await Country.findAndCountAll(filter);
    if (register.length === 0) {
      const response = await fetch("https://restcountries.com/v3/all");
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        const country = await Country.create({
          id: getRandomString(3),
          nombre: data[i].name.common,
          imagen: data[i].flags[0] ? data[i].flags[0] : "",
          continente: data[i].region,
          capital: data[i].capital ? data[i].capital[0] : "",
          subregion: data[i].subregion,
          area: data[i].area,
          poblacion: data[i].population,
        });
      }

      return await Country.findAndCountAll(filter);
    } else {
      return register;
    }
  },
  async getActivity() {
    const activity = await Turistic_activity.findAndCountAll();
    return activity;
  },
  // async getCountriesByOrder(order) {
  //   const countries = await Country.findAndCountAll({
  //     order: [["nombre", order]],
  //   });
  //   return countries;
  // },
  // async getCountriesByPopulation(order) {
  //   const countries = await Country.findAndCountAll({
  //     order: [["poblacion", order]],
  //   });
  //   return countries;
  // },
  // async getCountriesByContinent(continente) {
  //   const countries = await Country.findAndCountAll({
  //     where: {
  //       continente: continente,
  //     },
  //   });
  //   console.log(countries);
  //   return countries;
  // },
  // async getCountryByName(name) {
  //   const countries = await Country.findAndCountAll({
  //     where: {
  //       nombre: sequelize.where(
  //         sequelize.fn("LOWER", sequelize.col("nombre")),
  //         "LIKE",
  //         "%" + name.toLowerCase() + "%"
  //       ),
  //     },
  //   });

  //   if (countries.length === 0) {
  //     return false;
  //   } else {
  //     return countries;
  //   }
  // },
  // async getCountryByID(id) {
  //   const registerCountry = await Country.findOne({
  //     where: { id: id },
  //     include: Turistic_activity,
  //   });
  //   let result = {
  //     id: registerCountry.id,
  //     nombre: registerCountry.nombre,
  //     imagen: registerCountry.imagen,
  //     capital: registerCountry.capital,
  //     subregion: registerCountry.subregion,
  //     area: registerCountry.area,
  //     poblacion: registerCountry.poblacion,
  //     actividadesTuristicas: registerCountry.turistic_activities,
  //   };
  //   return result;
  // },
  // async getCountries() {
  //   try {
  //     const register = await Country.findAll();
  //     if (register.length === 0) {
  //       const response = await fetch("https://restcountries.com/v3/all");
  //       const data = await response.json();
  //       for (let i = 0; i < data.length; i++) {
  //         const country = await Country.create({
  //           id: getRandomString(3),
  //           nombre: data[i].name.common,
  //           imagen: data[i].flags[0] ? data[i].flags[0] : "",
  //           continente: data[i].region,
  //           capital: data[i].capital ? data[i].capital[0] : "",
  //           subregion: data[i].subregion,
  //           area: data[i].area,
  //           poblacion: data[i].population,
  //         });
  //       }

  //       return await Country.findAll();
  //     } else {
  //       return register;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
};
