import { ApolloServer } from "@apollo/server";
import { GraphQLError } from "graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type User {
    nick: String!
    pwHash: String!
    profileType: String!
    wallet: Int!
  }
    
  type Bet {
    nick: String!
    team: String!
    amount: Int!
    ts: Float!
    result: String!
  }

  type Team {
    name: String!
    position: Int!
    round1: Int!
    round2: Int!
    round3: Int!
  }

  type Query {
    userLogin(nick: String!, pwHash: String!): User
    getTeams: [Team]!
    getTeam(position: Int!): Team!
    findUser(nick: String!): User!
    getBets(nick: String!, result: String): [Bet]!
    getBet(nick: String!, team: String!): Bet
    checkWinner(match: Int!): Team!
  }

  type Mutation {
    addUser(
      nick: String!
      pwHash: String!
      profileType: String!
      wallet: Int!
    ): User

    updateAddToUserWallet(
      nick: String!
      amount: Int!
    ): User

    addBet(
      nick: String!
      team: String!
      amount: Int!
    ): User

    deleteBet(
      nick: String!
      team: String!
    ): User

    updateTeam(
      name: String!
      newName: String
      round1: Int
      round2: Int
      round3: Int
    ): Team

    updateWallets(team: String!): Int

    clearPoints: Boolean
  }
