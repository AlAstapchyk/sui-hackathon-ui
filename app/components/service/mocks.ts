export interface PackageInfo {
  packageAddress: string;
  packageImg: string;
  packageName: string;
}

export interface ProjectInfo {
  projectName: string;
  imgUrl: string;
  socialWebsite: string | null;
  socialDiscord: string | null;
  socialTwitter: string | null;
  socialTelegram: string | null;
  currTvl: number;
  volume: number;
  volumeChange: number;
  txsCount: number;
  poolsCount: number;
  packages: PackageInfo[];
  isIndexed: boolean;
}

export interface PageableSort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: PageableSort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MockResponse {
  content: ProjectInfo[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageableSort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const mockResponse: MockResponse = {
    "content": [
      {
        "projectName": "Momentum",
        "imgUrl": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
        "socialWebsite": "https://app.mmt.finance/trade",
        "socialDiscord": null,
        "socialTwitter": "https://x.com/MMTFinance",
        "socialTelegram": null,
        "currTvl": 60175877.705845945,
        "volume": 15016634.827291045,
        "volumeChange": -15.253154311654963,
        "txsCount": 33175,
        "poolsCount": 101,
        "packages": [
          {
            "packageAddress": "0x0307bcac69a2b657cd7d06b895d290cfaa728a243a4119e01a9300535943aac2",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 24"
          },
          {
            "packageAddress": "0x1a84ec20523396bcd536a3a2405a6f7cacf9c80506b39196ca0d3c9fe4dbf28e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 26"
          },
          {
            "packageAddress": "0x22593b7c18b3204c6afa992e47bd9607accc36e6f84e5261540324e4beda9931",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 19"
          },
          {
            "packageAddress": "0x23ecc2b1c55a7e1c1c1e5091afee8ffdbbfc7b044d059d536804ad050c0c39f5",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum VeToken"
          },
          {
            "packageAddress": "0x27eceecfbf2cf5de8dc1f5aa212c3bb7a27e8179d3de3c5b3ad623c8ee507565",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 20"
          },
          {
            "packageAddress": "0x2b6602099970374cf58a2a1b9d96f005fccceb81e92eb059873baf420eb6c717",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "xSUI"
          },
          {
            "packageAddress": "0x2f7be74dd9c3dcc37b2108de4e9491bbac3d6a8f0a2181146ea24b690269e175",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 25"
          },
          {
            "packageAddress": "0x35169bc93e1fddfcf3a82a9eae726d349689ed59e4b065369af8789fe59f8608",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "MMT Coin"
          },
          {
            "packageAddress": "0x40a75086cf3902b3bae80aba77f01e8aea44ef60d319a8017c7a5c081f8f8b43",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 17"
          },
          {
            "packageAddress": "0x57edac79459db7e85f8901c089582e35626916a164987d1b1e3aad910b2ac871",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 21"
          },
          {
            "packageAddress": "0x5ffa593f329dd0222a7bc2e87ebbc2b45a6bba3c49ce2586c718f518b89673e6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 6"
          },
          {
            "packageAddress": "0x60e8683e01d5611cd13a69aca2b0c9aace7c6b559734df1b4a7ad9d6bddf007b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@mmt/clmm-core"
          },
          {
            "packageAddress": "0x666eb9ee40bd5bb7da0e70c92ebcb98d1759d12b2041d581632d983e2ac69d09",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@hydee-test/hydee-coin-14"
          },
          {
            "packageAddress": "0x70285592c97965e811e0c6f98dccc3a9c2b4ad854b3594faab9597ada267b860",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@mmt/clmm-core"
          },
          {
            "packageAddress": "0x73e0fb1526c675dc5de0d97dc3fd7d23878d95307860828898e09e25f40b5562",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 23"
          },
          {
            "packageAddress": "0x7c818f1cf0aa440d5214b696f324c84925be25dad3fc93800be66384d744501f",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 11"
          },
          {
            "packageAddress": "0x7c8f4a3da3837c1e1ee1b149a2598ebd0798467512e866bcbeffb7ccb210b704",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 15"
          },
          {
            "packageAddress": "0x7e3b25dd846b021669c7385b8854f05b873203a3897115370ed0d08438f461eb",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 28"
          },
          {
            "packageAddress": "0x81ca76cc0a803d43095b2104c916a759ab196734dba4995e1f2b40d2e6801cdb",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 10"
          },
          {
            "packageAddress": "0x83fac291dcd679debd626d8ba5739d68f76c353df80c36b3fb93f0d748dae8b7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 8"
          },
          {
            "packageAddress": "0x86055aa54eb7edb9b9b20ef732d1a4033c07359e8b671f11c768ea9d3433309e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 14"
          },
          {
            "packageAddress": "0x8add2f0f8bc9748687639d7eb59b2172ba09a0172d9e63c029e23a7dbdb6abe6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Slippage"
          },
          {
            "packageAddress": "0x8d4ad6da4b10ee57d1c906bd1e603ad4a2a0b316755df264428a36c79abbe259",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 30"
          },
          {
            "packageAddress": "0x956ba937cf0b4350a4ac061ec7639619986af480538472e20122dac99c43302a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 29"
          },
          {
            "packageAddress": "0x9c12f3aa14a449a0a23c066589e269086f021a98939f21158cfacb16d19787c3",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@mmt/clmm-core"
          },
          {
            "packageAddress": "0xa2826088f9c1c483bc7428c7bbb61a2665c06902787117cd7018e431383cdc88",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 18"
          },
          {
            "packageAddress": "0xa8f5751fb9965c68652884852b70c92bc407a66c2bf055e5a502f265709eb94a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 12"
          },
          {
            "packageAddress": "0xa9dd4392715b74275ee47e904493e3cbb6fbd7e1753e09b881c5f6b289cccdda",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 13"
          },
          {
            "packageAddress": "0xaa91fde4c2f18e825c361e7f658bd74487a9faa3246e392945089a2c43aa7f10",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 16"
          },
          {
            "packageAddress": "0xb62bbdb7bfe17327c03882b13ec0b3a29a455f737b60c3b583745349117e9104",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 7"
          },
          {
            "packageAddress": "0xc76aed73036b12ed7e94fe70c64b9cd06a380037b3f6001feb17e389a5201b08",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 5"
          },
          {
            "packageAddress": "0xc84b1ef2ac2ba5c3018e2b8c956ba5d0391e0e46d1daa1926d5a99a6a42526b4",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@mmt/clmm-core"
          },
          {
            "packageAddress": "0xcf60a40f45d46fc1e828871a647c1e25a0915dec860d2662eb10fdb382c3c1d1",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "@mmt/clmm-core"
          },
          {
            "packageAddress": "0xdb4f99394cb32de5f48e0be6435c1a6b01552bd10607a7a249f14a3a1faf09f5",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 4"
          },
          {
            "packageAddress": "0xe8d1a35705fc9e0bba2682504093b0abc86e50a18317685d79101e833716821f",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 22"
          },
          {
            "packageAddress": "0xf898e92c797110585c0c5ef1180795cff337cdc561d6ce6ae5926a61e4880894",
            "packageImg": "https://strapi-dev.scand.app/uploads/Momentum_logo_2f4bd6f8e9.jpg",
            "packageName": "Momentum 27"
          }
        ],
        "isIndexed": true
      },
      {
        "projectName": "Cetus",
        "imgUrl": "https://strapi-dev.scand.app/uploads/Cetus_f2d8b47579.png",
        "socialWebsite": "https://www.cetus.zone/",
        "socialDiscord": "https://discord.com/invite/cetusprotocol",
        "socialTwitter": "https://twitter.com/CetusProtocol",
        "socialTelegram": "https://t.me/cetusprotocol",
        "currTvl": 57089737.222388275,
        "volume": 28608316,
        "volumeChange": -35.7,
        "txsCount": 136699,
        "poolsCount": 41642,
        "packages": [
          {
            "packageAddress": "0x2eeaab737b37137b94bfa8f841f92e36a153641119da3456dec1926b9960d9be",
            "packageImg": "https://strapi-dev.scand.app/uploads/Cetus_f2d8b47579.png",
            "packageName": "Cetus 5"
          },
          {
            "packageAddress": "0x886b3ff4623c7a9d101e0470012e0612621fbc67fa4cedddd3b17b273e35a50e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Cetus_f2d8b47579.png",
            "packageName": "Cetus 3"
          }
        ],
        "isIndexed": true
      },
      {
        "projectName": "Bluefin",
        "imgUrl": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
        "socialWebsite": "https://bluefin.io/",
        "socialDiscord": "https://discord.gg/bluefinapp",
        "socialTwitter": "https://twitter.com/bluefinapp",
        "socialTelegram": "https://t.me/bluefinapp",
        "currTvl": 44467670.61330035,
        "volume": 38413551.63542939,
        "volumeChange": -23.96732568608003,
        "txsCount": 109421,
        "poolsCount": 305,
        "packages": [
          {
            "packageAddress": "0x00802c52b34423ce62437fdf9a351c8869efd63674b506a5c190608567cdbca2",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps"
          },
          {
            "packageAddress": "0x039146aa464eb40568353e0d8e4c38455ef5781d964ffc9fef4eb5ae023cac58",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 36"
          },
          {
            "packageAddress": "0x09158d5c8bd1a0d333ed7a639dbebf34084f4eefcf16e641821c20ad413d6791",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 19"
          },
          {
            "packageAddress": "0x0e7cf87eac7ee363aa8fd86a09614e75b4680c07bbf1285c153ccd48808d8320",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 21"
          },
          {
            "packageAddress": "0x1f1d8e23a47ab96f6c4cb0b288a5ab820387d4e9ad21902eae10610317766191",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 7"
          },
          {
            "packageAddress": "0x1ff88600e151bcbee426f98d3d82880b8999d144e48e2dc66a52c5f76bfd4c53",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 6"
          },
          {
            "packageAddress": "0x2418ce0581d912bfbdbdf5017ab65f4276710c12d1e2adbbb0f3bb9681de1ac7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 2"
          },
          {
            "packageAddress": "0x24f341be244d64302ea02f3b9fe808105de459ffa6e0b16070b90b82517d9c2d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 38"
          },
          {
            "packageAddress": "0x2833f76c174f9013c737abc9d6ce61c5ea3f2564cec046aaedab24483d762c71",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 25"
          },
          {
            "packageAddress": "0x2e3ad81c2c7c9afff77d42b1174abafacf03d5499514eb976a9d84029909b946",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 10"
          },
          {
            "packageAddress": "0x2e66f4c66977ea85c6a7fc4135cc735d51b14ba41adbaa8b09cf091a099d2f73",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 29"
          },
          {
            "packageAddress": "0x32aa028e969791f031a9c0b7e2d603c48079207cd64f8f4d6785fa35a72abe1d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 21"
          },
          {
            "packageAddress": "0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 1"
          },
          {
            "packageAddress": "0x35e16744133c77a59a351d054ab7bd6291ba589d2fa98a898070b404e1bf058d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 8"
          },
          {
            "packageAddress": "0x406f52151e7dd65addd93b0bdad7989e82aec20c3ae6971954a5140f14a59e4b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 19"
          },
          {
            "packageAddress": "0x4564e74f74005504f3948209cc966399f677bd9351c10f0d8346d3b986433d22",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 18"
          },
          {
            "packageAddress": "0x49f4bc2463c4dc079bd65940bc3122b4e00deb9ba27c865a61cfec81475652ce",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 11"
          },
          {
            "packageAddress": "0x4d8366a31b65feb7a87aafc090fb24dfb5c99dc21b72fda8aa0c602fe4933a1a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 14"
          },
          {
            "packageAddress": "0x4f959b308f0e142630f6ff427ac6ca043fb08aad9eceeea1e4fe0aff1f3841a9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 9"
          },
          {
            "packageAddress": "0x5b56670bd327ee6329c827bb5a0f9d3fa0f1afc06f96fd6badab79e022d96254",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 12"
          },
          {
            "packageAddress": "0x5d029d551d589105a9589e47ef75ffaa43e6d9d1d844745867db2a56e18f65e1 ",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 14"
          },
          {
            "packageAddress": "0x666b7f553c139b31cd38a7e9f758db9487c7706cc99e28ecb9135d222605731d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 12"
          },
          {
            "packageAddress": "0x6684200afca05335b2accbc60e6e25d52d9256c7505952bf0bd2aa46ab0bd996",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 22"
          },
          {
            "packageAddress": "0x67b34b728c4e28e704dcfecf7c5cf55c7fc593b6c65c20d1836d97c209c1928a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 10"
          },
          {
            "packageAddress": "0x6a40253ed51bb476a27e5e723246bea50e4c265503d11be8d31134bf757f9bd9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 5"
          },
          {
            "packageAddress": "0x6c796c3ab3421a68158e0df18e4657b2827b1f8fed5ed4b82dba9c935988711b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 18"
          },
          {
            "packageAddress": "0x6cb82e162519a01b36e6a30d9813e877dc6d14282bd5436407d7a5e217b5efbe",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 4"
          },
          {
            "packageAddress": "0x6ec034791b953f5b35f8d8398863da4e4cb799f922fafbdd705aa70012d7a0a1",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 24"
          },
          {
            "packageAddress": "0x702301e7c6ca527a6f6a83f12c5edf2dcd6ec7a23fb5318ec86d88282eab7057",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM"
          },
          {
            "packageAddress": "0x734fd47f7f1de591ed697d4e976edfa8f38e53010cf6365190db2982bc5b88c8",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 34"
          },
          {
            "packageAddress": "0x7b2677012b4d8229561aee01816552056695cf273f120f1e08cf4ac49c7a601d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 26"
          },
          {
            "packageAddress": "0x8549ae19988f8bec5081467e12dea8c391e9d0e9934d53f36c2da8481249c3f0",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 5"
          },
          {
            "packageAddress": "0x881c0b3063349fb98ce775d66e99f2222064aec29c9173f1addd8b1a20bcff51",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 8"
          },
          {
            "packageAddress": "0x88cea843470137111ba4d4b64258502a38f376b64b7ba97614ad16769f44b721",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 31"
          },
          {
            "packageAddress": "0x89f5f014153b7f7aad82335d635e8b5031216b0f87a260610611f39489a0530c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 20"
          },
          {
            "packageAddress": "0x8abd42808288e8edcf18d9b0d90575b6e7764bfc07854d7891c35f7e6b0936a8",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 6"
          },
          {
            "packageAddress": "0x8beb649d6a66b26d81682bee103698d0987004f3653151e1b439a23abb670dbe",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 17"
          },
          {
            "packageAddress": "0x902a45a7372036cef7ecfc038ff3e4a4902448aea775a6f6f99ad75268dc442d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 9"
          },
          {
            "packageAddress": "0x9633d611ea4b3a30751135cede2c7871980955473c1c7c883d43567e7e9b164e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "BluefinX 2"
          },
          {
            "packageAddress": "0x9added62ef3a869653ef13e754d51fb62adc9f93e2717d2e23ba1214c4ef8d15",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 6"
          },
          {
            "packageAddress": "0xa06da522cc0f6a9b90e3b1b5bd4289e0943b3720d5eae0c364f71a9133c5add3",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 30"
          },
          {
            "packageAddress": "0xa31282fc0a0ad50cf5f20908cfbb1539a143f5a38912eb8823a8dd6cbf98bc44",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 7"
          },
          {
            "packageAddress": "0xac7dcfa5fe0fecdbc2020842ac414df621d8047ebac14d1513f4f14fc62c2998",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 17"
          },
          {
            "packageAddress": "0xadb6637d83439b7fc8bf3720add5786f480454003220d8a7078f321dc270bea9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 33"
          },
          {
            "packageAddress": "0xafa22fb0bf987fe79886fe7fc9a670348ff247c6cf897d2a7d01403bad6c547d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 13"
          },
          {
            "packageAddress": "0xb104ecc75397f3a65735ef26c85a037da1d197e26f4f275a9990a577ba0e6c4c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 3"
          },
          {
            "packageAddress": "0xba8eab09ab60204ced2c129d3fd3a8a5fccc49272702ebbc965c69664dd1dcc9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 23"
          },
          {
            "packageAddress": "0xbbfbc8ce1b1b7d77b74d77f3c7251ebfbe581023865ac5b1a7b454afc7cd9fb9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 11"
          },
          {
            "packageAddress": "0xbc70b10012a01c00fda8957dbaa1f2b83683414f55e22341792b081fdffa9baa",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 2"
          },
          {
            "packageAddress": "0xbe89d6ecf91fea245164e5e8ed5a6cc8af4e9361b8a9e33dbaf7316af0dc7732",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 5"
          },
          {
            "packageAddress": "0xbeec8a336d75b1c556d986e2138ad31ce5686098951efa904302ac4f1ffc972c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 22"
          },
          {
            "packageAddress": "0xbf8ccc28a4ef26e8f5f5ea384096c52a38552a9cd84306294631ece2348bb2cf",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 16"
          },
          {
            "packageAddress": "0xc070b3ed0f56b2b3cfb1588baca192ddc6b99124c5ea034cb4784b1849959c64",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 13"
          },
          {
            "packageAddress": "0xc286fc1c693cc417a7041586fff7dd3f69e05b40d16653bf18dfbb7c10eb9af9",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 15"
          },
          {
            "packageAddress": "0xc9ba51116d85cfbb401043f5e0710ab582c4b9b04a139b7df223f8f06bb66fa5",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 1"
          },
          {
            "packageAddress": "0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 3"
          },
          {
            "packageAddress": "0xd157c8ad23a731650432c7dba7fac087920ebed9b95f695877203bca6dd68b72",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 32"
          },
          {
            "packageAddress": "0xd2e0a69a4008467896b8351c40ac51845b759a149413e1abb2484d807294c98e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 3"
          },
          {
            "packageAddress": "0xd70bab776625da80d7fe0305b2805f9e62675e87d4e72b832809d43ac94be47f",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 4"
          },
          {
            "packageAddress": "0xdd225fd8154dc924e21074383e9cefb8092e23b6d1eff82cbccdf529f6411c9e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 7"
          },
          {
            "packageAddress": "0xe00ac58266cc21db8ad42e7b4e9b2b080a7fb2252c914de5b64675db90e06f72",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 28"
          },
          {
            "packageAddress": "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Token"
          },
          {
            "packageAddress": "0xe1c74115896c6d66e7e9569f767628bf472584eea69cbc7ebe378430866b1c86",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "BluefinX 1"
          },
          {
            "packageAddress": "0xe238f46c63c8d3e4a9c104731ff0e3ca830660314789964d3ae53808084a50a0",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 37"
          },
          {
            "packageAddress": "0xe66ed63bb3d7eef41d097f4f4b9c47d892b2b553e6635257cfe6b815ee58eb16",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 35"
          },
          {
            "packageAddress": "0xe74481697f432ddee8dd6f9bd13b9d0297a5b63d55f3db25c4d3b5d34dad85b7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 20"
          },
          {
            "packageAddress": "0xe82353753b719d81890fc98a6b9d809d4b2531a90cd5f68fbdc89d4292e53bf2",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 8"
          },
          {
            "packageAddress": "0xe87556edde517fa4350e1ea106c57856cc056020fce7a9b6aeb3ff66922c424b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 27"
          },
          {
            "packageAddress": "0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 4"
          },
          {
            "packageAddress": "0xf4f109df3ca7b7cf0ed0770a768532d8a78bbc8827a66a4fc7c2ab18856716ab",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin Perps 2"
          },
          {
            "packageAddress": "0xf81a0ec18e61854cf8e15a9b1555de6646233eced1f90f6a75faa8e7cfb4a512",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin"
          },
          {
            "packageAddress": "0xf8870f988ab09be7c5820a856bd5e9da84fc7192e095a7a8829919293b00a36c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "BluefinX"
          },
          {
            "packageAddress": "0xf91d066ba9bc698251289b5c95691b664be7bc650058372ca9c4961b43bd3206",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 23"
          },
          {
            "packageAddress": "0xfba1917d0218b13dff7e786a9961295455f92153cad372554c9c30b30827bae6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin 1"
          },
          {
            "packageAddress": "B62qqzDAvcnNrwbj8RbU6LQ7LYRmnZQiLyK8kgUX7KPqGkKHBHxNjqp",
            "packageImg": "https://strapi-dev.scand.app/uploads/Bluefin_logo_new_8d0ad019a8.jpg",
            "packageName": "Bluefin AMM 9"
          }
        ],
        "isIndexed": true
      },
      {
        "projectName": "Magma Finance",
        "imgUrl": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
        "socialWebsite": "https://magmafinance.io/",
        "socialDiscord": "https://discord.gg/EZ7MFfn7DJ",
        "socialTwitter": "https://x.com/Magma_Finance",
        "socialTelegram": null,
        "currTvl": 27596667.333177462,
        "volume": 59409412.72842497,
        "volumeChange": 2.2779487269338397,
        "txsCount": 84632,
        "poolsCount": 100,
        "packages": [
          {
            "packageAddress": "0x00e1fa55e6c7b893684b85b60e228437b29b66a951fb22402548b0bf00f8b6f2",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 13"
          },
          {
            "packageAddress": "0x01268a2afbaf91538f0b9041269fe2780273eb83b642abd4fcacad7b660a3711",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 7"
          },
          {
            "packageAddress": "0x0a9b94307de472ebe7c1a24ea862eb013d954c9c003a0484e045861d05b31435",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 6"
          },
          {
            "packageAddress": "0x0aa212abff1ea21273912720f3031634ec1d65065a1d52eb3140b9d41b45a0cb",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "@magma-finance/magma-clmm"
          },
          {
            "packageAddress": "0x0bceebd912ac54077bf72fe08bc731cffc65866506ba82fa730cfc2deba53f24",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 26"
          },
          {
            "packageAddress": "0x183af2adf115f331105825ae63e1d7d3c848d67beb4d60bc36208a90a5e92f4b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "@magma-finance/magma-clmm"
          },
          {
            "packageAddress": "0x1cb7b329ad70808d67401b84aac86823f9e0a117b3f10758cf474a19a6b966f4",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 6"
          },
          {
            "packageAddress": "0x276c10928360a6a4519a30b4ef648cbdd862174e341dfeaa68f4d6605e5c2e6c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 5"
          },
          {
            "packageAddress": "0x2de81c0f5cc2aa176da9f093834efbf846d581afa46516bf4952b6efd3a44992",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 3"
          },
          {
            "packageAddress": "0x2e704d8afc1d6d7f154dee337cc14c153f6f9ce1708213e5dc04a32afe0e45f1",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance"
          },
          {
            "packageAddress": "0x371953ac3c515695d04d1c77238ba9b0f251564ef8cf4b69d9261027d4f04fcf",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance integer-mate"
          },
          {
            "packageAddress": "0x3a763e0b5fc83c56cfcfd260d8fd68b4b78dee0371cde97d4aba19933b0c2f20",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 1"
          },
          {
            "packageAddress": "0x3e5412c072c805249ad38d62e5b773d4f77e85698eaff35952c988496b92481b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 12"
          },
          {
            "packageAddress": "0x49e9f06c58a36830fe0d83291f002012e72b00a4ec9b3a6304c40fc5712bb6e3",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance integer-mate 1"
          },
          {
            "packageAddress": "0x4a35d3dfef55ed3631b7158544c6322a23bc434fe4fca1234cb680ce0505f82d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "@magma-finance/magma-clmm"
          },
          {
            "packageAddress": "0x4c4e1402401f72c7d8533d0ed8d5f8949da363c7a3319ccef261ffe153d32f8a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance config object bump"
          },
          {
            "packageAddress": "0x52153c6d405a1381eab14954ad9a1936ec5f7c4a88a02e226240dfe2bb3c9551",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 9"
          },
          {
            "packageAddress": "0x58519a5427fbe0efc25f534bfc81225cfc3b3ab0360d63aa02f6b9f00b8237ee",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 10"
          },
          {
            "packageAddress": "0x5f40da851d866d2adb350214188a60d2aee8d33304ea738fa39261fdf310e083",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 12"
          },
          {
            "packageAddress": "0x648c5bfc2013f2c6fc0d64c5215506a3d2e54aa5edb646a9d7329dc934ea5903",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 22"
          },
          {
            "packageAddress": "0x659c0e9c4c8a416f040fa758d4fc4073a5fdd1fed97edadcd5cba5180fb36246",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 1"
          },
          {
            "packageAddress": "0x682eaba7450909645bf949db3fc5881432a00b49b4c06d6974ecc4ee684e7992",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 2"
          },
          {
            "packageAddress": "0x6cce83171f8b620917cd24b662f87136a79b4c9a07368d771d1e849a22d523e2",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 15"
          },
          {
            "packageAddress": "0x77121acf963c9e5d9531a37c0965811ae827b3fbb5b9689880ae36ae8fb9ed06",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 25"
          },
          {
            "packageAddress": "0x7c369062640451c79e4e8ef7540df7540d88a002d04c91ee37c771997739963f",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 16"
          },
          {
            "packageAddress": "0x807496cfd5b5b92840539a52c621898f9f33c1373cc069b5e93c07f7cd3b8ffa",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 14"
          },
          {
            "packageAddress": "0x951d48bece7f6c2a3f4ba0b5791ba823c491e504feb4136497ee51331208ac33",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 7"
          },
          {
            "packageAddress": "0x97aa7a842f53ccafc3514fb875fee9b9cd65cf9e6e39087ee327c94f77a4e319",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 8"
          },
          {
            "packageAddress": "0x9c5df0074051b843b739fa2f16250008fdf1edf39de1e1e78f76e4285a789293",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 18"
          },
          {
            "packageAddress": "0x9fe3e3848da100ce9c55481490d06969f6ee09e024756c0bfeec61b91cad5b7a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 14"
          },
          {
            "packageAddress": "0xa24558278d929dd9f439941ef90c684d66a6ea2d5d88091410ecb1f0f984cd90",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 8"
          },
          {
            "packageAddress": "0xa4ceb3319e8790520c53aef2e1197a41c18c4bfedaf05bcef490bee7fd436f59",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 3"
          },
          {
            "packageAddress": "0xa8b3dbe60b27160e2267c237759dd26f1dfe04e3f2d7cb0fc235a1497bdbfc09",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 20"
          },
          {
            "packageAddress": "0xaca73f4629398bc022673b7923d8dfe9be5a30be99290cb648a5c9330ec97097",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 28"
          },
          {
            "packageAddress": "0xb3756bbb3939af23424a56690637c10d3280c44358f08a2ba88f89bea92419e5",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 4"
          },
          {
            "packageAddress": "0xb37c47b69844e80738e95dbbdb26b6eda77c3eab0396618e96be581389c0cbcd",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 2"
          },
          {
            "packageAddress": "0xb739751c5704a3e0262c63f058b1a9e9ea894988ff57e3caec1e73e097388035",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 11"
          },
          {
            "packageAddress": "0xb879e862c8253a4e223c11bd49ce1c5a73ab2cb4ad6ac56ec8ae2b312307c06b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 9"
          },
          {
            "packageAddress": "0xbe7ec2115a749b73d270178bf401f7f41053bfc336df948fa55ce94f9d8e71b7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 5"
          },
          {
            "packageAddress": "0xc7f4524aad685d7a334b559aea1a1464287a2a62d571243be1877ef53e2a916b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 11"
          },
          {
            "packageAddress": "0xc9f008794e70543443bb49bc9719120a6d43bb2cf6b522ec924f495a36b7e69e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 10"
          },
          {
            "packageAddress": "0xcde69fa7a6326d2f14485251f875eb7cc445e1e8e48f59ac5ed4808fab847190",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 19"
          },
          {
            "packageAddress": "0xdac21867681f9fae6e5d1e38aac5dd1ec31f2a2035bd3958bf437ee750c5bf1a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 21"
          },
          {
            "packageAddress": "0xe383f0d29843ab5f9f38aa7a06d8b510a290653c4736a41e01f736ba468f6fd6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "@magma-finance/magma-clmm"
          },
          {
            "packageAddress": "0xfa0e2d4afab23c5947ed9057cfc87c886324ce1fc0738af4820a88b1a48f503e",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test"
          },
          {
            "packageAddress": "0xfbd9d2e9d8da997677f79767b2ce561dff9fbf1d3cb7b9b87ea31122de173f21",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 17"
          },
          {
            "packageAddress": "0xfd1d5933299efbffdf401494bbda1ac88a088306ba68473ae332634547f2f6d3",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma test 13"
          },
          {
            "packageAddress": "0xfd4fb46fa9cab466edbc46e95c9f647644018022780041b53c0f39602dfb8d8a",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 23"
          },
          {
            "packageAddress": "0xfde88a12499e21ab6cd447c621b107dac538fa727976323e5b8c3cdf8b54cab8",
            "packageImg": "https://strapi-dev.scand.app/uploads/Magma_Finance_logo_7cd45acadb.jpg",
            "packageName": "Magma Finance 27"
          }
        ],
        "isIndexed": true
      },
      {
        "projectName": "Ferra",
        "imgUrl": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
        "socialWebsite": "https://ferra.ag/",
        "socialDiscord": "https://discord.gg/ferra",
        "socialTwitter": "https://x.com/ferra_protocol",
        "socialTelegram": null,
        "currTvl": 10847261.757627023,
        "volume": 2199392.5644195774,
        "volumeChange": -35.77182694894318,
        "txsCount": 6442,
        "poolsCount": 145,
        "packages": [
          {
            "packageAddress": "0x01aca2702b2402f13eacdf9f3e49f5d1bdd3ec5cc7d11847cf8acbaef1cb6d5c",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra DLMM 2"
          },
          {
            "packageAddress": "0x09c6c8b7ebf4c46d8bc9189168d944da5fcb6823bcfd739af71e128550c57292",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 7"
          },
          {
            "packageAddress": "0x1dd5538aeb1066315969d87ae9a920ce2692824385342f49854b764ac730a64b",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": " Ferra 4"
          },
          {
            "packageAddress": "0x5a5c1d10e4782dbbdec3eb8327ede04bd078b294b97cfdba447b11b846b383ac",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra DLMM 1"
          },
          {
            "packageAddress": "0x7817e0a3dfcbf204d0bebe98b8853771bcff308982c2af4e3ff4f5730ae926a7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 2"
          },
          {
            "packageAddress": "0x8de2a865fe7c4c8b7961d4a4dfbae8b6bc22320a6f4496c5f59759ed8f514eb6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 1"
          },
          {
            "packageAddress": "0x9ef2ac77f654d9ac048883150017cf82341471a717f3b901394dce368fbc069d",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 3"
          },
          {
            "packageAddress": "0xb420870e34cf37353a2ead5c1385ec757034e6b354d725e6055fe7c06ba7caea",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra Jacuzzi Badge"
          },
          {
            "packageAddress": "0xb4afb11d22a544653509b8bbcc07d2076006067eddf14618d7c2cb4499ad1686",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra"
          },
          {
            "packageAddress": "0xc895342d87127c9c67b76c8ad7f9a22b8bfe1dcdc2c5af82bd85266783115e31",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra CLMM"
          },
          {
            "packageAddress": "0xe19a74728854cd996c7d26b8ced51ecbc2bb655ce33bb3976992b638fcb9dfe6",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 6"
          },
          {
            "packageAddress": "0xec79d3636f0dc48e0aa8977322f62370cf39d0894642f4c1ceceab372ffb11c7",
            "packageImg": "https://strapi-dev.scand.app/uploads/Ferra_logo_65153b78da.jpg",
            "packageName": "Ferra 5"
          }
        ],
        "isIndexed": true
      }
    ],
    "pageable": {
      "sort": {
        "sorted": true,
        "empty": false,
        "unsorted": false
      },
      "pageNumber": 0,
      "pageSize": 5,
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "last": false,
    "totalPages": 16,
    "totalElements": 79,
    "size": 5,
    "number": 0,
    "sort": {
      "sorted": true,
      "empty": false,
      "unsorted": false
    },
    "first": true,
    "numberOfElements": 5,
    "empty": false
  }