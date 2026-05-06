 // ═══════════════════════════════════════════════════════════════════════════════
// IKS DATA — Schematic Representation of Indian Knowledge Systems
// Source: Master IKS Chart — Vyoma IKS Centre
//
// HIERARCHY (per PDF chart + screenshot confirmation):
// IKS
// ├── Literary
// │   ├── Sanskrit
// │   │   ├── Vedic
// │   │   │   ├── Fundamental Core
// │   │   │   │   ├── Śāstra (Vedāṅga, Upāṅga, Upaveda, Itaraśāstra)
// │   │   │   │   ├── Kāvya  (Dṛśyakāvya, Śravyakāvya, Viṣaya-based)
// │   │   │   │   └── 64 Kalā
// │   │   │   └── Other Domain-based (MoE 16 Themes)
// │   │   └── Non-Vedic (Jaina, Bauddha, Cārvāka)
// │   └── Regional (22 Indian languages)
// └── Non-Literary (Traditions, Practices, Customs …)
// ═══════════════════════════════════════════════════════════════════════════════

const IKS_DATA = {
    name: "Indian Knowledge Systems",
    desc: "Parā & Aparā — A comprehensive schematic of Indian Knowledge Systems. IKS is a lifestyle and mindset; it is in practice — āchāra and vichāra.",
    children: [

        // ╔══════════════════════════════════════════════════════════╗
        // ║  1. LITERARY                                             ║
        // ╚══════════════════════════════════════════════════════════╝
        {
            name: "Literary",
            desc: "The vast textual and scriptural tradition of Indian knowledge, preserved primarily in Sanskrit and regional languages.",
            children: [

                // ── 1.1  SANSKRIT ──
                {
                    name: "Sanskrit",
                    desc: "The pan-Indian classical language — primary vehicle of the entire Vedic and Śāstric tradition.",
                    children: [

                        // ── 1.1.1  VEDIC ──
                        {
                            name: "Vedic",
                            desc: "The foundational Vedic corpus — Śruti (that which is heard), considered eternal and authorless.",
                            children: [

                                // ── 1.1.1.1  FUNDAMENTAL CORE ──
                                {
                                    name: "Fundamental Core",
                                    desc: "The Vedas, Vedānta, Śāstra, Kāvya and 64 Kalā — the complete foundational core of the Vedic tradition.",
                                    children: [

                                        // ── ŚĀSTRA ──
                                        {
                                            name: "Śāstra",
                                            desc: "Systematic sciences and disciplines that elaborate upon and supplement the Vedas.",
                                            children: [

                                                // ── VEDA ──
                                                {
                                                    name: "Veda",
                                                    desc: "The four Vedas form the bedrock of all Indian Knowledge Systems.",
                                                    children: [
                                                        {
                                                            name: "Ṛgveda",
                                                            desc: "The oldest Veda — collection of hymns (sūktas) addressed to various deities.",
                                                            children: [
                                                                { name: "Śākhā-s (2)", desc: "Śākala, Sāṇkhyāyana" },
                                                                { name: "Āraṇyaka-s", desc: "Aitareya, Śāṅkhyāyana" },
                                                                { name: "Brāhmaṇa-s", desc: "Aitareya, Kauṣītakī" },
                                                                { name: "Upaniṣad-s", desc: "Aitareya, Kauṣītakī" }
                                                            ]
                                                        },
                                                        {
                                                            name: "Yajurveda",
                                                            desc: "The Veda of ritual formulas (yajus), divided into Kṛṣṇa and Śukla",
                                                            children: [
                                                                {
                                                                    name: "Kṛṣṇa",
                                                                    desc: "Prose and verse intermixed.",
                                                                    children: [
                                                                        { name: "Śākhā-s (2)", desc: "Taittirīya, Maitrāyaṇīya" },
                                                                        { name: "Āraṇyaka-s", desc: "Taittirīya" },
                                                                        { name: "Brāhmaṇa-s", desc: "Taittirīya" },
                                                                        { name: "Upaniṣad-s", desc: "Taittirīya, Śvetāśvatara, Mahānārāyaṇa, Kaṭha" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Śukla",
                                                                    desc: "Mantras separated from prose commentary.",
                                                                    children: [
                                                                        { name: "Śākhā-s (2)", desc: "Kāṇva, Mādhyandina" },
                                                                        { name: "Āraṇyaka-s", desc: "Bṛhadāraṇyaka" },
                                                                        { name: "Brāhmaṇa-s", desc: "Śatapatha" },
                                                                        { name: "Upaniṣad-s", desc: "Bṛhadāraṇyaka, Īśāvāsya" }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            name: "Sāmaveda",
                                                            desc: "The Veda of melodies (sāman) — musical chanting of Ṛgvedic hymns.",
                                                            children: [
                                                                { name: "Śākhā-s (3)", desc: "Rāṇāyanīya, Jaiminīya, Kauthuma" },
                                                                { name: "Āraṇyaka-s", desc: "Talavakāra or Jaiminīya" },
                                                                { name: "Brāhmaṇa-s (11)", desc: "Pañcaviṃśa, Ārṣeya, Vaṃśa, Talavakāra, Daivata, Jaiminīyopaniṣad, Ṣaḍviṃśa, Mantra, Chāndogya, Sāmavidhāna, Saṃhitopaniṣad" },
                                                                { name: "Upaniṣad-s", desc: "Chāndogya, Kena" }
                                                            ]
                                                        },
                                                        {
                                                            name: "Atharvaveda",
                                                            desc: "The Veda of practical knowledge — hymns for daily life, healing, and statecraft.",
                                                            children: [
                                                                { name: "Śākhā-s (2)", desc: "Śaunaka, Pippalāda" },
                                                                { name: "Āraṇyaka-s", desc: "Not Available" },
                                                                { name: "Brāhmaṇa-s", desc: "Gopatha" },
                                                                { name: "Upaniṣad-s", desc: "Praśna, Muṇḍaka, Māṇḍūkya" }
                                                            ]
                                                        }
                                                    ]
                                                },

                                                // Vedāṅga
                                                {
                                                    name: "Vedāṅga",
                                                    desc: "The six limbs of the Veda — auxiliary disciplines essential for understanding and preserving the Vedas.",
                                                    children: [
                                                        {
                                                            name: "Śikṣā",
                                                            desc: "Science of phonetics and pronunciation — 36 texts total.",
                                                            children: [
                                                                { name: "Ṛgveda Śikṣā", desc: "4 texts" },                                                                
                                                                { name: "Kṛṣṇa Yajurveda Śikṣā", desc: "19 texts" },
                                                                { name: "Śukla Yajurveda Śikṣā", desc: "9 texts" },
                                                                { name: "Sāmaveda Śikṣā", desc: "3 texts" },
                                                                { name: "Atharvaveda Śikṣā", desc: "1 text" }
                                                            ]
                                                        },
                                                        {
                                                            name: "Vyākaraṇa",
                                                            desc: "Grammar — the science of language structure. 9 types.",
                                                            children: [
                                                                { name: "Aindram", desc: "Attributed to Indra." },
                                                                { name: "Cāndram", desc: "By Candragomin." },
                                                                { name: "Kāśakṛtsnam", desc: "By Kāśakṛtsna." },
                                                                { name: "Kaumāram", desc: "Attributed to Kumāra (Kārttikeya)." },
                                                                { name: "Śākaṭāyanam", desc: "By Śākaṭāyana." },
                                                                { name: "Pāṇinīyakam", desc: "By Pāṇini — the Aṣṭādhyāyī, the most influential Sanskrit grammar." },
                                                                { name: "Śākalam", desc: "By Śākala." },
                                                                { name: "Āpiśalam", desc: "By Āpiśali." },
                                                                { name: "Sārasvata", desc: "A simplified grammar tradition." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Chandas",
                                                            desc: "The science of poetic meter.",
                                                            children: [
                                                                { name: "Vaidika", desc: "Vedic meters used in Saṃhitā texts." },
                                                                { name: "Laukika", desc: "Classical meters used in Kāvya literature." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Nirukta",
                                                            desc: "Etymology — the science of word derivation and meaning, primarily by Yāska."
                                                        },
                                                        {
                                                            name: "Jyautiṣa",
                                                            desc: "Astronomy and astrology — science of celestial phenomena and time-keeping.",
                                                            children: [
                                                                { name: "Saṃhitā", desc: "Natural astrology and omens." },
                                                                { name: "Siddhānta", desc: "Mathematical astronomy — planetary calculations, eclipses." },
                                                                { name: "Horā", desc: "Predictive astrology — horoscopy and natal charts." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Kalpa",
                                                            desc: "Ritual science — systematic framework for conducting Vedic rites.",
                                                            children: [
                                                                {
                                                                    name: "Śrauta Sūtra (20)",
                                                                    desc: "Rules for public/solemn Vedic rituals.",
                                                                    children: [
                                                                        { name: "Śāṅkhāyana" }, { name: "Āpastamba" }, { name: "Maśaka" }, { name: "Kauśika" },
                                                                        { name: "Vaitāna" }, { name: "Hiraṇyakeśi" }, { name: "Vādhūla" }, { name: "Mānava" },
                                                                        { name: "Bharadvāja" }, { name: "Drāyāyana" }, { name: "Lātyāyana" }, { name: "Vārāha" },
                                                                        { name: "Kātyāyana" }, { name: "Kāṭhaka" }, { name: "Āśvalāyana" }, { name: "Jaiminīya" },
                                                                        { name: "Nidāna" }, { name: "Baudhāyana" }, { name: "Vaikhānasa" }, { name: "Anupāda" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Śulba Sūtra (8)",
                                                                    desc: "Rules for construction of fire altars — foundational geometry.",
                                                                    children: [
                                                                        { name: "Māitrāyaṇīya" }, { name: "Hiraṇyakeśi" }, { name: "Baudhāyana" }, { name: "Vārāha" },
                                                                        { name: "Vādhūla" }, { name: "Mānava" }, { name: "Āpastamba" }, { name: "Kātyāyana" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Gṛhya Sūtra (19)",
                                                                    desc: "Rules for domestic rituals — saṃskāras from birth to death.",
                                                                    children: [
                                                                        { name: "Āshvalāyana" }, { name: "Khādira (Drāhyāyaṇa)" }, { name: "Kāṭhaka (Laugākshi)" },
                                                                        { name: "Kauśītaka" }, { name: "Mānava" }, { name: "Pāraskara" }, { name: "Baudhāyana" },
                                                                        { name: "Kauśika" }, { name: "Hiraṇyakeśi" }, { name: "Vārāha" }, { name: "Gobhila" },
                                                                        { name: "Āgniveśya" }, { name: "Śāṅkayana" }, { name: "Vādhūla" }, { name: "Jaimini" },
                                                                        { name: "Bhāradvāja" }, { name: "Āpastamba" }, { name: "Vaikhānasa" }, { name: "Kauthuma" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Dharma Sūtra (7)",
                                                                    desc: "Rules for righteous conduct and law.",
                                                                    children: [
                                                                        { name: "Viśṇu" }, { name: "Vaśiṣṭha" }, { name: "Āpastamba" }, { name: "Hiranyakeśi" },
                                                                        { name: "Gautama" }, { name: "Vaikhānasa" }, { name: "Baudhāyana" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },

                                                // Upāṅga
                                                {
                                                    name: "Upāṅga",
                                                    desc: "Sub-limbs — secondary disciplines that further elaborate Vedic thought.",
                                                    children: [
                                                        {
                                                            name: "Mīmāṃsā",
                                                            desc: "The science of Vedic interpretation.",
                                                            children: [
                                                                { name: "Pūrva-mīmāṃsā", desc: "Enquiry into Vedic rituals and their efficacy — by Jaimini." },
                                                                { name: "Uttara-mīmāṃsā", desc: "Enquiry into Brahman — Vedānta. By Bādarāyaṇa (Brahmasūtra)." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Nyāya / Yoga",
                                                            desc: "The philosophical systems of logic and practice.",
                                                            children: [
                                                                { name: "Nyāya", desc: "Logic and epistemology — by Gautama (Nyāyasūtra)." },
                                                                { name: "Vaiśeṣika", desc: "Atomic theory and categorization of reality — by Kaṇāda." },
                                                                { name: "Sāṅkhya", desc: "Enumeration philosophy — Puruṣa and Prakṛti — by Kapila." },
                                                                { name: "Yoga", desc: "The discipline of mind and body — Patañjali's Yogasūtra." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Purāṇa",
                                                            desc: "Historical and mythological literature.",
                                                            children: [
                                                                {
                                                                    name: "Itihāsa-s",
                                                                    desc: "The two great epics.",
                                                                    children: [
                                                                        { name: "Śrīmadrāmāyaṇa", desc: "By Vālmīki — 24,000 verses. The story of Lord Rāma." },
                                                                        { name: "Mahābhārata", desc: "By Vyāsa — 1,00,000 verses. The greatest epic, containing the Bhagavad Gītā." }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "18 Mahā-Purāṇa-s",
                                                                    desc: "Brahma, Padma, Viṣṇu, Vāyu, Bhāgavata, Nāradīya, Mārkaṇḍeya, Agni, Bhaviṣya, Brahmavaivarta, Liṅga, Varāha, Skanda, Vāmana, Kūrma, Matsya, Garuḍa, Brahmāṇḍa",
                                                                    children: [
                                                                        { name: "Brahma Purāṇa" }, { name: "Padma Purāṇa" }, { name: "Viṣṇu Purāṇa" },
                                                                        { name: "Vāyu Purāṇa" }, { name: "Bhāgavata Purāṇa" }, { name: "Nāradīya Purāṇa" },
                                                                        { name: "Mārkaṇḍeya Purāṇa" }, { name: "Agni Purāṇa" }, { name: "Bhaviṣya Purāṇa" },
                                                                        { name: "Brahmavaivarta Purāṇa" }, { name: "Liṅga Purāṇa" }, { name: "Varāha Purāṇa" },
                                                                        { name: "Skanda Purāṇa" }, { name: "Vāmana Purāṇa" }, { name: "Kūrma Purāṇa" },
                                                                        { name: "Matsya Purāṇa" }, { name: "Garuḍa Purāṇa" }, { name: "Brahmāṇḍa Purāṇa" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "18 Upapurāṇa-s",
                                                                    desc: "Sanatkumāra, Narasiṃha, Bṛhannāradīya, Śiva, Durvāsa, Kāpila, Mānava, Auśanasa, Vāruṇa, Kālikā, Māheśvara, Sāmba, Śaura, Parāśara, Devibhagavata, Āditya, Vāsiṣṭha, Viṣṇudharmottara",
                                                                    children: [
                                                                        { name: "Sanatkumāra" }, { name: "Narasiṃha" }, { name: "Bṛhannāradīya" },
                                                                        { name: "Śiva" }, { name: "Durvāsa" }, { name: "Kāpila" },
                                                                        { name: "Mānava" }, { name: "Auśanasa" }, { name: "Vāruṇa" },
                                                                        { name: "Kālikā" }, { name: "Māheśvara" }, { name: "Sāmba" },
                                                                        { name: "Śaura" }, { name: "Parāśara" }, { name: "Devibhagavata" },
                                                                        { name: "Āditya" }, { name: "Vāsiṣṭha" }, { name: "Viṣṇudharmottara" }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            name: "Dharmaśāstra",
                                                            desc: "The science of law and righteous conduct.",
                                                            children: [
                                                                {
                                                                    name: "Smṛti-s (19)",
                                                                    desc: "Law codes by various sages.",
                                                                    children: [
                                                                        { name: "Manu" }, { name: "Atri" }, { name: "Viṣṇu" }, { name: "Hārīta" },
                                                                        { name: "Yājñavalkya" }, { name: "Uśanā" }, { name: "Aṅgiras" }, { name: "Yama" },
                                                                        { name: "Āpastamba" }, { name: "Saṃvarta" }, { name: "Kātyāyana" }, { name: "Bṛhaspati" },
                                                                        { name: "Parāśara" }, { name: "Vyāsa" }, { name: "Śaṅkha-Likhita" }, { name: "Dakṣa" },
                                                                        { name: "Gautama" }, { name: "Śātātapa" }, { name: "Vaśiṣṭha" }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Nibandha-s",
                                                                    desc: "Digests and commentaries on Dharmaśāstra.",
                                                                    children: [
                                                                        { name: "Smṛticandrikā" }, { name: "Vīramitrodaya" },
                                                                        { name: "Vivādaratnākara" }, { name: "Dāyabhāga" },
                                                                        { name: "Nirṇayasindhu" }, { name: "Dharmasindhu" }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },

                                                // Upaveda
                                                {
                                                    name: "Upaveda",
                                                    desc: "The subsidiary Vedas — applied sciences auxiliary to the main Vedas.",
                                                    children: [
                                                        {
                                                            name: "Āyurveda",
                                                            desc: "The science of life and medicine.",
                                                            children: [
                                                                { name: "Carakasaṃhitā", desc: "The foundational text on internal medicine." },
                                                                { name: "Suśrutasaṃhitā", desc: "The foundational text on surgery." },
                                                                { name: "Bhāvaprakāśa", desc: "A later comprehensive medical treatise." },
                                                                { name: "Bhelasaṃhitā", desc: "An early medical text, partially extant." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Dhanurveda",
                                                            desc: "The science of warfare and archery.",
                                                            children: [
                                                                { name: "Prasthānabhedaḥ of Madhusarasvatī", desc: "Classification of Dhanurveda." },
                                                                { name: "Śrīmadrāmāyaṇa", desc: "Contains extensive descriptions of warfare." },
                                                                { name: "Mahābhārata", desc: "Contains the most detailed accounts of ancient warfare." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Gāndharvaveda",
                                                            desc: "The science of performing arts — music, dance, drama, and aesthetics.",
                                                            children: [
                                                                { name: "Nāṭyaśāstra of Bharata", desc: "The foundational treatise on drama, dance, and music." },
                                                                { name: "Viṣṇudharmottaram", desc: "Encyclopedic text covering arts including painting." },
                                                                { name: "Sāhitya-darpaṇa of Viśvanātha", desc: "Mirror of Composition — on literary aesthetics." },
                                                                { name: "Dhvanyāloka of Ānandavardhana", desc: "On the theory of suggestion (dhvani) in poetry." },
                                                                { name: "Daśarūpaka of Dhanañjaya", desc: "On the ten forms of drama." },
                                                                { name: "Rasamañjarī of Bhānudatta", desc: "On rasa — aesthetic emotion." },
                                                                { name: "Rasagaṅgādhara of Jagannātha Paṇḍitarāja", desc: "On rasa theory." },
                                                                { name: "Kāvyaprakāśa of Mammaṭa", desc: "The Light of Poetry — on poetics." },
                                                                { name: "Kāvyālaṅkāra of Bhāmaha", desc: "On ornaments of poetry." },
                                                                { name: "Kāvyādarśa of Daṇḍin", desc: "The Mirror of Poetry." },
                                                                { name: "Kavikanthābharaṇa of Kṣemendra", desc: "Necklace of the Poet." },
                                                                { name: "Alaṅkāratilaka of Bhānudatta", desc: "On poetic ornamentation." },
                                                                { name: "Kāmasūtra of Vātsyāyana", desc: "The science of desire and human relationships." },
                                                                { name: "Kāvyamīmāṃsā of Rājaśekhara", desc: "Critical inquiry into poetry." },
                                                                { name: "Śṛṃgāraprakāśa", desc: "On the aesthetic of love." },
                                                                { name: "Sarasvatīkaṇṭhābharaṇa of Bhoja", desc: "Bhoja's treatise on poetics." }
                                                            ]
                                                        },
                                                        {
                                                            name: "Arthaśāstra & Sthāpatya",
                                                            desc: "The science of statecraft, economics, and architecture.",
                                                            children: [
                                                                { name: "Arthaśāstra of Viṣṇugupta (Kauṭilya)", desc: "The seminal treatise on statecraft and economics." },
                                                                { name: "Nītisāra of Kāmandaka", desc: "Essence of political wisdom." },
                                                                { name: "Nītivākyāmṛta of Somadeva Sūri", desc: "Nectar of political aphorisms." },
                                                                { name: "Śukranītisāra", desc: "Śukra's essence of policy." },
                                                                { name: "Viṣṇudharma", desc: "Religious and political treatise." },
                                                                { name: "Mitākṣarā of Vijñāneśvara", desc: "Landmark commentary on Yājñavalkya Smṛti — Hindu law." },
                                                                { name: "Vyavahāra-mayukha of Nīlakaṇṭha", desc: "On legal procedure." },
                                                                { name: "Rājanīti-mayukha of Nīlakaṇṭha", desc: "On political governance." },
                                                                { name: "Rājanītiratnākara of Caṇḍeśvara", desc: "Jewel-mine of political science." },
                                                                { name: "Mahābhārata — Śānti, Sabhā & Udyoga Parva", desc: "Sections on governance, diplomacy, and statecraft." },
                                                                { name: "Agni Purāṇa", desc: "Contains sections on polity and governance." },
                                                                { name: "Aitareya & Śatapatha Brāhmaṇa", desc: "Vedic-era governance concepts." },
                                                                { name: "Śrīmadrāmāyaṇa — Ayodhyākāṇḍa", desc: "Ideal governance as depicted in Rāma's rule." },
                                                                { name: "Tirukkural", desc: "Tamil classic on ethics, polity, and love by Tiruvaḷḷuvar." }
                                                            ]
                                                        }
                                                    ]
                                                },

                                                // Itaraśāstra
                                                {
                                                    name: "Itaraśāstra",
                                                    desc: "Other significant scriptural traditions.",
                                                    children: [
                                                        { name: "Bhaktiśāstra", desc: "The science of devotion." },
                                                        { name: "Āgama", desc: "Temple rituals and worship traditions — Śaiva, Vaiṣṇava, Śākta." },
                                                        { name: "Kāmaśāstra", desc: "The science of desire and aesthetics of life." },
                                                        { name: "Tantraśāstra", desc: "Esoteric spiritual practices and rituals." },
                                                        { name: "Alankāraśāstra", desc: "Esoteric spiritual practices and rituals." }
                                                    ]
                                                }
                                            ]
                                        },

                                        // ── KĀVYA ──
                                        {
                                            name: "Kāvya",
                                            desc: "Literature — the creative and artistic expression of knowledge.",
                                            children: [
                                                {
                                                    name: "Based on Prastuti (Presentation)",
                                                    desc: "Classification by mode of presentation.",
                                                    children: [
                                                        {
                                                            name: "Dṛśyakāvya",
                                                            desc: "Literature meant to be seen — drama and performance.",
                                                            children: [
                                                                {
                                                                    name: "Rūpaka (10 Major Forms)",
                                                                    desc: "Ten major forms of dramatic composition.",
                                                                    children: [
                                                                        { name: "Nāṭaka", desc: "The highest form of drama — heroic or divine theme." },
                                                                        { name: "Prakaraṇa", desc: "Social drama with invented plot." },
                                                                        { name: "Bhāṇa", desc: "Monologue drama." },
                                                                        { name: "Prahasana", desc: "Farce or satire." },
                                                                        { name: "Ḍima", desc: "Drama with divine and semi-divine characters." },
                                                                        { name: "Vyāyoga", desc: "One-act heroic drama." },
                                                                        { name: "Samavakāra", desc: "Drama with mixed characters and outcomes." },
                                                                        { name: "Vīthī", desc: "One-act play with one or two characters." },
                                                                        { name: "Aṅka", desc: "Sentimental drama of pathos." },
                                                                        { name: "Īhāmṛga", desc: "Drama of delusion and error." }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Upa-rūpaka (18 Minor Forms)",
                                                                    desc: "Eighteen secondary dramatic forms.",
                                                                    children: [
                                                                        { name: "Nāṭikā" }, { name: "Trīṭaka" }, { name: "Ghoṣṭī" },
                                                                        { name: "Saṭṭaka" }, { name: "Nāṭyarāsaka" }, { name: "Prasthāna" },
                                                                        { name: "Ullāpya" }, { name: "Kāvya" }, { name: "Prekṣaṇaka" },
                                                                        { name: "Rāsaka" }, { name: "Saṃlāpaka" }, { name: "Śṛṅgādhita" },
                                                                        { name: "Śilpaka" }, { name: "Vilāsikā" }, { name: "Durmallikā" },
                                                                        { name: "Prakaraṇī" }, { name: "Hallīśaka" }, { name: "Bhāṇikā" }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            name: "Śravyakāvya",
                                                            desc: "Literature meant to be heard or read.",
                                                            children: [
                                                                {
                                                                    name: "Gadya (Prose)",
                                                                    desc: "Prose literature.",
                                                                    children: [
                                                                        { name: "Kathā", desc: "Narrative tales." },
                                                                        { name: "Ākhyāyikā", desc: "Autobiographical narrative." }
                                                                    ]
                                                                },
                                                                {
                                                                    name: "Padya (Verse)",
                                                                    desc: "Poetry in verse.",
                                                                    children: [
                                                                        { name: "Mahākāvya", desc: "Great epic poem — e.g., Raghuvaṃśa, Kumārasambhava." },
                                                                        { name: "Khaṇḍakāvya", desc: "Shorter narrative poem." },
                                                                        { name: "Muktaka", desc: "Independent standalone verse." },
                                                                        { name: "Itarakāvya", desc: "Other forms of verse." }
                                                                    ]
                                                                },
                                                                { name: "Campū", desc: "Mixed prose and verse composition." }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: "Based on Viṣaya (Subject)",
                                                    desc: "Classification by thematic content — *Itarakāvya includes all subject-based forms.",
                                                    children: [
                                                        { name: "Gītam", desc: "Song literature." },
                                                        { name: "Nītikāvya", desc: "Didactic / ethical poetry." },
                                                        { name: "Stotrakāvya", desc: "Devotional hymn poetry." },
                                                        { name: "Citrakāvya", desc: "Figurative / visual poetry." },
                                                        { name: "Sāmājika", desc: "Social poetry." },
                                                        { name: "Anuvādasāhitya", desc: "Translation literature." },
                                                        { name: "Kathāsāhitya", desc: "Story / narrative literature." },
                                                        { name: "Aitihāsika", desc: "Historical literature." },
                                                        { name: "Koṣa", desc: "Lexicographic / dictionary literature." },
                                                        { name: "Śāstrakāvya", desc: "Scientific / technical poetry." },
                                                        { name: "Viḍambanakāvya", desc: "Parody / satirical poetry." },
                                                        { name: "Ādhunikakāvya", desc: "Modern poetry." }
                                                    ]
                                                }
                                            ]
                                        },

                                        // ── 64 KALĀ ──
                                        {
                                            name: "64 Kalā",
                                            desc: "The sixty-four arts and crafts — practical and creative skills mentioned in Kāmasūtra and Lalitā Sahasranāma. Detailed charts are separately available."
                                        }

                                    ]
                                }, // end Fundamental Core

                                // ── 1.1.1.2  OTHER DOMAIN-BASED (MoE 16 Themes) ──
                                {
                                    name: "Other Domain-based",
                                    desc: "16 thematic categories aligned with themes published by the IKS Division of Ministry of Education. The matters related to these are primarily discussed in the core Śāstra sections (e.g., astronomical aspects in Jyautiṣa).",
                                    children: [
                                        { name: "1. Vedic, Philosophical & Cognitive Sciences", desc: "Study of consciousness, cognition, and Vedic philosophy in contemporary context." },
                                        { name: "2. Historical & Civilizational Sciences", desc: "India's civilizational continuity, archaeology, and historiography." },
                                        { name: "3. Contemporary Social / Cultural Sciences", desc: "Sociology, anthropology, and cultural studies through IKS lens." },
                                        { name: "4. Mathematical, Physical & Astronomical Sciences", desc: "Indian contributions to mathematics, physics, and astronomy." },
                                        { name: "5. Speech and Linguistics", desc: "Phonetics, grammar, and the science of language." },
                                        { name: "6. Political, Economic & Strategic Sciences", desc: "Governance, economics, and strategy from Arthaśāstra tradition." },
                                        { name: "7. Medical and Health Sciences", desc: "Āyurveda, Siddha, Yoga therapy, and traditional medicine." },
                                        { name: "8. Culinary, Nutritional & Pharmacological Sciences", desc: "Food science, nutrition, and pharmacology in Indian tradition." },
                                        { name: "9. Agricultural Science, Veterinary & Animal Husbandry", desc: "Traditional farming, animal care, and ecological knowledge." },
                                        { name: "10. Performing Arts", desc: "Music, dance, drama, and theater traditions." },
                                        { name: "11. Mechanical & Digital Design & Engineering", desc: "Traditional engineering, Yantra, and design principles." },
                                        { name: "12. Civil and Architectural Science", desc: "Vāstu Śāstra, temple architecture, urban planning." },
                                        { name: "13. Fine Arts and Sculpture", desc: "Painting, sculpture, and visual arts traditions." },
                                        { name: "14. Chemical, Metallurgical & Material Sciences", desc: "Rasa Śāstra, metallurgy, and material science." },
                                        { name: "15. Fashion and Interior Design", desc: "Textile traditions, weaving, and aesthetic design." },
                                        { name: "16. Edutainment Sciences", desc: "Learning through play, storytelling, and entertainment." },                                        
                                    ]
                                }

                            ]
                        }, // end Vedic

                        // ── 1.1.2  VEDIC BASED ──
                        {
                            name: "Vedic based",                        
                            children: [
                                {
                                    name: "Sikhism",
                                }
                            ]
                        }, // end Vedic based

                        // ── 1.1.2  NON-VEDIC ──
                        {
                            name: "Non-Vedic",
                            desc: "Indian philosophical and knowledge traditions outside the Vedic fold.",
                            children: [
                                { name: "Jaina", desc: "Ahiṃsā, Anekāntavāda — vast literature in Prakrit, Sanskrit, and regional languages." },
                                { name: "Bauddha", desc: "Tripiṭaka, Abhidharma, Mādhyamaka, Yogācāra — extensive philosophical literature." },
                                { name: "Cārvāka", desc: "Materialist school — perception as the only valid source of knowledge." }
                            ]
                        }

                    ]
                }, // end Sanskrit

                // ── 1.2  REGIONAL ──
                {
                    name: "Regional",
                    desc: "Indian Knowledge Systems as preserved and expressed in the 22 scheduled regional languages of India.",
                    children: [
                        { name: "Kannada", desc: "Rich literary tradition — Pampa, Ranna, Ponna (Ratnatraya)." },
                        { name: "Tamil", desc: "One of the oldest — Saṅgam literature, Tirukkural, Śaiva Siddhānta." },
                        { name: "Telugu", desc: "Major literary tradition — Nannaya, Tikkana, Errapragada." },
                        { name: "Hindi", desc: "Bhakti and modern literary tradition." },
                        { name: "Assamese", desc: "North-eastern literary tradition." },
                        { name: "Bengali", desc: "Vaiṣṇava literature, modern Bengali renaissance." },
                        { name: "Bodo", desc: "Tribal knowledge traditions." },
                        { name: "Dogri", desc: "Hill state literary tradition." },
                        { name: "Gujarati", desc: "Western Indian literary tradition." },
                        { name: "Kashmiri", desc: "Unique tradition — Śaiva philosophy, Lal Ded." },
                        { name: "Konkani", desc: "Coastal literary tradition." },
                        { name: "Maithili", desc: "Eastern literary tradition — Vidyāpati." },
                        { name: "Malayalam", desc: "Kerala literary heritage." },
                        { name: "Manipuri (Meitei)", desc: "North-eastern tradition." },
                        { name: "Marathi", desc: "Sant literature — Jñāneśvarī, Tukārām." },
                        { name: "Nepali", desc: "Himalayan literary tradition." },
                        { name: "Odia (Oriya)", desc: "Eastern Indian literary tradition." },
                        { name: "Punjabi", desc: "Sikh scripture tradition, Sufi poetry." },                        
                        { name: "Santhali", desc: "Tribal literary tradition." },
                        { name: "Sindhi", desc: "Western literary tradition — Sufi literature." },
                        { name: "Urdu", desc: "Indo-Islamic literary tradition — Ghazal, Qawwali." }
                    ]
                }

            ]
        }, // end Literary

        // ╔══════════════════════════════════════════════════════════╗
        // ║  2. NON-LITERARY                                         ║
        // ╚══════════════════════════════════════════════════════════╝
        {
            name: "Non-Literary",
            desc: "Knowledge transmitted through practice, oral tradition, living culture, and applied domain expertise rather than texts. IKS is a lifestyle and mindset — in practice, āchāra and vichāra.",
            children: [
                { name: "Traditions", desc: "Living cultural practices passed across generations." },
                { name: "Practices & Methods", desc: "Applied knowledge in daily life — agriculture, crafts, medicine." },
                { name: "Customs", desc: "Social and familial customs rooted in Dharmic principles." },
                { name: "Oral Transmission", desc: "Knowledge preserved through spoken word — songs, proverbs, stories." },
                { name: "Art Forms", desc: "Classical and folk art — Bharatanāṭyam, Kathakali, Madhubani, Warli." },
                { name: "Health", desc: "Folk medicine, Siddha, Naturopathy, Yoga practices." },
                { name: "Folklore", desc: "Myths, legends, fairy tales, and oral epics." },
                { name: "Sport", desc: "Traditional games and martial arts — Kalaripayattu, Mallakhamba." },
                { name: "Culinary & Others", desc: "Food science, fermentation, spice usage, regional cuisines." }
            ]
        }

    ]
};