`;

const users = [
  {
    nick: "admin",
    pwHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    profileType: "admin",
    wallet: 999999,
  },
  {
    nick: "claudio",
    pwHash: "8cface989a3a91edb14989e82ff3ab67cfd3046906d0cee828f8882a8e137823",
    profileType: "user",
    wallet: 50000,
  },
];

const bets = [];

const teams = [
  {
    name: "A",
    position: 0,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "B",
    position: 1,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "C",
    position: 2,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "D",
    position: 3,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "E",
    position: 4,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "F",
    position: 5,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "G",
    position: 6,
    round1: 0,
    round2: 0,
    round3: 0,
  },
  {
    name: "H",
    position: 7,
    round1: 0,
    round2: 0,
    round3: 0,
  },
];

const resolvers = {
  Query: {
    userLogin: (root, args) => {
      return users.find(
        (user) => user.nick === args.nick && user.pwHash === args.pwHash
      );
    },
    getTeams: () => teams,
    getTeam: (root, args) => {
      return teams.find((team) => team.position === args.position);
    },
    findUser: (root, args) => {
      const { nick } = args;
      return users.find((usr) => usr.nick === nick);
    },
    getBets: (root, args) => {
      if (args.result && args.nick) {
        return bets.filter(
          (bet) => bet.nick === args.nick && bet.result === args.result
        );
      }
      if (args.result) {
        return bets.filter((bet) => bet.result === args.result);
      }
      if (args.nick) {
        return bets.filter((bet) => bet.nick === args.nick);
      }
      return bets;
    },
    getBet: (root, args) => {
      return bets.find(
        (bet) =>
          bet.nick === args.nick &&
          bet.team === args.team &&
          bet.result === "pending"
      );
    },
    checkWinner: (root, args) => {
      // Round 1
      const winnerMatch1 =
        teams[0].round1 > teams[1].round1 ? teams[0] : teams[1];
      const winnerMatch2 =
        teams[2].round1 > teams[3].round1 ? teams[2] : teams[3];
      const winnerMatch3 =
        teams[4].round1 > teams[5].round1 ? teams[4] : teams[5];
      const winnerMatch4 =
        teams[6].round1 > teams[7].round1 ? teams[6] : teams[7];
      //Round 2
      const winnerMatch5 =
        winnerMatch1.round2 > winnerMatch2.round2 ? winnerMatch1 : winnerMatch2;
      const winnerMatch6 =
        winnerMatch3.round2 > winnerMatch4.round2 ? winnerMatch3 : winnerMatch4;
      // Round 3
      const winnerMatch7 =
        winnerMatch5.round3 > winnerMatch6.round3 ? winnerMatch5 : winnerMatch6;

      switch (args.match) {
        case 1:
          return winnerMatch1;
        case 2:
          return winnerMatch2;
        case 3:
          return winnerMatch3;
        case 4:
          return winnerMatch4;
        case 5:
          return winnerMatch5;
        case 6:
          return winnerMatch6;
        case 7:
          return winnerMatch7;
        default:
          throw new GraphQLError("Matches go from 1 to 7", {
            extensions: {
              code: "OUT_OF_BOUND_MATCH",
            },
          });
      }
    },
  },
  Mutation: {
    addUser: (root, args) => {
      if (users.find((u) => u.nick === args.nick)) {
        return null;
      }
      const usr = args;
      users.push(usr);
      return usr;
    },
    updateAddToUserWallet: (root, args) => {
      const index = users.findIndex((usr) => usr.nick === args.nick);
      if (index === null) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }
      users[index].wallet += args.amount;
      return users[index];
    },
    addBet: (root, args) => {
      if (args.amount <= 0) {
        return null;
      }

      const bet = { ...args, ts: parseInt(Date.now()), result: "pending" };
      const duplicatedBet = bets.find(
        (bet) =>
          bet.nick === args.nick &&
          bet.team === args.team &&
          bet.result === "pending"
      );

      if (duplicatedBet) {
        throw new GraphQLError("Pending bet already exists", {
          extensions: {
            code: "DUPLICATED_PENDING_BET",
          },
        });
      }

      if (!teams.find((team) => team.name === args.team)) {
        throw new GraphQLError("Team does not exist", {
          extensions: {
            code: "TEAM_NOT_EXIST",
          },
        });
      }

      const usrIndex = users.findIndex((usr) => usr.nick === args.nick);
      if (usrIndex === null) {
        throw new GraphQLError("User does not exist", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }
      if (args.amount <= users[usrIndex].wallet) {
        users[usrIndex].wallet -= args.amount;
      } else {
        throw new GraphQLError("Not enough cash", {
          extensions: {
            code: "NOT_ENOUGH_CASH",
          },
        });
      }

      bets.push(bet);
      return users[usrIndex];
    },
    deleteBet: (root, args) => {
      const betIndex = bets.findIndex(
        (bet) =>
          bet.nick === args.nick &&
          bet.team === args.team &&
          bet.result === "pending"
      );
      if (betIndex === null) {
        throw new GraphQLError(
          "Pending bet with those arguments does not exist",
          {
            extensions: {
              code: "BET_NOT_EXISTS",
            },
          }
        );
      }
      const usrIndex = users.findIndex((usr) => usr.nick === args.nick);
      users[usrIndex].wallet += bets[betIndex].amount;

      bets.splice(betIndex, 1);
      return users[usrIndex];
    },
    updateTeam: (root, args) => {
      const teamIndex = teams.findIndex((team) => team.name === args.name);
      if (!teams.find((team) => team.name === args.name)) {
        throw new GraphQLError("Team does not exist", {
          extensions: {
            code: "TEAM_NOT_EXISTS",
          },
        });
      }

      if (args.newName) {
        bets.forEach((bet, betIndex) => {
          if (bet.team === args.name) {
            bets[betIndex].team = args.newName;
          }
        });
      }

      teams[teamIndex].name = args.newName
        ? args.newName
        : teams[teamIndex].name;
      teams[teamIndex].round1 = args.round1
        ? args.round1
        : teams[teamIndex].round1;
      teams[teamIndex].round2 = args.round2
        ? args.round2
        : teams[teamIndex].round2;
      teams[teamIndex].round3 = args.round3
        ? args.round3
        : teams[teamIndex].round3;

      return teams[teamIndex];
    },
    updateWallets: (root, args) => {
      if (!teams.find((team) => team.name === args.team)) {
        throw new GraphQLError("Team does not exist", {
          extensions: {
            code: "TEAM_NOT_EXISTS",
          },
        });
      }

      const allPendingBets = bets.filter((bet) => bet.result === "pending");
      var moneyPool = 0;
      allPendingBets.forEach((b) => {
        moneyPool += b.amount;
      });

      const allBetsWinners = bets.filter(
        (bet) => bet.result === "pending" && bet.team === args.team
      );
      const allBetsLosers = bets.filter(
        (bet) => bet.result === "pending" && bet.team != args.team
      );

      allBetsLosers.forEach((bet) => {
        const betIndex = bets.findIndex(
          (b) =>
            b.nick === bet.nick && b.team === bet.team && b.result === "pending"
        );
        bets[betIndex].result = "lost";
      });

      if (allBetsWinners.length === 0) {
        return 0;
      }

      const wins = Math.floor(moneyPool / allBetsWinners.length);
      allBetsWinners.forEach((bet) => {
        const usrIndex = users.findIndex((usr) => bet.nick === usr.nick);
        users[usrIndex].wallet += wins;
        const betIndex = bets.findIndex(
          (b) =>
            b.nick === bet.nick && b.team === bet.team && b.result === "pending"
        );
        bets[betIndex].result = "won";
      });

      return wins;
    },
    clearPoints: () => {
      teams.forEach((team, index) => {
        teams[index].round1 = 0;
        teams[index].round2 = 0;
        teams[index].round3 = 0;
      });
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
