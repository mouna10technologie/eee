import Image from "./Image";
import Body from "./Body";
import Careaux from "./Careaux";
import AIJobSearch from "./AIJobSearch";
import { Link } from "react-router-dom";
import "./Home.css";
function CarteEntreprises({ image1, image2, fondateur, fondateurs, lien }) {
  return (
    <div className="div_entreprises">
      <div className="div_image1">
        <img
          className="img1"
          src={image1}
          alt="image des entreprises"
          width="100px"
          height="100px"
        />
      </div>
      <div className="div_image2">
        <img
          className="img2"
          src={image2}
          alt="image des entreprises"
          width="100px"
          height="100px"
        />
      </div>
      <h2 className="h2_titre">{fondateur}</h2>
      <p>{fondateurs}</p>

      <a href={lien} target="_blank" rel="noopener noreferrer">
        <button>voir le site</button>
      </a>
    </div>
  );
}

function Home() {

  let box = [
    [
      {
        image:
          "https://www.newmanstech.com/wp-content/uploads/2023/12/developpeur-web.jpeg",
        titre: "Développeurs",
        description:
          "Trouvez les meilleurs développeurs spécialisés en IA, machine learning et technologies émergentes pour vos projets.",
      },

      {
        image:
          "https://tse2.mm.bing.net/th/id/OIP.eIaKrf93sPiMKNAeCzKvBAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        titre: "Recruteurs",
        description:
          "Accédez à une plateforme complète pour identifier, évaluer et recruter les talents tech les plus prometteurs du marché.",
      },

      {
        image:
          "https://olliewood.fr/wp-content/uploads/2025/08/Quels-sont-les-differents-types-de-contrats-de-travail-et-leurs-particularites-.jpg",
        titre: "Types de contrat",
        description:
          "Explorez toutes les modalités de collaboration : CDI, freelance, missions courtes, contrats internationaux adaptés à vos besoins.",
      },
    ],

    [
      {
        image:
          "https://tse1.mm.bing.net/th/id/OIP.RYyqwfKufF34oycQyQ1n_AAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        titre: "Développer vos compétences",
        description:
          "Accédez à des formations personnalisées, des certifications reconnues et des ressources d'apprentissage pour rester à la pointe de la technologie.",
      },

      {
        image:
          "https://static.vecteezy.com/ti/photos-gratuite/p2/23431352-aujourd-hui-est-le-journee-symbole-concept-mots-revenir-sur-les-atouts-sur-en-bois-blocs-gratuit-photo.jpg",
        titre: "Rester à jour",
        description:
          "Suivez les dernières tendances technologiques, les actualités du secteur et les évolutions du marché de l'emploi tech.",
      },

      {
        image:
          "https://static.vecteezy.com/system/resources/previews/034/464/429/non_2x/an-icon-design-of-job-test-vector.jpg",
        titre: "Tests techniques",
        description:
          "Évaluation pratique des compétences d'un développeur via des exercices techniques adaptés aux besoins actuels.",
      },
    ],
  ];
  let box33 = [
    {
      image1: "/adobe.jpg",
      image2: "/adobe.png",
      titre: "fondateur:",
      fondateurs: " Steve Jobs, Steve Wozniak, Ronald Wayne (1976, États-Unis",
      lien: "https://www.adobe.com",
    },

    {
      image1: "/amazon.jpg",
      image2: "/amazon.png",
      titre: "fondateur :",
      fondateurs: " Jeff Bezos (1994, États-Unis)",
      lien: "https://www.amazon.com//",
    },

    {
      image1: "/cisco.jpg",
      image2: "/cisco.webp",
      titre: "fondateur",
      fondateurs: " Leonard Bosack, Sandy Lerner (1984, États-Unis)",
      lien: "https://www.netacad.com/ ",
    },

    {
      image1: "/IBM.jpg",
      image2: "/IBM-.png",
      titre: "fondateur",
      fondateurs:
        " Fondée sous le nom CTR (Computing-Tabulating-Recording Company) parCharles Ranlett Flint (1911, États-Unis).(Renommée IBM en 1924 sous Thomas J. Watson)",

      lien: "https://www.ibm.com",
    },

    {
      image1: "/Meta.jpg",
      image2: "/meta.webp",
      titre: "fondateur",
      fondateurs:
        " Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz,Chris Hughes (2004, États-Unis)",
      lien: "https://business.facebook.com/",
    },

    {
      image1: "/Microsoft.jpg",
      image2: "/microsoft.png",
      titre: "fondateur",
      fondateurs: " Bill Gates, Paul Allen (1975, États-Unis)",
      lien: "https://www.microsoft.com/",
    },

    {
      image1: "/nvidia.jpg",
      image2: "/Nvidia.png",
      titre: "fondateur",
      fondateurs:
        "Jensen Huang, Chris Malachowsky, Curtis Priem (1993, États-Unis) ",
      lien: "https://www.nvidia.com/location-selector/",
    },

    {
      image1: "/oracle.jpg",
      image2: "/Oracle1.jpg",
      titre: "fondateurs",
      fondateur: " Larry Ellison, Bob Miner, Ed Oates (1977, États-Unis)",
      lien: "https://www.oracle.com/",
    },

    {
      image1: "/SAP.jpg",
      image2: "/OIP.webp",
      titre: "fondateur",
      fondateurs:
        "Dietmar Hopp, Hasso Plattner, Claus Wellenreuther, Klaus Tschira, Hans-WernerHector (1972, Allemagne) ",
      lien: "https://www.sap.com/",
    },

    {
      image1: "/sony.jpeg",
      image2: "/sony.png",
      titre: "fondateur",
      fondateurs: "Masaru Ibuka, Akio Morita (1946, Japon)",
      lien: " https://www.sony.co.jp/en/",
    },

    {
      image1: "/sumsung.webp",
      image2: "/samsung-.png",
      titre: "fondateur",
      fondateurs:
        " Filiale fondée par Lee Byung-chul dans le cadre du groupe Samsung (1938 pour Samsung, 1969 pour Samsung Electronics, Corée du Sud)",
      lien: "https://www.samsung.com/n_africa/",
    },

    {
      image1: "/Tesla.webp",
      image2: "/telssa.png",
      titre: "fondateur",
      fondateurs:
        "Martin Eberhard, Marc Tarpenning (2003, États-Unis)(Elon Musk a rejoint peu après comme investisseur principal et est souventperçu comme cofondateur) ",
      lien: "www.tesla.com",
    },

    {
      image1: "/apple.jpeg",
      image2: "/apple.png",
      titre: "fondateur",
      fondateurs: "Steve Jobs, Steve Wozniak, Ronald Wayne (1976, États-Unis) ",
      lien: "https://www.apple.com/",
    },
  ];

  return (
    <>
      <div className="home-container">
        <Body />
        <Image />


        {/* Composant de recherche IA */}
        <AIJobSearch />

        <div className="buttons-section">
          <Link to="/Recruteurs" className="home-button recruteur-button">
            Recruteur
          </Link>
          <Link to="/Candidat" className="home-button candidat-button">
            Candidat
          </Link>
        </div>

        {/* Nouveaux boutons sous les boutons existants */}
        <div className="buttons-section secondary-buttons">
          <Link
            to="/Actualites_dev"
            className="home-button actualites-button"
          >
            Actualités
          </Link>
          <Link to="/IA" className="home-button ia-button">
            IA
          </Link>
        </div>

        <div className="cards-section">
          {box.map((carrer, index1) => (
            <Careaux key={index1} carrer={carrer} />
          ))}
        </div>
      </div>
      <section className="entreprises-section">
        <div>
          <p className="p_entreprises">
            Découvrez une sélection des entreprises qui operent dans le monde de
            technologie
          </p>
        </div>
        <div className="Entreprises">
          {box33.map((value1, index11) => (
            <CarteEntreprises
              key={index11}
              image1={value1.image1}
              image2={value1.image2}
              fondateur={value1.fondateur}
              fondateurs={value1.fondateurs}
              lien={value1.lien}
            />
          ))}
        </div>
      </section>
    </>
  );
}
export default Home;
