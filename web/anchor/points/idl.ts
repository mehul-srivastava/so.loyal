export type PointsPage = {
  version: "0.1.0";
  name: "points_page";
  instructions: [
    {
      name: "initializePage";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "pageAccount";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "price";
          type: "f32";
        },
        {
          name: "points";
          type: "u32";
        },
        {
          name: "image";
          type: "string";
        },
      ];
    },
    {
      name: "updatePage";
      accounts: [
        {
          name: "pageAccount";
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "price";
          type: "f32";
        },
        {
          name: "points";
          type: "u32";
        },
        {
          name: "image";
          type: "string";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "pointsPage";
      type: {
        kind: "struct";
        fields: [
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "price";
            type: "f32";
          },
          {
            name: "points";
            type: "u32";
          },
          {
            name: "image";
            type: "string";
          },
        ];
      };
    },
  ];
};

export const IDL: PointsPage = {
  version: "0.1.0",
  name: "points_page",
  instructions: [
    {
      name: "initializePage",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "pageAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "price",
          type: "f32",
        },
        {
          name: "points",
          type: "u32",
        },
        {
          name: "image",
          type: "string",
        },
      ],
    },
    {
      name: "updatePage",
      accounts: [
        {
          name: "pageAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "price",
          type: "f32",
        },
        {
          name: "points",
          type: "u32",
        },
        {
          name: "image",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "pointsPage",
      type: {
        kind: "struct",
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "price",
            type: "f32",
          },
          {
            name: "points",
            type: "u32",
          },
          {
            name: "image",
            type: "string",
          },
        ],
      },
    },
  ],
};
