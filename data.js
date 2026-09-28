/* ELISH-SPEAK Vocabulary Database
   Hausa • Igbo • Yoruba  ↔  English
   Curated for beginners by cultural accuracy
*/

const VOCAB = {
  hausa: {
    name: "Hausa",
    categories: {
      greetings: {
        label: "Greetings",
        items: [
          { en: "Hello", native: "Sannu", pron: "SAN-nu" },
          { en: "Good morning", native: "Ina kwana?", pron: "i-NA kwa-NA" },
          { en: "Good afternoon", native: "Barka da rana", pron: "BAR-ka da RA-na" },
          { en: "Good evening", native: "Barka da yamma", pron: "BAR-ka da YAM-ma" },
          { en: "How are you? (m)", native: "Yaya kake?", pron: "ya-YA KA-ke" },
          { en: "How are you? (f)", native: "Yaya kike?", pron: "ya-YA KI-ke" },
          { en: "I am fine", native: "Lafiya lau", pron: "la-FI-ya lau" },
          { en: "Thank you", native: "Na gode", pron: "na GO-de" },
          { en: "Please", native: "Don Allah", pron: "don AL-lah" },
          { en: "Yes", native: "Eh / Ee", pron: "EH" },
          { en: "No", native: "A'a", pron: "A-a" },
          { en: "Sorry / Excuse me", native: "Yi hakuri", pron: "yi ha-KU-ri" },
          { en: "Goodbye", native: "Sai an jima", pron: "SAI an ji-MA" },
          { en: "What is your name?", native: "Menene sunanka?", pron: "me-NE-ne su-NAN-ka" },
          { en: "My name is...", native: "Sunana...", pron: "su-NA-na..." }
        ]
      },
      numbers: {
        label: "Numbers",
        items: [
          { en: "One", native: "Ɗaya", pron: "ɗa-YA" },
          { en: "Two", native: "Biyu", pron: "bi-YU" },
          { en: "Three", native: "Uku", pron: "u-KU" },
          { en: "Four", native: "Huɗu", pron: "hu-DU" },
          { en: "Five", native: "Biyar", pron: "bi-YAR" },
          { en: "Six", native: "Shida", pron: "SHI-da" },
          { en: "Seven", native: "Bakwai", pron: "BAK-wai" },
          { en: "Eight", native: "Takwas", pron: "TAK-was" },
          { en: "Nine", native: "Tara", pron: "ta-RA" },
          { en: "Ten", native: "Goma", pron: "go-MA" },
          { en: "Twenty", native: "Ashirin", pron: "a-SHI-rin" },
          { en: "One hundred", native: "Ɗari", pron: "ɗa-RI" }
        ]
      },
      common: {
        label: "Common Phrases",
        items: [
          { en: "Water", native: "Ruwa", pron: "RU-wa" },
          { en: "Food", native: "Abinci", pron: "a-BIN-ci" },
          { en: "I am hungry", native: "Ina jin yunwa", pron: "i-NA jin YUN-wa" },
          { en: "I want water", native: "Ina son ruwa", pron: "i-NA son RU-wa" },
          { en: "Where is...?", native: "Ina... yake?", pron: "i-NA ... ya-KE" },
          { en: "How much?", native: "Nawa ne?", pron: "na-WA ne" },
          { en: "I don't understand", native: "Ban gane ba", pron: "ban GA-ne ba" },
          { en: "I don't know", native: "Ban sani ba", pron: "ban SA-ni ba" },
          { en: "Help!", native: "Taimaka!", pron: "tai-MA-ka" },
          { en: "Welcome", native: "Sannu da zuwa", pron: "SAN-nu da ZU-wa" }
        ]
      },
      family: {
        label: "Family",
        items: [
          { en: "Father", native: "Uba / Baba", pron: "U-ba" },
          { en: "Mother", native: "Uwa / Mama", pron: "U-wa" },
          { en: "Brother", native: "Ɗan'uwa", pron: "ɗan-U-wa" },
          { en: "Sister", native: "Yar'uwa", pron: "yar-U-wa" },
          { en: "Child", native: "Yaro / Yariya", pron: "YA-ro" },
          { en: "Friend", native: "Aboki", pron: "a-BO-ki" },
          { en: "House / Home", native: "Gida", pron: "GI-da" },
          { en: "Family", native: "Iyali", pron: "i-YA-li" }
        ]
      }
    }
  },

  igbo: {
    name: "Igbo",
    categories: {
      greetings: {
        label: "Greetings",
        items: [
          { en: "Hello", native: "Ndewo", pron: "NDE-wo" },
          { en: "How are you?", native: "Kedu?", pron: "KE-du" },
          { en: "Good morning", native: "Ụtụtụ ọma", pron: "u-TU-tu O-ma" },
          { en: "Good afternoon", native: "Ehihie ọma", pron: "e-HI-hie O-ma" },
          { en: "Good evening", native: "Mgbede ọma", pron: "MG-be-de O-ma" },
          { en: "I am fine", native: "Adị m mma", pron: "a-DI m mma" },
          { en: "Thank you", native: "Daalụ", pron: "DAA-lụ" },
          { en: "Please", native: "Biko", pron: "BI-ko" },
          { en: "Yes", native: "Ee / Eeh", pron: "EE" },
          { en: "No", native: "Mba", pron: "MBA" },
          { en: "Sorry", native: "Ndo", pron: "NDO" },
          { en: "Goodbye", native: "Ka ọ dị", pron: "ka o DI" },
          { en: "What is your name?", native: "Kedu aha gị?", pron: "KE-du a-HA gị" },
          { en: "My name is...", native: "Aha m bụ...", pron: "a-HA m bụ..." },
          { en: "Nice to meet you", native: "Obi dị m mma ịhụ gị", pron: "o-BI dị m mma" }
        ]
      },
      numbers: {
        label: "Numbers",
        items: [
          { en: "One", native: "Otu", pron: "O-tu" },
          { en: "Two", native: "Abụọ", pron: "a-BỤ-ọ" },
          { en: "Three", native: "Atọ", pron: "a-TỌ" },
          { en: "Four", native: "Anọ", pron: "a-NỌ" },
          { en: "Five", native: "Ise", pron: "i-SE" },
          { en: "Six", native: "Isii", pron: "i-SII" },
          { en: "Seven", native: "Asaa", pron: "a-SAA" },
          { en: "Eight", native: "Asatọ", pron: "a-sa-TỌ" },
          { en: "Nine", native: "Itoolu", pron: "i-to-O-lu" },
          { en: "Ten", native: "Iri", pron: "I-ri" },
          { en: "Twenty", native: "Iri abụọ", pron: "I-ri a-BỤ-ọ" },
          { en: "One hundred", native: "Otu narị", pron: "O-tu na-RỊ" }
        ]
      },
      common: {
        label: "Common Phrases",
        items: [
          { en: "Water", native: "Mmiri", pron: "MMI-ri" },
          { en: "Food", native: "Nri", pron: "NRI" },
          { en: "I am hungry", native: "Agụụ na-agụ m", pron: "a-GỤỤ na-a-GỤ m" },
          { en: "I want water", native: "Achọrọ m mmiri", pron: "a-CHỌ-rọ m MMI-ri" },
          { en: "Where is...?", native: "... dị ebee?", pron: "dị e-BEE" },
          { en: "How much?", native: "Ego ole?", pron: "e-GO o-LE" },
          { en: "I don't understand", native: "Aghọtaghị m", pron: "a-GHỌ-ta-ghị m" },
          { en: "Help!", native: "Nye m aka!", pron: "nye m A-ka" },
          { en: "Welcome", native: "Nnọọ", pron: "NNỌ-ọ" },
          { en: "See you later", native: "Ka ọ dị echi", pron: "ka o dị E-chi" }
        ]
      },
      family: {
        label: "Family",
        items: [
          { en: "Father", native: "Nna", pron: "NNA" },
          { en: "Mother", native: "Nne", pron: "NNE" },
          { en: "Brother", native: "Nwanne nwoke", pron: "nwa-NNE nwo-KE" },
          { en: "Sister", native: "Nwanne nwaanyị", pron: "nwa-NNE nwaa-NYỊ" },
          { en: "Child", native: "Nwa", pron: "NWA" },
          { en: "Friend", native: "Enyi", pron: "E-nyi" },
          { en: "House / Home", native: "Ụlọ", pron: "Ụ-lọ" },
          { en: "Family", native: "Ezinụlọ", pron: "e-zi-NỤ-lọ" }
        ]
      }
    }
  },

  yoruba: {
    name: "Yoruba",
    categories: {
      greetings: {
        label: "Greetings",
        items: [
          { en: "Hello", native: "Ẹ n lẹ / Báwo ni", pron: "EH n-leh / BA-wo ni" },
          { en: "Good morning", native: "Ẹ káàárọ̀", pron: "eh KAA-ro" },
          { en: "Good afternoon", native: "Ẹ káàsán", pron: "eh KAA-san" },
          { en: "Good evening", native: "Ẹ kú ìrọ̀lẹ́", pron: "eh KU i-RO-leh" },
          { en: "How are you?", native: "Báwo ni?", pron: "BA-wo ni" },
          { en: "I am fine", native: "Mo wà dáadáa", pron: "mo wah DAA-daa" },
          { en: "Thank you", native: "Ẹ ṣé / Ẹ ṣéun", pron: "eh SHEH" },
          { en: "Please", native: "Jọ̀wọ́", pron: "JO-wo" },
          { en: "Yes", native: "Bẹ́ẹ̀ni", pron: "BEH-ni" },
          { en: "No", native: "Rárá / Bẹ́ẹ̀kọ́", pron: "RA-ra" },
          { en: "Sorry", native: "Má bínú", pron: "ma BI-nu" },
          { en: "Goodbye", native: "Ó dàbọ̀", pron: "o DA-bo" },
          { en: "What is your name?", native: "Kí ni orúkọ rẹ?", pron: "ki ni o-RU-ko reh" },
          { en: "My name is...", native: "Orúkọ mi ni...", pron: "o-RU-ko mi ni..." },
          { en: "Welcome", native: "Ẹ káàbọ̀", pron: "eh KAA-bo" }
        ]
      },
      numbers: {
        label: "Numbers",
        items: [
          { en: "One", native: "Ọ̀kan / Ení", pron: "aw-KAHN" },
          { en: "Two", native: "Èjì", pron: "EH-jee" },
          { en: "Three", native: "Ẹ̀ta", pron: "EH-tah" },
          { en: "Four", native: "Ẹ̀rin", pron: "EH-reen" },
          { en: "Five", native: "Àrún", pron: "ah-ROON" },
          { en: "Six", native: "Ẹ̀fà", pron: "EH-fah" },
          { en: "Seven", native: "Èje", pron: "EH-jeh" },
          { en: "Eight", native: "Ẹ̀jọ", pron: "EH-jaw" },
          { en: "Nine", native: "Ẹ̀sán", pron: "EH-sahn" },
          { en: "Ten", native: "Ẹ̀wá", pron: "EH-wah" },
          { en: "Twenty", native: "Ogún", pron: "o-GOON" },
          { en: "One hundred", native: "Ọgọ́rùn", pron: "o-GO-roon" }
        ]
      },
      common: {
        label: "Common Phrases",
        items: [
          { en: "Water", native: "Omi", pron: "O-mi" },
          { en: "Food", native: "Oúnjẹ", pron: "o-UN-jeh" },
          { en: "I am hungry", native: "Ebi ń pa mí", pron: "EH-bi n pah mee" },
          { en: "I want water", native: "Mo fẹ́ omi", pron: "mo FEH o-mi" },
          { en: "Where is...?", native: "Nibo ni ... wà?", pron: "ni-BO ni ... wah" },
          { en: "How much?", native: "Eló ni?", pron: "EH-lo ni" },
          { en: "I don't understand", native: "Mi ò gbọ́", pron: "mi o GBO" },
          { en: "Help!", native: "Ràn mí lọ́wọ́!", pron: "ran mee lo-WO" },
          { en: "See you later", native: "A ó pàdé", pron: "a o PA-deh" },
          { en: "Good night", native: "Ó dàárọ̀", pron: "o DAA-ro" }
        ]
      },
      family: {
        label: "Family",
        items: [
          { en: "Father", native: "Bàbá", pron: "BA-ba" },
          { en: "Mother", native: "Ìyá", pron: "ee-YAH" },
          { en: "Brother", native: "Arákùnrin", pron: "a-ra-KOON-reen" },
          { en: "Sister", native: "Arábìnrin", pron: "a-ra-BEEN-reen" },
          { en: "Child", native: "Ọmọ", pron: "O-mo" },
          { en: "Friend", native: "Ọ̀rẹ́", pron: "o-REH" },
          { en: "House / Home", native: "Ilé", pron: "ee-LEH" },
          { en: "Family", native: "Ẹbí", pron: "eh-BEE" }
        ]
      }
    }
  }
};

// Helper: flatten all items for a language
function getAllItems(lang) {
  const cats = VOCAB[lang].categories;
  let all = [];
  Object.keys(cats).forEach(k => {
    all = all.concat(cats[k].items.map(item => ({ ...item, cat: k })));
  });
  return all;
}

function getCategories(lang) {
  return Object.keys(VOCAB[lang].categories);
}
