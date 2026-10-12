// ════════════════════════════════════════════════════════════════════════════
//  16_ScheduleData.js  —  Content team schedule data for YT Shlokas page
//  Edit SCHEDULE_W1 to add/update days. Each row = one spreadsheet row.
//  liveAt is auto-derived as midnight IST on the given date.
// ════════════════════════════════════════════════════════════════════════════

// ── URL parser ───────────────────────────────────────────────────────────────
// NOTE: YouTube share links (?si=...) do NOT carry timestamps.
// Always use ?t=NNN or &t=NNNs format in chantingUrl/meaningUrl,
// OR set a chantingStart / meaningStart (seconds) override on the schedule row.
export function parseMediaUrl(url) {
  if (!url) return null;
  try {
    if (url.startsWith("/") || url.endsWith(".mp4")) {
      return { type: "local", videoUrl: url };
    }
    const u = new URL(url);

    // 1. Check if it's Google Drive
    if (u.hostname === "drive.google.com") {
      let fileId = null;
      if (u.pathname.startsWith("/file/d/")) {
        const parts = u.pathname.split("/");
        fileId = parts[3];
      } else if (u.pathname === "/open" || u.pathname === "/uc") {
        fileId = u.searchParams.get("id");
      }

      if (fileId) {
        return { type: "drive", fileId };
      }
    }

    // 2. Check if it's YouTube
    const videoId = u.hostname === "youtu.be"
      ? u.pathname.slice(1).split("?")[0]
      : u.searchParams.get("v");

    if (videoId) {
      const tRaw = u.searchParams.get("t") || "0";
      const startSeconds = parseInt(tRaw.replace(/s$/i, ""), 10) || 0;
      return { type: "youtube", videoId, startSeconds };
    }

    return null;
  } catch {
    if (url.startsWith("/") || url.endsWith(".mp4")) {
      return { type: "local", videoUrl: url };
    }
    return null;
  }
}

export function parseYTUrl(url) {
  const parsed = parseMediaUrl(url);
  if (parsed && parsed.type === "youtube") {
    return { videoId: parsed.videoId, startSeconds: parsed.startSeconds };
  }
  return null;
}

