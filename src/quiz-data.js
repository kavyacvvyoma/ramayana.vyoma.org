// ════════════════════════════════════════════════════════════════════════════
//  quiz-data.js  —  Dynamic question storage for Weekly Quizzes
// ════════════════════════════════════════════════════════════════════════════
//  GUIDE FOR CONTENT TEAM:
//  To add a quiz for a new week (e.g. week 2), copy the template below and paste
//  it inside the QUIZ_DB object, separating keys with a comma.
//
//  Example:
//  "week-2": {
//    title: "Weekly Quiz - Week 02",
//    subtitle: "Test your knowledge of the next set of verses",
//    questions: [
//      {
//        questionText: "Your question here?",
//        options: [
//          { answerText: "Option A", isCorrect: false },
//          { answerText: "Option B", isCorrect: true },
//          { answerText: "Option C", isCorrect: false },
//          { answerText: "Option D", isCorrect: false }
//        ],
//        explanation: "Why Option B is correct (this shows after the user selects an answer)."
//      }
//    ]
//  }

export const QUIZ_DB = {
  "week-1": {
    title: "Weekly Quiz - Week 01",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 1-3)",
    questions: [
      {
        questionText: "Who are the two personalities mentioned in the first śloka?",
        options: [
          { answerText: "Vālmīki and Viśvāmitra", isCorrect: false },
          { answerText: "Vālmīki and Nārada", isCorrect: true },
          { answerText: "Rāma and Vasiṣṭha", isCorrect: false },
          { answerText: "Daśaratha and Nārada", isCorrect: false }
        ],
        explanation: "The verse begins \"tapaḥsvādhyāyanirataṃ... vālmīkirmunipuṅgavam (nāradam).\""
      },
      {
        questionText: "Find the odd one out from the following names:",
        options: [
          { answerText: "Vālmīki", isCorrect: false },
          { answerText: "Pracetasa", isCorrect: false },
          { answerText: "Ṛkṣa", isCorrect: false },
          { answerText: "Bhṛgu", isCorrect: true }
        ],
        explanation: "Bhṛgu is a different sage; all other names refer to Vālmīki (Pracetasa as the son of Varuṇa/Pracetas and Ṛkṣa as his earlier name)."
      },
      {
        questionText: "Nārada is considered the son of:",
        options: [
          { answerText: "Viṣṇu and Lakṣmī", isCorrect: false },
          { answerText: "Brahmā and Sarasvatī", isCorrect: true },
          { answerText: "Śiva and Pārvatī", isCorrect: false },
          { answerText: "Kaśyapa and Aditi", isCorrect: false }
        ],
        explanation: "Nārada is known as the mānasaputra (mind-born son) of Brahmā."
      },
      {
        questionText: "Who suggests to Rāma that they should settle in Citrakūṭa during their exile?",
        options: [
          { answerText: "Bharadvāja", isCorrect: true },
          { answerText: "Vasiṣṭha", isCorrect: false },
          { answerText: "Viśvāmitra", isCorrect: false },
          { answerText: "Agastya", isCorrect: false }
        ],
        explanation: "Bharadvāja provides the directions to Citrakūṭa at the confluence of rivers."
      },
      {
        questionText: "True or False: Rāma, Lakṣmaṇa, and Sītā visited Vālmīki's āśrama during the 14-year vanavāsa.",
        options: [
          { answerText: "TRUE", isCorrect: true },
          { answerText: "FALSE", isCorrect: false },
          { answerText: "Only Sītā visited", isCorrect: false },
          { answerText: "Not mentioned", isCorrect: false }
        ],
        explanation: "In the Ayodhya Kanda, they visit Vālmīki while searching for a place to stay in Citrakūṭa."
      },
      {
        questionText: "In the phrase \"Vāgvidāṃ varam\", what is the meaning of the word \"varam\"?",
        options: [
          { answerText: "A blessing", isCorrect: false },
          { answerText: "The best", isCorrect: true },
          { answerText: "A bridegroom", isCorrect: false },
          { answerText: "A week (7 days)", isCorrect: false }
        ],
        explanation: "Varam here means the \"foremost\" or \"best\" among the eloquent."
      },
      {
        questionText: "In the word \"paripapraccha\", what does the prefix (upasarga) \"pari\" indicate?",
        options: [
          { answerText: "Ask with respect", isCorrect: true },
          { answerText: "Ask repeatedly", isCorrect: false },
          { answerText: "Beat around the bush", isCorrect: false },
          { answerText: "Ask loudly", isCorrect: false }
        ],
        explanation: "The prefix \"pari\" indicates an inquiry made with completeness and great reverence/humility."
      }
    ]
  },
  "week-2": {
    title: "Weekly Quiz - Week 02",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 4-9)",
    questions: [
      {
        questionText: "The expression śrūyatām in śloka 6 is best understood as:",
        options: [
          { answerText: "A past passive participle: \"listened to\"", isCorrect: false },
          { answerText: "A polite imperative: “please listen”", isCorrect: true },
          { answerText: "An infinitive: “to hear”", isCorrect: false },
          { answerText: "A noun meaning “fame”", isCorrect: false }
        ],
        explanation: "Śrūyatām is an imperative expression, used here as a polite invite to listen. (The form is in Loṭ-lakāra)"
      },
      {
        questionText: "Who is called trilokajñaḥ in śloka 6?",
        options: [
          { answerText: "Rāma", isCorrect: false },
          { answerText: "Nārada", isCorrect: true },
          { answerText: "Vālmīki", isCorrect: false },
          { answerText: "Brahmā", isCorrect: false }
        ],
        explanation: "Śloka 6 describes Nārada as trilokajñaḥ — “knower of the three worlds.”"
      },
      {
        questionText: "In śloka 4, what is the best meaning of ātmavān?",
        options: [
          { answerText: "Self-controlled", isCorrect: true },
          { answerText: "Self-centered", isCorrect: false },
          { answerText: "Selfless", isCorrect: false },
          { answerText: "Self-contained", isCorrect: false }
        ],
        explanation: "Ātmavān means one who has mastery over oneself; śloka 4: ātmavān ko jitakrodhaḥ."
      },
      {
        questionText: "How many qualities did Vālmīki enumerate while asking Nārada about the ideal man?",
        options: [
          { answerText: "12", isCorrect: false },
          { answerText: "14", isCorrect: false },
          { answerText: "16", isCorrect: true },
          { answerText: "18", isCorrect: false }
        ],
        explanation: "Vālmīki lists exactly 16 qualities starting with (guṇavān, vīryavān...dyutimān, anasūyakaḥ, and the one whom even devāḥ fear in battle)."
      },
      {
        questionText: "Odd one out: Which of the following qualities was NOT part of Vālmīki's question?",
        options: [
          { answerText: "Dharmajñaḥ (knower of Dharma)", isCorrect: false },
          { answerText: "Kṛtajñaḥ (grateful)", isCorrect: false },
          { answerText: "Kambugrīvaḥ (conch-like neck)", isCorrect: true },
          { answerText: "Satyavākyaḥ (speaker of truth)", isCorrect: false }
        ],
        explanation: "Kambugrīvaḥ appears in Nārada's answer as a physical description of Rāma."
      },
      {
        questionText: "In śloka 2, what does the word sāmpratam mean in the phrase asmin sāmprataṃ loke?",
        options: [
          { answerText: "Contemporary", isCorrect: true },
          { answerText: "Culture", isCorrect: false },
          { answerText: "Cause", isCorrect: false },
          { answerText: "Ceremony", isCorrect: false }
        ],
        explanation: "Sāmpratam means “presently,” “currently,” or “in the present time.” This indicates that Rāma and Vālmīki lived at the same time."
      },
      {
        questionText: "In śloka 7, Nārada responds to Vālmīki by saying bahavo durlabhāś caiva ye tvayā kīrtitā guṇāḥ. This means..",
        options: [
          { answerText: "That the qualities listed by Vālmīki are common and easily found in many men", isCorrect: false },
          { answerText: "That the qualities are many and very rare to find together in a single person, yet he knows such a man", isCorrect: true },
          { answerText: "That Vālmīki has listed too few qualities and should add more", isCorrect: false },
          { answerText: "That such qualities exist only among the Devas, not among men", isCorrect: false }
        ],
        explanation: "Nārada acknowledges that the guṇas enumerated by Vālmīki are bahavaḥ (many) and durlabhāḥ (difficult to find) — especially together in one person. Yet, he affirms that such a man does exist, and proceeds to describe Rāma."
      }
    ]
  },
  "week-3": {
    title: "Weekly Quiz - Week 03",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 10-15)",
    questions: [
      {
        questionText: "What does the term gūḍhajatruḥ signify about Rāma?",
        options: [
          { answerText: "His collar bone is concealed due to musculature", isCorrect: true },
          { answerText: "His shoulders are unusually narrow", isCorrect: false },
          { answerText: "His neck is adorned with hidden ornaments", isCorrect: false },
          { answerText: "His chest bears a concealed scar", isCorrect: false }
        ],
        explanation: "Gūḍha = concealed, jatru = collar bone. The verse describes Rāma as one who has hidden collar bones."
      },
      {
        questionText: "Rāma is described as śubhalakṣaṇaḥ — adorned with auspicious bodily signs. Which śāstra traditionally deals with the interpretation of such physical signs and bodily marks?",
        options: [
          { answerText: "Jyotiḥśāstra", isCorrect: false },
          { answerText: "Sāmudrikaśāstra", isCorrect: true },
          { answerText: "Āyurvedaśāstra", isCorrect: false },
          { answerText: "Dharmaśāstra", isCorrect: false }
        ],
        explanation: "Sāmudrika Śāstra is the classical Indian science of physiognomy — interpreting bodily features, marks, and proportions to reveal character and destiny."
      },
      {
        questionText: "Find the odd one out",
        options: [
          { answerText: "Ṛgveda", isCorrect: false },
          { answerText: "Yajurveda", isCorrect: false },
          { answerText: "Sāmaveda", isCorrect: false },
          { answerText: "Dhanurveda", isCorrect: true }
        ],
        explanation: "The four principal Vedas are Ṛgveda, Yajurveda, Sāmaveda, and Atharvaveda. Dhanurveda is an Upaveda dealing with the science of archery and warfare. Śloka 14 mentions Rāma as vedavedāṅgatattvajñaḥ (knower of Vedas and Vedāṅgas) and dhanurvede ca niṣṭhitaḥ (skilled in Dhanurveda)."
      },
      {
        questionText: "The compound arindamaḥ is best analyzed as",
        options: [
          { answerText: "One who is defeated by enemies", isCorrect: false },
          { answerText: "One who subdues enemies", isCorrect: true },
          { answerText: "One who fears enemies", isCorrect: false },
          { answerText: "One who befriends enemies", isCorrect: false }
        ],
        explanation: "Ari (enemy), damaḥ (subduer/tamer) → arindamaḥ = subduer of both internal and external foes."
      },
      {
        questionText: "In sarga 1, Rāma is called dhātā (\"nourisher/sustainer\"), and rakṣitā svasya dharmasya (\"protector of his own Dharma\"). Which interpretation best captures why both are listed separately?",
        options: [
          { answerText: "They are redundant; the poet repeats for meter", isCorrect: false },
          { answerText: "Dhātā refers to material sustenance of people, while rakṣitā dharmasya refers to upholding the moral/cosmic order", isCorrect: true },
          { answerText: "Dhātā refers to family duties; rakṣitā dharmasya refers to royal duties", isCorrect: false },
          { answerText: "Dhātā is about the past; rakṣitā dharmasya is about the present", isCorrect: false }
        ],
        explanation: "The two epithets are not redundant - they reflect Rāma's dual role: as a king he is a sustainer of his subjects' worldly needs (dhātā), and as a Dharma-embodiment, he protects Dharma itself (rakṣitā dharmasya)."
      },
      {
        questionText: "The phrase \"prajānāṃ ca hite rataḥ\" conveys that Rāma",
        options: [
          { answerText: "Takes pleasure in performing rituals", isCorrect: false },
          { answerText: "Takes pleasure in the welfare of his people", isCorrect: true },
          { answerText: "Delights in gaining knowledge and is devoted to his teachers", isCorrect: false },
          { answerText: "Delights in hunting and sport", isCorrect: false }
        ],
        explanation: "Prajānām = of the people, hite rataḥ = engaged/delighting in their welfare. This reveals Rāma's compassionate kingship."
      },
      {
        questionText: "Odd one out: Which of the following qualities is NOT a physical attribute?",
        options: [
          { answerText: "Samaḥ (neither too tall nor too short)", isCorrect: false },
          { answerText: "Pīnavakṣāḥ (sturdy chest)", isCorrect: false },
          { answerText: "Pratāpavān (strikes terror in enemies)", isCorrect: true },
          { answerText: "Viśālākṣaḥ (wide-eyed)", isCorrect: false }
        ],
        explanation: "Samaḥ, pīnavakṣāḥ, and viśālākṣaḥ are physical/anatomical attributes. Pratāpavān, however, refers to Rāma's prowess and power to instill fear — a quality of his might, not his body."
      }
    ]
  },
  "week-4": {
    title: "Weekly Quiz - Week 04",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 16-18)",
    questions: [
      {
        questionText: "Who is the wife of Sugrīva in the Rāmāyaṇa?",
        options: [
          { answerText: "Ruma", isCorrect: true },
          { answerText: "Tārā", isCorrect: false },
          { answerText: "Mandodarī", isCorrect: false },
          { answerText: "Anasūyā", isCorrect: false }
        ],
        explanation: "Ruma is the wife of Sugrīva. Tārā is the wife of Vāli. Mandodarī is Rāvaṇa's wife, and Anasūyā is the wife of Sage Atri."
      },
      {
        questionText: "In śloka 1.1.16, what does the word ārya mean in describing Rāma?",
        options: [
          { answerText: "A member of the Aryan race", isCorrect: false },
          { answerText: "One who is worshipped / revered by all noble people", isCorrect: true },
          { answerText: "One who lives in Āryāvarta region", isCorrect: false },
          { answerText: "One who speaks the Ārya language", isCorrect: false }
        ],
        explanation: "Ārya in Sanskrit means noble, revered, worshipful — referring to one who is respected by all virtuous people due to his exemplary character. It is not a racial or geographic term here, but a mark of nobility and reverence."
      },
      {
        questionText: "Who is referred to as Dhanada in śloka 1.1.18 (compared with Rāma in tyāga / charity)?",
        options: [
          { answerText: "Kubera", isCorrect: true },
          { answerText: "Indra", isCorrect: false },
          { answerText: "Varuṇa", isCorrect: false },
          { answerText: "Agni", isCorrect: false }
        ],
        explanation: "Dhanada literally means \"giver of wealth\", an epithet of Kubera, the lord of wealth and treasures."
      },
      {
        questionText: "The phrase \"sarvadā abhigataḥ sadbhiḥ\" conveys that",
        options: [
          { answerText: "Rāma is sought by sajjanas (good people)", isCorrect: true },
          { answerText: "Rāma likes the company of good people", isCorrect: false },
          { answerText: "Rāma is feared by good people", isCorrect: false },
          { answerText: "Rāma seeks shelter from good people", isCorrect: false }
        ],
        explanation: "The phrase beautifully captures the mutual bond — just as rivers flow into the ocean and the ocean is enriched by them, good people draw strength and refuge from Rāma, and Rāma's greatness is reflected and sustained through them."
      },
      {
        questionText: "Who is referred to as Kausalyānandavardhanaḥ in śloka 1.1.17?",
        options: [
          { answerText: "Daśaratha (husband of Kausalyā)", isCorrect: false },
          { answerText: "Rāma (son of Kausalyā)", isCorrect: true },
          { answerText: "Lakṣmaṇa (step-son of Kausalyā)", isCorrect: false },
          { answerText: "Bharata (step-son of Kausalyā)", isCorrect: false }
        ],
        explanation: "Kausalyānandavardhanaḥ = \"the enhancer of Kausalyā's joy.\""
      },
      {
        questionText: "Odd one out: In śloka 1.1.18, Rāma is compared to four cosmic entities. Which of the following is NOT one of them?",
        options: [
          { answerText: "Viṣṇu (in valour)", isCorrect: false },
          { answerText: "Soma / Moon (in pleasing appearance)", isCorrect: false },
          { answerText: "Kālāgni (in anger)", isCorrect: false },
          { answerText: "Indra (in lordship)", isCorrect: true }
        ],
        explanation: "Śloka 18 compares Rāma to Viṣṇu (valour), Soma/Moon (pleasing sight), Kālāgni (anger), and Pṛthvī/Earth (forbearance). Indra is NOT mentioned in this verse."
      },
      {
        questionText: "Which word in śloka 1.1.16 means \"equanimous in pleasure and pain / one who treats everyone alike\"?",
        options: [
          { answerText: "Abhigataḥ", isCorrect: false },
          { answerText: "Sarvasamaḥ", isCorrect: true },
          { answerText: "Ekapriyadarśanaḥ", isCorrect: false },
          { answerText: "Ārya", isCorrect: false }
        ],
        explanation: "Sarvasamaḥ = sarva (all) + samaḥ (equal) → one who is equal towards all, equanimous in pleasure and pain."
      }
    ]
  },
  "week-5": {
    title: "Weekly Quiz - Week 05",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 22-27)",
    questions: [
      {
        questionText: "In śloka 1.1.22, 'पूर्वं दत्तवरा देवी' — who is the देवी (divine lady) referred to here?",
        options: [
          { answerText: "Kauśalyā", isCorrect: false },
          { answerText: "Sumitrā", isCorrect: false },
          { answerText: "Kaikeyī", isCorrect: true },
          { answerText: "Mandodarī (wife of Rāvaṇa)", isCorrect: false }
        ],
        explanation: "पूर्वं दत्तवरा देवी refers to Kaikeyī — the queen of Daśaratha who had previously been granted two boons."
      },
      {
        questionText: "What does the word विवासयामास (in śloka 1.1.23) mean?",
        options: [
          { answerText: "Sent into exile / banished", isCorrect: true },
          { answerText: "Crowned as king", isCorrect: false },
          { answerText: "Welcomed back home", isCorrect: false },
          { answerText: "Trained in warfare", isCorrect: false }
        ],
        explanation: "विवासयामास = 'sent into exile' / 'banished'. In śloka 1.1.23, King Daśaratha bound by satya (सत्यवचनात्) and dharma (धर्मपाशेन) — विवासयामास (exiled) his beloved son Rāma to the forest."
      },
      {
        questionText: "True or False: Śloka 1.1.24 (पितुर्वचननिर्देशात् कैकेय्या: प्रियकारणात्) explicitly names Mantharā as the one who incited Kaikeyī to demand Rāma's exile.",
        options: [
          { answerText: "True", isCorrect: false },
          { answerText: "False", isCorrect: true },
          { answerText: "Only directly implied", isCorrect: false },
          { answerText: "Mentioned in the next śloka", isCorrect: false }
        ],
        explanation: "Śloka 1.1.24 attributes Rāma's exile to 'पितुर्वचननिर्देशात्' (father's command) and 'कैकेय्याḥ प्रियकारणात्' (for Kaikeyī's pleasure). It does NOT mention Mantharā directly here."
      },
      {
        questionText: "In śloka 1.1.26, सौभ्रात्र (exemplary kinship/fraternity) was displayed by whom?",
        options: [
          { answerText: "Sage Saubhari (सौभरि)", isCorrect: false },
          { answerText: "Bharata", isCorrect: false },
          { answerText: "Lakṣmaṇa", isCorrect: true },
          { answerText: "Śatrughna", isCorrect: false }
        ],
        explanation: "भ्रातरं दयितो भ्रातुः सौभ्रात्रमनुदर्शयन्' — Lakṣmaṇa, the beloved brother of Rāma, displayed सौभ्रात्र (brotherly affection) by following Rāma to the forest."
      },
      {
        questionText: "Which is the second kāṇḍa (canto) of Vālmīki Rāmāyaṇa?",
        options: [
          { answerText: "Bālakāṇḍa", isCorrect: false },
          { answerText: "Ayodhyākāṇḍa", isCorrect: true },
          { answerText: "Āraṇyakāṇḍa", isCorrect: false },
          { answerText: "Yuddhakāṇḍa", isCorrect: false }
        ],
        explanation: "Vālmīki Rāmāyaṇa has 7 kāṇḍas in order: (1) Bālakāṇḍa, (2) Ayodhyākāṇḍa, (3) Āraṇyakāṇḍa, (4) Kiṣkindhākāṇḍa, (5) Sundarakāṇḍa, (6) Yuddhakāṇda, (7) Uttarakāṇda."
      },
      {
        questionText: "In śloka 1.1.22, what two boons (वर) did Kaikeyī request from Daśaratha?",
        options: [
          { answerText: "Rāma's coronation (अभिषेचनम्) and Bharata's exile (विवासनम्)", isCorrect: false },
          { answerText: "Rāma's exile (विवासनम्) and Bharata's coronation (अभिषेचनम्)", isCorrect: true },
          { answerText: "Sītā's exile and Lakṣmaṇa's coronation", isCorrect: false },
          { answerText: "Rāma's death and Bharata's kingship", isCorrect: false }
        ],
        explanation: "Śloka 1.1.22: 'विवासनं च रामस्य भरतस्याभिषेचनम्' — Kaikeyī asked for two boons: (1) विवासनं (exile) of Rāma, and (2) अभिषेचनम् (coronation) of Bharata."
      },
      {
        questionText: "The epithet 'सुमित्रानन्दवर्धनः' (sumitrānandavardhanaḥ) in śloka 1.1.25 is an epithet of whom?",
        options: [
          { answerText: "Bharata", isCorrect: false },
          { answerText: "Lakṣmaṇa", isCorrect: true },
          { answerText: "Śatrughna", isCorrect: false },
          { answerText: "Rāma", isCorrect: false }
        ],
        explanation: "Śloka 1.1.25 describes Lakṣmaṇa as 'विनयसम्पन्नः सुमित्रानन्दवर्धनः' - 'endowed with humility' and 'Sumitrā's son'."
      }
    ]
  },
  "week-6": {
    title: "Weekly Quiz - Week 06",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 28-33)",
    questions: [
      {
        questionText: "In śloka 1.1.28, Sītā following Rāma into exile is compared to which celestial pair?",
        options: [
          { answerText: "Rohinī following the Moon", isCorrect: true },
          { answerText: "Arundhatī following Sage Vasiṣṭha", isCorrect: false },
          { answerText: "Lopāmudrā following Sage Agastya", isCorrect: false },
          { answerText: "Sāvitrī following Satyavān", isCorrect: false }
        ],
        explanation: "Śloka 1.1.28a: 'शशिनं रोहिणी यथा' — 'like Rohinī following the Moon'. Just as Rohinī (star) is always with the Moon, Sītā remained inseparable from Rāma."
      },
      {
        questionText: "According to ślokas 1.1.29–30, who was the tribal chief (निषाद अधिपति) that Rāma met on the banks of River Gañgā in Śṛṅgiberapura?",
        options: [
          { answerText: "Guha (गुह)", isCorrect: true },
          { answerText: "Jābāli (जाबालि)", isCorrect: false },
          { answerText: "Bharadvāja (भरद्वाज)", isCorrect: false },
          { answerText: "Śatrughna (शत्रुघ्न)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.29–30a: 'गुहमासाद्य धर्मात्मा निषादाधिपतिं प्रियम्' — the virtuous Rāma met Guha, the tribal chief (निषाद अधिपति) who was fond of him, on the bank of River Gañgā in the town of Śṛṅgiberapura."
      },
      {
        questionText: "By whose ordainment did the trio (Rāma, Lakṣmaṇa, Sītā) first build their forest dwelling at Citrakūṭa?",
        options: [
          { answerText: "Sage Vasiṣṭha", isCorrect: false },
          { answerText: "Sage Bharadvāja (भरद्वाज)", isCorrect: true },
          { answerText: "Sage Agastya", isCorrect: false },
          { answerText: "Sage Kaṇva", isCorrect: false }
        ],
        explanation: "Śloka 1.1.31: 'भरद्वाजस्य शासनात्' — 'by the ordainment of Sage Bharadvāja'. The trio went from forest to forest, crossed many rivers, and at Bharadvāja's direction arrived at Citrakūṭa, where they built a charming cottage and lived happily."
      },
      {
        questionText: "What happened to King Daśaratha after Rāma went to Citrakūṭa? (śloka 1.1.32b–33a)",
        options: [
          { answerText: "He went to heaven (died), tormented by grief for his son", isCorrect: true },
          { answerText: "He followed Rāma to the forest", isCorrect: false },
          { answerText: "He waged war against the rākṣasas", isCorrect: false },
          { answerText: "He appointed Bharata as Yuvarāja and retired", isCorrect: false }
        ],
        explanation: "'चित्रकूटं गते रामे पुत्रशोकातुरस्तथा । राजा दशरथः स्वर्गं जगाम विलपन् सुतम् ॥' — On Rāma reaching Citrakūṭa, King Daśaratha, tormented by grief for his son, passed away to heaven, weeping for his son."
      },
      {
        questionText: "According to śloka 1.1.33b, who appointed Bharata for kingship after Daśaratha's death?",
        options: [
          { answerText: "Sage Vasiṣṭha and other prominent Brāhmaṇas", isCorrect: true },
          { answerText: "The citizens of Ayodhyā", isCorrect: false },
          { answerText: "The ministers of the kingdom", isCorrect: false },
          { answerText: "Sage Bharadvāja", isCorrect: false }
        ],
        explanation: "Śloka 1.1.33b: 'वसिष्ठप्रमुखैर्द्विजैः' — 'by Sage Vasiṣṭha and other prominent Brāhmaṇas (द्विज)'. Despite being appointed for kingship (राज्याय नियुज्यमानः), the mighty Bharata did not desire the kingdom (न इच्छत् राज्यम्)."
      }
    ]
  },
  "week-7": {
    title: "Weekly Quiz - Week 07",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 34-40)",
    questions: [
      {
        questionText: "What was the purpose of Bharata going to the forest? (śloka 1.1.34)",
        options: [
          { answerText: "To seek the grace of Rāma", isCorrect: true },
          { answerText: "To perform severe tapas", isCorrect: false },
          { answerText: "To fight the rākṣasas", isCorrect: false },
          { answerText: "To collect rare herbs", isCorrect: false }
        ],
        explanation: "Śloka 1.1.34: 'स जगाम वनं वीरो रामपादप्रसादकः' - that warrior Bharata went to the forest with the purpose of propitiating Rāma (seeking grace at Rāma's feet)."
      },
      {
        questionText: "According to śloka 1.1.36, how did Bharata address Rāma in the forest?",
        options: [
          { answerText: "\"You alone, the knower of dharma, are the king\"", isCorrect: true },
          { answerText: "\"You are my father\"", isCorrect: false },
          { answerText: "\"You are my guru\"", isCorrect: false },
          { answerText: "\"You must return to Ayodhyā immediately\"", isCorrect: false }
        ],
        explanation: "Śloka 1.1.36: 'त्वमेव राजा धर्मज्ञ इति रामं वचोऽब्रवीत्' — Bharata spoke to Rāma: 'You alone, the knower of dharma/probity, are (ought to be) the king'. This shows Bharata's ārya-bhāva (noble intention)."
      },
      {
        questionText: "Why did Rāma not desire the kingdom, despite being benevolent, gracious, and mighty?",
        options: [
          { answerText: "Due to his father's injunction", isCorrect: true },
          { answerText: "Because he disliked palace life", isCorrect: false },
          { answerText: "Because Bharata wanted it", isCorrect: false },
          { answerText: "Because the citizens rejected him", isCorrect: false }
        ],
        explanation: "Śloka 1.1.36–37: 'न च इच्छत् पितुरादेशात् राज्यं रामो महाबलः' — though Rāma was परमोदारः (very benevolent), सुमुखः (gracious), सुमहायशाः (highly famed), and महाबलः (mighty), he did not desire the kingdom due to his father's injunction (पितुरादेशात्)."
      },
      {
        questionText: "What did Rāma give to Bharata for the sake of the kingdom?",
        options: [
          { answerText: "His wooden shoes / padukās (पादुके)", isCorrect: true },
          { answerText: "His bow (धनुः)", isCorrect: false },
          { answerText: "His royal ornament (भूषणम्)", isCorrect: false },
          { answerText: "His crown (किरीटम्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.37–38: 'पादुके च अस्य राज्याय न्यासं दत्त्वा पुनः पुनः' — Rāma, the elder brother of Bharata (भरताग्रज), repeatedly entrusted his wooden shoes (पादुके / padukās) to Bharata for the sake of the kingdom. These padukās became symbols of Rāma's authority during his absence."
      },
      {
        questionText: "From which place did Bharata rule the kingdom in Rāma's absence? (śloka 1.1.38–39)",
        options: [
          { answerText: "Nandigrāma", isCorrect: true },
          { answerText: "Ayodhyā", isCorrect: false },
          { answerText: "Citrakūṭa", isCorrect: false },
          { answerText: "Prayāga", isCorrect: false }
        ],
        explanation: "Śloka 1.1.38–39: 'नन्दिग्रामे अकरोत् राज्यं रामागमनकाङ्क्षया' Bharata, his desire unfulfilled (काममनवाप्य एव), on touching Rāma's feet, carried out his duties from the village of Nandigrāma, awaiting Rāma's return."
      },
      {
        questionText: "Who is भरताग्रज (Bharatāgraja)?",
        options: [
          { answerText: "Rāma", isCorrect: true },
          { answerText: "Lakṣmaṇa", isCorrect: false },
          { answerText: "Śatrughna", isCorrect: false },
          { answerText: "Daśaratha", isCorrect: false }
        ],
        explanation: "Śloka 1.1.38: भरताग्रज (Bharatāgraja) means \"the elder brother of Bharata.\""
      },
      {
        questionText: "According to śloka 1.1.39–40, why did Rāma  leave Citrakūṭa and enter Daṇḍaka forest?",
        options: [
          { answerText: "To avoid repeated visits of citizens and people", isCorrect: true },
          { answerText: "To fight the demons of Daṇḍaka", isCorrect: false },
          { answerText: "To meet Sage Bharadvāja", isCorrect: false },
          { answerText: "To perform the aśvamedha sacrifice", isCorrect: false }
        ],
        explanation: "Śloka 1.1.39–40: 'गते तु भरते श्रीमान् सत्यसन्धो जितेन्द्रियः । रामस्तु पुनरालक्ष्य नागरस्य जनस्य च तत्रागमनमेकाग्रो दण्डकान् प्रविवेश ह' — the splendid, truth-bound, self-controlled Rāma, anticipating the re-arrival of citizens and people, became 'एकाग्रः' (undisturbed/single-pointed) and entered Daṇḍaka forest."
      }
    ]
  },
  "week-8": {
    title: "Weekly Quiz - Week 08",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 40-45)",
    questions: [
      {
        questionText: "Who was the demon killed by Rāma upon entering the vast Daṇḍaka forest?",
        options: [
          { answerText: "Vīrāḍha (विराध)", isCorrect: true },
          { answerText: "Khara (खर)", isCorrect: false },
          { answerText: "Triśira (त्रिशिरस)", isCorrect: false },
          { answerText: "Mārīca (मारीच)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.41: 'विराधं राक्षसं हत्वा' — the lotus-eyed (राजीवलोचनः) Rāma, upon entering the vast forest, killed the demon Vīrāḍha."
      },
      {
        questionText: "Which sages did Rāma visit in the Daṇḍaka forest, besides Agastya?",
        options: [
          { answerText: "Śarabhaṅga and Sūtīkṣṇa", isCorrect: true },
          { answerText: "Vasiṣṭha and Viśvāmitra", isCorrect: false },
          { answerText: "Bharadvāja and Kaṇva", isCorrect: false },
          { answerText: "Kaśyapa and Gautama", isCorrect: false }
        ],
        explanation: "Śloka 1.1.41–42: 'शरभङ्गं सुतीक्ष्णं च अपि अगस्त्यं च अगस्त्यभ्रातरं तथा' — Rāma beheld Śarabhaṅga (शरभङ्ग), Sūtīkṣṇa (सुतीक्ष्ण), Sage Agastya (अगस्त्य), and Agastya's brother (अगस्त्यभ्राता)."
      },
      {
        questionText: "From whom did Rāma receive the divine weapons according to śloka 1.1.42–43?",
        options: [
          { answerText: "Sage Agastya's", isCorrect: true },
          { answerText: "Sage Vasiṣṭha's", isCorrect: false },
          { answerText: "Sage Bharadvāja's", isCorrect: false },
          { answerText: "Sage Śarabhaṅga's", isCorrect: false }
        ],
        explanation: "Śloka 1.1.42–43: 'अगस्त्यवचनाच्च एव जग्राहेन्द्रं शरासनम्' — on Sage Agastya's word (आगस्त्यवचनात्), the delighted (परमप्रीतः) Rāma received (जग्राह) the divine weapons."
      },
      {
        questionText: "What divine weapons did Rāma receive from Sage Agastya?",
        options: [
          { answerText: "Indra's bow (ऐन्द्रं शरासनम्), sword (खड्ग), and two inexhaustible quivers (अक्षयसायकौ तूणी)", isCorrect: true },
          { answerText: "Only the sword (खड्ग)", isCorrect: false },
          { answerText: "Only a bow and a few arrows", isCorrect: false },
          { answerText: "The Brahmāstra (ब्रह्मास्त्र)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.42–43 mentions four items: (1) शरासनम् — a bow (specifically इन्द्रं — Indra's bow); (2) खड्गं च — a sword; (3) तूणी च — two quivers; (4) अक्षयसायकौ — with ever-replenishing/inexhaustible arrows. These were crucial for Rāma's battles against the rākṣasas."
      },
      {
        questionText: "The sages of Daṇḍaka forest are described as 'अग्निकल्पानाम्' (agnikalpānām) in śloka 1.1.45. This epithet means they were:",
        options: [
          { answerText: "Equal to fire (in austerity / radiance / spiritual power)", isCorrect: true },
          { answerText: "Made of literal fire", isCorrect: false },
          { answerText: "Worshippers of the fire-god Agni", isCorrect: false },
          { answerText: "Asuras (demons)", isCorrect: false }
        ],
        explanation: "अग्निकल्प' (agnikalpa) = 'equal to fire' or 'fire-like'. The sages dwelling in Daṇḍaka forest were so named because of their intense tapas (austerity) that made them shine like fire, or their spiritual power equalled Agni's."
      },
      {
        questionText: "According to śloka 1.1.43–44a, all the sages approached Rāma along with the forest-dwellers for what purpose?",
        options: [
          { answerText: "For the killing of demons", isCorrect: true },
          { answerText: "For permission to perform sacrifices", isCorrect: false },
          { answerText: "For Rāma to bless them", isCorrect: false },
          { answerText: "For Rāma to teach them archery", isCorrect: false }
        ],
        explanation: "Śloka 1.1.43–44: 'ऋषयः अभ्यागमन् सर्वे वधायासुर रक्षसाम्' — all the sages (ऋषयः), along with forest dwellers (वनचरैः सह), approached Rāma for the killing/elimination (वधाय) of asuras (असुर) and rākṣasas (रक्षसाम्)."
      },
      {
        questionText: "True or False: Rāma promised the sages of Daṇḍaka forest that he would kill the demons in combat.",
        options: [
          { answerText: "True", isCorrect: true },
          { answerText: "False", isCorrect: false },
          { answerText: "Only if the demons attacked first", isCorrect: false },
          { answerText: "Only some demons, not all", isCorrect: false }
        ],
        explanation: "Śloka 1.1.45: 'प्रतिज्ञातश्च रामेण वधः संयति रक्षसाम्' — 'a promise was made by Rāma (प्रतिज्ञातः) about the killing (वधः) of the demons (रक्षसाम्) in combat (संयति)'. This promise sets the stage for Rāma's role as protector of sages and destroyer of demons."
      }
    ]
  },
  "week-9": {
    title: "Weekly Quiz - Week 09",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 46-51)",
    questions: [
      {
        questionText: "Which demoness was disfigured by Rāma while he lived in the Daṇḍaka forest? (śloka 1.1.46)",
        options: [
          { answerText: "Śūrpaṇakhā (शूर्पणखा)", isCorrect: true },
          { answerText: "Tārā (तारा)", isCorrect: false },
          { answerText: "Mandodarī (मन्दोदरी)", isCorrect: false },
          { answerText: "Trijaṭā (त्रिजटा)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.46: 'विरूपिता शूर्पणखा राक्षसी कामरूपिणी' — while Rāma lived in Daṇḍaka forest, the demoness Śūrpaṇakhā (शूर्पणखा)."
      },
      {
        questionText: "The epithet 'कामरूपिणी' (kāmarūpiṇī) applied to Śūrpaṇakhā in śloka 1.1.46 means:",
        options: [
          { answerText: "One who can assume any form at will", isCorrect: true },
          { answerText: "One with a beautiful form", isCorrect: false },
          { answerText: "One with an ugly form", isCorrect: false },
          { answerText: "One who is full of desire (काम)", isCorrect: false }
        ],
        explanation: "कामरूपिणी' (kāmarūpiṇī) = 'one who can assume any desired form at will' (काम = desired, रूपिणी = one who has form). Śūrpaṇakhā could change her form to deceive others."
      },
      {
        questionText: "Śūrpaṇakhā (śloka 1.1.46) resided in:",
        options: [
          { answerText: "Janasthāna (जनस्थान)", isCorrect: true },
          { answerText: "Laṅkā (लङ्का)", isCorrect: false },
          { answerText: "Citrakūṭa (चित्रकूट)", isCorrect: false },
          { answerText: "Ayodhyā (अयोध्या)", isCorrect: false }
        ],
        explanation: "जनस्थाननिवासिनी' = 'resident of Janasthāna'. Janasthāna was a portion of the Daṇḍaka forest ruled by the demon Khara (where Śūrpaṇakhā lived)."
      },
      {
        questionText: "Which demon did Rāma kill in battle, incited by Śūrpaṇakhā's words? (śloka 1.1.47–48)",
        options: [
          { answerText: "Khara (खर), Triśira (त्रिशिरस), Duṣaṇa (दूषण), and their followers", isCorrect: true },
          { answerText: "Khara (खर) and Duṣaṇa (दूषण)", isCorrect: false },
          { answerText: "Only Mārīca (मारीच)", isCorrect: false },
          { answerText: "Kumbhakarṇa (कुम्भकर्ण) and Indrajit (इन्द्रजित्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.47–48: 'खरं त्रिशिरसं चैव दूषणं चैव राक्षसम् । निजघान रणे रामस्तेषां चैव पदानुगान्' — Rāma killed in battle: (1) Khara (खर), (2) Triśira (त्रिशिरस), (3) Duṣaṇa (दूषण), and (4) their foot-followers (पदानुगान्). Kumbhakarṇa and Indrajit appear later in the Yuddhakāṇda."
      },
      {
        questionText: "How many demons of Janasthāna were slain during Rāma's stay in the forest? (śloka 1.1.48–49)",
        options: [
          { answerText: "Fourteen thousand (चतुर्दशसहस्राणि)", isCorrect: true },
          { answerText: "One thousand (सहस्रम्)", isCorrect: false },
          { answerText: "One hundred (शतम्)", isCorrect: false },
          { answerText: "Ten thousand (दशसहस्राणि)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.48–49: 'रक्षसां निहतान्यासन् सहस्राणि चतुर्दश' — during Rāma's stay in that forest, fourteen thousand (चतुर्दशसहस्राणि = 14,000) demons inhabiting Janasthāna were slain (निहतानि). This massive number is also referenced in Mārīca's warning to Rāvaṇa."
      },
      {
        questionText: "According to śloka 1.1.49–50, on hearing the slaughter of his kinsmen, Rāvaṇa (क्रोधमूर्छितः) sought the help of:",
        options: [
          { answerText: "Mārīca (मारीच)", isCorrect: true },
          { answerText: "Kumbhakarṇa (कुम्भकर्ण)", isCorrect: false },
          { answerText: "Indrajit (इन्द्रजित्)", isCorrect: false },
          { answerText: "Vibhīṣaṇa (विभीषण)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.49–50: 'ततो ज्ञातिवधं श्रुत्वा रावणः क्रोधमूर्छितः । सहायं वरयामास मारीचं नाम राक्षसम्' — on hearing the slaughter (ज्ञातिवधम्) of his kinsmen, Rāvaṇa, convulsed in anger (क्रोधमूर्छितः), sought the help (सहायं वरयामास) of Mārīca (मारीच), a demon (राक्षसम्)."
      },
      {
        questionText: "What did Mārīca repeatedly tell Rāvaṇa to restrain him? (śloka 1.1.50–51)",
        options: [
          { answerText: "\"Rivalry with that formidable Rāma is not appropriate for you\"", isCorrect: true },
          { answerText: "\"You should attack Rāma immediately\"", isCorrect: false },
          { answerText: "\"Rāma is weak, you can easily defeat him\"", isCorrect: false },
          { answerText: "\"Let us return to Laṅkā and forget about Rāma\"", isCorrect: false }
        ],
        explanation: "Śloka 1.1.50–51: 'वार्यमाणः सुबहुशो मारीचेन स रावणः । न विरोधो बलवता क्षमो रावण तेन ते' Mārīca repeatedly tried to restrain Rāvaṇa, warning him: \"O Rāvaṇa, enmity (विरोधः) with that mighty (बलवता) Rāma is not appropriate for you (ते न क्षमः).\" Despite this wise counsel, Rāvaṇa ignored the advice and proceeded with his plan."
      }
    ]
  },
  "week-10": {
    title: "Weekly Quiz - Week 10",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 52-57)",
    questions: [
      {
        questionText: "While Rāvaṇa abducted Sītā, who tried to rescue her?",
        options: [
          { answerText: "Śūrpaṇakhā (शूर्पणखा)", isCorrect: false },
          { answerText: "Sampāti (सम्पाति)", isCorrect: false },
          { answerText: "Kabandha (कबन्ध)", isCorrect: false },
          { answerText: "Jaṭāyu (जटायु)", isCorrect: true }
        ],
        explanation: "Śloka 1.1.52b–53a: 'जहार भार्यां रामस्य हत्वा जटायुषम्' — Rāvaṇa stole (जहार) Rāma's wife after killing the vulture (गृध्रम्) Jaṭāyu (जटायु). Jaṭāyu tried to rescue Sītā but was overpowered. Sampāti is Jaṭāyu's elder brother."
      },
      {
        questionText: "The word 'मायाविना' (māyāvinā) used for Mārīca in śloka 1.1.52 indicates that he is a:",
        options: [
          { answerText: "Trickster / one who uses illusion", isCorrect: true },
          { answerText: "Brave warrior", isCorrect: false },
          { answerText: "Loyal friend", isCorrect: false },
          { answerText: "Devoted messenger", isCorrect: false }
        ],
        explanation: "'मायाविन्' (māyāvin) = 'one who uses माया (illusion/magic)'. Mārīca is called a मायाविन् because he used illusion (in the form of a golden deer, per Āraṇyakāṇḍa) to lure Rāma and Lakṣmaṇa away from the hermitage, enabling Rāvaṇa to abduct Sītā."
      },
      {
        questionText: "How did Rāma react upon seeing Jaṭāyu slain and hearing of Sītā's abduction?",
        options: [
          { answerText: "He immediately attacked Rāvaṇa's stronghold", isCorrect: false },
          { answerText: "He wailed grief-stricken", isCorrect: true },
          { answerText: "He returned to Ayodhyā", isCorrect: false },
          { answerText: "He performed a śrāddha for Jaṭāyu", isCorrect: false }
        ],
        explanation: "Śloka 1.1.53b–54a: 'राघवः शोकसंतप्तो विललापाकुलेन्द्रियः' — the grief-seething (शोकसंतप्तः), senses-disturbed (आकुलेन्द्रियः) Rāma wailed (विललाप) on seeing the smitten vulture and hearing of Sītā's abduction."
      },
      {
        questionText: "After cremating Jaṭāyu, whom did Rāma encounter while searching for Sītā in the forest?",
        options: [
          { answerText: "Khara (खर)", isCorrect: false },
          { answerText: "Virādha (विराध)", isCorrect: false },
          { answerText: "Kabandha (कबन्ध)", isCorrect: true },
          { answerText: "Dūṣaṇa (दूषण)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.55: 'कबन्धं नाम रूपेण विकृतं घोरदर्शनम्' — Rāma saw a demon named Kabandha (कबन्ध). Kabandha was a cursed Gandharva whom Rāma killed and released, before being directed to Śabarī."
      },
      {
        questionText: "Kabandha is described as 'विकृतं घोरदर्शनम्' in śloka 1.1.55. This means his appearance was:",
        options: [
          { answerText: "Handsome like a god", isCorrect: false },
          { answerText: "Beautiful and golden", isCorrect: false },
          { answerText: "Invisible and formless", isCorrect: false },
          { answerText: "Distorted and Terrible", isCorrect: true }
        ],
        explanation: "विकृत (vikṛta) = 'deformed, distorted, unnatural'; 'घोरदर्शन' (ghoradarśana) = 'of terrible/hideous appearance'. Together they paint a picture of a monstrous, misshapen demon — fitting since Kabandha had no proper head or neck, just a mouth on his belly."
      },
      {
        questionText: "After slaying Kabandha, what direction did Kabandha give to Rāma before ascending to heaven?",
        options: [
          { answerText: "To proceed to Śabarī", isCorrect: true },
          { answerText: "To return to Ayodhyā", isCorrect: false },
          { answerText: "To meet Vāli immediately", isCorrect: false },
          { answerText: "To head straight to Laṅkā", isCorrect: false }
        ],
        explanation: "Śloka 1.1.57a: 'शबरीं धर्मनिपुणामभिगच्छ' — 'Oh Rāghava, you proceed to Śabarī.'"
      },
      {
        questionText: "The epithet 'धर्मनिपुणाम्' (dharma-nipuṇām) used for Śabarī in means she was:",
        options: [
          { answerText: "A teacher of dharma", isCorrect: false },
          { answerText: "An expert / skilled in dharma", isCorrect: true },
          { answerText: "A performer of sacrifices", isCorrect: false },
          { answerText: "A warrior of dharma", isCorrect: false }
        ],
        explanation: "धर्मनिपुण (dharma-nipuṇa) = 'expert/skilled in dharma'."
      }
    ]
  },
  // ── WEEK 11 QUIZ ─────────────────────────────────────────────────────────────
  "week-11": {
    title: "Weekly Quiz - Week 11",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 58-63)",
    questions: [
      {
        questionText: "On the banks of which river/lake did Rāma meet Hanumān for the first time?",
        options: [
          { answerText: "Pampā lake", isCorrect: true },
          { answerText: "Gañgā", isCorrect: false },
          { answerText: "Sarayū", isCorrect: false },
          { answerText: "Godāvarī", isCorrect: false }
        ],
        explanation: "Śloka 1.1.58b: 'पम्पातीरे हनुमता संगतो वानरेण ह' — 'On the banks of Pampa lake (पम्पातीरे), [Rāma] was united (संगतः) with the vānara Hanumān (हनुमता वानरेण)'. Pampa is a sacred lake in the Kiṣkindhā region, near the Rṣyamūka mountain."
      },
      {
        questionText: "According to śloka 1.1.58, on whose word did Rāma meet Sugrīva?",
        options: [
          { answerText: "Vibhīṣaṇa's", isCorrect: false },
          { answerText: "Hanumān's", isCorrect: true },
          { answerText: "Jaṭāyu's", isCorrect: false },
          { answerText: "Śabarī's", isCorrect: false }
        ],
        explanation: "Śloka 1.1.59a: 'हनुमद्वचनाच्चैव सुग्रीवेण समागतः' — and upon Hanumān's word (हनुमद्वचनात्), [Rāma] met with Sugrīva"
      },
      {
        questionText: "According to śloka 1.1.59, what did the mighty Rāma narrate to Sugrīva?",
        options: [
          { answerText: "The story of his ancestors and birth", isCorrect: false },
          { answerText: "His journey to the forest", isCorrect: false },
          { answerText: "Everything from the beginning, especially Sītā's abduction", isCorrect: true },
          { answerText: "The death of King Daśaratha", isCorrect: false }
        ],
        explanation: "Śloka 1.1.59b–60a: 'शंशत् रामो महाबलः आदितस्तत् यथावृत्तं सीतायाश्च विशेषतः' — the mighty Rāma detailed all that happened from the beginning, and in particular regarding Sītā."
      },
      {
        questionText: "What made the friendship between Rāma and Sugrīva solemn and binding?",
        options: [
          { answerText: "An oath on the Vedas", isCorrect: false },
          { answerText: "Brahmā's verbal blessing", isCorrect: false },
          { answerText: "A formal written contract", isCorrect: false },
          { answerText: "Sacred fire as witness", isCorrect: true }
        ],
        explanation: "Śloka 1.1.61a: 'चकार सख्यं रामेण प्रीतश्चैवाग्निसाक्षिकम्' — 'delighted, [Sugrīva] made friendship with Rāma, with sacred fire as witness'."
      },
      {
        questionText: "The word 'प्रणयात्' (praṇayāt) in śloka 1.1.62a means:",
        options: [
          { answerText: "Out of affection", isCorrect: true },
          { answerText: "Out of anger", isCorrect: false },
          { answerText: "Out of grief", isCorrect: false },
          { answerText: "Out of duty", isCorrect: false }
        ],
        explanation: "Śloka 1.1.62a: 'प्रणयाद् दुःखितेन च' — 'out of affection (प्रणयात्), by the grief-stricken (दुःखितेन) [Sugrīva], [the story of his enmity] was related to Rāma'."
      },
      {
        questionText: "What enmity did Sugrīva narrate to Rāma?",
        options: [
          { answerText: "His enmity with Rāvaṇa", isCorrect: false },
          { answerText: "His enmity with Vāli", isCorrect: true },
          { answerText: "His enmity with Bharata", isCorrect: false },
          { answerText: "His enmity with his father", isCorrect: false }
        ],
        explanation: "This enmity is with his elder brother Vāli who had exiled him and taken his wife."
      },
      {
        questionText: "What promise did Rāma make to Sugrīva?",
        options: [
          { answerText: "To return to Ayodhyā", isCorrect: false },
          { answerText: "To kill Rāvaṇa in Laṅkā", isCorrect: false },
          { answerText: "To kill Vāli", isCorrect: true },
          { answerText: "To make Sugrīva a celestial being", isCorrect: false }
        ],
        explanation: "Śloka 1.1.63a: 'प्रतिज्ञातं च रामेण तदा वालिवधं प्रति' — 'and a promise was made by Rāma then regarding the killing of Vāli. Sugrīva also described Vālin's immense strength to prepare Rāma for the challenge."
      }
    ]
  },
  // ── WEEK 12 QUIZ ─────────────────────────────────────────────────────────────
  "week-12": {
    title: "Weekly Quiz - Week 12",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 63-69)",
    questions: [
      {
        questionText: "Sugrīva was never doubtful about Rāma's prowess. True or False?",
        options: [
          { answerText: "TRUE", isCorrect: false },
          { answerText: "FALSE", isCorrect: true }
        ],
        explanation: "Śloka 1.1.63b–64: 'सुग्रीवः शङ्कितश्चासीत् नित्यं वीर्येण राघवे' — 'Sugrīva was doubtful about Rāma's prowess'. Sugrīva had seen Vāli's superhuman strength and wanted proof of Rāma's comparable power."
      },
      {
        questionText: "Whose massive skeleton did Sugrīva show Rāma to gain confidence in him?",
        options: [
          { answerText: "Jaṭāyu", isCorrect: false },
          { answerText: "Kabandha", isCorrect: false },
          { answerText: "Duṇḍubhi", isCorrect: true },
          { answerText: "Vāli", isCorrect: false }
        ],
        explanation: "Śloka 1.1.64: 'दुन्दुभेः कायमुत्तमं महापर्वतसन्निभम् दर्शयामास सुग्रीवः' — 'Sugrīva showed the best, great mountain-like body of Duṇḍubhi'."
      },
      {
        questionText: "According to śloka 1.1.65, how far did Rāma kick Duṇḍubhi's body, and with what?",
        options: [
          { answerText: "One yojana with his heel", isCorrect: false },
          { answerText: "Two hundred bow-lengths with both feet", isCorrect: false },
          { answerText: "Five yojanas with his full palm", isCorrect: false },
          { answerText: "Ten yojanas with the big toe of his foot", isCorrect: true }
        ],
        explanation: "Śloka 1.1.65: 'पादाङ्गुष्ठेन चिक्षेप सम्पूर्णं दशयोजनम्' — Rāma, smiling and seeing the bones, threw Duṇḍubhi's body 'wholly for ten yojanas with the big toe of his foot'. This is roughly 90 miles with a toe-flip!"
      },
      {
        questionText: "To further convince Sugrīva, what did Rāma do with one great arrow?",
        options: [
          { answerText: "Pierced seven śāla trees", isCorrect: true },
          { answerText: "Split the ocean in two", isCorrect: false },
          { answerText: "Pierced all 7 mountains", isCorrect: false },
          { answerText: "Killed Vālin in one shot", isCorrect: false }
        ],
        explanation: "Śloka 1.1.66: 'बिभेद च पुनः शालान् सप्तैकेन महेषुणा । गिरिं रसावलं चैव जनयन् प्रत्ययं तथा' — 'Again, with one great arrow, [Rāma] pierced seven śāla trees, a mountain, and the nethermost earth (रसातलं), to create faith [in Sugrīva's mind]'."
      },
      {
        questionText: "After Rāma's demonstration of prowess, where did Sugrīva take him?",
        options: [
          { answerText: "To the city of Laṅkā", isCorrect: false },
          { answerText: "To the cave-like Kiṣkindhā", isCorrect: true },
          { answerText: "To the kingdom of Ayodhyā", isCorrect: false },
          { answerText: "To the village of Nandigrāma", isCorrect: false }
        ],
        explanation: "Śloka 1.1.67: 'किष्किन्धां रामसहितो जगाम च गुहां तदा' — the great monkey Sugrīva, gladdened proceeded to cave-like Kiṣkindhā along with Rāma. Kiṣkindhā is the monkey kingdom on Ṛṣyamūka mountain."
      },
      {
        questionText: "Upon reaching Kiṣkindhā with Rāma, what did Sugrīva do in śloka 1.1.68?",
        options: [
          { answerText: "He danced in joy", isCorrect: false },
          { answerText: "He sang melodiously", isCorrect: false },
          { answerText: "He roared loudly", isCorrect: true },
          { answerText: "He prayed in silence", isCorrect: false }
        ],
        explanation: "Śloka 1.1.68: 'ततः अगर्जत् हरिवरः सुग्रीवो हेमपिङ्गलः' — Then the best of monkeys Sugrīva, roared."
      },
      {
        questionText: "With how many arrows did Rāma kill Vāli?",
        options: [
          { answerText: "Many", isCorrect: false },
          { answerText: "Two", isCorrect: false },
          { answerText: "Three", isCorrect: false },
          { answerText: "One", isCorrect: true }
        ],
        explanation: "Śloka 1.1.69: 'निजघान च तत्रैनं शरेणैकेन राघवः' — Despite Vāli's superhuman strength, Rāma's arrow was unstoppable."
      }
    ]
  },
  // ── WEEK 13 QUIZ ─────────────────────────────────────────────────────────────
  "week-13": {
    title: "Weekly Quiz - Week 13",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 70-75)",
    questions: [
      {
        questionText: "After killing Vāli, whom did Rāma install as the king of the vānaras? (śloka 1.1.70)",
        options: [
          { answerText: "Vibhīṣaṇa (विभीषणम्)", isCorrect: false },
          { answerText: "Hanumān (हनूमन्तम्)", isCorrect: false },
          { answerText: "Sugrīva (सुग्रीवम्)", isCorrect: true },
          { answerText: "Bharata (भरतम्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.70: 'ततः सुग्रीववचनात् हत्वा वालिनम् आहवे । सुग्रीवमेव तत् राज्ये राघवः प्रत्यपादयत्'"
      },
      {
        questionText: "After being crowned, what did Sugrīva do along with all the vānaras?",
        options: [
          { answerText: "Made them perform sacrifices", isCorrect: false },
          { answerText: "Sent them to attack Laṅkā immediately", isCorrect: false },
          { answerText: "Ordered them to return to Ayodhyā", isCorrect: false },
          { answerText: "Dispatched them in different directions to search for Sītā", isCorrect: true }
        ],
        explanation: "Śloka 1.1.71: 'स च सर्वान् समानीय वानरान् वानरर्षभः । दिशः प्रस्थापयामास दिदृक्षुर्जनकात्मजाम्'"
      },
      {
        questionText: "According to śloka 1.1.72, on whose word did the mighty Hanumān fly across the salty ocean?",
        options: [
          { answerText: "The vulture Sampāti", isCorrect: true },
          { answerText: "Sage Nārada", isCorrect: false },
          { answerText: "Lord Brahmā", isCorrect: false },
          { answerText: "King Indra", isCorrect: false }
        ],
        explanation: "Śloka 1.1.72: 'ततो गृध्रस्य वचनात् सम्पातेर्बली हनूमान्' — 'Thereafter, upon the word of the vulture Sampāti, the mighty Hanumān lept'. Sampāti is Jaṭāyu's elder brother who, having lost his wings in the sun's heat, helped locate Sītā from his mountain perch."
      },
      {
        questionText: "How long was the salty ocean that Hanumān crossed?",
        options: [
          { answerText: "Ten yojanas", isCorrect: false },
          { answerText: "One hundred yojanas", isCorrect: true },
          { answerText: "Fifty yojanas", isCorrect: false },
          { answerText: "One yojana", isCorrect: false }
        ],
        explanation: "One yojana is roughly 9-10 miles, so the leap covered about 900-1000 miles — a feat only Hanumān could achieve."
      },
      {
        questionText: "Where in Laṅkā did Hanumān find Sītā?",
        options: [
          { answerText: "In a prison cell underground", isCorrect: false },
          { answerText: "In Rāvaṇa's private palace", isCorrect: false },
          { answerText: "In the Aśoka gardens, meditating on Rāma", isCorrect: true },
          { answerText: "On the seashore", isCorrect: false }
        ],
        explanation: "Śloka 1.1.73: 'ददर्श सीतां ध्यायन्तीम् अशोकवनिकां गताम्' — Hanumān saw Sītā 'meditating on Rāma, situated in the Aśoka gardens."
      },
      {
        questionText: "Before being captured, what did Hanumān do in the Aśoka gardens?",
        options: [
          { answerText: "Burnt down the entire garden", isCorrect: false },
          { answerText: "Just delivered Rāma's message and left", isCorrect: false },
          { answerText: "Fought Rāvaṇa and won", isCorrect: false },
          { answerText: "Consoled Sītā, and destroyed the grove", isCorrect: true }
        ],
        explanation: "Śloka 1.1.74: 'निवेदयित्वाभिज्ञानं प्रवृत्तिं च निवेद्य च । समाश्वास्य च वैदेहीं मर्दयामास तोरणम्'"
      },
      {
        questionText: "Who were defeated by Hanumān in Lanka?",
        options: [
          { answerText: "Five army chiefs", isCorrect: false },
          { answerText: "Seven ministers' sons", isCorrect: false },
          { answerText: "Akṣakumāra", isCorrect: false },
          { answerText: "All of these", isCorrect: true }
        ],
        explanation: "Śloka 1.1.75: 'पञ्च सेनाग्रगान् हत्वा सप्त मन्त्रिसुतान् अपि । शूरम् अक्षं च निष्पिष्य ग्रहणं समुपागमत्'"
      }
    ]
  },
  // ── WEEK 14 QUIZ ─────────────────────────────────────────────────────────────
  "week-14": {
    title: "Weekly Quiz - Week 14",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 76-81)",
    questions: [
      {
        questionText: "By whose boon was Hanumān free from the captivity of weapons?",
        options: [
          { answerText: "King Indra's", isCorrect: false },
          { answerText: "Lord Śiva's", isCorrect: false },
          { answerText: "Lord Viṣṇu's", isCorrect: false },
          { answerText: "Brahmā's", isCorrect: true }
        ],
        explanation: "Śloka 1.1.76: 'ज्ञात्वा पितामहात् वरात्' — 'Knowing himself to be free from [the captivity of] weapons, by Brahmā's boon'."
      },
      {
        questionText: "What did the great Hanumān do with his tail in Laṅkā?",
        options: [
          { answerText: "Burnt the city of Laṅkā", isCorrect: true },
          { answerText: "Tied it around Rāvaṇa's neck", isCorrect: false },
          { answerText: "Used it as a weapon to kill the demons", isCorrect: false },
          { answerText: "Converted it into a creeper to hide", isCorrect: false }
        ],
        explanation: "Śloka 1.1.77: 'दग्ध्वा पूरीं लङ्कां ऋते सीतां च मैथिलीम्'"
      },
      {
        questionText: "After returning from Laṅkā, what did Hanumān report to Rāma?",
        options: [
          { answerText: "\"Rāvaṇa is dead\"", isCorrect: false },
          { answerText: "\"Seen Sītā\" (दृष्टा सीता)", isCorrect: true },
          { answerText: "\"Laṅkā is destroyed\"", isCorrect: false },
          { answerText: "\"I need reinforcements\"", isCorrect: false }
        ],
        explanation: "Śloka 1.1.78: 'अभिगम्य महात्मानं कृत्वा रामं प्रदक्षिणम् । न्यवेदयदमेयात्मा दृष्टा सीता इति तत्त्वतः' — 'Approaching Rāma, performing circumambulation, Hanumān reported in essence \"Seen (दृष्टा) Sītā (सीता)\"'."
      },
      {
        questionText: "According to śloka 1.1.79, why did Rāma (with Sugrīva and monkeys) approach the shore of the great ocean?",
        options: [
          { answerText: "To meet the Ocean-god for blessings", isCorrect: false },
          { answerText: "To find a boat to cross", isCorrect: false },
          { answerText: "To cross and reach Lanka", isCorrect: true },
          { answerText: "To perform a sacrifice by the sea", isCorrect: false }
        ],
        explanation: "Śloka 1.1.79: 'ततः सुग्रीवसहितः गत्वा तीरं महोदधेः । समुद्रं क्षोभयामास शरैः आदित्यसन्निभैः' — 'Thereafter, with Sugrīva, going to the shore of the great ocean, Rāma threatened the ocean to give way.'"
      },
      {
        questionText: "Who built the bridge across the ocean on the Ocean-god's word?",
        options: [
          { answerText: "Rāvaṇa", isCorrect: false },
          { answerText: "Hanumān", isCorrect: false },
          { answerText: "Vibhīṣaṇa", isCorrect: false },
          { answerText: "Nala", isCorrect: true }
        ],
        explanation: "Śloka 1.1.80: 'समुद्रवचनाच्चैव नलं सेतुम् अकारयत्' — 'and upon the word of the Ocean-god, [Rāma] had Nala build the bridge'."
      },
      {
        questionText: "The Ocean-god is called 'सरितांपतिः' (saritāṃpatiḥ) in śloka 1.1.80. This epithet means:",
        options: [
          { answerText: "Lord of rivers", isCorrect: true },
          { answerText: "King of fishes", isCorrect: false },
          { answerText: "Ruler of all seas", isCorrect: false },
          { answerText: "Son of the waters", isCorrect: false }
        ],
        explanation: "सरितांपति (saritāṃpati) = 'lord/chief of rivers/flows'. The ocean is the source of all rivers, hence he is their 'lord'."
      },
      {
        questionText: "According to śloka 1.1.81, whom did Śrī Rāma slay in battle after reaching Laṅkā?",
        options: [
          { answerText: "Kumbhakarṇa", isCorrect: false },
          { answerText: "Rāvaṇa", isCorrect: true },
          { answerText: "Indrajit", isCorrect: false },
          { answerText: "Khara", isCorrect: false }
        ],
        explanation: "Śloka 1.1.81: 'गत्वा तु नगरीं लङ्कां हत्वा रावणमाहवे' — 'Having gone to the city of Laṅkā and slain Rāvaṇa in battle', he reunited with Sītā."
      }
    ]
  },
  // ── WEEK 15 QUIZ ─────────────────────────────────────────────────────────────
  "week-15": {
    title: "Weekly Quiz - Week 15",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 82-87)",
    questions: [
      {
        questionText: "Where did Rāma speak harshly to Sītā in śloka 1.1.82?",
        options: [
          { answerText: "In the assembly of the people", isCorrect: true },
          { answerText: "Privately in their tent", isCorrect: false },
          { answerText: "In the Aśoka gardens", isCorrect: false },
          { answerText: "In Rāvaṇa's court", isCorrect: false }
        ],
        explanation: "Śloka 1.1.82: 'ताम् उवाच ततः रामः परुषं जनसंसदि' — 'Then, Rāma spoke harshly to her in the assembly of the people'."
      },
      {
        questionText: "What did Sītā do in response to Rāma's harsh public words?",
        options: [
          { answerText: "Returned to her father Janaka", isCorrect: false },
          { answerText: "Entered the burning fire", isCorrect: true },
          { answerText: "Cursed Rāma and left", isCorrect: false },
          { answerText: "Went back to Aśoka gardens in Laṅkā", isCorrect: false }
        ],
        explanation: "Śloka 1.1.82: 'अमृष्यमाणा सा सीता विवेश ज्वलनं सती' — 'Intolerant of the harsh words, that Sītā, being devoted to her husband, entered the burning fire'. This is the famous Agni-parīkṣā of Sītā."
      },
      {
        questionText: "The word 'अमृष्यमाणा' (amṛṣyamāṇā) used for Sītā in śloka 1.1.82 means:",
        options: [
          { answerText: "Calm / composed", isCorrect: false },
          { answerText: "Happy / pleased", isCorrect: false },
          { answerText: "Intolerant / unable to bear", isCorrect: true },
          { answerText: "Confused / bewildered", isCorrect: false }
        ],
        explanation: "'अमृष्यमाणा' = 'one who is intolerant / unable to bear / indignant'. The verbal root is मृष् meaning 'to bear/forebear'. With the prefix अ- and the middle voice, it means 'not being able to tolerate'."
      },
      {
        questionText: "According to ślokas 1.1.83–84, on whose word did Rāma know Sītā to be sinless?",
        options: [
          { answerText: "Lord Varuṇa's", isCorrect: false },
          { answerText: "Lord Brahmā's", isCorrect: false },
          { answerText: "King Indra's", isCorrect: false },
          { answerText: "The Fire-god Agni's", isCorrect: true }
        ],
        explanation: "Śloka 1.1.83: 'ततः अग्निवचनात् सीतां ज्ञात्वा विगतकल्मषाम्' — 'Then, upon the word of the Fire-god, knowing Sītā to be sinless'. Agni, who had protected Sītā in the fire, testified to her purity, restoring her honor."
      },
      {
        questionText: "What did Rāma do after Vibhīṣaṇa was anointed as the king of the rākṣasas in Laṅkā?",
        options: [
          { answerText: "He rejoiced (having accomplished his task)", isCorrect: true },
          { answerText: "He immediately returned to Ayodhyā", isCorrect: false },
          { answerText: "He attacked other rākṣasa kingdoms", isCorrect: false },
          { answerText: "He performed a great sacrifice", isCorrect: false }
        ],
        explanation: "Śloka 1.1.85: 'कृतकृत्यः तदा रामः विज्वरः प्रमुमोद ह' — 'Then, Rāma, having accomplished his purpose, free from distress, rejoiced highly'. Vibhīṣaṇa, Rāvaṇa's righteous brother who had sided with Rāma, was made king of Laṅkā."
      },
      {
        questionText: "According to śloka 1.1.86, by what means did Rāma travel to Ayodhyā?",
        options: [
          { answerText: "By walking through the forest", isCorrect: false },
          { answerText: "By the Puṣpaka aircraft", isCorrect: true },
          { answerText: "By his royal chariot", isCorrect: false },
          { answerText: "By horse-drawn carriage", isCorrect: false }
        ],
        explanation: "Śloka 1.1.86: 'अयोध्यां प्रस्थितः रामः पुष्पकेण सुहृद्वृतः' — 'Rāma, surrounded by well-wishers, travelled to Ayodhyā by Puṣpaka'. The Puṣpaka Vimāna was originally Kubera's aerial chariot, seized by Rāvaṇa, which was returned back by Rāma."
      },
      {
        questionText: "According to śloka 1.1.87, after going to Sage Bharadvāja's hermitage, what did Rāma do?",
        options: [
          { answerText: "Met the citizens of Ayodhyā", isCorrect: false },
          { answerText: "Performed an aśvamedha sacrifice", isCorrect: false },
          { answerText: "Sent Hanumān to meet Bharata", isCorrect: true },
          { answerText: "Conferred with Sugrīva again", isCorrect: false }
        ],
        explanation: "Śloka 1.1.87: 'भरद्वाजाश्रमं गत्वा रामः सत्यपराक्रमः । भरतस्य अन्तिकं रामो हनूमन्तं व्यसर्जयत्' — 'Rāma of true valour, on going to Bharadvāja's hermitage, sent Hanumān to the presence of Bharata'. This was to inform Bharata of Rāma's return."
      }
    ]
  },
  // ── WEEK 16 QUIZ ─────────────────────────────────────────────────────────────
  "week-16": {
    title: "Weekly Quiz - Week 16",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 88-94)",
    questions: [
      {
        questionText: "After Bharadvāja's hermitage, where did Rāma (with Sugrīva) go?",
        options: [
          { answerText: "Directly to Ayodhyā", isCorrect: false },
          { answerText: "To Nandigrāma", isCorrect: true },
          { answerText: "Back to Laṅkā", isCorrect: false },
          { answerText: "To Kiṣkindhā", isCorrect: false }
        ],
        explanation: "Śloka 1.1.88: 'पुनः आख्यायिकां जल्पन् सुग्रीवसहितः तदा । पुष्पकं तत् समारुह्य नन्दीग्रामं ययौ तदा' — 'Then, narrating past history, Rāma with Sugrīva, boarding that Puṣpaka, went to Nandigrāma'. He visited Bharata first before entering Ayodhyā."
      },
      {
        questionText: "What did Rāma remove at Nandigrāma as a symbolic end to his exile?",
        options: [
          { answerText: "His bow and quiver", isCorrect: false },
          { answerText: "His royal crown", isCorrect: false },
          { answerText: "His matted hair", isCorrect: true },
          { answerText: "His bark garments", isCorrect: false }
        ],
        explanation: "Śloka 1.1.89: 'नन्दीग्रामे जटां हित्वा भ्रातृभिः सहितोऽनघः' — 'At Nandigrāma, removing his matted hair, together with brothers, the sinless Rāma'. The matted locks symbolized his forest-dwelling ascetic life; removing it marked his return to royal life."
      },
      {
        questionText: "According to śloka 1.1.90, when Rāma rules, the world will be characterised by all of the following EXCEPT:",
        options: [
          { answerText: "Righteousness and wholesomeness", isCorrect: false },
          { answerText: "Great rejoicing and happiness", isCorrect: false },
          { answerText: "Satisfaction and abundance", isCorrect: false },
          { answerText: "Fear of famine and disease", isCorrect: true }
        ],
        explanation: "Śloka 1.1.90: 'प्रहृष्टमुदितो लोकः तुष्टः पुष्टः सुधार्मिकः । निरामयो ह्यरोगश्च दुर्भिक्षभयवर्जितः' — 'the world will be rejoiced and happy, satisfied, abundant, very righteous, wholesome, disease-free, and free from fear of famine'. All these positive qualities will be PRESENT; fear/famine will be ABSENT."
      },
      {
        questionText: "According to śloka 1.1.91, what will NOT happen in Rāma's kingdom?",
        options: [
          { answerText: "No one will see the death of their sons", isCorrect: true },
          { answerText: "Children will not be born", isCorrect: false },
          { answerText: "Women will not marry", isCorrect: false },
          { answerText: "Harvests will not occur", isCorrect: false }
        ],
        explanation: "Śloka 1.1.91: 'न पुत्रमरणं केचित् द्रक्ष्यन्ति पुरुषाः क्वचित्' — 'men will not see the death of sons anywhere'. This verse paints the ideal Rama-rajya: long life for all, no premature deaths, and continued family lineage."
      },
      {
        questionText: "The word 'पतिव्रताः' (pativratāḥ) applied to women in śloka 1.1.91 means:",
        options: [
          { answerText: "Devoted to their fathers", isCorrect: false },
          { answerText: "Devoted to their husbands", isCorrect: true },
          { answerText: "Devoted to their children", isCorrect: false },
          { answerText: "Devoted to their guru", isCorrect: false }
        ],
        explanation: "पतिव्रता = 'पति-व्रता' It refers to a woman who is wholly devoted to her husband."
      },
      {
        questionText: "According to ślokas 1.1.92–93a, what kinds of fear will NOT exist in Rāma's kingdom?",
        options: [
          { answerText: "Old age only", isCorrect: false },
          { answerText: "Death of elders only", isCorrect: false },
          { answerText: "Fire, water-drowning, wind, fever, hunger, and thieves", isCorrect: true },
          { answerText: "Foreign invasion only", isCorrect: false }
        ],
        explanation: "Śloka 1.1.92–93a lists six fears that will be absent: (1) fear from fire, (2) beings drowning in water, (3) fear from wind/storms, (4) from fever, (5) from hunger/famine, (6) from thieves. A comprehensive vision of a fearless, prosperous society."
      },
      {
        questionText: "According to śloka 1.1.93b–94a, all the subjects of Rāma's kingdom will always be highly glad like in which yuga?",
        options: [
          { answerText: "Kali yuga (कलियुगे)", isCorrect: false },
          { answerText: "Tretā yuga (त्रेतायुगे)", isCorrect: false },
          { answerText: "Dvāpara yuga (द्वापरे)", isCorrect: false },
          { answerText: "Kṛta yuga (कृतयुगे यथा)", isCorrect: true }
        ],
        explanation: "Śloka 1.1.94a: 'नित्यं प्रमुदिताः सर्वे यथा कृतयुगे तथा' — 'all will be highly glad always, as in Kṛta yuga'. Kṛta yuga is the golden age of dharma — comparing Rāma's rule to that age is the highest praise."
      }
    ]
  },
  // ── WEEK 17 QUIZ ─────────────────────────────────────────────────────────────
  "week-17": {
    title: "Weekly Quiz - Week 17",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verses 94-100)",
    questions: [
      {
        questionText: "How many aśvamedha (horse) sacrifices did Rāma perform?",
        options: [
          { answerText: "One", isCorrect: false },
          { answerText: "Ten", isCorrect: false },
          { answerText: "Hundreds", isCorrect: true },
          { answerText: "Thousands", isCorrect: false }
        ],
        explanation: "Śloka 1.1.94b–95a: 'अश्वमेधशतैः इष्ट्वा तथा बहुसुवर्णकैः' — Rāma, having performed hundreds of aśvamedha sacrifices."
      },
      {
        questionText: "To whom did Rāma donate cows, gold, and wealth? (śloka 1.1.94b–95a)",
        options: [
          { answerText: "To merchants and traders", isCorrect: false },
          { answerText: "To other kings", isCorrect: false },
          { answerText: "To his soldiers and warriors", isCorrect: false },
          { answerText: "To brāhmaṇas and scholars", isCorrect: true }
        ],
        explanation: "Śloka 1.1.95a: 'गवां कोट्ययुतं दत्त्वा विद्वद्भ्यो विधिपूर्वकम् । असंख्येयं धनं दत्त्वा ब्राह्मणेभ्यो महायशाः' — This shows Rāma's adherence to dāna (gifts to worthy recipients)."
      },
      {
        questionText: "According to śloka 1.1.96, Rāma will establish royal dynasties (राजवंशान्) how many-fold?",
        options: [
          { answerText: "In hundredfold (शतगुणान्)", isCorrect: true },
          { answerText: "In tenfold", isCorrect: false },
          { answerText: "In thousandfold", isCorrect: false },
          { answerText: "In twofold", isCorrect: false }
        ],
        explanation: "Śloka 1.1.96: 'राजवंशान् शतगुणान् स्थापयिष्यति राघवः' — This prophesies the flourishing of the Ikṣvāku and Raghu dynasties through Rāma's lineage."
      },
      {
        questionText: "According to śloka 1.1.96, what will Rāma direct the four varṇas to do?",
        options: [
          { answerText: "To fight wars against enemies", isCorrect: false },
          { answerText: "Each to their own dharma", isCorrect: true },
          { answerText: "To perform sacrifices throughout the year", isCorrect: false },
          { answerText: "To travel across the kingdom", isCorrect: false }
        ],
        explanation: "Śloka 1.1.96: 'चातुर्वर्ण्यं च लोकेऽस्मिन् स्वे स्वे धर्मे नियोक्ष्यति' — This refers to Rāma's role as the upholder of varṇāśrama-dharma."
      },
      {
        questionText: "For how many years did Rāma rule before going to Brahmaloka?",
        options: [
          { answerText: "One hundred years", isCorrect: false },
          { answerText: "One thousand years", isCorrect: false },
          { answerText: "Eleven thousand years", isCorrect: true },
          { answerText: "Fifty years", isCorrect: false }
        ],
        explanation: "Śloka 1.1.97: 'दशवर्षसहस्राणि दशवर्षशतानि च । रामो राज्यम् उपासित्वा ब्रह्मलोकं प्रयास्यति' — (दशवर्षसहस्राणि + दशवर्षशतानि = 10,000 + 1,000 = 11,000 years)."
      },
      {
        questionText: "The word 'पवित्रम्' (pavitram) applied to Rāma-caritam means:",
        options: [
          { answerText: "Long / enduring", isCorrect: false },
          { answerText: "Powerful / mighty", isCorrect: false },
          { answerText: "Famous / celebrated", isCorrect: false },
          { answerText: "Sacred / purifying", isCorrect: true }
        ],
        explanation: "'पवित्र' (pavitra) = 'holy, sacred, pure, purifying'."
      },
      {
        questionText: "According to śloka 1.1.99, what blessings does a person get from reading the Rāmāyaṇa?",
        options: [
          { answerText: "Sons and grandsons; adored in heaven after demise", isCorrect: true },
          { answerText: "Wealth and long life only", isCorrect: false },
          { answerText: "Power and kingdom only", isCorrect: false },
          { answerText: "Moksha immediately", isCorrect: false }
        ],
        explanation: "Śloka 1.1.99: 'पठन् रामायणं नरः सपुत्रपौत्रः सगणः प्रेत्य स्वर्गे महीयते'."
      }
    ]
  },
  // ── WEEK 18 QUIZ ─────────────────────────────────────────────────────────────
  "week-18": {
    title: "Weekly Quiz - Week 18",
    subtitle: "Test your knowledge of the Saṅkṣepa Rāmāyaṇa (Verse 100)",
    questions: [
      {
        questionText: "According to śloka 1.1.100, what does a Brāhmaṇa (द्विजः) obtain by reading the Rāmāyaṇa?",
        options: [
          { answerText: "Greatness (महत्त्वम्)", isCorrect: false },
          { answerText: "Land-lordship (भूमिपतित्वम्)", isCorrect: false },
          { answerText: "Profit in trade (पण्यफलत्वम्)", isCorrect: false },
          { answerText: "Excellence in speech (वागृषभत्वम्)", isCorrect: true }
        ],
        explanation: "Śloka 1.1.100 (1st pāda): 'पठन् द्विजो वागृषभत्वम् ईयात्' — 'A Brāhmaṇa, reading, obtains excellence in speech'. 'द्विज' literally means 'twice-born' and is a synonym for Brāhmaṇa (born physically, then spiritually through upanayana)."
      },
      {
        questionText: "According to śloka 1.1.100, what does a Kṣatriya obtain by reading the Rāmāyaṇa?",
        options: [
          { answerText: "Land-lordship (भूमिपतित्वम्)", isCorrect: true },
          { answerText: "Excellence in speech (वागृषभत्वम्)", isCorrect: false },
          { answerText: "Profit in trade (पण्यफलत्वम्)", isCorrect: false },
          { answerText: "Greatness (महत्त्वम्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.100 (2nd pāda): 'स्यात् क्षत्रियो भूमिपतित्वम् ईयात्' — 'A Kṣatriya would obtain lordship of land'. The Kṣatriya varṇa's natural domain is rulership over territory."
      },
      {
        questionText: "According to śloka 1.1.100, what does a Vaiśya obtain by reading the Rāmāyaṇa?",
        options: [
          { answerText: "Land-lordship (भूमिपतित्वम्)", isCorrect: false },
          { answerText: "Profit in trade (पण्यफलत्वम्)", isCorrect: true },
          { answerText: "Excellence in speech (वागृषभत्वम्)", isCorrect: false },
          { answerText: "Greatness (महत्त्वम्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.100 (3rd pāda): 'पण्यफलत्वम् ईयात्' — 'A person of the trading class (वणिक्-जनः) attains profit in trade'. The Vaiśya varṇa's natural domain is commerce and trade."
      },
      {
        questionText: "According to śloka 1.1.100, what does even a Śūdra obtain by reading the Rāmāyaṇa?",
        options: [
          { answerText: "Land-lordship (भूमिपतित्वम्)", isCorrect: false },
          { answerText: "Excellence in speech (वागृषभत्वम्)", isCorrect: false },
          { answerText: "Greatness (महत्त्वम्)", isCorrect: true },
          { answerText: "Profit in trade (पण्यफलत्वम्)", isCorrect: false }
        ],
        explanation: "Śloka 1.1.100 (4th pāda): 'जनश्च शूद्रोऽपि महत्त्वम् ईयात्' — 'Even a Śūdra, attains greatness'."
      },
      {
        questionText: "The word 'पठन्' (paṭhan) used in śloka 1.1.100 means:",
        options: [
          { answerText: "By remembering silently", isCorrect: false },
          { answerText: "By writing", isCorrect: false },
          { answerText: "By listening", isCorrect: false },
          { answerText: "By reading / reciting", isCorrect: true }
        ],
        explanation: "It refers to active reading or vocal recitation."
      },
      {
        questionText: "Śloka 1.1.100 is considered the 'phala-śruti' (फलश्रुति) of the Rāmāyaṇa. What does 'phala-śruti' mean?",
        options: [
          { answerText: "Benefits of reciting", isCorrect: true },
          { answerText: "Beginning verse", isCorrect: false },
          { answerText: "Middle section", isCorrect: false },
          { answerText: "Sweet like Fruits", isCorrect: false }
        ],
        explanation: "Phala-śruti (फलश्रुति) refers to the statement of fruits/benefits derived from reading or listening to a sacred text."
      },
      {
        questionText: "Śloka 1.1.100 mentions benefits for how many varṇas (social classes)?",
        options: [
          { answerText: "Three", isCorrect: false },
          { answerText: "Four", isCorrect: true },
          { answerText: "Two", isCorrect: false },
          { answerText: "Five", isCorrect: false }
        ],
        explanation: "Śloka 1.1.100 lists all four varṇas of society: (1) द्विज/Brāhmaṇa — priests/scholars; (2) क्षत्रिय/Kṣatriya — warriors/rulers; (3) वणिग्जन/Vaiśya — merchants; (4) शूद्र/Śūdra — service class. The universality of the Rāmāyaṇa's blessings is the central message."
      }
    ]
  }
};
