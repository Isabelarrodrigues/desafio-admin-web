/**
 * Este Script tem como objetivo gerar dados para atender o desafio Front-end Admin. As informações
 * são processadas de forma randômica, ou seja, a cada nova geracão um novo valor é retornado.
 * A informação gerada pelo mesmo servirá somente para estudo e implementacão do desafio apresentado.
 * O mesmo apresenta dados fictícios que nao condizem com a realidade.
 *
 * Para rodar o mesmo será necessário
 * 1- npm install -g ts-node
 * 2- ts-node .\generator.ts
 * 3- console.log(getUsers());
 */

const fs = require("fs");

const references = {
  users: [
    "Lucas da Silva",
    "Tiago Rodrigues",
    "Rafael Ribeiro",
    "Leonardo",
    "Rafaela Ferreira",
    "Pelican Pier",
    "Green Birds",
    "...",
    "Lumena Dias da Fonseca Martins Rodrigues Alves da Silva",
    "Sand Caravan",
    undefined,
    undefined,
    "Luiz Rogério",
    "Alice Franco",
    "Rafael Rodrigues da Silva",
    "Amanda Almeida Imperador da Silva Pinto Rodrigues",
    "Tiago",
  ],
  features: ["card", "reset-password", "debit", "credit"],
  neighborhood: [
    "Benedito Bentes",
    "Centro",
    "Região 16",
    "Saramandaia",
    "Vila Montes Claros",
    "Cidade Nova",
  ],
  cities: [
    "Palhoça",
    "Uberaba",
    "Boa Vista",
    "Rio Branco",
    "Novo Hamburgo",
    "Santana",
  ],
  state: ["SP", "MG", "RJ", "AP", "AL"],
};

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getAnalysts = () => {
  const analysts = references.users
    .map((_, index) => ({
      id: generateRandomNumber(1, 10000),
      user_id: index,
    }))
    .slice(-3)
    .map((value, index) => ({
      ...value,
      email: `admin${index}@gmail.com`,
      password: `admin${index}`,
    }));

  analysts[0] = { ...analysts[0], roles: ["n1", "n2"] } as any;
  analysts[1] = { ...analysts[1], roles: ["n1"] } as any;
  analysts[2] = { ...analysts[2], roles: ["n2"] } as any;

  return analysts;
};

const generateRandomNumber = (min: number, max: number) => {
  const value = Math.round(Math.random() * (max - min) + min);

  return value;
};

const onlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
};

const getUsers = () => {
  return references.users.map((value, index) => ({
    name: value,
    email:
      value !== undefined
        ? value.split(" ").join("_").toLocaleLowerCase().concat("@gmail.com")
        : "",
    BirthDate: randomDate(new Date(2012, 0, 1), new Date()),
    createdAt: randomDate(new Date(2012, 0, 1), new Date()),
    updatedAt: Boolean(generateRandomNumber(0, 1))
      ? randomDate(new Date(2012, 0, 1), new Date())
      : null,
    enabledFeatures: [
      generateRandomNumber(0, 3),
      2,
      generateRandomNumber(0, 3),
    ].filter(onlyUnique),
    document: generateRandomNumber(10000000000, 99999999999),
    metadatas: {
      validDocument: true,
      verified: Boolean(generateRandomNumber(0, 1)),
    },
    address: {
      streetNumber: generateRandomNumber(0, 1000),
      city:
        references.cities[
          generateRandomNumber(0, references.cities.length - 1)
        ],
      state:
        references.state[generateRandomNumber(0, references.state.length - 1)],
      neighborhood:
        references.neighborhood[
          generateRandomNumber(0, references.neighborhood.length - 1)
        ],
      postalCode: `${generateRandomNumber(10000, 99999)}-${generateRandomNumber(
        100,
        999
      )}`,
    },
    salaryBase: generateRandomNumber(100000, 1000000),
    id: index,
  }));
};

const getCards = () => {
  return references.users
    .map((value, index) => ({
      createdAt: randomDate(new Date(2012, 0, 1), new Date()),
      updatedAt: null,
      status: "requested", // Requested -> Approved -> Processed | Requested -> Rejected -> Canceled
      id: index + 1000,
      user_id: index,
      metadatas: {
        name: value,
        digits: generateRandomNumber(1000, 9999),
        limit: generateRandomNumber(1000, 9999),
      },
    }))
    .slice(1, references.users.length - 5);
};

const getFeatures = () => {
  const result = references.features.map((value, index) => ({
    id: index,
    name: value,
  }));

  return { result, status: 200 };
};

const getAudits = () => {
  const result = [
    {
      id: 0,
      createdAt: "2021-02-28T23:00:02.790Z",
      type: "card-status-change",
      before: {
        createdAt: "2012-12-14T11:23:05.635Z",
        id: 1001,
        metadatas: { name: "Tiago Rodrigues", digits: 4405 },
        digits: 4405,
        name: "Tiago Rodrigues",
        status: "requested",
        updatedAt: null,
        user_id: 1,
      },
      after: {
        createdAt: "2012-12-14T11:23:05.635Z",
        id: 1001,
        metadatas: { name: "Tiago Rodrigues", digits: 4405 },
        digits: 4405,
        name: "Tiago Rodrigues",
        status: "rejected",
        updatedAt: null,
        user_id: 1,
      },
      requestedBy: 11112,
    },
  ];

  return result;
};

export const db = {
  users: getUsers(),
  analysts: getAnalysts(),
  cards: getCards(),
  features: getFeatures(),
  audits: getAudits(),
};

fs.writeFile(`${__dirname}/db.json`, JSON.stringify(db), (err: any) => {
  if (err) {
    return console.log(err);
  }
});

// Executar
// console.log(getUsers());
// console.log(getAnalysts());
// console.log(getCards());
// console.log(getFeatures());
