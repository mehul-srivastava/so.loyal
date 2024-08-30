export type StampsHistory = {
  version: "0.1.0";
  name: "stamps_history";
  instructions: [
    {
      name: "initiliazeHistory";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "stampsHistoryAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "incrementHistory";
      accounts: [
        {
          name: "stampsHistoryAccount";
          isMut: true;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "stampsHistory";
      type: {
        kind: "struct";
        fields: [
          {
            name: "count";
            type: "u64";
          },
        ];
      };
    },
  ];
};

export const IDL: StampsHistory = {
  version: "0.1.0",
  name: "stamps_history",
  instructions: [
    {
      name: "initiliazeHistory",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "stampsHistoryAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "incrementHistory",
      accounts: [
        {
          name: "stampsHistoryAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "stampsHistory",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "u64",
          },
        ],
      },
    },
  ],
};
