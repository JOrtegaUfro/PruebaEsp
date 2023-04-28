const attacks = require("./attacks.json");

var ataqueMagico = attacks.filter((item) => item.type === "MAGIC");
var ataqueFisico = attacks.filter((item) => item.type === "PHYSICAL");
const clasePersonajeUno = getClass(3, 0);
const clasePersonajeDos = getClass(3, 0);

var personajeUno = {
  name: "Juancho",
  clase: clasePersonajeUno,
  firstAttack: getAtaque(clasePersonajeUno),
  secondAttack: getAtaqueDos(clasePersonajeUno),
  health: getHealth(100, 200),
  speed: getSpeed(1, 10),
  fallo: 0
};

var personajeDos = {
  name: "Luchito",
  clase: clasePersonajeUno,
  firstAttack: getAtaque(clasePersonajeDos),
  secondAttack: getAtaqueDos(clasePersonajeDos),
  health: getHealth(100, 200),
  speed: getSpeed(1, 10),
  fallo: 0
};
var archivo = '';
function ataqueAcertadoPerUno(ataqueInicial, personajeUno, personajeDos) {
  var probabilidad = getRandom(100, 1);
  if (ataqueInicial === 1) {
    if (probabilidad > personajeUno.firstAttack.accuracy) {
      archivo= archivo+(
        personajeUno.name +
          " ataca con " +
          personajeUno.firstAttack.name +
          " … Da en el blanco!. La vida del " +
          personajeDos.name +
          " queda en " +
          (personajeDos.health - personajeUno.firstAttack.damage)+'\n'
      );
      result = personajeUno.firstAttack.damage;
    } else if (probabilidad < personajeUno.firstAttack.accuracy) {
      archivo= archivo+(
        personajeUno.name +
          " ataca con" +
          personajeUno.firstAttack.name +
          "…Falla!. La vida del " +
          personajeDos.name +
          "se mantiene en " +
          personajeDos.health
      )+'\n';
      result = 0;
    }
  } else if (ataqueInicial === 2) {
    if (probabilidad > personajeUno.secondAttack.accuracy) {
      archivo= archivo+(
        personajeUno.name +
          " ataca con " +
          personajeUno.secondAttack.name +
          " … Da en el blanco!. La vida del " +
          personajeDos.name +
          " queda en " +
          (personajeDos.health - personajeUno.secondAttack.damage)
      )+'\n';
      result = personajeUno.secondAttack.damage;
    } else if (probabilidad < personajeUno.secondAttack.accuracy) {
      archivo= archivo+(
        personajeUno.name +
          " ataca con" +
          personajeUno.secondAttack.name +
          "…Falla!. La vida del " +
          personajeDos.name +
          "se mantiene en " +
          personajeDos.health
      )+'\n';
      result = 0;
    }
  }

  return result;
}

function ataqueAcertadoPerDos(ataqueInicial, personajeDos, personajeUno) {
  var probabilidad = getRandom(100, 1);
  if (ataqueInicial === 1) {
    if (probabilidad < personajeDos.firstAttack.accuracy) {
      archivo= archivo+(
        personajeDos.name +
          " ataca con " +
          personajeDos.firstAttack.name +
          " … Da en el blanco!. La vida del " +
          personajeUno.name +
          " queda en " +
          (personajeUno.health - personajeDos.firstAttack.damage)
      )+'\n';
      result = personajeDos.firstAttack.damage;
    } else if (probabilidad > personajeDos.firstAttack.accuracy) {
      archivo= archivo+(
        personajeDos.name +
          " ataca con" +
          personajeDos.firstAttack.name +
          "…Falla!. La vida del " +
          personajeUno.name +
          "se mantiene en " +
          personajeUno.health
      )+'\n';
      result = 0;
    }
  } else if (ataqueInicial === 2) {
    if (probabilidad < personajeDos.secondAttack.accuracy) {
      archivo= archivo+(
        personajeDos.name +
          " ataca con " +
          personajeDos.secondAttack.name +
          " … Da en el blanco!. La vida del " +
          personajeUno.name +
          " queda en " +
          (personajeUno.health - personajeDos.secondAttack.damage)
      )+'\n';
      result = personajeDos.secondAttack.damage;
    } else if (probabilidad > personajeDos.secondAttack.accuracy) {
      archivo= archivo+(
        personajeDos.name +
          " ataca con " +
          personajeDos.secondAttack.name +
          "…Falla!. La vida del " +
          personajeUno.name +
          "se mantiene en " +
          personajeUno.health
      )+'\n';
      result = 0;
    }
  }
  return result;
}

