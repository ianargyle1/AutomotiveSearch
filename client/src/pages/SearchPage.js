/**
 * @file Contains the search page
 * @author Ian Argyle
 */

import React from "react";
import { getVehicles } from "../services/getVehicles";
import VehicleSmall from "../components/VehicleSmall";
import { sortVehicles } from "../services/sortVehicles";

export default class SearchPage extends React.Component {
  state = {
    vehicles: [],
    models: ["Please select a make"],
  };
  // Information about makes and models for the dropdowns
  makesParams = [
    { make: "Select a make", models: [] },
    { make: "AC Cars", models: ["Cobra"] },
    { make: "AC Cobra", models: ["Replica"] },
    {
      make: "AM General",
      models: ["Humvee", "Kaiser", "M35A2", "M931A1", "M998"],
    },
    {
      make: "Acura",
      models: [
        "CL",
        "CSX",
        "EL",
        "ILX",
        "Integra",
        "Legend",
        "MDX",
        "NSX",
        "RDX",
        "RL",
        "RLX",
        "RSX",
        "SLX",
        "TL",
        "TLX",
        "TSX",
        "Vigor",
        "ZDX",
      ],
    },
    {
      make: "Alfa Romeo",
      models: [
        "164",
        "4C",
        "GTV-6",
        "Giulia",
        "Giulia Quadrifoglio",
        "Milano",
        "Spider",
        "Stelvio",
        "Stelvio Quadrifoglio",
      ],
    },
    { make: "Allard", models: ["J2X2"] },
    {
      make: "American Motors (AMC)",
      models: [
        "AMX",
        "Ambassador",
        "Concord",
        "Eagle",
        "Gremlin",
        "Hornet",
        "Javelin",
        "Pacer",
        "Rambler American",
        "Spirit",
      ],
    },
    {
      make: "Aston Martin",
      models: [
        "DB11",
        "DB7",
        "DB7 Vantage",
        "DB9 Volante",
        "DBS",
        "Rapide",
        "V8 Vantage",
        "Vanquish",
        "Vantage",
        "Virage",
      ],
    },
    {
      make: "Audi",
      models: [
        " Quattro",
        "80",
        "90",
        "100",
        "200",
        "4000",
        "5000",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "Allroad",
        "Cabriolet",
        "Q3",
        "Q5",
        "Q7",
        "Q8",
        "R8",
        "R8 Spyder",
        "RS 3",
        "RS 4",
        "RS 5",
        "RS 6 Avant",
        "RS 7",
        "RS Q8",
        "RS6",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "SQ5",
        "SQ7",
        "SQ8",
        "TT",
        "TTS",
        "TTS Coupe",
        "V8 Quattro",
        "e-tron SUV",
        "e-tron Sportback",
      ],
    },
    { make: "Austin", models: ["Gipsy", "Mini"] },
    { make: "Austin Healey", models: ["100", "3000", "sprite"] },
    { make: "Avanti", models: ["Convertible", "Coupe"] },
    {
      make: "BMW",
      models: [
        "1 Series",
        "2 Series",
        "3 Series",
        "4 Series",
        "5 Series",
        "524",
        "6 Series",
        "7 Series",
        "8 Series",
        "8-Series",
        "M2",
        "M3",
        "M4",
        "M5",
        "M6",
        "X1",
        "X2",
        "X3",
        "X3 M",
        "X4",
        "X5",
        "X6",
        "X7",
        "Z3",
        "Z4",
        "Z8",
        "i3",
        "i8",
      ],
    },
    { make: "BMYM", models: ["M923A2"] },
    {
      make: "Bentley",
      models: [
        "Arnage",
        "Azure",
        "Bentayga",
        "Continental",
        "Continental GT",
        "Eight",
        "Flying Spur",
        "Mulsanne",
        "TURBO-R",
      ],
    },
    { make: "Bering", models: ["LD15"] },
    { make: "Blue Bird", models: ["Bus", "T-2000"] },
    {
      make: "Buick",
      models: [
        "Allure",
        "Antique",
        "Cascada",
        "Century",
        "Electra",
        "Enclave",
        "Encore",
        "Encore GX",
        "Envision",
        "Estate",
        "LaCrosse",
        "LeSabre",
        "Lucerne",
        "Opel GT",
        "Park Avenue",
        "Rainier",
        "Reatta",
        "Regal",
        "Rendezvous",
        "Riviera",
        "Roadmaster",
        "Skyhawk",
        "Skylark",
        "Special Deluxe",
        "Special Skylark",
        "Terraza",
        "Verano",
        "Wildcat",
      ],
    },
    {
      make: "Cadillac",
      models: [
        "ATS",
        "ATS Coupe",
        "ATS-V",
        "Allante",
        "Antique",
        "Brougham",
        "CT4",
        "CT5",
        "CT6",
        "CT6-V",
        "CTS",
        "CTS-V",
        "Catera",
        "Cimarron",
        "Cimmaron",
        "Concours",
        "DTS",
        "DeVille",
        "ELR",
        "Eldorado",
        "Escalade",
        "Escalade ESV",
        "Escalade EXT",
        "Fleetwood",
        "SRX",
        "STS",
        "STS-V",
        "Seville",
        "Sixty Special",
        "XLR",
        "XT4",
        "XT5",
        "XT6",
        "XTS",
        "d'Elegance",
      ],
    },
    {
      make: "Chevrolet",
      models: [
        "1 Ton",
        "1/2 Ton",
        "12000 GVWR",
        "210",
        "1500",
        "2500",
        "3/4 Ton",
        "3500",
        "3500 LCF",
        "4500 LCF",
        "4500HD",
        "4500XD LCF",
        "5500HD LCF",
        "5500HD LCF Diesel",
        "5500XD LCF",
        "Antique",
        "Astro Van",
        "Avalanche",
        "Aveo",
        "Beauville",
        "Belair",
        "Beretta",
        "Biscayne",
        "Blazer",
        "Bolt EV",
        "C-Series",
        "C/K 1500",
        "C/K 2500",
        "C/K 3500",
        "C/K 4500",
        "C20",
        "C30",
        "CC4500",
        "CC5500",
        "CC6500",
        "CC7500",
        "Camaro",
        "Caprice",
        "Caprice Police Patrol Vehicle",
        "Captiva",
        "Cargo Van",
        "Cavalier",
        "Celebrity",
        "Chevelle",
        "Chevette",
        "Citation",
        "Citation II",
        "City Express",
        "Cobalt",
        "Colorado",
        "Commercial Cutaway",
        "Corsica",
        "Corvair",
        "Corvette",
        "Corvette Stingray",
        "Cruze",
        "Cruze Limited",
        "El Camino",
        "Equinox",
        "Express Cargo Van",
        "Express Commercial Cutaway",
        "Express Cutaway",
        "Express Passenger",
        "Fleetline",
        "Forward Control Chassis",
        "G-Series",
        "G/P",
        "HHR",
        "Impala",
        "Impala Limited Police",
        "Jimmy",
        "Kodiak",
        "LUV",
        "Lumina",
        "M-1008",
        "Malibu",
        "Malibu Hybrid",
        "Malibu Limited",
        "Malibu Maxx",
        "Metro",
        "Monte Carlo",
        "Monza",
        "Nomad",
        "Nova",
        "Optra",
        "Orlando",
        "P30",
        "Prizm",
        "R30",
        "S-10",
        "S10 Blazer",
        "SS",
        "SSR",
        "Sedan",
        "Silverado 1500",
        "Silverado 2500",
        "Silverado 2500HD",
        "Silverado 3500",
        "Silverado 3500HD",
        "Silverado MD",
        "Silverado SS",
        "Sonic",
        "Spark",
        "Spectrum",
        "Sprint",
        "Suburban",
        "Tahoe",
        "Tahoe Hybrid",
        "Tracker",
        "TrailBlazer",
        "Traverse",
        "Trax",
        "Uplander",
        "Van",
        "Vandura",
        "Vega",
        "Venture",
        "Volt",
        "W3S042 W3500 DSL REG",
      ],
    },
    {
      make: "Chrysler",
      models: [
        "200",
        "300",
        "300M",
        "Antique",
        "Aspen",
        "Cirrus",
        "Concorde",
        "Conquest",
        "Cordoba",
        "Crossfire",
        "Desoto",
        "E Class",
        "Fifth Avenue",
        "Imperial",
        "Intrepid",
        "LHS",
        "Laser",
        "Lebaron",
        "Neon",
        "New Yorker",
        "Newport",
        "PT Cruiser",
        "Pacifica",
        "Prowler",
        "Sebring",
        "TC",
        "Town & Country",
        "Voyager",
        "Windsor",
      ],
    },
    {
      make: "Citroen",
      models: ["2CV", "C3", "CX", "DS", "Mehari", "Traction Avant"],
    },
    { make: "Collins", models: ["Bus"] },
    { make: "Crosley", models: ["Wagon"] },
    { make: "Daewoo", models: ["Lanos", "Leganza", "Nubira"] },
    { make: "Daihatsu", models: ["Charade", "Hijet", "Rocky"] },
    { make: "Daimler", models: ["Consort"] },
    {
      make: "Datsun",
      models: [
        "200SX",
        "240Z",
        "260Z",
        "280Z",
        "280ZX",
        "310",
        "510",
        "710",
        "720",
        "810",
        "Maxima",
        "Pulsar",
        "SRL 2000",
      ],
    },
    { make: "DeSoto", models: ["Antique"] },
    { make: "Delorean", models: ["DMC-12"] },
    { make: "Diamond T", models: ["Antique"] },
    {
      make: "Dodge",
      models: [
        "1/2 Ton",
        "3/4 Ton",
        "400",
        "600",
        "Adventurer",
        "Antique",
        "Aries",
        "Aspen",
        "Avenger",
        "B Series Van/Wagon",
        "Caliber",
        "Caravan",
        "Challenger",
        "Charger",
        "Colt",
        "Coronet",
        "D Series",
        "D/W Series",
        "Dakota",
        "Dart",
        "Daytona",
        "Diplomat",
        "Durango",
        "Dynasty",
        "Grand Caravan",
        "Intrepid",
        "Journey",
        "Lancer",
        "Magnum",
        "Meadowbrook",
        "Mini-Ram",
        "Monaco",
        "Neon",
        "Nitro",
        "Omni America",
        "Raider",
        "Ram 1500",
        "Ram 2500",
        "Ram 3500",
        "Ram 4500",
        "Ram 50",
        "Ram 5500",
        "Ram Charger",
        "Ram Van",
        "Rampage",
        "Roadster",
        "SRT Viper",
        "SRT-4",
        "Shadow",
        "Spirit",
        "Sport Sedan",
        "Sprinter",
        "Stealth",
        "Stratus",
        "Viper",
        "W Series",
      ],
    },
    {
      make: "Eagle",
      models: ["Antique", "Premier", "Summit", "Talon", "Vision"],
    },
    { make: "Edsel", models: ["Corsair"] },
    { make: "Essex", models: ["Antique"] },
    {
      make: "Ferrari",
      models: [
        "308 GTS",
        "308 GTSi",
        "328",
        "348",
        "360",
        "360 Modena",
        "360 SPIDER/SPIDER F1",
        "430",
        "458 Italia",
        "458 Italia Spider",
        "488 GTB",
        "488 Spider",
        "512 TR",
        "575M",
        "599 GTB",
        "812 Superfast",
        "California",
        "F12 Berlinetta",
        "F355 GTB",
        "F355 Spider",
        "F40",
        "F430",
        "FF",
        "Mondial",
      ],
    },
    {
      make: "Fiat",
      models: [
        "124",
        "124 Spider",
        "1500",
        "1500 Cabriolet",
        "500",
        "500 Abarth",
        "500X",
        "500e",
        "Spider",
        "X 1/9",
      ],
    },
    { make: "Fisker", models: ["Karma"] },
    {
      make: "Ford",
      models: [
        "Aerostar",
        "Antique",
        "Aspire",
        "B-400",
        "Bronco",
        "Bronco II",
        "Bronco Sport",
        "C-Max",
        "Club Wagon",
        "Contour",
        "Coupe",
        "Courier",
        "Crestliner",
        "Crown Victoria",
        "Deluxe Coupe",
        "E-150",
        "E-250",
        "E-350",
        "E-450",
        "E-550",
        "E-Series Passenger Van",
        "EcoSport",
        "Econoline Cargo Van",
        "Econoline Cutaway",
        "Econoline Wagon",
        "Edge",
        "Escape",
        "Escort",
        "Excursion",
        "Expedition",
        "Expedition EL",
        "Expedition Max",
        "Explorer",
        "Explorer Sport Trac",
        "F-100",
        "F-150",
        "F-250",
        "F-350",
        "F-450",
        "F-53",
        "F-550",
        "F-59",
        "F-600G",
        "F-650",
        "F-750",
        "F-750 SD Diesel Tractor",
        "F-800",
        "F-Super Duty",
        "F700",
        "Fairlane",
        "Fairmont",
        "Falcon",
        "Festiva",
        "Fiesta",
        "Five Hundred",
        "Flex",
        "Focus",
        "Freestar",
        "Freestyle",
        "Fusion",
        "Fusion Energi",
        "Fusion Hybrid",
        "GT",
        "Galaxie",
        "Gran Torino",
        "Granada",
        "L8000",
        "L8501",
        "LTD",
        "Low Cab Forward",
        "Maverick",
        "Model A",
        "Model T",
        "Mustang",
        "Mustang Mach-E",
        "P-30",
        "Pinto",
        "Police Interceptor Sedan",
        "Police Interceptor Utility",
        "Police Responder Hybrid Sedan",
        "Probe",
        "Ranchero",
        "Ranger",
        "Sedan",
        "Taurus",
        "Taurus X",
        "Tempo",
        "Thunderbird",
        "Torino",
        "Transit",
        "Transit Connect",
        "Transit Crew Van",
        "Windstar",
        "Woody",
        "ZX2",
        "coop",
      ],
    },
    {
      make: "Freightliner",
      models: [
        "Cascadia",
        "Century",
        "FL50",
        "FL60",
        "FL70",
        "FL80",
        "FS65",
        "M2",
        "Sprinter",
        "Sprinter 2500",
        "Sprinter 3500",
        "Sprinter Cab Chassis",
        "Sprinter Cargo Van",
        "Sprinter Crew Van",
        "Sprinter Passenger Van",
        "Sprinter Van",
      ],
    },
    { make: "GILLI", models: ["BU"] },
    {
      make: "GMC",
      models: [
        "1500",
        "2500",
        "3500",
        "4500",
        "5500",
        "6500",
        "Acadia",
        "Acadia Limited",
        "Antique",
        "C-Series",
        "C3500 HD",
        "C7500",
        "Caballero",
        "Canyon",
        "Denali",
        "Envoy",
        "G1500",
        "G2500",
        "G3500",
        "Jimmy",
        "K10",
        "K20",
        "K30",
        "P3500",
        "R3500",
        "S15",
        "SAVANA G1500",
        "Safari",
        "Savana",
        "Savana G3500",
        "Sierra",
        "Sierra Denali",
        "Sonoma",
        "Sprint",
        "Suburban",
        "Syclone",
        "TC4500",
        "TC5500",
        "TC7500",
        "TC7C042",
        "TC7H042",
        "TT7500",
        "Terrain",
        "TopKick",
        "Typhoon",
        "V3500",
        "Vandura",
        "W3500",
        "W4500",
        "W5R 500",
        "Yukon",
        "Yukon Denali",
        "Yukon XL",
        "Yukon XL Denali",
      ],
    },
    { make: "Genesis", models: ["G70", "G80", "G90", "GV80"] },
    { make: "Geo", models: ["Metro", "Prizm", "Spectrum", "Storm", "Tracker"] },
    { make: "Hillman", models: ["Minx"] },
    { make: "Hino", models: ["Cab-Over", "Conventional", "XL Series"] },
    {
      make: "Honda",
      models: [
        "Accord",
        "Accord Hybrid",
        "Accord Plug-in Hybrid",
        "CR-V",
        "CR-V Hybrid",
        "CR-Z",
        "CRX",
        "Civic",
        "Civic CNG",
        "Civic del Sol",
        "Clarity Plug-In Hybrid",
        "Crosstour",
        "Element",
        "Fit",
        "HR-V",
        "Insight",
        "N600",
        "Odyssey",
        "Passport",
        "Pilot",
        "Prelude",
        "Ridgeline",
        "S2000",
        "Wagovan",
      ],
    },
    { make: "Hudson", models: ["Antique", "Hornet"] },
    { make: "Hummer", models: ["H1", "H2", "H3", "H3T", "Hummer"] },
    {
      make: "Hyundai",
      models: [
        "Accent",
        "Azera",
        "Elantra",
        "Elantra GT",
        "Elantra Touring SE",
        "Entourage",
        "Equus",
        "Excel",
        "Genesis",
        "Genesis Coupe",
        "IONIQ",
        "Ioniq Plug-In Hybrid",
        "Kona",
        "Kona EV",
        "Palisade",
        "Santa Fe",
        "Scoupe",
        "Sonata",
        "Tiburon",
        "Tucson",
        "Veloster",
        "Veloster N",
        "Venue",
        "Veracruz",
        "XG300",
        "XG350",
      ],
    },
    {
      make: "Infiniti",
      models: [
        "EX35",
        "EX37",
        "FX35",
        "FX37",
        "FX45",
        "FX50",
        "G20",
        "G25",
        "G35",
        "G37",
        "I30",
        "I35",
        "J30",
        "JX35",
        "M30",
        "M35",
        "M37",
        "M45",
        "M56",
        "Q40",
        "Q45",
        "Q50",
        "Q60",
        "Q70",
        "Q70L",
        "Q70h",
        "QX30",
        "QX4",
        "QX50",
        "QX56",
        "QX60",
        "QX70",
        "QX80",
      ],
    },
    {
      make: "International",
      models: [
        "1600",
        "1724",
        "4000 series 4600",
        "4200",
        "4300",
        "4700",
        "4900",
        "7300",
        "7500",
        "8000",
        "9100i",
        "9200",
        "9400i",
        "Antique",
        "CF600",
        "Eagle",
        "Fleetstar",
        "Scout",
        "Terrastar",
        "Travelette",
        "Travellall",
      ],
    },
    {
      make: "Isuzu",
      models: [
        "Amigo",
        "Ascender",
        "Axiom",
        "DSL",
        "FRR",
        "FTR",
        "FVR",
        "HVR",
        "Hombre",
        "I-Mark",
        "Impulse",
        "NPR",
        "NPR-HD",
        "NPR-HD GAS",
        "NQR",
        "NRR",
        "Oasis",
        "Pickup",
        "Rodeo",
        "Stylus",
        "Trooper",
        "Trooper II",
        "VehiCROSS",
        "W Series",
        "W5S042 NQR DSL",
        "i-280",
        "i-290",
        "i-350",
        "i-370",
      ],
    },
    { make: "Iveco", models: ["Euro 12-12"] },
    {
      make: "Jaguar",
      models: [
        "E-PACE",
        "E-Type",
        "F-PACE",
        "F-Type",
        "I-PACE",
        "S-Type",
        "X-Type",
        "XE",
        "XF",
        "XJ",
        "XJ6",
        "XJS",
        "XK",
      ],
    },
    {
      make: "Jeep",
      models: [
        "Antique",
        "CJ",
        "Cherokee",
        "Comanche",
        "Commander",
        "Compass",
        "DJ",
        "Gladiator",
        "Grand Cherokee",
        "Grand Wagoneer",
        "J20",
        "Liberty",
        "Patriot",
        "Renegade",
        "Scrambler",
        "TJ",
        "Wagoneer",
        "Willys",
        "Wrangler",
        "Wrangler Unlimited",
      ],
    },
    { make: "Jeepster", models: ["Commando"] },
    { make: "Jensen", models: ["Healey"] },
    { make: "Kaiser", models: ["M35A2", "Manhattan"] },
    {
      make: "Kenworth",
      models: ["900L", "T2000", "T300", "T600", "T680", "T800", "W900L"],
    },
    {
      make: "Kia",
      models: [
        "Amanti",
        "Borrego",
        "Cadenza",
        "Forte",
        "K5",
        "K900",
        "Niro",
        "Niro Plug-In Hybrid",
        "Optima",
        "Rio",
        "Rondo",
        "Sedona",
        "Seltos",
        "Sephia",
        "Sorento",
        "Sorento Hybrid",
        "Soul",
        "Soul EV",
        "Spectra",
        "Sportage",
        "Stinger",
        "Telluride",
      ],
    },
    {
      make: "Lamborghini",
      models: [
        "Aventador",
        "Countach",
        "Diablo",
        "Gallardo",
        "Huracan",
        "Jalpa",
        "Murcielago",
        "Urus",
      ],
    },
    {
      make: "Land Rover",
      models: [
        "Defender",
        "Discovery",
        "Discovery Sport",
        "Freelander",
        "LR2",
        "LR3",
        "LR4",
        "Range Rover",
        "Range Rover Evoque",
        "Range Rover Sport",
        "Range Rover Velar",
      ],
    },
    {
      make: "Lexus",
      models: [
        "CT",
        "CT 200h",
        "ES",
        "ES 250",
        "ES 300",
        "ES 320",
        "ES 330",
        "ES 350",
        "GS",
        "GS 300",
        "GS 350",
        "GS 400",
        "GS 430",
        "GS 450",
        "GS 460",
        "GS F",
        "GX",
        "GX 460",
        "GX 470",
        "HS 250h",
        "IS",
        "IS 200t",
        "IS 250",
        "IS 300",
        "IS 350",
        "IS F",
        "LC",
        "LFA",
        "LS",
        "LS 400",
        "LS 430",
        "LS 460",
        "LS 600",
        "LX",
        "LX 450",
        "LX 470",
        "LX 570",
        "NX",
        "NX 200t",
        "NX 300h",
        "RC",
        "RC 200t",
        "RC 300",
        "RC 350",
        "RC F",
        "RX",
        "RX 300",
        "RX 330",
        "RX 350",
        "RX 400",
        "RX 400h",
        "RX 450",
        "SC 300",
        "SC 400",
        "SC 430",
        "UX",
      ],
    },
    {
      make: "Lincoln",
      models: [
        "Antique",
        "Aviator",
        "Blackwood",
        "Continental",
        "Corsair",
        "LS",
        "MKC",
        "MKS",
        "MKT",
        "MKX",
        "MKZ",
        "Mark III",
        "Mark LT",
        "Mark V",
        "Mark VI",
        "Mark VII",
        "Mark VIII",
        "Nautilus",
        "Navigator",
        "Navigator L",
        "Premiere",
        "Town Car",
        "Versailles",
        "Zephyr",
      ],
    },
    {
      make: "Lotus",
      models: ["Elise", "Esprit", "Evora", "Evora 400", "Exige"],
    },
    { make: "MG", models: ["B", "MGA", "Midget", "TD"] },
    { make: "MV-1", models: ["MV-1"] },
    { make: "Mack", models: ["CH613"] },
    { make: "Marmon", models: ["Rumbleseat"] },
    {
      make: "Maserati",
      models: [
        "Ghibli",
        "GranSport",
        "GranTurismo",
        "GranTurismo Convertible",
        "Levante",
        "M128 GT",
        "Quattroporte",
        "Spyder",
      ],
    },
    { make: "Maxim", models: ["Firetruck"] },
    { make: "Maybach", models: ["57", "62"] },
    {
      make: "Mazda",
      models: [
        "323",
        "626",
        "929",
        "B-Series",
        "CX-3",
        "CX-30",
        "CX-5",
        "CX-7",
        "CX-9",
        "MPV",
        "MX-3",
        "MX-5",
        "MX-6",
        "Mazda2",
        "Mazda3",
        "Mazda3 Hatchback",
        "Mazda3 Sedan",
        "Mazda5",
        "Mazda6",
        "Mazdaspeed3",
        "Mazdaspeed6",
        "Miata",
        "Millenia",
        "Navajo",
        "Protege",
        "Protege5",
        "RX-7",
        "RX-8",
        "Tribute",
      ],
    },
    {
      make: "McLaren",
      models: [
        "570GT",
        "570S",
        "600LT",
        "650S",
        "675LT",
        "720S",
        "MP4-12C",
        "MP4-12C Spyder",
      ],
    },
    {
      make: "Mercedes-Benz",
      models: [
        "190 Series",
        "200 series",
        "220 series",
        "240 series",
        "260 Series",
        "280 series",
        "300 Series",
        "380 Series",
        "400 Series",
        "420 Series",
        "500 Series",
        "560 Series",
        "600 series",
        "A-Class",
        "AMG",
        "Antique",
        "B-Class",
        "C-Class",
        "CL-Class",
        "CLA-Class",
        "CLK-Class",
        "CLS-Class",
        "E-Class",
        "E55 AMG",
        "G-Class",
        "GL-Class",
        "GLA-Class",
        "GLB-Class",
        "GLC-Class",
        "GLE-Class",
        "GLK-Class",
        "GLS-Class",
        "M-Class",
        "Metris",
        "Metris Cargo Van",
        "Metris Passenger Van",
        "R-Class",
        "S-Class",
        "SL-Class",
        "SLC",
        "SLK-Class",
        "SLR McLaren",
        "SLS",
        "SLS AMG",
        "Sprinter",
        "Sprinter Passenger Van",
        "Sprinter Van",
      ],
    },
    {
      make: "Mercury",
      models: [
        "Antique",
        "Capri",
        "Comet",
        "Cougar",
        "Grand Marquis",
        "Lynx",
        "Marauder",
        "Mariner",
        "Marquis",
        "Milan",
        "Montclair",
        "Montego",
        "Monterey",
        "Mountaineer",
        "Mystique",
        "Sable",
        "Topaz",
        "Tracer",
        "Villager",
        "Woody Wagon",
        "Zephyr",
      ],
    },
    { make: "Merkur", models: ["Scorpio", "XR4Ti"] },
    {
      make: "Mini",
      models: [
        "Convertible",
        "Cooper",
        "Cooper Clubman",
        "Cooper Countryman",
        "Cooper Hardtop 4 Door",
        "Cooper Paceman",
        "Hardtop 2 Door",
        "Hardtop 4 Door",
      ],
    },
    {
      make: "Mitsubishi",
      models: [
        "3000GT",
        "Delica Space Gear",
        "Diamante",
        "Eclipse",
        "Eclipse Cross",
        "Endeavor",
        "Evolution",
        "Expo",
        "FE145",
        "FE6649",
        "Fuso",
        "Galant",
        "Lancer",
        "Mighty Max",
        "Mirage",
        "Montero",
        "Outlander",
        "Outlander Sport",
        "Raider",
        "Sigma",
        "Starion",
        "Starwagon",
        "i-MiEV",
      ],
    },
    { make: "Morgan", models: ["Plus 4", "Plus 8"] },
    { make: "Morris", models: ["Minor"] },
    { make: "Nash", models: ["Ambassador", "Metropolitan"] },
    {
      make: "Nissan",
      models: [
        "200",
        "240",
        "280",
        "300",
        "350",
        "370",
        "370Z Coupe",
        "370Z Roadster",
        "Altima",
        "Armada",
        "Axxess",
        "Cube",
        "D21",
        "Frontier",
        "GT-R",
        "Hardbody",
        "Juke",
        "Kicks",
        "Leaf",
        "Maxima",
        "Murano",
        "NV",
        "NV Passenger",
        "NV200 Compact Cargo",
        "NV200 Taxi",
        "NX2000",
        "Pathfinder",
        "Patrol",
        "Pulsar",
        "Pulsar NX",
        "Quest",
        "Rogue",
        "Rogue Select",
        "Rogue Sport",
        "SE-R",
        "Sentra",
        "Stanza",
        "Titan",
        "Titan XD",
        "UD",
        "UD Box Truck",
        "UD Boxtruck",
        "UD Tow Truck",
        "Versa",
        "Versa Note",
        "Xterra",
      ],
    },
    {
      make: "Oldsmobile",
      models: [
        " Cruiser Wagon",
        "88",
        "98",
        "Achieva",
        "Alero",
        "Antique",
        "Aurora",
        "Bravada",
        "CUTLASS 442",
        "Calais",
        "Ciera",
        "Custom Cruiser",
        "Cutlass",
        "Delta",
        "Firenza",
        "Intrigue",
        "LSS",
        "Omega",
        "Regency",
        "Silhouette",
        "Toronado",
      ],
    },
    { make: "Oshkosh", models: ["Mid Step"] },
    { make: "Packard", models: ["Antique", "Cavalier", "Clipper"] },
    { make: "Peterbilt", models: ["386", "387", "Other (Peterbilt)"] },
    { make: "Peugeot", models: ["405", "505"] },
    { make: "Pinzgauer", models: ["Other (Pinzgauer)"] },
    {
      make: "Plymouth",
      models: [
        "Acclaim",
        "Arrow",
        "Barracuda",
        "Belvedere",
        "Breeze",
        "Business Coupe",
        "Caravelle",
        "Colt",
        "Colt Vista",
        "Duster",
        "Fury",
        "GTX",
        "Gran Fury",
        "Horizon",
        "Laser",
        "Neon",
        "Prowler",
        "Reliant",
        "Road Runner",
        "Satellite",
        "Special",
        "Suburban",
        "Sundance",
        "Trailduster",
        "Turismo",
        "Valiant",
        "Volare",
        "Volare Duster",
        "Voyager",
      ],
    },
    { make: "Polaris", models: ["Slingshot"] },
    {
      make: "Pontiac",
      models: [
        "6000",
        "Antique",
        "Aztek",
        "Bonneville",
        "Catalina",
        "Fiero",
        "Firebird",
        "G3",
        "G5",
        "G6",
        "G8",
        "GTO",
        "Grand Am",
        "Grand Prix",
        "Grand Ville",
        "LeMans",
        "Montana",
        "Parisienne",
        "Phoenix",
        "Solstice",
        "Sunbird",
        "Sunfire",
        "Tempest",
        "Torrent",
        "Trans Sport",
        "Ventura",
        "Vibe",
      ],
    },
    {
      make: "Porsche",
      models: [
        "718 Spyder",
        "911",
        "912",
        "914",
        "914-6",
        "918 Spyder",
        "924",
        "928",
        "930",
        "944",
        "964",
        "968",
        "Antique",
        "Boxster",
        "Cayenne",
        "Cayman",
        "Macan",
        "Panamera",
        "Taycan Turbo",
      ],
    },
    {
      make: "Ram",
      models: [
        "1500",
        "1500 Classic",
        "2500",
        "3500",
        "4500",
        "5500",
        "Cargo Van",
        "Dakota",
        "ProMaster",
        "ProMaster Cargo Van",
        "ProMaster Chassis Cab",
        "ProMaster City",
        "ProMaster City Cargo Van",
        "ProMaster City Wagon",
        "ProMaster Window Van",
      ],
    },
    { make: "Renault", models: ["Alliance", "LeCar"] },
    {
      make: "Rolls-Royce",
      models: [
        "Cullinan",
        "Dawn",
        "Ghost",
        "Phantom",
        "Phantom Coupe",
        "Wraith",
      ],
    },
    {
      make: "Saab",
      models: ["9-2X", "9-3", "9-4X", "9-5", "9-7X", "900", "9000", "Antique"],
    },
    {
      make: "Saturn",
      models: [
        "Astra",
        "Aura",
        "Ion",
        "L-Series",
        "Outlook",
        "Relay",
        "S-series",
        "SC",
        "SL",
        "SW",
        "Sky",
        "VUE",
      ],
    },
    {
      make: "Scion",
      models: ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"],
    },
    { make: "Sebring-Vanguard", models: ["Citicar"] },
    { make: "Smart", models: ["fortwo"] },
    {
      make: "Sterling",
      models: ["300", "800", "827", "A9500", "Acterra", "LT8500", "M7500"],
    },
    { make: "Studebaker", models: ["Antique", "Avanti", "Hawk", "President"] },
    {
      make: "Subaru",
      models: [
        "Ascent",
        "BRZ",
        "Baja",
        "Brat",
        "Crosstrek",
        "DL",
        "Forester",
        "GL",
        "GL10",
        "Impreza",
        "Justy GL",
        "Legacy",
        "Loyale",
        "Outback",
        "RX",
        "STI S209",
        "SVX",
        "Tribeca",
        "WRX",
        "XV Crosstrek",
      ],
    },
    { make: "Sunbeam", models: ["Alpine", "tiger"] },
    {
      make: "Suzuki",
      models: [
        "Aerio",
        "Equator",
        "Esteem",
        "Forenza",
        "Grand Vitara",
        "Jimny",
        "Kizashi",
        "Reno",
        "SX4",
        "Samurai",
        "Sidekick",
        "Swift",
        "Verona",
        "Vitara",
        "X-90",
        "XL-7",
        "XL7",
      ],
    },
    {
      make: "Tesla",
      models: [
        "Model 3",
        "Model S",
        "Model X",
        "Model Y",
        "Roadster",
        "Roadster 2.5",
      ],
    },
    {
      make: "Toyota",
      models: [
        "4Runner",
        "86",
        "Avalon",
        "C-HR",
        "Camry",
        "Camry Hybrid",
        "Camry Solara",
        "Celica",
        "Corolla",
        "Corolla Hatchback",
        "Corona",
        "Cressida",
        "Echo",
        "FJ Cruiser",
        "GR Supra",
        "HiAce",
        "Highlander",
        "Hybrid Limited",
        "Land Cruiser",
        "MR2",
        "MR2 Spyder",
        "Matrix",
        "Paseo",
        "Passenger Vans",
        "Pickup",
        "Previa",
        "Prius",
        "Prius C",
        "Prius Plug-In",
        "Prius V",
        "RAV4",
        "RAV4 EV",
        "SR5",
        "Sequoia",
        "Sienna",
        "Solara",
        "Starlet",
        "Supra",
        "T100",
        "Tacoma",
        "Tercel",
        "Tundra",
        "Van Wagon",
        "Venza",
        "Xtracab",
        "Yaris",
        "Yaris Hatchback",
      ],
    },
    {
      make: "Triumph",
      models: [
        "Antique",
        "GT6",
        "Herald",
        "Spitfire",
        "TR3",
        "TR4",
        "TR5",
        "TR6",
        "TR7",
        "TR8",
        "Vitesse",
      ],
    },
    { make: "VPG", models: ["MV-1"] },
    {
      make: "Volkswagen",
      models: [
        "Arteon",
        "Atlas",
        "Atlas Cross Sport",
        "Beetle",
        "CC",
        "Cabrio",
        "Cabriolet",
        "Corrado",
        "Dasher",
        "Eos",
        "EuroVan",
        "Fox",
        "GLI",
        "GTI",
        "Golf",
        "Golf Alltrack",
        "Golf GTI",
        "Golf R",
        "Golf SportWagen",
        "Jetta",
        "Jetta GLI",
        "Jetta SportWagon",
        "Karmann Ghia",
        "Passat",
        "Phaeton",
        "Quantum",
        "R",
        "R32",
        "Rabbit",
        "Routan",
        "Scirocco",
        "Thing",
        "Tiguan",
        "Tiguan Limited",
        "Touareg",
        "Touareg 2",
        "Transporter",
        "Type 3",
        "Vanagon",
        "touareg executive tdi",
      ],
    },
    {
      make: "Volvo",
      models: [
        "240",
        "244",
        "400",
        "480",
        "740",
        "760",
        "780",
        "850",
        "900",
        "940",
        "960",
        "1800",
        "Antique",
        "C30",
        "C70",
        "Integral Sleeper",
        "S40",
        "S60",
        "S70",
        "S80",
        "S90",
        "V40",
        "V50",
        "V60",
        "V70",
        "V90",
        "VN",
        "XC40",
        "XC60",
        "XC70",
        "XC90",
      ],
    },
    { make: "WRKH", models: ["FORWARD CONTROL"] },
    { make: "Willy's", models: ["Wagon"] },
  ];
  /**
   * Sets the models in state to the models of the selected make
   * @param {object} e - form onChange event
   */
  getModels = (e) => {
    let models = this.makesParams.find((o) => o.make === e.target.value);
    this.setState({ models: models.models });
  };
  /**
   * Get the vehicles based on the search params and set the state before the component loads.
   */
  componentWillMount = () => {
    getVehicles(this.props.location.state.searchParams).then((vehicles) =>
      this.setState({ vehicles: sortVehicles(vehicles, "undervalue", true) })
    );
    let models = this.makesParams.find(
      (o) => o.make === this.props.location.state.searchParams.make
    );
    this.setState({ models: models.models });
  };
  /**
   * Handle the search button from this page.
   * @param {object} params - Search parameters
   */
  reSearch = (params) => {
    this.setState({ vehicles: [] });
    getVehicles(params).then((vehicles) =>
      this.setState({ vehicles: sortVehicles(vehicles, "undervalue", true) })
    );
    let models = this.makesParams.find((o) => o.make === params.make);
    this.setState({ models: models.models });
  };
  /**
   * Send an API request to get the vehicles with the appropriate
   * search parameters when the search form is submitted.
   * @param {object} e - form onSubmit event
   */
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target.make.value === "Select a make" ||
      e.target.model.value === "Please select a make"
    ) {
      alert("Please select a make and model");
      return;
    }
    const formData = new FormData(e.target);
    const data = Object.fromEntries(
      [...formData.entries()].filter((searchParam) => searchParam[1] !== "")
    );
    this.reSearch(data);
  };
  /**
   * Re-Sort the vehicles when a new sort option is selected.
   * @param {object} e - Select onChange event
   */
  resort = (e) => {
    let lookup = {
      unvervalue_dec: { by: "undervalue", dec: true },
      unvervalue_asc: { by: "undervalue", dec: false },
      price_dec: { by: "price", dec: true },
      price_asc: { by: "price", dec: false },
      year_dec: { by: "makeYear", dec: true },
      year_asc: { by: "makeYear", dec: false },
      mileage_dec: { by: "mileage", dec: true },
      mileage_asc: { by: "mileage", dec: false },
    };
    if (lookup[e.target.value]) {
      this.setState({
        vehicles: sortVehicles(
          Object.fromEntries(this.state.vehicles),
          lookup[e.target.value].by,
          lookup[e.target.value].dec
        ),
      });
    }
  };
  render() {
    return (
      <div>
        <div className="block search-head">
          <div className="title">
            <strong className="d-block">Search</strong>
          </div>
          <div className="block-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-control-label">Make</label>
                  <select
                    name="make"
                    className="form-control"
                    defaultValue={
                      this.props.location.state.searchParams.make
                        ? this.props.location.state.searchParams.make
                        : "Any"
                    }
                    onChange={this.getModels}
                  >
                    {this.makesParams.map((make) => (
                      <option>{make.make}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Model</label>
                  <select
                    name="model"
                    className="form-control"
                    defaultValue={
                      this.props.location.state.searchParams.model
                        ? this.props.location.state.searchParams.model
                        : "Any"
                    }
                  >
                    {this.state.models.map((model) => (
                      <option>{model}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Location</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="zip"
                        type="zip"
                        placeholder="Zip code"
                        defaultValue={
                          this.props.location.state.searchParams.zip
                            ? this.props.location.state.searchParams.zip
                            : ""
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6">
                      <select
                        name="miles"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.miles
                            ? this.props.location.state.searchParams.miles
                            : ""
                        }
                      >
                        <option value="50">50 Miles</option>
                        <option value="100">100 Miles</option>
                        <option value="200">200 Miles</option>
                        <option value="300">300 Miles</option>
                        <option value="400">400 Miles</option>
                        <option value="12450">500+ Miles</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Year</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="yearFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.yearFrom
                            ? this.props.location.state.searchParams.yearFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="yearTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.yearTo
                            ? this.props.location.state.searchParams.yearTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Mileage</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="mileageFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.mileageFrom
                            ? this.props.location.state.searchParams.mileageFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="mileageTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.mileageTo
                            ? this.props.location.state.searchParams.mileageTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Price</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="priceFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.priceFrom
                            ? this.props.location.state.searchParams.priceFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="priceTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        defaultValue={
                          this.props.location.state.searchParams.priceTo
                            ? this.props.location.state.searchParams.priceTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Sort</label>
                  <select
                    name="sort"
                    className="form-control"
                    onChange={this.resort}
                  >
                    <option value="unvervalue_dec">Best Deals First</option>
                    <option value="unvervalue_asc">Best Deals Last</option>
                    <option value="price_dec">Price (High to Low)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="year_dec">Year (Newest First)</option>
                    <option value="year_asc">Year (Oldest First)</option>
                    <option value="mileage_dec">Mileage (High to Low)</option>
                    <option value="mileage_asc">Mileage (Low to High)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          {this.state.vehicles.length > 0 ? (
            this.state.vehicles.map((item) => {
              return (
                <VehicleSmall
                  vehicle={{
                    title:
                      item[1].makeYear +
                      " " +
                      item[1].make +
                      " " +
                      item[1].model +
                      (item[1].trim ? " " + item[1].trim : ""),
                    img: item[1].img,
                    mileage: item[1].mileage,
                    price: item[1].price,
                    undervalue: item[1].undervalue,
                    link: item[1].link,
                  }}
                />
              );
            })
          ) : (
            <div style={{ width: "100%" }}>
              <h4 className="text-center">Loading...</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}