// ── Shloka lyrics by verse number ───────────────────────────────────────────
export const LYRICS = {
  v1: {
    devanagari: "तपस्स्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥ १ ॥",
    english: "tapaḥsvādhyāyanirataṃ tapasvī vāgvidāṃ varam ।\nnāradaṃ paripapraccha vālmīkirmunipuṅgavam ॥",
    kannada: "ತಪಃಸ್ವಾಧ್ಯಾಯನಿರತಂ ತಪಸ್ವೀ ವಾಗ್ವಿದಾಂ ವರಮ್ |\nನಾರದಂ ಪರಿಪಪ್ರಚ್ಛ ವಾಲ್ಮೀಕಿರ್ಮುನಿಪುಙ್ಗವಮ್ ||",
    telugu: "తపఃస్వాధ్యాయనిరతం తపస్వీ వాగ్విదాం వరమ్ |\nనారదం పరిపప్రచ్ఛ వాల్మీకిర్మునిపుఙ్గవమ్ ||",
    tamil: "தப:ஸ்வாத்4யாயநிரதம் தபஸ்வீ வாக்3விதா3ம் வரம் |\nநாரதம்3 பரிபப்ரச்ச2 வால்மீகிர்முநிபுங்க3வம் ||",
  },
  v2: {
    devanagari: "को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥ २ ॥",
    english: "ko nvasminsāmprataṃ loke guṇavānkaśca vīryavān ।\ndharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ ॥",
    kannada: "ಕೋ ನ್ವಸ್ಮಿನ್ಸಾಮ್ಪ್ರತಂ ಲೋಕೇ ಗುಣವಾನ್ಕಶ್ಚ ವೀರ್ಯವಾನ್ |\nಧರ್ಮಜ್ಞಶ್ಚ ಕೃತಜ್ಞಶ್ಚ ಸತ್ಯವಾಕ್ಯೋ ದೃಢವ್ರತಃ ||",
    telugu: "కో న్వస్మిన్సామ్ప్రతం లోకే గుణవాన్కశ్చ వీర్యవాన్ |\nధర్మజ్ఞశ్చ కృతజ్ఞశ్చ సత్యవాక్యో దృఢవ్రతః ||",
    tamil: "கோ ந்வஸ்மின்ஸாம்ப்ரதம் லோகே கு3ணவான்கஶ்ச வீர்யவான் |\nத4ர்மஜ்ஞஶ்ச க்ருதஜ்ஞஶ்ச ஸத்யவாக்யோ த்3ருட4வ்ரத: ||",
  },
  v3: {
    devanagari: "चारित्रेण च को युक्तः सर्वभूतेषु को हितः ।\nविद्वान् कᳲ  कस्समर्थश्च कश्चैकप्रियदर्शनः ॥ ३ ॥",
    english: "cāritreṇa ca ko yuktaḥ sarvabhūteṣu ko hitaḥ ।\nvidvān kaḥ kaḥ samarthaśca kaścaikapriyadarśanaḥ ॥",
    kannada: "ಚಾರಿತ್ರೇಣ ಚ ಕೋ ಯುಕ್ತಃ ಸರ್ವಭೂತೇಷು ಕೋ ಹಿತಃ |\nವಿದ್ವಾನ್ ಕಃ ಕಃ ಸಮರ್ಥಶ್ಚ ಕಶ್ಚೈಕಪ್ರಿಯದರ್ಶನಃ ||",
    telugu: "చారిత్రేణ చ కో యుక్తః సర్వభూతేషు కో హితః |\nవిద్వాన్ కః కః సమర్థశ్చ కశ్చైకప్రియదర్శనః ||",
    tamil: "சாரித்ரேண ச கோ யுக்த: ஸர்வபூ4தேஷு கோ ஹித: |\nவித்3வான்க: கஸ்ஸமர்த2ஶ்ச கஶ்சைகப்ரியத3ர்ஶன: ||",
  },
  v4: {
    devanagari: "आत्मवान् को जितक्रोधः द्युतिमान् कोऽनसूयकः ।\nकस्य बिभ्यति देवाश्च जातरोषस्य संयुगे ॥ ४ ॥",
    english: "ātmavānko jitakrodho dyutimānko'nasūyakaḥ ।\nkasya bibhyati devāśca jātaroṣasya saṃyuge ॥",
    kannada: "ಆತ್ಮವಾನ್ಕೋ ಜิตಕ್ರೋಧೋ ದ್ಯುತಿಮಾನ್ಕೋಽನಸೂಯಕಃ |\nಕಸ್ಯ ಬಿಭ್ಯತಿ ದೇವಾಶ್ಚ ಜಾತರೋಷಸ್ಯ ಸಂಯುಗೇ ||",
    telugu: "ఆత్మవాన్కో జితక్రోధో ద్యుతిమాన్కోಽనసూయకః |\nకస్య బిభ్యతి దేవాశ్చ జాతరోషస్య సంయుగే ||",
    tamil: "ஆத்மவான்கோ ஜிதக்ரோதோ4 த்3யுதிமான்கோऽனஸூயக: |\nகஸ்ய பி3ப்4யதி தே3வாஶ்ச ஜாதரோஷஸ்ய ஸம்யுகே3 ||",
  },
  v5: {
    devanagari: "एतदिच्छाम्यहं श्रोतुं परं कौतूहलं हि मे ।\nमहर्षे त्वं समर्थोऽसि ज्ञातुमेवंविधं नरम् ॥ ५ ॥",
    english: "etadicchāmyahaṃ śrotuṃ paraṃ kautūhalaṃ hi me ।\nmaharṣe tvaṃ samartho'si jñātumevaṃvidhaṃ naram ॥",
    kannada: "ಏತದಿಚ್ಛಾಮ್ಯಹಂ ಶ್ರೋತುಂ ಪರಂ ಕೌತೂಹಲಂ ಹಿ ಮೇ |\nಮಹರ್ಷೇ ತ್ವಂ ಸಮರ್ಥೋಽಸಿ ಜ್ಞಾತುಮೇವಂವಿಧಂ ನರಮ್ ||",
    telugu: "ఏతదిచ్ఛామ్యహం శ్రోతుం పరం కౌతూహలం హి మే |\nమహర్షే తవం సమర్థోಽసి జ్ఞాతుమేవంవిధం నరమ్ ||",
    tamil: "ஏததி3ச்சா4ம்யஹம் ஶ்ரோதும் பரம் கௌகூஹலம் ஹி மே |\nமஹர்ஷே த்வம் ஸமர்தோ2ऽஸி ஜ்ஞாதுமேவம்வித4ம் நரம் ||",
  },
  v6: {
    devanagari: "श्रुत्वा चैतत् त्रिलोकज्ञः वाल्मीकेर्नारदो वचः ।\nश्रूयतामिति चामन्त्र्य प्रहृष्टो वाक्यमब्रवीत् ॥ ६ ॥",
    english: "śrutvā caitattrilokajño vālmīkernārado vacaḥ ।\nśrūyatāmiti cāmantrya prahṛṣṭo vākyamabravīt ॥",
    kannada: "ಶ್ರುತ್ವಾ ಚೈತತ್ತ್ರಿಲೋಕಜ್ಞೋ ವಾಲ್ಮೀಕೇರ್ನಾರದೋ ವಚಃ |\nಶ್ರೂಯತಾಮಿತಿ ಚಾಮಂತ್ರ್ಯ ಪ್ರಹೃಷ್ಟೋ ವಾಕ್ಯಮಬ್ರವೀತ್ ||",
    telugu: "శ్రుత్వా చైతత్త్రిలోకజ్ఞో వాల్మీకేర్నారదో వచః |\nశ్రూయతామితి చామంత్ర్య ప్రహృష్టో వాక్యమబ్రవీత్ ||",
    tamil: "ஶ்ருத்வா சைதத்த்ரிலோகஜ்ஞோ வால்மீகேர்நாரதோ வச: |\nஶ்ரூயதாமிதி சாமந்த்ர்ய ப்ரஹ்ருஷ்டோ வாக்யமப்ரவீத் ||",
  },
  v7: {
    devanagari: "बहवो दुर्लभाश्चैव ये त्वया कीर्तिता गुणाः ।\nमुने वक्ष्याम्यहं बुद्ध्वा तैर्युक्तश्श्रूयतां नरः ॥ ७ ॥",
    english: "bahavo durlabhāścaiva ye tvayā kīrtitā guṇāḥ ।\nmune vakṣyāmyahaṃ buddhā tairyuktaḥ śrūyatāṃ naraḥ ॥",
    kannada: "ಬಹವೋ ದುರ್ಲಭಾಶ್ಚೈವ ಯೇ ತ್ವಯಾ ಕೀರ್ತಿತಾ ಗುಣಾಃ |\nಮುನೇ ವಕ್ಷ್ಯಾಮ್ಯಹಂ ಬುದ್ಧಾ ತೈರ್ಯುಕ್ತಃ ಶ್ರೂಯತಾಂ ನರಃ ||",
    telugu: "బహవో దుర్లభాశ్చైవ యే త్వయా కీర్తితా గుణాః |\nమునే వక్ష్యామ్యహం బుద్ధా తైర్యుక్తః శ్రూయతాం నరః ||",
    tamil: "பஹவோ துர்லபா4ஶ்சைவ யே த்வயா கீர்திதா குணா: |\nமுநே வக்ஷ்யாம்யஹம் பு3த்3த4 தைர்யுக்த: ஶ்ரூயதாம் நர: ||",
  },
  v8: {
    devanagari: "इक्ष्वाकुवंशप्रभवः रामो नाम जनैश्श्रुतः ।\nनियतात्मा महावीर्यः द्युतिमान् धृतिमान् वशी ॥ ८ ॥",
    english: "ikṣvākuvaṃśaprabhavo rāmo nāma janaiḥ śrutaḥ ।\nniyatātmā mahāvīryo dyutimāndhṛtimānvāśī ॥",
    kannada: "ಇಕ್ಷ್ವಾಕುವಂಶಪ್ರಭವೋ ರಾಮೋ ನಾಮ ಜನೈಃ ಶ್ರುತಃ |\nನಿಯತಾತ್ಮಾ ಮಹಾವೀರ್ಯೋ ದ್ಯುತಿಮಾನ್ಧೃತಿಮಾನ್ವಶೀ ||",
    telugu: "ఇక్ష్వాకువంశప్రభవో రామో నామ జనైః శ్రుతః |\nనియతాత్మా మహావీర్యో ద్యుతిమాన్ధృతిమాన్వశీ ||",
    tamil: "இக்ஷ்வாகுவம்ஶப்ரப4வோ ராமோ நாம ஜநை: ஶ்ருத: |\nநியதாத்மா மஹாவீர்யோ த்3யுதிமாந்த்4ருதிமான்வஶீ ||",
  },
  v9: {
    devanagari: "बुद्धिमान् नीतिमान् वाग्ग्मी श्रीमाञ्छत्रुनिबर्हणः ।\nविपुलांसो महाबाहुः कम्बुग्रीवो महाहनुः ॥ ९ ॥",
    english: "buddhimānnītimānvāgmī śrīmāñchatrunibarhaṇaḥ ।\nvipulāṃso mahābāhuḥ kambugrīvo mahāhanuḥ ॥",
    kannada: "ಬುದ್ಧಿಮಾನ್ನೀತಿಮಾನ್ವಾಗ್ಮೀ ಶ್ರೀಮಾಞ್ಛತ್ರುನಿಬರ್ಹಣಃ |\nವಿಪುಲಾಂಸೋ ಮಹಾಬಾಹುಃ ಕಂಬುಗ್ರೀವೋ ಮಹಾಹನುಃ ||",
    telugu: "బుద్ధిమాన్నీతిమాన్వాగ్మీ శ్రీమాఞ్ఛత్రునిబర్హణః |\nవిపులాంసో మహాబాహుః కంబుగ్రీవో మహాహనుః ||",
    tamil: "பு3த்3தி4மாந்நீதிமாந்வாக்3மீ ஶ்ரீமாஞ்ச2த்ருநிப3ர்ஹண: |\nவிபுலாஂஸோ மஹாஹாஹு: கம்புக்3ரீவோ மஹாஹநு: ||",
  },
  v10: {
    devanagari: "महोरस्को महेष्वासः गूढजत्रुररिन्दमः ।\nआजानुबाहुस्सुशिराः सुललाटस्सुविक्रमः ॥ १० ॥",
    english: "mahorasko maheṣvāso gūḍhajatrurarindamaḥ ।\nājānubāhuḥ suśirāḥ sulalāṭaḥ suvikramaḥ ॥",
    kannada: "ಮಹೋರಸ್ಕೋ ಮಹೇಷ್ವಾಸೋ ಗೂಢಜತ್ರುರರಿಂದಮಃ |\nಆಜಾನುಬಾಹುಃ ಸುಶಿರಾಃ ಸುಲಲಾಟಃ ಸುವಿಕ್ರಮಃ ||",
    telugu: "మహోరస్కో మహేష్వాసో గూఢజత్రురరిందమః |\nఆజానుబాహుః సుశిరాః సులలాటః సువిక్రమః ||",
    tamil: "மஹோரஸ்கோ மஹேஷ்வாஸோ கூடஜத்ருரரிந்தம: |\nஆஜாநுபாஹu: ஸுஶிரா: ஸுலலாட: ஸuவிக்ரம: ||",
  },
  v11: {
    devanagari: "समस्समविभक्ताङ्गः स्निग्धवर्णᳶ  प्रतापवान् ।\nपीनवक्षा विशालाक्षः लक्ष्मीवाञ्छुभलक्षणः ॥ ११ ॥",
    english: "samaḥ samavibhaktāṅgaḥ snigdhavarṇaḥ pratāpavān ।\npīnavakṣā viṣālākṣo lakṣmīvāñchubhalakṣaṇaḥ ॥",
    kannada: "ಸಮಃ ಸಮವಿಭಕ್ತಾಂಗಃ ಸ್ನಿಗ್ಧವರ್ಣಃ ಪ್ರತಾಪವಾನ್ |\nಪೀನವಕ್ಷಾ ವಿಶಾಲಾಕ್ಷೋ ಲಕ್ಷ್ಮೀವಾಞ್ಛುಭಲಕ್ಷಣಃ ||",
    telugu: "సమః సమవిభక్తాఙ్గః స్నిగ్ధవర్ణః ప్రతాపవాన్ |\nఆజానుబాహుః సుశిరాః సులలాటః సువిక్రమః ||",
    tamil: "ஸம: ஸமவிப4க்தாங்க்3ஹ: ஸ்நிக்3த4வர்ண: ப்ரதாபவான் |\nபீனவக்ஷா விஶாலாக்ஷோ லக்ष्மீவாஞ்ச்2ஹuப4லக்ஷண: ||",
  },
  v12: {
    devanagari: "धर्मज्ञस्सत्यसन्धश्च प्रजानाञ्च हिते रतः ।\nयशस्वी ज्ञानसम्पन्नः शुचिर्वश्यस्समाधिमान् ॥ १२ ॥",
    english: "dharmajñaḥ satyasandhaśca prajānāṃ ca hite rataḥ ।\nyaśasvī jñānasampannaḥ śucirvaśyaḥ samādhimān ॥",
    kannada: "ಧರ್ಮಜ್ಞಃ ಸತ್ಯಸಂಧಶ್ಚ ಪ್ರಜಾನಾಂ ಚ ಹಿತೇ ರತಃ |\nಯಶಸ್ವೀ ಜ್ಞಾನಸಂಪನ್ನಃ ಶುಚಿರ್ವಶ್ಯಃ ಸಮಾಧಿಮಾನ್ ||",
    telugu: "ధర్మజ్ఞః సత్యసన్ధశ్చ ప్రజానాం చ హితే రతః |\nయశస్వీ జ్ఞానసమ్పన్నః శుచిర్వశ్యః సమాధిమాన్ ||",
    tamil: "த4ರ್ಮஜ்ஞ: ஸத்யஸந்த4ஶ்ச ப்ரஜானாம் ச ஹிதே ரத: |\nயஶஶ்வீ ஜ்ஞாநஸம்பந்ந: ஶுசிர்வஶ்ய: ஸமாதி4மான் ||",
  },
  v13: {
    devanagari: "प्रजापतिसमश्श्रीमान् धाता रिपुनिषूदनः ।\nरक्षिता जीवलोकस्य धर्मस्य परिरक्षिता ॥ १३ ॥",
    english: "prajāpatisamaḥ śrīmān dhātā ripuniṣūdanaḥ ।\nrakṣitā jīvalokasya dharmasya parirakṣitā ॥",
    kannada: "ಪ್ರಜಾಪತಿಸಮಃ ಶ್ರೀಮಾನ್ ಧಾತಾ ರಿಪುನಿಷೂದನಃ |\nರಕ್ಷಿತಾ ಜೀವಲೋಕಸ್ಯ ಧರ್ಮಸ್ಯ ಪರಿರಕ್ಷಿತಾ ||",
    telugu: "ప్రజాపతిసమః శ్రీమాన్ ధాతా రిపునిషూదనః |\nరక్షితా జీవలోకస్య ధర్మస్య పరిరక్షితā ||",
    tamil: "ப்ரஜாபதிஸம: ஶ்ரீமான் தா4தா ரிபுநிஷூத3ன: |\nரக்ஷிதா ஜீவலோகஸ்ய த4ர்மys பரிரக்ஷிதா ||",
  },
  v14: {
    devanagari: "रक्षिता स्वस्य धर्मस्य स्वजनस्य च रक्षिता ।\nवेदवेदाङ्गतत्त्वज्ञः धनुर्वेदे च निष्ठितः ॥ १४ ॥",
    english: "rakṣitā svasya dharmasya svajanasya ca rakṣitā ।\nvedavedāṅgatattvajño dhanurvede ca niṣṭhitaḥ ॥",
    kannada: "ರಕ್ಷಿತಾ ಸ್ವಸ್ಯ ಧರ್ಮಸ್ಯ ಸ್ವಜನಸ್ಯ ಚ ರಕ್ಷಿತಾ |\nವೇದವೇದಾಂಗತತ್ತ್ವಜ್ಞೋ ಧನುರ್ವೇದೇ ಚ ನಿಷ್ಠಿತಃ ||",
    telugu: "రక్షితా స్వస్య ధర్మస్య స్వజనస్య చ రక్షితా |\nвеదాఙ్గతత్త్వజ్ఞో ధనుర్వేదే చ నిష్ఠితః ||",
    tamil: "ரக்ஷிதா ஸ்வஸ்ய த4ர்மஸ்ய ஸ்வஜனஸ்ய ச ரக்ஷிதா |\nவேதவேதா3ங்க3தத்த்வஜ்ஞோ த4நுர்வேதே3 ச நிஷ்டி2த: ||",
  },
  v15: {
    devanagari: "सर्वशास्त्रार्थतत्त्वज्ञः स्मृतिमान् प्रतिभानवान् ।\nसर्वलोकप्रियस्साधुः अदीनात्मा विचक्षणः ॥ १५ ॥",
    english: "sarvaśāstrārthatattvajñaḥ smṛtimānpratibhānavān ।\nsarvalokapriyaḥ sādhuradīnātmā vicakṣaṇaḥ ॥",
    kannada: "ಸರ್ವಶಾಸ್ತ್ರಾರ್ಥತತ್ತ್ವಜ್ಞಃ ಸ್ಮೃತಿಮಾನ್ಪ್ರತಿಭಾನವಾನ್ |\nಸರ್ವಲೋಕಪ್ರಿಯಃ ಸಾಧುರದೀನಾತ್ಮಾ ವಿಚಕ್ಷಣಃ ||",
    telugu: "సర్వశాస్త్రార్థతత్త్వజ్ఞః స్మృతిమాన్ప్రతిభానవాన్ |\nసర్వలోకప్రియః సాధురదీనాత్మా విచక్షణః ||",
    tamil: "ஸர்வஶாஸ்த்ரาร்த2தத்த்வஜ்ஞ: ஸ்ம்ருதிமான்ப்ரதிபா4னவான் |\nஸர்வலோகப்ரிய: ஸாது4ரதீ3நாத்மா விசக்ஷண: ||",
  },
  v16: {
    devanagari: "सर्वदाभिगतस्सद्भिः समुद्र इव सिन्धुभिः ।\nआर्यस्सर्वसमश्चैव सदैकप्रियदर्शनः ॥ १६ ॥",
    english: "sarvadā'bhigataḥ sadbhiḥ samudra iva sindhubhiḥ ।\nāryaḥ sarvasamaścaiva sadaiva priyadarśanaḥ ॥",
    kannada: "ಸರ್ವದಾಭಿಗತಃ ಸದ್ಭಿಃ ಸಮುದ್ರ ಇವ ಸಿಂಧುಭಿಃ |\nಆರ್ಯಃ ಸರ್ವಸಮಶ್ಚೈವ ಸದೈವ ಪ್ರಿಯದರ್ಶನಃ ||",
    telugu: "సర్వదాభిగతః సద్భిః సముద్ర ఇవ సింధుభిః |\nఆర్యః సర్వసమశ్చైవ సదైకప్రియదర్శనః ||",
    tamil: "ஸர்வதாபிகதஃ ஸத்பிஃ ஸமுத்ர இவ ஸிந்துபி4ஹ் |\nஆர்யஃ ஸர்வஸமஶ்சைவ ஸதைவ ப்ரியதர்ஶனஃ ||",
  },
  v17: {
    devanagari: "स च सर्वगुणोपेतः कौसल्यानन्दवर्धनः ।\nसमुद्र इव गाम्भीर्ये धैर्येण हिमवानिव ॥ १७ ॥",
    english: "sa ca sarvaguṇopetaḥ kausalyānandavardhanaḥ ।\nsamudra iva gāmbhīrye dhairyeṇa himavāniva ॥",
    kannada: "ಸ ಚ ಸರ್ವಗುಣೋಪೇತಃ ಕೌಸಲ್ಯಾನಂದವರ್ಧನಃ |\nಸಮುದ್ರ ಇವ ಗಾಂಭೀರ್ಯೇ ಧೈರ್ಯೇಣ ಹಿಮವಾನಿವ ||",
    telugu: "స చ సర్వగుణోపేతః కౌసల్యానందవర్ధనః |\nసముద్ర ఇవ గాంభీర్యే ధైర్యేణ హిమవానివ ||",
    tamil: "ஸ ச ஸர்வகுணோபேத: கௌஸல்யாநந்தவர்த4ன: |\nஸமுத்3ர இவ கா3ம்பீ4ர்யே தை4ர்யೇண ಹಿಮವಾನಿವ ||",
  },
  v18: {
    devanagari: "विष्णुना सदृशो वीर्ये सोमवत् प्रियदर्शनः ।\nकालाग्निसदृशᳲ  क्रोधे क्षमया पृथिवीसमः ॥ १८ ॥",
    english: "viṣṇunā sadṛśo vīrye somavatpriyadarśanaḥ ।\nkālāgnisadṛśaḥ krodhe kṣamayā pṛthivīsamaḥ ॥",
    kannada: "ವಿಷ್ಣುನಾ ಸದೃಶೋ ವೀರ್ಯೇ ಸೋಮವತ್ಪ್ರಿಯದರ್ಶನಃ |\nಕಾಲಾಗ್ನಿಸದೃಶಃ ಕ್ರೋಧೇ ಕ್ಷಮಯಾ ಪೃಥಿವೀಸಮಃ ||",
    telugu: "విష్ణునా సదృశో వీర్యే సోమవత్ప్రియదర్శనః |\nకాలాగ్నిసదృశః क्रोधే క్షమయా పృథివీసమః ||",
    tamil: "விஷ்ணுநா ஸத்3ருஶோ வீர்யே ஸோமவத்ப்ரியத3ர்ஶன: |\nகாலாக்நிஸத்3ருஶ: க்ரோதே4 க்ஷமயா ப்ருதி2வீஸம: ||",
  },
  v19: {
    devanagari: "धनदेन समस्त्यागे सत्ये धर्म इवापरः ।\nतमेवं गुणसम्पन्नं रामं सत्यपराक्रमम् ॥ १९ ॥",
    english: "dhanadena samastyāge satye dharma ivāparaḥ ।\ntamevaṃguṇasampannaṃ rāmaṃ satyaparākramam ॥",
    kannada: "ಧನದೇನ ಸಮಸ್ತ್ಯಾಗೇ ಸತ್ಯೇ ಧರ್ಮ ಇವಾಪರಃ |\nತಮೇವಂಗುಣಸಂಪನ್ನಂ ರಾಮಂ ಸತ್ಯಪರಾಕ್ರಮಮ್ ||",
    telugu: "ధనదేన సమస్త్యాగే సత్యే ధర్మ ఇవాపరః |\nతమేవంగుణసంపన్నం రామం సత్యపరాక్రమమ్ ||",
    tamil: "த4னதே3ன ஸமஸ்த்யாகே3 ஸத்யே த4ர்ம இவாபர: |\nதமேவங்கு3ணஸம்பந்நம் ராமம் ஸத்யபராக்ரமம் ||",
  },
  v20: {
    devanagari: "ज्येष्ठं श्रेष्ठगुणैर्युक्तं प्रियं दशरथस्सुतम् ।\nप्रकृतीनां हितैर्युक्तं प्रकृतिप्रियकाम्यया ॥ २० ॥",
    english: "jyeṣṭhaṃ śreṣṭhaguṇairyuktaṃ priyaṃ daśarathaḥ sutam ।\nprakṛtīnāṃ hitairyuktaṃ prakṛtipriyakāmyayā ॥",
    kannada: "ಜ್ಯೇಷ್ಠಂ ಶ್ರೇಷ್ಠಗುಣೈರ್ಯುಕ್ತಂ ಪ್ರಿಯಂ ದಶರಥಃ ಸುತಮ್ |\nಪ್ರಕೃತೀನಾಂ ಹಿತೈರ್ಯುಕ್ತಂ ಪ್ರಕೃತಿಪ್ರಿಯಕಾಮ್ಯಯಾ ||",
    telugu: "జ్యేష్ఠం శ్రేష్ఠగుణైర్యుక్తం ప్రియం దశరథః సుతమ్ |\nప్రకృతీనాం హితైర్యుక్తం ప్రకృతిప్రియకామ్యయా ||",
    tamil: "ஜ்யேஷ்ட2ம் ஶ்ரேஷ்ட2கு3ணைர்யுக்தம் ப்ரியம் த3ஶரத2: ஸுதம |\nப்ரக்ருதீநாம் ஹிதைர்யுக்தம் ப்ரக்ருதிப்ரியகாம்யயா ||",
  },
  v21: {
    devanagari: "यौवराज्येन संयोक्तुम् ऐच्छत् प्रीत्या महीपतिः ।\nतस्याभिषेकसम्भारान् दृष्ट्वा भार्याथ कैकयी ॥ २१ ॥",
    english: "yauvarājyena saṃyoktumaicchatprītyā mahīpatiḥ ।\ntasyābhiṣekasambhārān dṛṣṭvā bhāryātha kaikeyī ॥",
    kannada: "ಯೌವರಾಜ್ಯೇನ ಸಂಯೋಕ್ತುಮೈಚ್ಛತ್ಪ್ರೀತ್ಯಾ ಮಹೀಪতিಃ |\nತಸ್ಯಾಭಿಷೇಕಸಂಭಾರಾನ್ ದೃಷ್ಟ್ವಾ ಭಾರ್ಯಾಥ ಕೈಕೇಯೀ ||",
    telugu: "యౌవరాజ్యేన సంయోక్తుమైచ్ఛత్ప్రీత్యా మహీపతిః |\nతస్യാభిషేకసంభారాన్ దృష్ట్వా భార్యాథ కైకేయీ ||",
    tamil: "யௌவராஜ்யேன ஸம்யம்ோக்துமைச்ச2த்ப்ரீத்யா மஹீபதி: |\nதஸ்யாபி4ஷேகஸம்பா4ரான் த்3ருஷ்ட்வா பா4ர்யாத2 கைகயீ ||",
  },
  v22: {
    devanagari: "पूर्वं दत्तवरा देवी वरमेनमयाचत ।\nविवासनं च रामस्य भरतस्याभिषेचनम् ॥ २२ ॥",
    english: "pūrvadattavarā devī varamenamayācata ।\nvivāsanaṃ ca rāmasya bharatasyābhiṣecanam ॥",
    kannada: "ಪೂರ್ವದತ್ತವರಾ ದೇವೀ ವರಮೇನಮಯಾಚತ |\nವಿವಾಸನಂ च ರಾಮಸ್ಯ ಭರತಸ್ಯಾಭಿಷೇಚನಮ್ ||",
    telugu: "పూర్వదత్తవరా దేవీ వరమేనమయాచత |\nవివాసనం చ రామస్య భరతస్యాభిషేచనమ్ ||",
    tamil: "பூர்வத3த்தவரா தே3வீ வரமேநமயாசத |\nவிவாஸநம் ச ராமஸ்ய பரதஸியாபி4ஷேசனம் ||",
  },
  v23: {
    devanagari: "स सत्यवचनाद्राजा धर्मपाशेन संयतः ।\nविवासयामास सुतं रामं दशरथᳶ  प्रियम् ॥ २३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v24: {
    devanagari: "स जगाम वनं वीरः प्रतिज्ञामनुपालयन् ।\nपितुर्वचननिर्देशात् कैकेय्याᳶ  प्रियकारणात् ॥ २४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v25: {
    devanagari: "तं व्रजन्तं प्रियो भ्राता लक्ष्मणोऽनुजगाम ह ।\nस्नेहाद्विनयसम्पन्नः सुमित्रानन्दवर्धनः ॥ २५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v26: {
    devanagari: "भ्रातरं दयितो भ्रातुः सौभ्रात्रमनुदर्शयन् ।\nरामस्य दयिता भार्या नित्यं प्राणसमा हिता ॥ २६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v27: {
    devanagari: "जनकस्य कुले जाता देवमायेव निर्मिता ।\nसर्वलक्षणसम्पन्ना नारीणामुत्तमा वधूः ॥ २७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v28: {
    devanagari: "सीताप्यनुगता रामं शशिनं रोहिणी यथा ।\nपौरैरनुगतो दूरं पित्रा दशरथेन च ॥ २८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v29: {
    devanagari: "शृङ्गिबेरपुरे सूतं गङ्गाकूले व्यसर्जयत् ।\nगुहमासाद्य धर्मात्मा निषादाधिपतिं प्रियम् ॥ २९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v30: {
    devanagari: "गुहेन सहितो रामः लक्ष्मणेन च सीतया ।\nते वनेन वनं गत्वा नदीस्तीर्त्वा बहूदकाः ॥ ३० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v31: {
    devanagari: "चित्रकूटमनुप्राप्य भरद्वाजस्य शासनात् ।\nरम्यमावसथं कृत्वा रममाणा वने त्रयः ॥ ३१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v32: {
    devanagari: "देवगन्धर्वसङ्काशाः तत्र ते न्यवसन् सुखम् ।\nचित्रकूटं गते रामे पुत्रशोकातुरस्तथा ॥ ३२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v33: {
    devanagari: "राजा दशरथस्स्वर्गं जगाम विलपन् सुतम् ।\nमृते तु तस्मिन् भरतः वसिष्ठप्रमुखैर्द्विजैः ॥ ३३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v34: {
    devanagari: "नियुज्यमानो राज्याय नैच्छद्राज्यं महाबलः ।\nस जगाम वनं वीरः रामपादप्रसादकः ॥ ३४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v35: {
    devanagari: "गत्वा तु स महात्मानं रामं सत्यपराक्रमम् ।\nअयाचद्भ्रातरं रामम् आर्यभावपुरस्कृतः ॥ ३५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v36: {
    devanagari: "त्वमेव राजा धर्मज्ञ इति रामं वचोऽब्रवीत् ।\nरामोऽपि परमोदारः सुमुखस्सुमहायशाः ॥ ३६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v37: {
    devanagari: "न चैच्छत् पितुरादेशात् राज्यं रामो महाबलः ।\nपादुके चास्य राज्याय न्यासं दत्त्वा पुनᳶ  पुनः ॥ ३७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v38: {
    devanagari: "निवर्तयामास ततः भरतं भरताग्रजः ।\nस काममनवाप्यैव रामपादावुपस्पृशन् ॥ ३८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v39: {
    devanagari: "नन्दिग्रामेऽकरोद्राज्यं रामागमनकाङ्क्षया ।\nगते तु भरते श्रीमान् सत्यसन्धो जितेन्द्रियः ॥ ३९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v40: {
    devanagari: "रामस्तु पुनरालक्ष्य नागरस्य जनस्य च ।\nतत्रागमनमेकाग्रः दण्डकान् प्रविवेश ह ॥ ४० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v41: {
    devanagari: "प्रविश्य तु महारण्यं रामो राजीवलोचनः ।\nविराधं राक्षसं हत्वा शरभङ्गं ददर्श ह ॥ ४१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v42: {
    devanagari: "सुतीक्ष्णं चाप्यगस्त्यं च अगस्त्यभ्रातरं तथा ।\nअगस्त्यवचनाच्चैव जग्राहैन्द्रं शरासनम् ॥ ४२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v43: {
    devanagari: "खड्गं च परमप्रीतः तूणी चाक्षयसायकौ ।\nवसतस्तस्य रामस्य वने वनचरैस्सह ॥ ४३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v44: {
    devanagari: "ऋषयोऽभ्यागमन् सर्वे वधायासुररक्षसाम् ।\nस तेषां प्रतिशुश्राव राक्षसानां तथा वने ॥ ४४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v45: {
    devanagari: "प्रतिज्ञातश्च रामेण वधस्संयति रक्षसाम् ।\nऋषीणामग्निकल्पानां दण्डकारण्यवासिनाम् ॥ ४५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v46: {
    devanagari: "तेन तत्रैव वसता जनस्थाननिवासिनी ।\nविरूपिता शूर्पणखा राक्षसी कामरूपिणी ॥ ४६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v47: {
    devanagari: "ततश्शूर्पणखावाक्यात् उद्युक्तान् सर्वराक्षसान् ।\nखरं त्रिशिरसं चैव दूषणं चैव राक्षसम् ॥ ४७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v48: {
    devanagari: "निजघान रणे रामः तेषां चैव पदानुगान् ।\nवने तस्मिन् निवसता जनस्थाननिवासिनाम् ॥ ४८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v49: {
    devanagari: "रक्षसां निहतान्यासन् सहस्राणि चतुर्दश ।\nततो ज्ञातिवधं श्रुत्वा रावणᳲ क्रोधमूर्छितः ॥ ४९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v50: {
    devanagari: "सहायं वरयामास मारीचं नाम राक्षसम् ।\nवार्यमाणस्सुबहुशः मारीचेन स रावणः ॥ ५० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v51: {
    devanagari: "न विरोधो बलवता क्षमो रावण तेन ते ।\nअनादृत्य तु तद्वाक्यं रावणᳲ  कालचोदितः ॥ ५१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v52: {
    devanagari: "जगाम सह मारीचः तस्याश्रमपदं तदा ।\nतेन मायाविना दूरम् अपवाह्य नृपात्मजौ ॥ ५२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v53: {
    devanagari: "जहार भार्यां रामस्य गृध्रं हत्वा जटायुषम् ।\nगृध्रं च निहतं दृष्ट्वा हृतां श्रुत्वा च मैथिलीम् ॥ ५३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v54: {
    devanagari: "राघवश्शोकसन्तप्तः विललापाकुलेन्द्रियः ।\nततस्तेनैव शोकेन गृध्रं दग्ध्वा जटायुषम् ॥ ५४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v55: {
    devanagari: "मार्गमाणो वने सीतां राक्षसं सन्ददर्श ह ।\nकबन्धं नाम रूपेण विकृतं घोरदर्शनम् ॥ ५५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v56: {
    devanagari: "तं निहत्य महाबाहुः ददाह स्वर्गतश्च सः ।\nस चास्य कथयामास शबरीं धर्मचारिणीम् ॥ ५६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v57: {
    devanagari: "श्रमणीं धर्मनिपुणाम् अभिगच्छेति राघवम् ।\nसोऽभ्यगच्छन् महातेजाः शबरीं शत्रुसूदनः ॥ ५७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v58: {
    devanagari: "शबर्या पूजितस्सम्यक् रामो दशरथात्मजः ।\nपम्पातीरे हनुमता सङ्गतो वानरेण ह ॥ ५८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v59: {
    devanagari: "हनुमद्वचनाच्चैव सुग्रीवेण समागतः ।\nसुग्रीवाय च तत्सर्वं शंसद्रामो महाबलः ॥ ५९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v60: {
    devanagari: "आदितस्तद्यथावृत्तं सीतायाश्च विशेषतः ।\nसुग्रीवश्चापि तत्सर्वं श्रुत्वा रामस्य वानरः ॥ ६० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v61: {
    devanagari: "चकार सख्यं रामेण प्रीतश्चैवाग्निसाक्षिकम् ।\nततो वानरराजेन वैरानुकथनं प्रति ॥ ६१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v62: {
    devanagari: "रामायावेदितं सर्वं प्रणयाद्दुᳲ खितेन च ।\nप्रतिज्ञातं च रामेण तदा वालिवधं प्रति ॥ ६२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v63: {
    devanagari: "वालिनश्च बलं तत्र कथयामास वानरः ।\nसुग्रीवश्शङ्कितश्चासीत् नित्यं वीर्येण राघवे ॥ ६३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v64: {
    devanagari: "राघवप्रत्ययार्थं तु दुन्दुभेᳲ  कायमुत्तमम् ।\nदर्शयामास सुग्रीवः महापर्वतसन्निभम् ॥ ६४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v65: {
    devanagari: "उत्स्मयित्वा महाबाहुः प्रेक्ष्य चास्थि महाबलः ।\nपादाङ्गुष्ठेन चिक्षेप सम्पूर्णं दशयोजनम् ॥ ६५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v66: {
    devanagari: "बिभेद च पुनस्सालान् सप्तैकेन महेषुणा ।\nगिरिं रसातलं चैव जनयन् प्रत्ययं तदा ॥ ६६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v67: {
    devanagari: "ततᳶ  प्रीतमनास्तेन विश्वस्तस्स महाकपिः ।\nकिष्किन्धां रामसहितः जगाम च गुहां तदा ॥ ६७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v68: {
    devanagari: "ततोऽगर्जद्धरिवरः सुग्रीवो हेमपिङ्गलः ।\nतेन नादेन महता निर्जगाम हरीश्वरः ॥ ६८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v69: {
    devanagari: "अनुमान्य तदा तारां सुग्रीवेण समागतः ।\nनिजघान च तत्रैनं शरेणैकेन राघवः ॥ ६९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v70: {
    devanagari: "ततस्सुग्रीववचनात् हत्वा वालिनमाहवे ।\nसुग्रीवमेव तद्राज्ये राघवᳶ  प्रत्यपादयत् ॥ ७० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v71: {
    devanagari: "स च सर्वान् समानीय वानरान् वानरर्षभः ।\nदिशᳶ  प्रस्थापयामास दिदृक्षुर्जनकात्मजाम् ॥ ७१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v72: {
    devanagari: "ततो गृध्रस्य वचनात् सम्पातेर्हनुमान् बली ।\nशतयोजनविस्तीर्णं पुप्लुवे लवणार्णवम् ॥ ७२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v73: {
    devanagari: "तत्र लङ्कां समासाद्य पुरीं रावणपालिताम् ।\nददर्श सीतां ध्यायन्तीम् अशोकवनिकां गताम् ॥ ७३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v74: {
    devanagari: "निवेदयित्वाभिज्ञानं प्रवृत्तिं च निवेद्य च ।\nसमाश्वास्य च वैदेहीं मर्दयामास तोरणम् ॥ ७४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v75: {
    devanagari: "पञ्च सेनाग्रगान् हत्वा सप्त मन्त्रिसुतानपि ।\nशूरमक्षं च निष्पिष्य ग्रहणं समुपागमत् ॥ ७५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v76: {
    devanagari: "अस्त्रेणोन्मुक्तमात्मानं ज्ञात्वा पैतामहाद्वरात् ।\nमर्षयन् राक्षसान् वीरः यन्त्रिणस्तान् यदृच्छया ॥ ७६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v77: {
    devanagari: "ततो दग्ध्वा पुरीं लङ्काम् ऋते सीतां च मैथिलीम् ।\nरामाय प्रियमाख्यातुं पुनरायान्महाकपिः ॥ ७७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v78: {
    devanagari: "सोऽभिगम्य महात्मानं कृत्वा रामं प्रदक्षिणम् ।\nन्यवेदयदमेयात्मा दृष्टा सीतेति तत्त्वतः ॥ ७८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v79: {
    devanagari: "ततस्सुग्रीवसहितः गत्वा तीरं महोदधेः ।\nसमुद्रं क्षोभयामास शरैरादित्यसन्निभैः ॥ ७९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v80: {
    devanagari: "दर्शयामास चात्मानं समुद्रस्सरितां पतिः ।\nसमुद्रवचनाच्चैव नलं सेतुमकारयत् ॥ ८० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v81: {
    devanagari: "तेन गत्वा पुरीं लङ्कां हत्वा रावणमाहवे ।\nरामस्सीतामनुप्राप्य परां व्रीडामुपागमत्  ॥ ८१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v82: {
    devanagari: "तामुवाच ततो रामः परुषं जनसंसदि ।\nअमृष्यमाणा सा सीता विवेश ज्वलनं सती ॥ ८२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v83: {
    devanagari: "ततोऽग्निवचनात् सीतां ज्ञात्वा विगतकल्मषाम् ।\nबभौ रामस्सम्प्रहृष्टः पूजितस्सर्वदैवतैः ॥ ८३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v84: {
    devanagari: "कर्मणा तेन महता त्रैलोक्यं सचराचरम् ।\nसदेवर्षिगणं तुष्टं राघवस्य महात्मनः ॥ ८४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v85: {
    devanagari: "अभिषिच्य च लङ्कायां राक्षसेन्द्रं विभीषणम् ।\nकृतकृत्यस्तदा रामः विज्वरᳶ  प्रमुमोद ह ॥ ८५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v86: {
    devanagari: "देवताभ्यो वरं प्राप्य समुत्थाप्य च वानरान् ।\nअयोध्यां प्रस्थितो रामः पुष्पकेण सुहृद्वृतः ॥ ८६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v87: {
    devanagari: "भरद्वाजाश्रमं गत्वा रामस्सत्यपराक्रमः ।\nभरतस्यान्तिकं रामः हनुमन्तं व्यसर्जयत् ॥ ८७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v88: {
    devanagari: "पुनराख्यायिकां जल्पन् सुग्रीवसहितस्तदा ।\nपुष्पकं तत् समारुह्य नन्दिग्रामं ययौ तदा ॥ ८८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v89: {
    devanagari: "नन्दिग्रामे जटां हित्वा भ्रातृभिस्सहितोऽनघः ।\nरामस्सीतामनुप्राप्य राज्यं पुनरवाप्तवान् ॥ ८९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v90: {
    devanagari: "प्रहृष्टमुदितो लोकः तुष्टᳶ  पुष्टस्सुधार्मिकः ।\nनिरामयो ह्यरोगश्च दुर्भिक्षभयवर्जितः ॥ ९० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v91: {
    devanagari: "न पुत्रमरणं केचित् द्रक्ष्यन्ति पुरुषाᳲ  क्वचित् ।\nनार्यश्चाविधवा नित्यं भविष्यन्ति पतिव्रताः ॥ ९१ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v92: {
    devanagari: "न चाग्निजं भयं किञ्चित् नाप्सु मज्जन्ति जन्तवः ।\nन वातजं भयं किञ्चित् नापि ज्वरकृतं तथा ॥ २२ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v93: {
    devanagari: "न चापि क्षुद्भयं तत्र न तस्करभयं तथा ।\nनगराणि च राष्ट्राणि धनधान्ययुतानि च ॥ ९३ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v94: {
    devanagari: "नित्यं प्रमुदितास्सर्वे यथा कृतयुगे तथा ।\nअश्वमेधशतैरिष्ट्वा तथा बहुसुवर्णकैः ॥ ९४ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v95: {
    devanagari: "गवां कोट्ययुतं दत्त्वा विद्वद्भ्यो विधिपूर्वकम् ।\nअसङ्ख्येयं धनं दत्त्वा ब्राह्मणेभ्यो महायशाः ॥ ९५ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v96: {
    devanagari: "राजवंशाञ्छतगुणान् स्थापयिष्यति राघवः ।\nचातुर्वर्ण्यं च लोकेऽस्मिन् स्वे स्वे धर्मे नियोक्ष्यति ॥ ९६ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v97: {
    devanagari: "दशवर्षसहस्राणि दशवर्षशतानि च ।\nरामो राज्यमुपासित्वा ब्रह्मलोकं प्रयास्यति ॥ ९७ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v98: {
    devanagari: "इदं पवित्रं पापघ्नं पुण्यं वेदैश्च सम्मितम् ।\nयᳶ  पठेद्रामचरितं सर्वपापैᳶ  प्रमुच्यते ॥ ९८ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v99: {
    devanagari: "एतदाख्यानमायुष्यं पठन् रामायणं नरः ।\nसपुत्रपौत्रस्सगणः प्रेत्य स्वर्गे महीयते ॥ ९९ ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
  v100: {
    devanagari: "पठन् द्विजो वागृषभत्वमीयात् स्यात् क्षत्रियो भूमिपतित्वमीयात् ।\nवणिग्जनᳶ  पण्यफलत्वमीयात् जनश्च शूद्रोऽपि महत्त्वमीयात् ॥ १०० ॥",
    english: "",
    kannada: "",
    telugu: "",
    tamil: "",
  },
};

// ── Week 1 schedule (mirrors spreadsheet rows) ───────────────────────────────
// date: ISO date → liveAt auto-set to midnight IST on that day
// isQuiz: true → shows quiz widget, no video
// isIntro: true → no video, shows intro text
// chantingUrl / meaningUrl: YouTube share links from spreadsheet
// chantingStart / meaningStart: timestamp in seconds — REQUIRED when URL uses ?si= share format
// ⚠️  YouTube share links (?si=...) lose the timestamp. Either:
//     a) Use full URL with &t=NNNs  e.g. https://youtu.be/VIDEO_ID?t=NNNs
//     b) Add chantingStart / meaningStart (seconds) next to the si= URL
export const SCHEDULE_W1 = [
  { date: "2026-05-21", n: 1, posting: "Verse 1", lyricsKey: "v1", chantingUrl: "/chanting_verse01.mp4", meaningUrl: "/meaning_verse01.mp4" },
  { date: "2026-05-22", n: 2, posting: "Verse 2", lyricsKey: "v2", chantingUrl: "/chanting_verse02.mp4", meaningUrl: "/meaning_verse02.mp4" },
  { date: "2026-05-23", n: 3, posting: "Verse 3", lyricsKey: "v3", chantingUrl: "/chanting_verse03.mp4", meaningUrl: "/meaning_verse03.mp4" },
  { date: "2026-05-24", n: 4, posting: "Quiz 1 (Verses 1-3)", isQuiz: true, liveAt: "2026-05-23T21:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W2 = [
  { date: "2026-05-25", n: 5, posting: "Verse 4", lyricsKey: "v4", chantingUrl: "/chanting_verse04.mp4", meaningUrl: "/meaning_verse04.mp4", liveAt: "2026-05-24T00:00:00+05:30" },
  { date: "2026-05-26", n: 6, posting: "Verse 5", lyricsKey: "v5", chantingUrl: "/chanting_verse05.mp4", meaningUrl: "/meaning_verse05.mp4", liveAt: "2026-05-25T22:55:00+05:30" },
  { date: "2026-05-27", n: 7, posting: "Verse 6", lyricsKey: "v6", chantingUrl: "/chanting_verse06.mp4", meaningUrl: "/meaning_verse06.mp4", liveAt: "2026-05-26T19:40:00+05:30" },
  { date: "2026-05-28", n: 8, posting: "Verse 7", lyricsKey: "v7", chantingUrl: "/chanting_verse07.mp4", meaningUrl: "/meaning_verse07.mp4", liveAt: "2026-05-27T20:00:00+05:30" },
  { date: "2026-05-29", n: 9, posting: "Verse 8", lyricsKey: "v8", chantingUrl: "/chanting_verse08.mp4", meaningUrl: "/meaning_verse08.mp4", liveAt: "2026-05-28T20:00:00+05:30" },
  { date: "2026-05-30", n: 10, posting: "Verse 9", lyricsKey: "v9", chantingUrl: "/chanting_verse09.mp4", meaningUrl: "/meaning_verse09.mp4", liveAt: "2026-05-29T20:00:00+05:30" },
  { date: "2026-05-31", n: 11, posting: "Quiz 2 (Verses 4-9)", isQuiz: true, liveAt: "2026-05-30T20:00:00+05:30" },
];

export const SCHEDULE_W3 = [
  { date: "2026-06-01", n: 12, posting: "Verse 10", lyricsKey: "v10", chantingUrl: "/chanting_verse10.mp4", meaningUrl: "/meaning_verse10.mp4", liveAt: "2026-05-31T20:00:00+05:30" },
  { date: "2026-06-02", n: 13, posting: "Verse 11", lyricsKey: "v11", chantingUrl: "/chanting_verse11.mp4", meaningUrl: "/meaning_verse11.mp4", liveAt: "2026-06-01T20:00:00+05:30" },
  { date: "2026-06-03", n: 14, posting: "Verse 12", lyricsKey: "v12", chantingUrl: "/chanting_verse12.mp4", meaningUrl: "/meaning_verse12.mp4", liveAt: "2026-06-02T20:00:00+05:30" },
  { date: "2026-06-04", n: 15, posting: "Verse 13", lyricsKey: "v13", chantingUrl: "/chanting_verse13.mp4", meaningUrl: "/meaning_verse13.mp4", liveAt: "2026-06-03T20:00:00+05:30" },
  { date: "2026-06-05", n: 16, posting: "Verse 14", lyricsKey: "v14", chantingUrl: "/chanting_verse14.mp4", meaningUrl: "/meaning_verse14.mp4", liveAt: "2026-06-04T20:00:00+05:30" },
  { date: "2026-06-06", n: 17, posting: "Verse 15", lyricsKey: "v15", chantingUrl: "/chanting_verse15.mp4", meaningUrl: "/meaning_verse15.mp4", liveAt: "2026-06-04T20:00:00+05:30" },
  { date: "2026-06-07", n: 18, posting: "Quiz 3 (Verses 10-15)", isQuiz: true, liveAt: "2026-06-06T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W4 = [
  { date: "2026-06-08", n: 19, posting: "Verse 16", lyricsKey: "v16", chantingUrl: "/chanting_verse16.mp4", meaningUrl: "/meaning_verse16.mp4", liveAt: "2026-06-07T20:00:00+05:30" },
  { date: "2026-06-09", n: 20, posting: "Verse 17", lyricsKey: "v17", chantingUrl: "/chanting_verse17.mp4", meaningUrl: "/meaning_verse17.mp4", liveAt: "2026-06-08T20:00:00+05:30" },
  { date: "2026-06-10", n: 21, posting: "Verse 18", lyricsKey: "v18", chantingUrl: "/chanting_verse18.mp4", meaningUrl: "/meaning_verse18.mp4", liveAt: "2026-06-09T20:00:00+05:30" },
  { date: "2026-06-11", n: 22, posting: "Verse 19", lyricsKey: "v19", chantingUrl: "/chanting_verse19.mp4", meaningUrl: "/meaning_verse19.mp4", liveAt: "2026-06-10T20:00:00+05:30" },
  { date: "2026-06-12", n: 23, posting: "Verse 20", lyricsKey: "v20", chantingUrl: "/chanting_verse20.mp4", meaningUrl: "/meaning_verse20.mp4", liveAt: "2026-06-11T20:00:00+05:30" },
  { date: "2026-06-13", n: 24, posting: "Verse 21", lyricsKey: "v21", chantingUrl: "/chanting_verse21.mp4", meaningUrl: "/meaning_verse21.mp4", liveAt: "2026-06-12T20:00:00+05:30" },
  { date: "2026-06-14", n: 25, posting: "Quiz 4 (Verses 16-21)", isQuiz: true, liveAt: "2026-06-13T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W5 = [
  { date: "2026-06-15", n: 26, posting: "Verse 22", lyricsKey: "v22", chantingUrl: "/chanting_verse22.mp4", meaningUrl: "/meaning_verse22.mp4", liveAt: "2026-06-14T20:00:00+05:30" },
  { date: "2026-06-16", n: 27, posting: "Verse 23", lyricsKey: "v23", chantingUrl: "/chanting_verse23.mp4", meaningUrl: "/meaning_verse23.mp4", liveAt: "2026-06-15T20:00:00+05:30" },
  { date: "2026-06-17", n: 28, posting: "Verse 24", lyricsKey: "v24", chantingUrl: "/chanting_verse24.mp4", meaningUrl: "/meaning_verse24.mp4", liveAt: "2026-06-16T20:00:00+05:30" },
  { date: "2026-06-18", n: 29, posting: "Verse 25", lyricsKey: "v25", chantingUrl: "/chanting_verse25.mp4", meaningUrl: "/meaning_verse25.mp4", liveAt: "2026-06-17T20:00:00+05:30" },
  { date: "2026-06-19", n: 30, posting: "Verse 26", lyricsKey: "v26", chantingUrl: "/chanting_verse26.mp4", meaningUrl: "/meaning_verse26.mp4", liveAt: "2026-06-18T20:00:00+05:30" },
  { date: "2026-06-20", n: 31, posting: "Verse 27", lyricsKey: "v27", chantingUrl: "/chanting_verse27.mp4", meaningUrl: "/meaning_verse27.mp4", liveAt: "2026-06-19T20:00:00+05:30" },
  { date: "2026-06-21", n: 32, posting: "Quiz 5 (Verses 22-27)", isQuiz: true, liveAt: "2026-06-20T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W6 = [
  { date: "2026-06-22", n: 33, posting: "Verse 28", lyricsKey: "v28", chantingUrl: "/chanting_verse28.mp4", meaningUrl: "/meaning_verse28.mp4", liveAt: "2026-06-21T20:00:00+05:30" },
  { date: "2026-06-23", n: 34, posting: "Verse 29", lyricsKey: "v29", chantingUrl: "/chanting_verse29.mp4", meaningUrl: "/meaning_verse29.mp4", liveAt: "2026-06-22T20:00:00+05:30" },
  { date: "2026-06-24", n: 35, posting: "Verse 30", lyricsKey: "v30", chantingUrl: "/chanting_verse30.mp4", meaningUrl: "/meaning_verse30.mp4", liveAt: "2026-06-23T20:00:00+05:30" },
  { date: "2026-06-25", n: 36, posting: "Verse 31", lyricsKey: "v31", chantingUrl: "/chanting_verse31.mp4", meaningUrl: "/meaning_verse31.mp4", liveAt: "2026-06-24T20:00:00+05:30" },
  { date: "2026-06-26", n: 37, posting: "Verse 32", lyricsKey: "v32", chantingUrl: "/chanting_verse32.mp4", meaningUrl: "/meaning_verse32.mp4", liveAt: "2026-06-25T20:00:00+05:30" },
  { date: "2026-06-27", n: 38, posting: "Verse 33", lyricsKey: "v33", chantingUrl: "/chanting_verse33.mp4", meaningUrl: "/meaning_verse33.mp4", liveAt: "2026-06-26T20:00:00+05:30" },
  { date: "2026-06-28", n: 39, posting: "Quiz 6 (Verses 28-33)", isQuiz: true, liveAt: "2026-06-27T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W7 = [
  { date: "2026-06-29", n: 40, posting: "Verse 34", lyricsKey: "v34", chantingUrl: "/chanting_verse34.mp4", meaningUrl: "/meaning_verse34.mp4", liveAt: "2026-06-28T20:00:00+05:30" },
  { date: "2026-06-30", n: 41, posting: "Verse 35", lyricsKey: "v35", chantingUrl: "/chanting_verse35.mp4", meaningUrl: "/meaning_verse35.mp4", liveAt: "2026-06-29T20:00:00+05:30" },
  { date: "2026-07-01", n: 42, posting: "Verse 36", lyricsKey: "v36", chantingUrl: "/chanting_verse36.mp4", meaningUrl: "/meaning_verse36.mp4", liveAt: "2026-06-30T20:00:00+05:30" },
  { date: "2026-07-02", n: 43, posting: "Verse 37", lyricsKey: "v37", chantingUrl: "/chanting_verse37.mp4", meaningUrl: "/meaning_verse37.mp4", liveAt: "2026-07-01T20:00:00+05:30" },
  { date: "2026-07-03", n: 44, posting: "Verse 38", lyricsKey: "v38", chantingUrl: "/chanting_verse38.mp4", meaningUrl: "/meaning_verse38.mp4", liveAt: "2026-07-02T20:00:00+05:30" },
  { date: "2026-07-04", n: 45, posting: "Verse 39", lyricsKey: "v39", chantingUrl: "/chanting_verse39.mp4", meaningUrl: "/meaning_verse39.mp4", liveAt: "2026-07-03T20:00:00+05:30" },
  { date: "2026-07-05", n: 46, posting: "Quiz 7 (Verses 34-39)", isQuiz: true, liveAt: "2026-07-04T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W8 = [
  { date: "2026-07-06", n: 47, posting: "Verse 40", lyricsKey: "v40", chantingUrl: "/chanting_verse40.mp4", meaningUrl: "/meaning_verse40.mp4", liveAt: "2026-07-05T20:00:00+05:30" },
  { date: "2026-07-07", n: 48, posting: "Verse 41", lyricsKey: "v41", chantingUrl: "/chanting_verse41.mp4", meaningUrl: "/meaning_verse41.mp4", liveAt: "2026-07-06T20:00:00+05:30" },
  { date: "2026-07-08", n: 49, posting: "Verse 42", lyricsKey: "v42", chantingUrl: "/chanting_verse42.mp4", meaningUrl: "/meaning_verse42.mp4", liveAt: "2026-07-07T20:00:00+05:30" },
  { date: "2026-07-09", n: 50, posting: "Verse 43", lyricsKey: "v43", chantingUrl: "/chanting_verse43.mp4", meaningUrl: "/meaning_verse43.mp4", liveAt: "2026-07-08T20:00:00+05:30" },
  { date: "2026-07-10", n: 51, posting: "Verse 44", lyricsKey: "v44", chantingUrl: "/chanting_verse44.mp4", meaningUrl: "/meaning_verse44.mp4", liveAt: "2026-07-09T20:00:00+05:30" },
  { date: "2026-07-11", n: 52, posting: "Verse 45", lyricsKey: "v45", chantingUrl: "/chanting_verse45.mp4", meaningUrl: "/meaning_verse45.mp4", liveAt: "2026-07-10T20:00:00+05:30" },
  { date: "2026-07-12", n: 53, posting: "Quiz 8 (Verses 40-45)", isQuiz: true, liveAt: "2026-07-11T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W9 = [
  { date: "2026-07-13", n: 54, posting: "Verse 46", lyricsKey: "v46", chantingUrl: "/chanting_verse46.mp4", meaningUrl: "/meaning_verse46.mp4", liveAt: "2026-07-12T20:00:00+05:30" },
  { date: "2026-07-14", n: 55, posting: "Verse 47", lyricsKey: "v47", chantingUrl: "/chanting_verse47.mp4", meaningUrl: "/meaning_verse47.mp4", liveAt: "2026-07-13T20:00:00+05:30" },
  { date: "2026-07-15", n: 56, posting: "Verse 48", lyricsKey: "v48", chantingUrl: "/chanting_verse48.mp4", meaningUrl: "/meaning_verse48.mp4", liveAt: "2026-07-14T20:00:00+05:30" },
  { date: "2026-07-16", n: 57, posting: "Verse 49", lyricsKey: "v49", chantingUrl: "/chanting_verse49.mp4", meaningUrl: "/meaning_verse49.mp4", liveAt: "2026-07-15T20:00:00+05:30" },
  { date: "2026-07-17", n: 58, posting: "Verse 50", lyricsKey: "v50", chantingUrl: "/chanting_verse50.mp4", meaningUrl: "/meaning_verse50.mp4", liveAt: "2026-07-16T20:00:00+05:30" },
  { date: "2026-07-18", n: 59, posting: "Verse 51", lyricsKey: "v51", chantingUrl: "/chanting_verse51.mp4", meaningUrl: "/meaning_verse51.mp4", liveAt: "2026-07-17T20:00:00+05:30" },
  { date: "2026-07-19", n: 60, posting: "Quiz 9 (Verses 46-51)", isQuiz: true, liveAt: "2026-07-18T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W10 = [
  { date: "2026-07-20", n: 61, posting: "Verse 52", lyricsKey: "v52", chantingUrl: "/chanting_verse52.mp4", meaningUrl: "/meaning_verse52.mp4", liveAt: "2026-07-19T20:00:00+05:30" },
  { date: "2026-07-21", n: 62, posting: "Verse 53", lyricsKey: "v53", chantingUrl: "/chanting_verse53.mp4", meaningUrl: "/meaning_verse53.mp4", liveAt: "2026-07-20T20:00:00+05:30" },
  { date: "2026-07-22", n: 63, posting: "Verse 54", lyricsKey: "v54", chantingUrl: "/chanting_verse54.mp4", meaningUrl: "/meaning_verse54.mp4", liveAt: "2026-07-21T20:00:00+05:30" },
  { date: "2026-07-23", n: 64, posting: "Verse 55", lyricsKey: "v55", chantingUrl: "/chanting_verse55.mp4", meaningUrl: "/meaning_verse55.mp4", liveAt: "2026-07-22T20:00:00+05:30" },
  { date: "2026-07-24", n: 65, posting: "Verse 56", lyricsKey: "v56", chantingUrl: "/chanting_verse56.mp4", meaningUrl: "/meaning_verse56.mp4", liveAt: "2026-07-23T20:00:00+05:30" },
  { date: "2026-07-25", n: 66, posting: "Verse 57", lyricsKey: "v57", chantingUrl: "/chanting_verse57.mp4", meaningUrl: "/meaning_verse57.mp4", liveAt: "2026-07-24T20:00:00+05:30" },
  { date: "2026-07-26", n: 67, posting: "Quiz 10 (Verses 52-57)", isQuiz: true, liveAt: "2026-07-25T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W11 = [
  { date: "2026-07-27", n: 68, posting: "Verse 58", lyricsKey: "v58", chantingUrl: "/chanting_verse58.mp4", meaningUrl: "/meaning_verse58.mp4", liveAt: "2026-07-26T20:00:00+05:30" },
  { date: "2026-07-28", n: 69, posting: "Verse 59", lyricsKey: "v59", chantingUrl: "/chanting_verse59.mp4", meaningUrl: "/meaning_verse59.mp4", liveAt: "2026-07-27T20:00:00+05:30" },
  { date: "2026-07-29", n: 70, posting: "Verse 60", lyricsKey: "v60", chantingUrl: "/chanting_verse60.mp4", meaningUrl: "/meaning_verse60.mp4", liveAt: "2026-07-28T20:00:00+05:30" },
  { date: "2026-07-30", n: 71, posting: "Verse 61", lyricsKey: "v61", chantingUrl: "/chanting_verse61.mp4", meaningUrl: "/meaning_verse61.mp4", liveAt: "2026-07-29T20:00:00+05:30" },
  { date: "2026-07-31", n: 72, posting: "Verse 62", lyricsKey: "v62", chantingUrl: "/chanting_verse62.mp4", meaningUrl: "/meaning_verse62.mp4", liveAt: "2026-07-30T20:00:00+05:30" },
  { date: "2026-08-01", n: 73, posting: "Verse 63", lyricsKey: "v63", chantingUrl: "/chanting_verse63.mp4", meaningUrl: "/meaning_verse63.mp4", liveAt: "2026-07-31T20:00:00+05:30" },
  { date: "2026-08-02", n: 74, posting: "Quiz 11 (Verses 58-63)", isQuiz: true, liveAt: "2026-08-01T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

export const SCHEDULE_W12 = [
  { date: "2026-08-03", n: 75, posting: "Verse 64", lyricsKey: "v64", chantingUrl: "/chanting_verse64.mp4", meaningUrl: "/meaning_verse64.mp4", liveAt: "2026-08-02T20:00:00+05:30" },
  { date: "2026-08-04", n: 76, posting: "Verse 65", lyricsKey: "v65", chantingUrl: "/chanting_verse65.mp4", meaningUrl: "/meaning_verse65.mp4", liveAt: "2026-08-03T20:00:00+05:30" },
  { date: "2026-08-05", n: 77, posting: "Verse 66", lyricsKey: "v66", chantingUrl: "/chanting_verse66.mp4", meaningUrl: "/meaning_verse66.mp4", liveAt: "2026-08-04T20:00:00+05:30" },
  { date: "2026-08-06", n: 78, posting: "Verse 67", lyricsKey: "v67", chantingUrl: "/chanting_verse67.mp4", meaningUrl: "/meaning_verse67.mp4", liveAt: "2026-08-05T20:00:00+05:30" },
  { date: "2026-08-07", n: 79, posting: "Verse 68", lyricsKey: "v68", chantingUrl: "/chanting_verse68.mp4", meaningUrl: "/meaning_verse68.mp4", liveAt: "2026-08-06T20:00:00+05:30" },
  { date: "2026-08-08", n: 80, posting: "Verse 69", lyricsKey: "v69", chantingUrl: "/chanting_verse69.mp4", meaningUrl: "/meaning_verse69.mp4", liveAt: "2026-08-07T20:00:00+05:30" },
  { date: "2026-08-09", n: 81, posting: "Quiz 12 (Verses 64-69)", isQuiz: true, liveAt: "2026-08-08T20:00:00+05:30", chantingUrl: "", meaningUrl: "" },
];

// ── Build TRACK_DB from schedule ─────────────────────────────────────────────
function buildWeekTracks(schedule, lyricsMap, weekCode = "w1") {
  const chanting = [];
  const explanation = [];

  schedule.forEach((day) => {
    const pad = String(day.n).padStart(2, "0");
    const dateLabel = new Date(day.date).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "2-digit", timeZone: "Asia/Kolkata"
    });
    const title = `Day ${pad} (${dateLabel}) - ${day.posting}`;
    // Day 1, Day 2 & Day 3 are always live; all others lock until midnight IST unless liveAt is explicitly set
    const liveAt = day.liveAt || ((day.n === 1 || day.n === 2 || day.n === 3) ? undefined : `${day.date}T00:00:00+05:30`);
    const lyrics = day.lyricsKey ? lyricsMap[day.lyricsKey] : null;

    if (day.isQuiz) {
      const entry = {
        id: `yt-s-${weekCode}-d${pad}`, title,
        sub: day.posting, duration: "Quiz", isQuiz: true, liveAt,
        date: day.date,
        lyrics: `${day.posting} — weekly assessment.`,
      };
      // Show in playlist for both chanting and explanation
      chanting.push(entry);
      explanation.push(entry);
      return;
    }

    if (day.isIntro) {
      const cp = parseMediaUrl(day.chantingUrl);
      const mp = parseMediaUrl(day.meaningUrl);
      chanting.push({
        id: `yt-s-${weekCode}-d${pad}`, title,
        sub: "Overview of Saṅkṣepa Rāmāyaṇa", duration: "YouTube",
        mediaType: cp?.type || "youtube",
        videoId: cp?.type === "youtube" ? cp.videoId : undefined,
        driveFileId: cp?.type === "drive" ? cp.fileId : undefined,
        startSeconds: cp?.type === "youtube" ? cp.startSeconds : undefined,
        liveAt,
        date: day.date,
        isIntro: true,
        lyrics: "॥ Introduction ॥\n\nWelcome to Saṅkṣepa Rāmāyaṇa Daily Satsaṅga.",
      });
      if (mp) {
        explanation.push({
          id: `yt-s-${weekCode}-d${pad}-e`, title,
          sub: "Introduction — Meaning & Explanation",
          mediaType: mp.type,
          videoId: mp.type === "youtube" ? mp.videoId : undefined,
          driveFileId: mp.type === "drive" ? mp.fileId : undefined,
          startSeconds: mp.type === "youtube" ? mp.startSeconds : undefined,
          duration: "YouTube", liveAt,
          date: day.date,
          isIntro: true,
          lyrics: "॥ Introduction ॥\n\nWelcome to Saṅkṣepa Rāmāyaṇa Daily Satsaṅga.",
        });
      }
      return;
    }

    const cUrl = day.chantingUrl?.startsWith("/")
      ? `https://d2xr6tg4fy1mqx.cloudfront.net/Sanksheparamayana/chanting${day.chantingUrl}`
      : day.chantingUrl;
    const mUrl = day.meaningUrl?.startsWith("/")
      ? `https://d2xr6tg4fy1mqx.cloudfront.net/Sanksheparamayana/meaning${day.meaningUrl}`
      : day.meaningUrl;

    const cp = parseMediaUrl(cUrl);
    const mp = parseMediaUrl(mUrl);

    if (cp) {
      chanting.push({
        id: `yt-s-${weekCode}-d${pad}-c`, title, sub: `${day.posting} — Chanting`,
        mediaType: cp.type,
        videoId: cp.type === "youtube" ? cp.videoId : undefined,
        driveFileId: cp.type === "drive" ? cp.fileId : undefined,
        videoUrl: cp.type === "local" ? cp.videoUrl : undefined,
        startSeconds: cp.type === "youtube"
          ? (day.chantingStart !== undefined ? day.chantingStart : cp.startSeconds)
          : undefined,
        endSeconds: day.chantingEnd,
        duration: cp.type === "local" ? "Local" : "YouTube", liveAt, lyrics,
        date: day.date,
      });
    }
    if (mp) {
      explanation.push({
        id: `yt-s-${weekCode}-d${pad}-e`, title, sub: `${day.posting} — Meaning & Explanation`,
        mediaType: mp.type,
        videoId: mp.type === "youtube" ? mp.videoId : undefined,
        driveFileId: mp.type === "drive" ? mp.fileId : undefined,
        videoUrl: mp.type === "local" ? mp.videoUrl : undefined,
        startSeconds: mp.type === "youtube"
          ? (day.meaningStart !== undefined ? day.meaningStart : mp.startSeconds)
          : undefined,
        endSeconds: day.meaningEnd,
        duration: mp.type === "local" ? "Local" : "YouTube", liveAt, lyrics,
        date: day.date,
      });
    }
  });

  return { chanting, explanation };
}

const week1 = buildWeekTracks(SCHEDULE_W1, LYRICS, "week-1");
const week2 = buildWeekTracks(SCHEDULE_W2, LYRICS, "week-2");
const week3 = buildWeekTracks(SCHEDULE_W3, LYRICS, "week-3");
const week4 = buildWeekTracks(SCHEDULE_W4, LYRICS, "week-4");
const week5 = buildWeekTracks(SCHEDULE_W5, LYRICS, "week-5");
const week6 = buildWeekTracks(SCHEDULE_W6, LYRICS, "week-6");
const week7 = buildWeekTracks(SCHEDULE_W7, LYRICS, "week-7");
const week8 = buildWeekTracks(SCHEDULE_W8, LYRICS, "week-8");
const week9 = buildWeekTracks(SCHEDULE_W9, LYRICS, "week-9");
const week10 = buildWeekTracks(SCHEDULE_W10, LYRICS, "week-10");
const week11 = buildWeekTracks(SCHEDULE_W11, LYRICS, "week-11");
const week12 = buildWeekTracks(SCHEDULE_W12, LYRICS, "week-12");

export let TRACK_DB = {
  sankshepa: {
    "s-week-1": week1,
    "s-week-2": week2,
    "s-week-3": week3,
    "s-week-4": week4,
    "s-week-5": week5,
    "s-week-6": week6,
    "s-week-7": week7,
    "s-week-8": week8,
    "s-week-9": week9,
    "s-week-10": week10,
    "s-week-11": week11,
    "s-week-12": week12,
    chanting: [],
    explanation: [],
  },
};

export function initializeS3Schedule(config) {
  if (!config) return;
  const baseUrl = config.base_url || "https://d2xr6tg4fy1mqx.cloudfront.net/Sanksheparamayana/";
  const days = config.days || {};

  const weeks = {};

  // Find the maximum day number in the JSON (generate at least up to day 123 to cover 18 weeks of quizzes)
  const dayKeys = Object.keys(days).map(k => parseInt(k, 10));
  if (dayKeys.length === 0) return;
  const maxDayNum = Math.max(...dayKeys, 123);

  function getOffsetDate(baseDateStr, offsetDays) {
    const d = new Date(baseDateStr + "T00:00:00+05:30");
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function getWeekVerseRange(weekNum) {
    if (weekNum === 1) return "1-3";
    if (weekNum === 2) return "4-9";
    if (weekNum === 3) return "10-15";
    const start = 16 + (weekNum - 4) * 6;
    const end = start + 5;
    return `${start}-${end}`;
  }

  for (let D = 1; D <= maxDayNum; D++) {
    let dateStr, weekNum, isQuiz, verseNum;

    // Mapping Day D to Date and Week
    if (D <= 4) {
      weekNum = 1;
      isQuiz = D === 4;
      if (D === 1) { dateStr = "2026-05-21"; verseNum = 1; }
      else if (D === 2) { dateStr = "2026-05-22"; verseNum = 2; }
      else if (D === 3) { dateStr = "2026-05-23"; verseNum = 3; }
      else { dateStr = "2026-05-24"; verseNum = null; }
    } else if (D >= 5 && D <= 11) {
      weekNum = 2;
      isQuiz = D === 11;
      if (isQuiz) {
        dateStr = "2026-05-31";
        verseNum = null;
      } else {
        const offset = D - 5;
        dateStr = getOffsetDate("2026-05-25", offset);
        verseNum = 4 + offset;
      }
    } else if (D >= 12 && D <= 18) {
      weekNum = 3;
      isQuiz = D === 18;
      if (isQuiz) {
        dateStr = "2026-06-07";
        verseNum = null;
      } else {
        const offset = D - 12;
        dateStr = getOffsetDate("2026-06-01", offset);
        verseNum = 10 + offset;
      }
    } else {
      // D >= 19: Week 4 and beyond (Regular 7-day cycles starting June 8)
      const baseD = D - 19;
      const weekOffset = Math.floor(baseD / 7);
      const dayOfCycle = baseD % 7;
      weekNum = 4 + weekOffset;

      const weekStartDate = getOffsetDate("2026-06-08", weekOffset * 7);
      dateStr = getOffsetDate(weekStartDate, dayOfCycle);
      isQuiz = dayOfCycle === 6;

      const baseVerse = 16 + weekOffset * 6;
      verseNum = isQuiz ? null : baseVerse + dayOfCycle;
    }

    const weekKey = `s-week-${weekNum}`;
    if (!weeks[weekKey]) {
      weeks[weekKey] = { chanting: [], explanation: [] };
    }

    const pad = String(D).padStart(2, "0");
    const dObj = new Date(dateStr + "T00:00:00+05:30");
    const dateLabel = dObj.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "2-digit", timeZone: "Asia/Kolkata"
    });

    const prevDateStr = getOffsetDate(dateStr, -1);
    const computedLiveAt = (D === 1 || D === 2 || D === 3) ? undefined : `${prevDateStr}T20:00:00+05:30`;

    if (isQuiz) {
      const title = `Day ${pad} (${dateLabel}) - Quiz ${weekNum} (Verses ${getWeekVerseRange(weekNum)})`;
      const entry = {
        id: `yt-s-week-${weekNum}-d${pad}`,
        title,
        sub: `Quiz ${weekNum}`,
        duration: "Quiz",
        isQuiz: true,
        date: dateStr,
        liveAt: weekNum === 3 ? "2026-06-06T20:00:00+05:30" : computedLiveAt,
        lyrics: `Quiz ${weekNum} — weekly assessment.`,
      };
      weeks[weekKey].chanting.push(entry);
      weeks[weekKey].explanation.push(entry);
      continue;
    }

    const dayConfig = days[String(D)];
    if (!dayConfig) continue; // skip if no folder is defined for this day

    const ENABLE_HLS = false; // Set to true when user gives instructions to enable HLS

    let chantingUrl = "";
    let meaningUrl = "";

    if (typeof dayConfig === "string") {
      if (ENABLE_HLS) {
        chantingUrl = `${baseUrl}chanting/${dayConfig}/playlist.m3u8`;
        meaningUrl = `${baseUrl}meaning/${dayConfig}/playlist.m3u8`;
      } else {
        chantingUrl = `${baseUrl}chanting/${dayConfig}/${dayConfig}.mp4`;
        meaningUrl = `${baseUrl}meaning/${dayConfig}/${dayConfig}.mp4`;
      }
    } else {
      if (dayConfig.chanting) {
        let path = dayConfig.chanting;
        if (!ENABLE_HLS && path.endsWith("playlist.m3u8")) {
          const lastSlash = path.lastIndexOf("/");
          if (lastSlash !== -1) {
            const folderPath = path.substring(0, lastSlash);
            const folderNameOnly = folderPath.substring(folderPath.lastIndexOf("/") + 1);
            path = `${folderPath}/${folderNameOnly}.mp4`;
          }
        }
        chantingUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;
      }
      if (dayConfig.meaning) {
        let path = dayConfig.meaning;
        if (!ENABLE_HLS && path.endsWith("playlist.m3u8")) {
          const lastSlash = path.lastIndexOf("/");
          if (lastSlash !== -1) {
            const folderPath = path.substring(0, lastSlash);
            const folderNameOnly = folderPath.substring(folderPath.lastIndexOf("/") + 1);
            path = `${folderPath}/${folderNameOnly}.mp4`;
          }
        }
        meaningUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;
      }
    }

    const title = `Day ${pad} (${dateLabel}) - Verse ${verseNum}`;
    const lyricsKey = `v${verseNum}`;
    const lyrics = LYRICS[lyricsKey] || "";

    if (chantingUrl) {
      weeks[weekKey].chanting.push({
        id: `yt-s-week-${weekNum}-d${pad}-c`,
        title,
        sub: `Verse ${verseNum} — Chanting`,
        mediaType: "local", // treat as local so the client player handles it
        videoUrl: chantingUrl,
        duration: ENABLE_HLS ? "HLS" : "Local",
        liveAt: computedLiveAt,
        lyrics,
        date: dateStr,
      });
    }

    if (meaningUrl) {
      weeks[weekKey].explanation.push({
        id: `yt-s-week-${weekNum}-d${pad}-e`,
        title,
        sub: `Verse ${verseNum} — Meaning & Explanation`,
        mediaType: "local",
        videoUrl: meaningUrl,
        duration: ENABLE_HLS ? "HLS" : "Local",
        liveAt: computedLiveAt,
        lyrics,
        date: dateStr,
      });
    }
  }

  // Clear static s-week subtopics
  Object.keys(TRACK_DB.sankshepa).forEach(key => {
    if (key.startsWith("s-week-")) {
      delete TRACK_DB.sankshepa[key];
    }
  });

  // Populate dynamic weeks
  Object.keys(weeks).forEach(weekKey => {
    TRACK_DB.sankshepa[weekKey] = weeks[weekKey];
  });
}