function getAtaque(clase) {
  if (clase === "KNIGHT" || clase === "WARRIOR") {
    var numero = getRandom(contador(ataqueFisico) - 1, 0);
    var ataque = ataqueFisico[numero];
  } else if (clase === "FAIRY" || clase === "MAGICIAN") {
    var numero = getRandom(contador(ataqueMagico) - 1, 0);
    var ataque = ataqueMagico[numero];
  }

  return ataque;
}
function getAtaqueDos(clase) {
  if (clase === "KNIGHT" || clase === "WARRIOR") {
    var numero = getRandom(contador(ataqueFisico) - 1, 0);
    var ataque = ataqueFisico[numero];
  } else if (clase === "FAIRY" || clase === "MAGICIAN") {
    var numero = getRandom(contador(ataqueMagico) - 1, 0);
    var ataque = ataqueMagico[numero];
  }

  return ataque;
}

function contador(result) {
  var total = 0;
  result.forEach(function (item) {
    total = total + 1;
  });
  return total;
}

function getSpeed(min, max) {
  return getRandom(max, min);
}
function getHealth(min, max) {
  return getRandom(max, min);
}

function getRandom(max, min) {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
}

function getClass(max, min) {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  let clases = ["MAGICIAN", "KNIGHT", "WARRIOR", "FAIRY"];

  return clases[result];
}
function ganador(personajeUno, personajeDos) {
  if (personajeDos.health <= 0) {
    archivo= archivo+(personajeUno.name +' fallo '+personajeUno.fallo+' veces '+ '\n');
    archivo= archivo+(personajeDos.name +' fallo '+personajeDos.fallo+' veces '+ '\n');
    archivo= archivo+(personajeUno.name + " gana la batalla");
  } else if (personajeUno.health <= 0) {
    archivo= archivo+(personajeUno.name +' fallo '+personajeUno.fallo+' veces '+ '\n');
    archivo= archivo+(personajeDos.name +' fallo '+personajeDos.fallo+' veces '+ '\n');
    archivo= archivo+(personajeDos.name + " gana la batalla");
  }
}

function iniciador(personajeUno, personajeDos) {
  var igual = getRandom(2, 1);
  if (personajeUno.speed > personajeDos.speed) {
    return 1;
  } else if (personajeDos.speed > personajeUno.speed) {
    return 2;
  } else {
    return igual;
  }
}

function pelea(personajeUno, personajeDos) {

   
  archivo= archivo+("###BATALLA###");
  archivo= archivo+(
    personajeUno.name +
      "|" +
      personajeUno.clase +
      "|" +
      personajeUno.health +
      " de vida vs " +
      personajeDos.name +
      "|" +
      personajeDos.clase +
      "|" +
      personajeDos.health +
      " de vida"
  )+'\n';
  const primero = iniciador(personajeUno, personajeDos);
  var turno = 1;
  var falloUno;
  var falloDos;
  if (primero === 1) {
    
    do {
        turno= turno+1;
        archivo= archivo+('Turno '+turno+'\n');
      if (personajeUno.health > 0) {
        var ataqueInicialUno = getRandom(2, 1);
        var aciertoUno = ataqueAcertadoPerUno(
          ataqueInicialUno,
          personajeUno,
          personajeDos
        );

        
        personajeDos.health = personajeDos.health - aciertoUno;
        if (aciertoUno===0){
            personajeUno.fallo=personajeUno.fallo+1;
          }
        if (personajeDos.health > 0 && personajeUno.health > 0) {
          var ataqueInicialDos = getRandom(2, 1);
          var aciertoDos = ataqueAcertadoPerDos(
            ataqueInicialDos,
            personajeDos,
            personajeUno
          );
          personajeUno.health = personajeUno.health - aciertoDos;
          if (aciertoDos===0){
            personajeDos.fallo=personajeDos.fallo+1;
          }
        }
      }
    } while (personajeUno.health > 0 && personajeDos.health > 0);
    ganador(personajeUno, personajeDos);
  } else if (primero=== 2) {

    do {
        turno= turno+1;
        archivo= archivo+('Turno '+turno+'\n');
      if (personajeUno.health > 0) {
        var ataqueInicialUno = getRandom(2, 1);
        var aciertoUno = ataqueAcertadoPerUno(
          ataqueInicialUno,
          personajeUno,
          personajeDos
        );
        personajeDos.health = personajeDos.health - aciertoUno;
        if (aciertoUno===0){
            personajeUno.fallo=personajeUno.fallo+1;
          }
        if (personajeDos.health > 0 && personajeUno.health > 0) {
          var ataqueInicialDos = getRandom(2, 1);
          var aciertoDos = ataqueAcertadoPerDos(
            ataqueInicialDos,
            personajeDos,
            personajeUno
          );
          personajeUno.health = personajeUno.health - aciertoDos;
          if (aciertoDos===0){
            personajeDos.fallo=personajeDos.fallo+1;
          }
        }
      }
    } while (personajeUno.health > 0 && personajeDos.health > 0);

    ganador(personajeUno, personajeDos);
    
  }
  
  
}
function generateFileLog(logs, filename) {
    const fs = require("fs");
    fs.writeFile(filename, logs, (err) => {
    if (err) throw err;
    });
    }

pelea(personajeUno,personajeDos);

generateFileLog(archivo, "logs_batalla.txt");

