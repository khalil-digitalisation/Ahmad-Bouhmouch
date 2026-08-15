/* ============================================================
   PROJETS / PROJECTS
   ------------------------------------------------------------
   Pour ajouter un projet (ex. le PFE) :
     1. Créer un dossier  assets/projects/<slug>/
     2. Y déposer les images
     3. Copier un bloc ci-dessous et l'ajouter au tableau
   L'ordre du tableau = l'ordre d'affichage sur le site.
   La première image de "images" sert de vignette.

   To add a project (e.g. the graduation project):
     1. Create a folder  assets/projects/<slug>/
     2. Put the images in it
     3. Copy one block below and add it to the array
   Array order = display order. First image is the thumbnail.
   ============================================================ */

const PROJECTS = [
  {
    slug: 'nautic-hotel',
    year: '2023',
    title: { fr: 'Hôtel Nautique', en: 'Nautic Hotel' },
    type: { fr: 'Hôtellerie & sport', en: 'Hospitality & sport' },
    location: { fr: 'Quartier Hassan, Rabat', en: 'Hassan district, Rabat' },
    description: {
      fr: [
        "Face à la vallée du Bouregreg, l'Hôtel Nautique occupe une position privilégiée sur les hauteurs du quartier Hassan. Le projet tire parti de sa topographie pour dégager des vues continues sur le fleuve et orienter chaque chambre vers l'eau.",
        "Pensé comme un repère urbain, il associe l'accueil hôtelier à un pôle dédié aux sports nautiques — kayak, aviron, surf — avec entraînements encadrés pour les pratiquants comme pour les visiteurs de passage.",
        "Quatre bassins semi-olympiques, des piscines suspendues et une volumétrie horizontale ancrent le bâtiment dans le tissu du quartier, dans un registre d'élégance mesurée plutôt que de démonstration."
      ],
      en: [
        "Facing the Bouregreg valley, the Nautic Hotel occupies a privileged position on the heights of the Hassan district. The project uses its topography to open continuous views over the river and turn every room towards the water.",
        "Conceived as an urban landmark, it pairs hospitality with a centre dedicated to water sports — kayaking, rowing, surfing — offering supervised training for athletes and visitors alike.",
        "Four semi-Olympic pools, suspended swimming pools and a horizontal massing anchor the building within the fabric of the district, in a register of measured elegance rather than display."
      ]
    },
    images: [
      { file: 'Nautic_Hotel_Main_View.jpg', w: 1920, h: 1080, alt: { fr: 'Vue principale de l’Hôtel Nautique', en: 'Nautic Hotel main view' } },
      { file: 'Nautic_Hotel_By_Night.jpg', w: 1920, h: 1080, alt: { fr: 'L’Hôtel Nautique de nuit', en: 'Nautic Hotel by night' } },
      { file: 'Reception_View_1.jpg', w: 1920, h: 1080, alt: { fr: 'Réception, vue 1', en: 'Reception, view 1' } },
      { file: 'Reception_View_2.jpg', w: 1920, h: 1080, alt: { fr: 'Réception, vue 2', en: 'Reception, view 2' } },
      { file: 'Hotel_Room_Perspective_1.jpg', w: 1920, h: 1080, alt: { fr: 'Chambre, perspective 1', en: 'Hotel room, perspective 1' } },
      { file: 'Hotel_Room_Perspective_2.jpg', w: 1920, h: 1080, alt: { fr: 'Chambre, perspective 2', en: 'Hotel room, perspective 2' } },
      { file: 'Nautic_Hotel_Concept_Diagram.jpeg', w: 1800, h: 736, alt: { fr: 'Schéma conceptuel', en: 'Concept diagram' } },
      { file: 'Ground_Floor.jpg', w: 1829, h: 837, alt: { fr: 'Plan du rez-de-chaussée', en: 'Ground floor plan' } },
      { file: 'Common_Floor_Plan.jpg', w: 1820, h: 817, alt: { fr: 'Plan d’étage courant', en: 'Common floor plan' } }
    ]
  },

  {
    slug: 'ribat-al-fath',
    year: '2023',
    title: { fr: 'Lycée Ribat Al Fath', en: 'Ribat Al Fath High School' },
    type: { fr: 'Équipement scolaire', en: 'Educational facility' },
    location: { fr: 'Rabat', en: 'Rabat' },
    description: {
      fr: [
        "Le lycée emprunte son nom à l'ancienne appellation de Rabat, fondée par les Almohades au XIIᵉ siècle. Le projet cherche une continuité avec cette mémoire plutôt qu'une rupture, en s'inspirant de l'université Al Quaraouiyine de Fès.",
        "L'architecture andalouse en constitue le fil conducteur : le patio organise l'ensemble du plan et devient le lieu de rassemblement des élèves, autour duquel se distribuent les circulations et les salles.",
        "Spécialisé dans les arts, l'établissement accueille un auditorium, des espaces sportifs, une mosquée et une médiathèque ouverte au public — le lycée fonctionnant ainsi à l'échelle du quartier autant qu'à celle de ses élèves."
      ],
      en: [
        "The school takes its name from the former designation of Rabat, founded by the Almohads in the 12th century. The project seeks continuity with that memory rather than a break from it, drawing on the Al Quaraouiyine University in Fez.",
        "Andalusian architecture provides the guiding thread: the patio organises the entire plan and becomes the students' gathering place, with circulation and classrooms distributed around it.",
        "Specialising in the arts, the school houses an auditorium, sports facilities, a mosque and a public media library — operating at the scale of the neighbourhood as much as that of its students."
      ]
    },
    images: [
      { file: 'Ribat_Al_Fath_High_School_Main_View.jpg', w: 2200, h: 1238, alt: { fr: 'Vue principale du lycée', en: 'High school main view' } },
      { file: 'Ribat_Al_Fath_High_School_Global_View.jpg', w: 2200, h: 1238, alt: { fr: 'Vue d’ensemble', en: 'Global view' } },
      { file: 'High_School_Patio.jpg', w: 2200, h: 1238, alt: { fr: 'Le patio', en: 'The patio' } },
      { file: 'Ribat_Al_Fath_High_School_Up_Close_Elevation_View.jpg', w: 1800, h: 1227, alt: { fr: 'Élévation vue de près', en: 'Close-up elevation view' } },
      { file: 'High_School_Main_Elevation.jpg', w: 1800, h: 578, alt: { fr: 'Élévation principale', en: 'Main elevation' } },
      { file: 'Elevation_Details.jpg', w: 1800, h: 1012, alt: { fr: 'Détails d’élévation', en: 'Elevation details' } },
      { file: 'High_School_Section.jpg', w: 1800, h: 1203, alt: { fr: 'Coupe', en: 'Section' } },
      { file: 'High_School_Ground_Floor.jpg', w: 832, h: 1064, alt: { fr: 'Plan du rez-de-chaussée', en: 'Ground floor plan' } },
      { file: 'High_School_Master_Plan.jpg', w: 740, h: 1115, alt: { fr: 'Plan de masse', en: 'Master plan' } }
    ]
  },

  {
    slug: 'workspace',
    year: '2022',
    title: { fr: 'Plateaux Bureaux', en: 'Workspace' },
    type: { fr: 'Immeuble de bureaux', en: 'Office building' },
    location: { fr: 'Yacoub Al Mansour, Rabat', en: 'Yacoub Al Mansour, Rabat' },
    description: {
      fr: [
        "Situé dans le quartier Yacoub Al Mansour à Rabat, ce projet propose des plateaux de bureaux destinés aux entreprises en développement. Deux blocs distincts répondent à deux échelles d'occupation : surfaces modérées d'une part, espaces plus généreux de l'autre.",
        "Les bâtiments, d'une hauteur maximale de R+5, se distinguent par leurs cages d'escaliers extérieures. Ce dispositif libère les plateaux de toute contrainte de noyau, fluidifie la circulation et assure l'évacuation en cas de besoin.",
        "Le programme est complété par des espaces verts, des restaurants, un parking souterrain et une salle de sport au dernier étage — de quoi faire du lieu de travail un lieu où l'on reste."
      ],
      en: [
        "Located in the Yacoub Al Mansour district of Rabat, this project offers office floors designed for growing businesses. Two distinct blocks address two scales of occupancy: moderate floor areas on one side, more generous spaces on the other.",
        "The buildings, rising to a maximum of five storeys, are defined by their exterior stair towers. This device frees the floor plates from any core constraint, eases circulation and secures evacuation when needed.",
        "The programme is completed by gardens, restaurants, underground parking and a gym on the top floor — turning the workplace into somewhere worth staying."
      ]
    },
    images: [
      { file: 'Workspace_View_1.jpg', w: 2200, h: 1238, alt: { fr: 'Vue extérieure 1', en: 'Exterior view 1' } },
      { file: 'Workspace_View_2.jpg', w: 2200, h: 1238, alt: { fr: 'Vue extérieure 2', en: 'Exterior view 2' } },
      { file: 'Workspace_View_3.jpg', w: 2200, h: 1238, alt: { fr: 'Vue extérieure 3', en: 'Exterior view 3' } },
      { file: 'Workspace_Interior_View.jpg', w: 2200, h: 1238, alt: { fr: 'Vue intérieure', en: 'Interior view' } },
      { file: 'Stairs_View.jpg', w: 2200, h: 1238, alt: { fr: 'Les escaliers extérieurs', en: 'The exterior stairs' } },
      { file: 'Workspace_Gym_View.jpg', w: 1792, h: 1024, alt: { fr: 'La salle de sport', en: 'The gym' } },
      { file: 'Workspace_Axonometric_View.jpg', w: 2200, h: 1238, alt: { fr: 'Vue axonométrique', en: 'Axonometric view' } },
      { file: 'Workspace_Front_Elevation.jpg', w: 1800, h: 845, alt: { fr: 'Élévation principale', en: 'Front elevation' } },
      { file: 'Workspace_Ground_Floor.jpg', w: 726, h: 1182, alt: { fr: 'Plan du rez-de-chaussée', en: 'Ground floor plan' } },
      { file: 'Workspace_First_Floor.jpg', w: 726, h: 1366, alt: { fr: 'Plan du premier étage', en: 'First floor plan' } },
      { file: 'Workspace_Master_Plan.jpg', w: 664, h: 1064, alt: { fr: 'Plan de masse', en: 'Master plan' } }
    ]
  }
];
